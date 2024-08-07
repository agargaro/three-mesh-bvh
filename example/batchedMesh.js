import Stats from 'stats.js';
import * as dat from 'three/examples/jsm/libs/lil-gui.module.min.js';
import * as THREE from 'three';
import {
	acceleratedRaycast, computeBoundsTree, disposeBoundsTree,
	CENTER, SAH, AVERAGE,
} from '..';

THREE.Mesh.prototype.raycast = acceleratedRaycast;
THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
THREE.BatchedMesh.prototype.raycast = acceleratedRaycast;
THREE.BatchedMesh.prototype.computeBoundsTree = computeBoundsTree;
THREE.BatchedMesh.prototype.disposeBoundsTree = disposeBoundsTree;

const bgColor = 0x263238 / 2;

let renderer, scene, stats, camera;
let material, containerObj, batchedMesh; // boundsViz
const rayCasterObjects = [];

// Create ray casters in the scene
const raycaster = new THREE.Raycaster();
const sphere = new THREE.SphereGeometry( 0.25, 20, 20 );
const cylinder = new THREE.CylinderGeometry( 0.01, 0.01 );
const pointDist = 25;

// Delta timer
let lastFrameTime = null;
let deltaTime = 0;

const params = {
	raycasters: {
		count: 150,
		speed: 1,
		near: 0,
		far: pointDist
	},

	mesh: {
		splitStrategy: CENTER,
		useBoundsTree: true,
		// visualizeBounds: false,
		// displayParents: false,
		speed: 1,
		// visualBoundsDepth: 10
	}
};

init();
updateFromOptions();
render();

function init() {

	// renderer setup
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setClearColor( bgColor, 1 );
	document.body.appendChild( renderer.domElement );

	// scene setup
	scene = new THREE.Scene();
	scene.fog = new THREE.Fog( 0x263238 / 2, 40, 80 );

	const light = new THREE.DirectionalLight( 0xffffff, 0.5 );
	light.position.set( 1, 1, 1 );
	scene.add( light );
	scene.add( new THREE.AmbientLight( 0xffffff, 0.4 ) );

	containerObj = new THREE.Object3D();
	material = new THREE.MeshPhongMaterial( { color: 0xE91E63 } );
	containerObj.scale.multiplyScalar( 10 );
	containerObj.rotation.x = 10.989999999999943;
	containerObj.rotation.y = 10.989999999999943;
	scene.add( containerObj );

	createBatchedMesh();

	// camera setup
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 50 );
	camera.position.z = 60;
	camera.far = 100;
	camera.updateProjectionMatrix();

	// stats setup
	stats = new Stats();
	document.body.appendChild( stats.dom );

	// Run
	const gui = new dat.GUI();
	const rcFolder = gui.addFolder( 'Raycasters' );
	rcFolder.add( params.raycasters, 'count' ).min( 1 ).max( 1000 ).step( 1 ).onChange( () => updateFromOptions() );
	rcFolder.add( params.raycasters, 'speed' ).min( 0 ).max( 20 );
	rcFolder.add( params.raycasters, 'near' ).min( 0 ).max( pointDist ).onChange( () => updateFromOptions() );
	rcFolder.add( params.raycasters, 'far' ).min( 0 ).max( pointDist ).onChange( () => updateFromOptions() );
	rcFolder.open();

	const meshFolder = gui.addFolder( 'Mesh' );
	meshFolder.add( params.mesh, 'useBoundsTree' ).onChange( () => updateFromOptions() );
	meshFolder.add( params.mesh, 'splitStrategy', { 'CENTER': CENTER, 'SAH': SAH, 'AVERAGE': AVERAGE } ).onChange( () => updateFromOptions() );
	meshFolder.add( params.mesh, 'speed' ).min( 0 ).max( 20 );
	// meshFolder.add( params.mesh, 'visualizeBounds' ).onChange( () => updateFromOptions() );
	// meshFolder.add( params.mesh, 'displayParents' ).onChange( () => updateFromOptions() );
	// meshFolder.add( params.mesh, 'visualBoundsDepth' ).min( 1 ).max( 20 ).step( 1 ).onChange( () => updateFromOptions() );
	meshFolder.open();

	window.addEventListener( 'resize', function () {

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );

	}, false );

}

