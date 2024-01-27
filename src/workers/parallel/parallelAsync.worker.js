import { MathUtils } from 'three';
import { BYTES_PER_NODE } from '../../core/Constants.js';
import { buildTree } from '../../core/build/buildTree.js';
import { countNodes, populateBuffer } from '../../core/build/buildUtils.js';
import { computeTriangleBounds } from '../../core/build/computeBoundsUtils.js';
import { getFullGeometryRange, getRootIndexRanges } from '../../core/build/geometryUtils.js';
import { WorkerPool } from './WorkerPool.js';
import { flattenNodes, getGeometry } from './utils.js';

let isRunning = false;
let prevTime = 0;
const workerPool = new WorkerPool();

onmessage = async ( { data } ) => {

	if ( isRunning ) {

		throw new Error();

	}

	const { operation } = data;
	if ( operation === 'INIT' ) {

		isRunning = true;

		const {
			maxWorkerCount,
			indirectBuffer,
			indexArray,
			positionArray,
			options,
		} = data;

		// create a proxy bvh structure
		const proxyBvh = {
			_indirectBuffer: indirectBuffer,
			geometry: getGeometry( indexArray, positionArray ),
		};

		const localOptions = {
			...options,
			maxDepth: Math.round( Math.log2( workerPool.workerCount ) ),
			onProgress: options.includedProgressCallback ? onProgressCallback : null,
		};

		workerPool.setWorkerCount( MathUtils.floorPowerOfTwo( maxWorkerCount ) );

		// generate the ranges for all roots asynchronously
		const geometry = getGeometry( indexArray, positionArray );
		const triangleBounds = computeTriangleBounds( geometry );
		const geometryRanges = options.indirect ? getFullGeometryRange( geometry ) : getRootIndexRanges( geometry );
		for ( let i = 0, l = geometryRanges.length; i < l; i ++ ) {

			const promises = [];
			const range = geometryRanges[ i ];
			const root = buildTree( proxyBvh, triangleBounds, range.offset, range.count, localOptions );
			const flatNodes = flattenNodes( root );
			let bufferLengths = 0;
			let remainingNodes = 0;
			let nextWorker = 0;

			for ( let j = 0, l = flatNodes.length; j < l; j ++ ) {

				const node = flatNodes[ j ];
				const isLeaf = Boolean( node.count );
				if ( isLeaf ) {

					const pr = workerPool.runSubTask(
						nextWorker ++,
						{
							operation: 'BUILD_SUBTREE',
							offset: node.offset,
							count: node.count,
							...data
						},
						onProgressCallback,
					).then( data => {

						const buffer = data.buffer;
						node.buffer = buffer;
						bufferLengths += buffer.byteLength;

					} );

					promises.push( pr );

				} else {

					remainingNodes ++;

				}

			}

			await Promise.all( promises );

			const BufferConstructor = options.useSharedArrayBuffer ? SharedArrayBuffer : ArrayBuffer;
			const buffer = new BufferConstructor( bufferLengths + remainingNodes * BYTES_PER_NODE );
			populateBuffer( 0, root, buffer );

		}

		isRunning = false;

	} else if ( operation === 'BUILD_BOUNDS' ) {


	} else if ( operation === 'BUILD_SUBTREE' ) {

		const {
			offset,
			count,
			indirectBuffer,
			indexArray,
			positionArray,
			triangleBounds,
			options,
		} = data;

		const proxyBvh = {
			_indirectBuffer: indirectBuffer,
			geometry: getGeometry( indexArray, positionArray ),
		};

		const root = buildTree( proxyBvh, triangleBounds, offset, count, options );
		const nodeCount = countNodes( root );
		const buffer = new ArrayBuffer( BYTES_PER_NODE * nodeCount );
		populateBuffer( 0, root, buffer );

		postMessage( { type: 'result', buffer }, [ buffer ] );

	}

};

function onProgressCallback( progress ) {

	const currTime = performance.now();
	if ( currTime - prevTime >= 10 || progress === 1.0 ) {

		postMessage( {

			error: null,
			progress,
			type: 'progress'

		} );
		prevTime = currTime;

	}

}
