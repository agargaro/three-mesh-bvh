let e,r,t,n,i,o,a,s,l,d,c,u,f,m,v;function p(e,r,t,n){Object.defineProperty(e,r,{get:t,set:n,enumerable:!0,configurable:!0})}var x=globalThis,g={},h={},y=x.parcelRequire4485;null==y&&((y=function(e){if(e in g)return g[e].exports;if(e in h){var r=h[e];delete h[e];var t={id:e,exports:{}};return g[e]=t,r.call(t.exports,t,t.exports),t.exports}var n=Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,r){h[e]=r},x.parcelRequire4485=y);var w=y.register;w("27Lyk",function(e,r){p(e.exports,"register",()=>t,e=>t=e);var t,n=new Map;t=function(e,r){for(var t=0;t<r.length-1;t+=2)n.set(r[t],{baseUrl:e,path:r[t+1]})}}),w("RPVlj",function(e,r){p(e.exports,"FullScreenQuad",()=>o);var t=y("ilwiq");let n=new t.OrthographicCamera(-1,1,1,-1,0,1),i=new t.BufferGeometry;i.setAttribute("position",new t.Float32BufferAttribute([-1,3,0,-1,-1,0,3,-1,0],3)),i.setAttribute("uv",new t.Float32BufferAttribute([0,2,0,0,2,0],2));class o{constructor(e){this._mesh=new t.Mesh(i,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,n)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}}),w("c8CJQ",function(e,r){var t;e.exports,e.exports=((t=function(){function e(e){return i.appendChild(e.dom),e}function r(e){for(var r=0;r<i.children.length;r++)i.children[r].style.display=r===e?"block":"none";n=e}var n=0,i=document.createElement("div");i.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",i.addEventListener("click",function(e){e.preventDefault(),r(++n%i.children.length)},!1);var o=(performance||Date).now(),a=o,s=0,l=e(new t.Panel("FPS","#0ff","#002")),d=e(new t.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var c=e(new t.Panel("MB","#f08","#201"));return r(0),{REVISION:16,dom:i,addPanel:e,showPanel:r,begin:function(){o=(performance||Date).now()},end:function(){s++;var e=(performance||Date).now();if(d.update(e-o,200),e>a+1e3&&(l.update(1e3*s/(e-a),100),a=e,s=0,c)){var r=performance.memory;c.update(r.usedJSHeapSize/1048576,r.jsHeapSizeLimit/1048576)}return e},update:function(){o=this.end()},domElement:i,setMode:r}}).Panel=function(e,r,t){var n=1/0,i=0,o=Math.round,a=o(window.devicePixelRatio||1),s=80*a,l=48*a,d=3*a,c=2*a,u=3*a,f=15*a,m=74*a,v=30*a,p=document.createElement("canvas");p.width=s,p.height=l,p.style.cssText="width:80px;height:48px";var x=p.getContext("2d");return x.font="bold "+9*a+"px Helvetica,Arial,sans-serif",x.textBaseline="top",x.fillStyle=t,x.fillRect(0,0,s,l),x.fillStyle=r,x.fillText(e,d,c),x.fillRect(u,f,m,v),x.fillStyle=t,x.globalAlpha=.9,x.fillRect(u,f,m,v),{dom:p,update:function(l,g){n=Math.min(n,l),i=Math.max(i,l),x.fillStyle=t,x.globalAlpha=1,x.fillRect(0,0,s,f),x.fillStyle=r,x.fillText(o(l)+" "+e+" ("+o(n)+"-"+o(i)+")",d,c),x.drawImage(p,u+a,f,m-a,v,u,f,m-a,v),x.fillRect(u+m-a,f,a,v),x.fillStyle=t,x.globalAlpha=.9,x.fillRect(u+m-a,f,a,o((1-l/g)*v))}}},t)}),w("8todg",function(e,r){p(e.exports,"GenerateMeshBVHWorker",()=>o);var t=y("ilwiq"),n=y("ff8ed"),i=y("77YCt");class o extends i.WorkerBase{constructor(){super(new Worker(y("bSef7"))),this.name="GenerateMeshBVHWorker"}runTask(e,r,i={}){return new Promise((o,a)=>{if(r.getAttribute("position").isInterleavedBufferAttribute||r.index&&r.index.isInterleavedBufferAttribute)throw Error("GenerateMeshBVHWorker: InterleavedBufferAttribute are not supported for the geometry attributes.");e.onerror=e=>{a(Error(`GenerateMeshBVHWorker: ${e.message}`))},e.onmessage=s=>{let{data:l}=s;if(l.error)a(Error(l.error)),e.onmessage=null;else if(l.serialized){let{serialized:a,position:s}=l,d=(0,n.MeshBVH).deserialize(a,r,{setIndex:!1}),c=Object.assign({setBoundingBox:!0},i);if(r.attributes.position.array=s,a.index){if(r.index)r.index.array=a.index;else{let e=new t.BufferAttribute(a.index,1,!1);r.setIndex(e)}}c.setBoundingBox&&(r.boundingBox=d.getBoundingBox(new t.Box3)),i.onProgress&&i.onProgress(l.progress),o(d),e.onmessage=null}else i.onProgress&&i.onProgress(l.progress)};let s=r.index?r.index.array:null,l=r.attributes.position.array,d=[l];s&&d.push(s),e.postMessage({index:s,position:l,options:{...i,onProgress:null,includedProgressCallback:!!i.onProgress,groups:[...r.groups]}},d.map(e=>e.buffer).filter(e=>"undefined"==typeof SharedArrayBuffer||!(e instanceof SharedArrayBuffer)))})}}}),w("77YCt",function(e,r){p(e.exports,"WorkerBase",()=>t);class t{constructor(e){this.name="WorkerBase",this.running=!1,this.worker=e,this.worker.onerror=e=>{if(e.message)throw Error(`${this.name}: Could not create Web Worker with error "${e.message}"`);throw Error(`${this.name}: Could not create Web Worker.`)}}runTask(){}generate(...e){if(this.running)throw Error("GenerateMeshBVHWorker: Already running job.");if(null===this.worker)throw Error("GenerateMeshBVHWorker: Worker has been disposed.");this.running=!0;let r=this.runTask(this.worker,...e);return r.finally(()=>{this.running=!1}),r}dispose(){this.worker.terminate(),this.worker=null}}}),w("bSef7",function(e,r){var t=y("7ryUf");let n=new URL("generateMeshBVH.worker.17f4c1c5.js",import.meta.url);e.exports=t(n.toString(),n.origin,!0)}),w("7ryUf",function(e,r){e.exports=function(e,r,t){if(r===self.location.origin)return e;var n=t?"import "+JSON.stringify(e)+";":"importScripts("+JSON.stringify(e)+");";return URL.createObjectURL(new Blob([n],{type:"application/javascript"}))}}),y("27Lyk").register(new URL("",import.meta.url).toString(),JSON.parse('["1WzX2","sdfGeneration.3e4cbe3a.js","6J6WW","generateMeshBVH.worker.17f4c1c5.js","acVmZ","generateMeshBVH.worker.aad48e6e.js","gr8Yf","asyncGenerate.22609466.js","j19h5","asyncGenerate.e8b1599c.js","30Pwg","asyncGenerate.77ce35af.js","2tzBs","characterMovement.89c1b67b.js","6UuCC","characterMovement.5fc59dbe.js","6mMEU","characterMovement.fc8349f1.js","3lH4c","characterMovement.933f8c48.js","i0zVc","clippedEdges.dcf40b33.js","gVxlZ","diamond.5b837c44.js"]'));var b=y("ilwiq"),S=y("7lx9d"),T=y("RPVlj"),M=y("5Rd1x"),B=y("jiuw3"),I=y("c8CJQ"),D=y("8todg"),P=y("jAT47"),b=y("ilwiq"),z=y("gcCUH"),F=y("boAbX");class _ extends b.ShaderMaterial{constructor(e){super({uniforms:{matrix:{value:new b.Matrix4},zValue:{value:0},bvh:{value:new F.MeshBVHUniformStruct}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}

			`,fragmentShader:`

				precision highp isampler2D;
				precision highp usampler2D;

				${z.common_functions}
				${z.bvh_struct_definitions}
				${z.bvh_ray_functions}
				${z.bvh_distance_functions}

				varying vec2 vUv;

				uniform BVH bvh;
				uniform float zValue;
				uniform mat4 matrix;

				void main() {

					// compute the point in space to check
					vec3 point = vec3( vUv, zValue );
					point -= vec3( 0.5 );
					point = ( matrix * vec4( point, 1.0 ) ).xyz;

					// retrieve the distance and other values
					uvec4 faceIndices;
					vec3 faceNormal;
					vec3 barycoord;
					float side;
					vec3 outPoint;
					float dist = bvhClosestPointToPoint( bvh, point.xyz, faceIndices, faceNormal, barycoord, side, outPoint );

					// if the triangle side is the back then it must be on the inside and the value negative
					gl_FragColor = vec4( side * dist, 0, 0, 0 );

				}

			`}),this.setValues(e)}}var b=y("ilwiq");class R extends b.ShaderMaterial{constructor(e){super({defines:{DISPLAY_GRID:0},uniforms:{sdfTex:{value:null},layer:{value:0},layers:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}

			`,fragmentShader:`
				precision highp sampler3D;

				varying vec2 vUv;
				uniform sampler3D sdfTex;
				uniform float layer;
				uniform float layers;

				void main() {

					#if DISPLAY_GRID

					float dim = ceil( sqrt( layers ) );
					vec2 cell = floor( vUv * dim );
					vec2 frac = vUv * dim - cell;
					float zLayer = ( cell.y * dim + cell.x ) / ( dim * dim );

					float dist = texture( sdfTex, vec3( frac, zLayer ) ).r;
					gl_FragColor.rgb = dist > 0.0 ? vec3( 0, dist, 0 ) : vec3( - dist, 0, 0 );
					gl_FragColor.a = 1.0;

					#else

					float dist = texture( sdfTex, vec3( vUv, layer ) ).r;
					gl_FragColor.rgb = dist > 0.0 ? vec3( 0, dist, 0 ) : vec3( - dist, 0, 0 );
					gl_FragColor.a = 1.0;

					#endif

					#include <encodings_fragment>

				}
			`}),this.setValues(e)}}var b=y("ilwiq");class k extends b.ShaderMaterial{constructor(e){super({defines:{MAX_STEPS:500,SURFACE_EPSILON:.001},uniforms:{surface:{value:0},sdfTex:{value:null},normalStep:{value:new b.Vector3},projectionInverse:{value:new b.Matrix4},sdfTransformInverse:{value:new b.Matrix4}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}

			`,fragmentShader:`
				precision highp sampler3D;

				varying vec2 vUv;

				uniform float surface;
				uniform sampler3D sdfTex;
				uniform vec3 normalStep;
				uniform mat4 projectionInverse;
				uniform mat4 sdfTransformInverse;

				#include <common>

				// distance to box bounds
				vec2 rayBoxDist( vec3 boundsMin, vec3 boundsMax, vec3 rayOrigin, vec3 rayDir ) {

					vec3 t0 = ( boundsMin - rayOrigin ) / rayDir;
					vec3 t1 = ( boundsMax - rayOrigin ) / rayDir;
					vec3 tmin = min( t0, t1 );
					vec3 tmax = max( t0, t1 );

					float distA = max( max( tmin.x, tmin.y ), tmin.z );
					float distB = min( tmax.x, min( tmax.y, tmax.z ) );

					float distToBox = max( 0.0, distA );
					float distInsideBox = max( 0.0, distB - distToBox );
					return vec2( distToBox, distInsideBox );

				}

				void main() {

					// get the inverse of the sdf box transform
					mat4 sdfTransform = inverse( sdfTransformInverse );

					// convert the uv to clip space for ray transformation
					vec2 clipSpace = 2.0 * vUv - vec2( 1.0 );

					// get world ray direction
					vec3 rayOrigin = vec3( 0.0 );
					vec4 homogenousDirection = projectionInverse * vec4( clipSpace, - 1.0, 1.0 );
					vec3 rayDirection = normalize( homogenousDirection.xyz / homogenousDirection.w );

					// transform ray into local coordinates of sdf bounds
					vec3 sdfRayOrigin = ( sdfTransformInverse * vec4( rayOrigin, 1.0 ) ).xyz;
					vec3 sdfRayDirection = normalize( ( sdfTransformInverse * vec4( rayDirection, 0.0 ) ).xyz );

					// find whether our ray hits the box bounds in the local box space
					vec2 boxIntersectionInfo = rayBoxDist( vec3( - 0.5 ), vec3( 0.5 ), sdfRayOrigin, sdfRayDirection );
					float distToBox = boxIntersectionInfo.x;
					float distInsideBox = boxIntersectionInfo.y;
					bool intersectsBox = distInsideBox > 0.0;

					gl_FragColor = vec4( 0.0 );
					if ( intersectsBox ) {

						// find the surface point in world space
						bool intersectsSurface = false;
						vec4 localPoint = vec4( sdfRayOrigin + sdfRayDirection * ( distToBox + 1e-5 ), 1.0 );
						vec4 point = sdfTransform * localPoint;

						// ray march
						for ( int i = 0; i < MAX_STEPS; i ++ ) {

							// sdf box extends from - 0.5 to 0.5
							// transform into the local bounds space [ 0, 1 ] and check if we're inside the bounds
							vec3 uv = ( sdfTransformInverse * point ).xyz + vec3( 0.5 );
							if ( uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0 || uv.z < 0.0 || uv.z > 1.0 ) {

								break;

							}

							// get the distance to surface and exit the loop if we're close to the surface
							float distanceToSurface = texture2D( sdfTex, uv ).r - surface;
							if ( distanceToSurface < SURFACE_EPSILON ) {

								intersectsSurface = true;
								break;

							}

							// step the ray
							point.xyz += rayDirection * abs( distanceToSurface );

						}

						// find the surface normal
						if ( intersectsSurface ) {

							// compute the surface normal
							vec3 uv = ( sdfTransformInverse * point ).xyz + vec3( 0.5 );
							float dx = texture( sdfTex, uv + vec3( normalStep.x, 0.0, 0.0 ) ).r - texture( sdfTex, uv - vec3( normalStep.x, 0.0, 0.0 ) ).r;
							float dy = texture( sdfTex, uv + vec3( 0.0, normalStep.y, 0.0 ) ).r - texture( sdfTex, uv - vec3( 0.0, normalStep.y, 0.0 ) ).r;
							float dz = texture( sdfTex, uv + vec3( 0.0, 0.0, normalStep.z ) ).r - texture( sdfTex, uv - vec3( 0.0, 0.0, normalStep.z ) ).r;
							vec3 normal = normalize( vec3( dx, dy, dz ) );

							// compute some basic lighting effects
							vec3 lightDirection = normalize( vec3( 1.0 ) );
							float lightIntensity =
								saturate( dot( normal, lightDirection ) ) +
								saturate( dot( normal, - lightDirection ) ) * 0.05 +
								0.1;
							gl_FragColor.rgb = vec3( lightIntensity );
							gl_FragColor.a = 1.0;

						}

					}

					#include <encodings_fragment>

				}
			`}),this.setValues(e)}}var V=y("kp7Te");const j={gpuGeneration:!0,resolution:75,margin:.2,regenerate:()=>U(),mode:"raymarching",layer:0,surface:.1},A=new b.Matrix4;function C(){n&&n.destroy(),j.layer=Math.min(j.resolution,j.layer);let e=(n=new B.GUI).addFolder("generation");e.add(j,"gpuGeneration"),e.add(j,"resolution",10,200,1),e.add(j,"margin",0,1),e.add(j,"regenerate");let r=n.addFolder("display");r.add(j,"mode",["geometry","raymarching","layer","grid layers"]).onChange(()=>{C()}),"layer"===j.mode&&r.add(j,"layer",0,j.resolution,1),"raymarching"===j.mode&&r.add(j,"surface",-.2,.5)}function U(){let r=j.resolution,t=new b.Matrix4,n=new b.Vector3,i=new b.Quaternion,c=new b.Vector3;l.boundingBox.getCenter(n),c.subVectors(l.boundingBox.max,l.boundingBox.min),c.x+=2*j.margin,c.y+=2*j.margin,c.z+=2*j.margin,t.compose(n,i,c),A.copy(t).invert(),o.box.copy(l.boundingBox),o.box.min.x-=j.margin,o.box.min.y-=j.margin,o.box.min.z-=j.margin,o.box.max.x+=j.margin,o.box.max.y+=j.margin,o.box.max.z+=j.margin,d&&d.dispose();let f=1/r,m=.5*f,v=window.performance.now();if(j.gpuGeneration){let n=e.extensions.get("OES_texture_float_linear");(d=new b.WebGL3DRenderTarget(r,r,r)).texture.format=b.RedFormat,d.texture.type=n?b.FloatType:b.HalfFloatType,d.texture.minFilter=b.LinearFilter,d.texture.magFilter=b.LinearFilter,u.material.uniforms.bvh.value.updateFrom(s),u.material.uniforms.matrix.value.copy(t);for(let t=0;t<r;t++)u.material.uniforms.zValue.value=t*f+m,e.setRenderTarget(d,t),u.render(e);e.readRenderTargetPixels(d,0,0,1,1,new Float32Array(4)),e.setRenderTarget(null)}else{(d=new b.Data3DTexture(new Float32Array(r**3),r,r,r)).format=b.RedFormat,d.type=b.FloatType,d.minFilter=b.LinearFilter,d.magFilter=b.LinearFilter,d.needsUpdate=!0;let e=l.attributes.position,n=l.index,i=new b.Vector3,o=new b.Vector3,a=new b.Vector3,c=new b.Triangle,u={};for(let l=0;l<r;l++)for(let v=0;v<r;v++)for(let p=0;p<r;p++){i.set(m+l*f-.5,m+v*f-.5,m+p*f-.5).applyMatrix4(t);let x=l+v*r+p*r*r,g=s.closestPointToPoint(i,u).distance,h=u.faceIndex,y=n.getX(3*h+0),w=n.getX(3*h+1),b=n.getX(3*h+2);c.setFromAttributeAndIndices(e,y,w,b),c.getNormal(o),a.subVectors(u.point,i),d.image.data[x]=o.dot(a)>0?-g:g}}let p=window.performance.now()-v;a.innerText=`${p.toFixed(2)}ms`,C()}(function(){a=document.getElementById("output"),(e=new b.WebGLRenderer({antialias:!0})).setPixelRatio(window.devicePixelRatio),e.setSize(window.innerWidth,window.innerHeight),e.setClearColor(0,0),e.outputEncoding=b.sRGBEncoding,document.body.appendChild(e.domElement),t=new b.Scene;let n=new b.DirectionalLight(16777215,1);n.position.set(1,1,1),t.add(n),t.add(new b.AmbientLight(16777215,.2)),(r=new b.PerspectiveCamera(75,window.innerWidth/window.innerHeight,.1,50)).position.set(1,1,2),r.far=100,r.updateProjectionMatrix(),o=new b.Box3Helper(new b.Box3),t.add(o),new M.OrbitControls(r,e.domElement),i=new(I&&I.__esModule?I.default:I),document.body.appendChild(i.dom),u=new T.FullScreenQuad(new _),f=new T.FullScreenQuad(new R),m=new T.FullScreenQuad(new k),v=new D.GenerateMeshBVHWorker,new(0,S.GLTFLoader)().setMeshoptDecoder(V.MeshoptDecoder).loadAsync("https://raw.githubusercontent.com/gkjohnson/3d-demo-data/main/models/stanford-bunny/bunny.glb").then(e=>{e.scene.updateMatrixWorld(!0);let r=new P.StaticGeometryGenerator(e.scene);return r.attributes=["position","normal"],r.useGroups=!1,l=r.generate().center(),v.generate(l,{maxLeafTris:1})}).then(e=>{s=e,c=new b.Mesh(l,new b.MeshStandardMaterial),t.add(c),U()}),C(),window.addEventListener("resize",function(){r.aspect=window.innerWidth/window.innerHeight,r.updateProjectionMatrix(),e.setSize(window.innerWidth,window.innerHeight)},!1)})(),function n(){if(i.update(),requestAnimationFrame(n),d){if("geometry"===j.mode)e.render(t,r);else if("layer"===j.mode||"grid layers"===j.mode){let r;let t=f.material;d.isData3DTexture?(t.uniforms.layer.value=j.layer/d.image.width,t.uniforms.sdfTex.value=d,r=d):(t.uniforms.layer.value=j.layer/d.width,t.uniforms.sdfTex.value=d.texture,r=d.texture),t.uniforms.layers.value=r.image.width;let n="layer"===j.mode?0:1;n!==t.defines.DISPLAY_GRID&&(t.defines.DISPLAY_GRID=n,t.needsUpdate=!0),f.render(e)}else if("raymarching"===j.mode){let t;r.updateMatrixWorld(),c.updateMatrixWorld();let{width:n,depth:i,height:o}=(t=d.isData3DTexture?d:d.texture).image;m.material.uniforms.sdfTex.value=t,m.material.uniforms.normalStep.value.set(1/n,1/o,1/i),m.material.uniforms.surface.value=j.surface,m.material.uniforms.projectionInverse.value.copy(r.projectionMatrixInverse),m.material.uniforms.sdfTransformInverse.value.copy(c.matrixWorld).invert().premultiply(A).multiply(r.matrixWorld),m.render(e)}}}();
//# sourceMappingURL=sdfGeneration.3e4cbe3a.js.map