function createBatchedMesh() {

	const radius = 0.5;

	const knotGeometry = new THREE.TorusKnotGeometry( radius, 0.2, 200, 100, 2, 3 );
	const knot2Geometry = new THREE.TorusKnotGeometry( radius, 0.2, 200, 100, 3, 4 );
	const sphereGeometry = new THREE.SphereGeometry( radius, 100, 100 );

	const knotVertices = knotGeometry.attributes.position.count;
	const knot2Vertices = knot2Geometry.attributes.position.count;
	const sphereVertices = sphereGeometry.attributes.position.count;
	const maxVertices = knotVertices + knot2Vertices + sphereVertices;

	const knotIndexes = knotGeometry.index.count;
	const knot2Indexes = knot2Geometry.index.count;
	const sphereIndexes = sphereGeometry.index.count;
	const maxIndexes = knotIndexes + knot2Indexes + sphereIndexes;

	batchedMesh = new THREE.BatchedMesh( 3, maxVertices, maxIndexes, material );

	const knotGeometryId = batchedMesh.addGeometry( knotGeometry );
	const knot2GeometryId = batchedMesh.addGeometry( knot2Geometry );
	const sphereGeometryId = batchedMesh.addGeometry( sphereGeometry );

	const knotInstanceId = batchedMesh.addInstance( knotGeometryId );
	const knot2InstanceId = batchedMesh.addInstance( knot2GeometryId );
	const sphereInstanceId = batchedMesh.addInstance( sphereGeometryId );

	const dolly = new THREE.Object3D();

	dolly.position.x = - 1.5;
	dolly.rotation.x = Math.random() * 10;
	dolly.rotation.y = Math.random() * 10;
	dolly.updateMatrix();
	batchedMesh.setMatrixAt( knotInstanceId, dolly.matrix );

	dolly.position.x = 0;
	dolly.rotation.x = Math.random() * 10;
	dolly.rotation.y = Math.random() * 10;
	dolly.updateMatrix();
	batchedMesh.setMatrixAt( knot2InstanceId, dolly.matrix );

	dolly.position.x = 1.5;
	dolly.rotation.x = Math.random() * 10;
	dolly.rotation.y = Math.random() * 10;
	dolly.updateMatrix();
	batchedMesh.setMatrixAt( sphereInstanceId, dolly.matrix );

	batchedMesh.rotation.x = Math.random() * 10;
	batchedMesh.rotation.y = Math.random() * 10;

	containerObj.add( batchedMesh );

}

function addRaycaster() {

	// Objects
	const obj = new THREE.Object3D();
	const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
	const origMesh = new THREE.Mesh( sphere, material );
	const hitMesh = new THREE.Mesh( sphere, material );
	hitMesh.scale.multiplyScalar( 0.25 );
	origMesh.scale.multiplyScalar( 0.5 );

	const cylinderMesh = new THREE.Mesh( cylinder, new THREE.MeshBasicMaterial( { color: 0xffffff, transparent: true, opacity: 0.25 } ) );

	// Init the rotation root
	obj.add( cylinderMesh );
	obj.add( origMesh );
	obj.add( hitMesh );
	scene.add( obj );

	// set transforms
	origMesh.position.set( pointDist, 0, 0 );
	obj.rotation.x = Math.random() * 10;
	obj.rotation.y = Math.random() * 10;
	obj.rotation.z = Math.random() * 10;

	// reusable vectors
	const origVec = new THREE.Vector3();
	const dirVec = new THREE.Vector3();
	const xDir = ( Math.random() - 0.5 );
	const yDir = ( Math.random() - 0.5 );
	const zDir = ( Math.random() - 0.5 );
	rayCasterObjects.push( {
		update: () => {

			obj.rotation.x += xDir * 0.0001 * params.raycasters.speed * deltaTime;
			obj.rotation.y += yDir * 0.0001 * params.raycasters.speed * deltaTime;
			obj.rotation.z += zDir * 0.0001 * params.raycasters.speed * deltaTime;

			origMesh.updateMatrixWorld();
			origVec.setFromMatrixPosition( origMesh.matrixWorld );
			dirVec.copy( origVec ).multiplyScalar( - 1 ).normalize();

			raycaster.set( origVec, dirVec );
			raycaster.firstHitOnly = true;
			const res = raycaster.intersectObject( containerObj, true );
			const length = res.length ? res[ 0 ].distance : pointDist;

			hitMesh.position.set( pointDist - length, 0, 0 );

			const lineLength = res.length ? length - raycaster.near : length - raycaster.near - ( pointDist - raycaster.far );

			cylinderMesh.position.set( pointDist - raycaster.near - ( lineLength / 2 ), 0, 0 );
			cylinderMesh.scale.set( 1, lineLength, 1 );

			cylinderMesh.rotation.z = Math.PI / 2;

		},

		remove: () => {

			scene.remove( obj );

		}
	} );

}

function updateFromOptions() {

	raycaster.near = params.raycasters.near;
	raycaster.far = params.raycasters.far;

	// Update raycaster count
	while ( rayCasterObjects.length > params.raycasters.count ) {

		rayCasterObjects.pop().remove();

	}

	while ( rayCasterObjects.length < params.raycasters.count ) {

		addRaycaster();

	}

	if ( ! batchedMesh ) {

		return;

	}

	// Update whether or not to use the bounds tree
	if (
		! params.mesh.useBoundsTree && batchedMesh.boundsTrees ||
		batchedMesh.boundsTrees && params.mesh.splitStrategy !== batchedMesh.boundsTrees.splitStrategy
	) {

		batchedMesh.disposeBoundsTree();

	}

	if ( params.mesh.useBoundsTree && ! batchedMesh.boundsTrees ) {

		console.time( 'computing bounds tree' );
		batchedMesh.computeBoundsTree( {
			maxLeafTris: 5,
			strategy: parseFloat( params.mesh.splitStrategy ),
		} );
		batchedMesh.boundsTrees.splitStrategy = params.mesh.splitStrategy;
		console.timeEnd( 'computing bounds tree' );

		// if ( boundsViz ) {

		// 	boundsViz.update();

		// }

	}

	// // Update bounds viz
	// const shouldDisplayBounds = params.mesh.visualizeBounds && geometry.boundsTree;
	// if ( boundsViz && ! shouldDisplayBounds ) {

	// 	containerObj.remove( boundsViz );
	// 	boundsViz = null;

	// }

	// if ( ! boundsViz && shouldDisplayBounds ) {

	// 	boundsViz = new MeshBVHHelper( knots[ 0 ] );
	// 	containerObj.add( boundsViz );

	// }

	// if ( boundsViz ) {

	// 	boundsViz.depth = params.mesh.visualBoundsDepth;
	// 	boundsViz.displayParents = params.mesh.displayParents;
	// 	boundsViz.update();

	// }

}

function render() {

	stats.begin();

	const currTime = window.performance.now();
	lastFrameTime = lastFrameTime || currTime;
	deltaTime = currTime - lastFrameTime;

	containerObj.rotation.x += 0.0001 * params.mesh.speed * deltaTime;
	containerObj.rotation.y += 0.0001 * params.mesh.speed * deltaTime;
	containerObj.children.forEach( c => {

		c.rotation.x += 0.0001 * params.mesh.speed * deltaTime;
		c.rotation.y += 0.0001 * params.mesh.speed * deltaTime;

	} );
	containerObj.updateMatrixWorld();

	rayCasterObjects.forEach( f => f.update() );

	renderer.render( scene, camera );

	lastFrameTime = currTime;

	stats.end();

	requestAnimationFrame( render );

}
