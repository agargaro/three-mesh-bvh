let e,t,a,n,i,r,o,l,d,s;var c=globalThis,m={},u={},f=c.parcelRequire4485;null==f&&((f=function(e){if(e in m)return m[e].exports;if(e in u){var t=u[e];delete u[e];var a={id:e,exports:{}};return m[e]=a,t.call(a.exports,a,a.exports),a.exports}var n=Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,t){u[e]=t},c.parcelRequire4485=f);var v=f.register;v("RPVlj",function(e,t){Object.defineProperty(e.exports,"FullScreenQuad",{get:()=>r,set:void 0,enumerable:!0,configurable:!0});var a=f("ilwiq");let n=new a.OrthographicCamera(-1,1,1,-1,0,1),i=new a.BufferGeometry;i.setAttribute("position",new a.Float32BufferAttribute([-1,3,0,-1,-1,0,3,-1,0],3)),i.setAttribute("uv",new a.Float32BufferAttribute([0,2,0,0,2,0],2));class r{constructor(e){this._mesh=new a.Mesh(i,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,n)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}}),v("c8CJQ",function(e,t){var a;e.exports,e.exports=((a=function(){function e(e){return i.appendChild(e.dom),e}function t(e){for(var t=0;t<i.children.length;t++)i.children[t].style.display=t===e?"block":"none";n=e}var n=0,i=document.createElement("div");i.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",i.addEventListener("click",function(e){e.preventDefault(),t(++n%i.children.length)},!1);var r=(performance||Date).now(),o=r,l=0,d=e(new a.Panel("FPS","#0ff","#002")),s=e(new a.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var c=e(new a.Panel("MB","#f08","#201"));return t(0),{REVISION:16,dom:i,addPanel:e,showPanel:t,begin:function(){r=(performance||Date).now()},end:function(){l++;var e=(performance||Date).now();if(s.update(e-r,200),e>o+1e3&&(d.update(1e3*l/(e-o),100),o=e,l=0,c)){var t=performance.memory;c.update(t.usedJSHeapSize/1048576,t.jsHeapSizeLimit/1048576)}return e},update:function(){r=this.end()},domElement:i,setMode:t}}).Panel=function(e,t,a){var n=1/0,i=0,r=Math.round,o=r(window.devicePixelRatio||1),l=80*o,d=48*o,s=3*o,c=2*o,m=3*o,u=15*o,f=74*o,v=30*o,h=document.createElement("canvas");h.width=l,h.height=d,h.style.cssText="width:80px;height:48px";var p=h.getContext("2d");return p.font="bold "+9*o+"px Helvetica,Arial,sans-serif",p.textBaseline="top",p.fillStyle=a,p.fillRect(0,0,l,d),p.fillStyle=t,p.fillText(e,s,c),p.fillRect(m,u,f,v),p.fillStyle=a,p.globalAlpha=.9,p.fillRect(m,u,f,v),{dom:h,update:function(d,g){n=Math.min(n,d),i=Math.max(i,d),p.fillStyle=a,p.globalAlpha=1,p.fillRect(0,0,l,u),p.fillStyle=t,p.fillText(r(d)+" "+e+" ("+r(n)+"-"+r(i)+")",s,c),p.drawImage(h,m+o,u,f-o,v,m,u,f-o,v),p.fillRect(m+f-o,u,o,v),p.fillStyle=a,p.globalAlpha=.9,p.fillRect(m+f-o,u,o,r((1-d/g)*v))}}},a)});var h=f("ilwiq"),p=f("RPVlj"),g=f("7lx9d"),w=f("5Rd1x"),y=f("7ePFa"),x=f("c8CJQ"),b=f("jiuw3"),P=f("gcCUH"),M=f("5LGag"),S=f("ff8ed"),R=f("boAbX"),C=f("Mleu6");const F={enableRaytracing:!0,smoothImageScaling:!0,resolutionScale:.5/window.devicePixelRatio,bounces:3,accumulate:!0};let _=0;function A(){t.aspect=window.innerWidth/window.innerHeight,t.updateProjectionMatrix();let a=window.innerWidth,n=window.innerHeight,i=window.devicePixelRatio*F.resolutionScale;e.setSize(a,n),e.setPixelRatio(i),l.setSize(a*i,n*i),_=0}(function(){(e=new h.WebGLRenderer({antialias:!1})).setPixelRatio(window.devicePixelRatio),e.setClearColor(594970),e.setSize(window.innerWidth,window.innerHeight),e.outputEncoding=h.sRGBEncoding,document.body.appendChild(e.domElement),s=document.getElementById("output"),a=new h.Scene;let c=new h.DirectionalLight(16777215,1);c.position.set(1,1,1),a.add(c),a.add(new h.AmbientLight(11583173,.5)),(t=new h.PerspectiveCamera(75,window.innerWidth/window.innerHeight,.1,50)).position.set(-2,2,3),t.far=100,t.updateProjectionMatrix(),i=new(x&&x.__esModule?x.default:x),document.body.appendChild(i.dom);let m=new h.ShaderMaterial({defines:{BOUNCES:5},uniforms:{bvh:{value:new R.MeshBVHUniformStruct},normalAttribute:{value:new M.FloatVertexAttributeTexture},cameraWorldMatrix:{value:new h.Matrix4},invProjectionMatrix:{value:new h.Matrix4},seed:{value:0},opacity:{value:1}},vertexShader:`

			varying vec2 vUv;
			void main() {

				vec4 mvPosition = vec4( position, 1.0 );
				mvPosition = modelViewMatrix * mvPosition;
				gl_Position = projectionMatrix * mvPosition;

				vUv = uv;

			}

		`,fragmentShader:`
			#define RAY_OFFSET 1e-5

			precision highp isampler2D;
			precision highp usampler2D;
			${P.common_functions}
			${P.bvh_struct_definitions}
			${P.bvh_ray_functions}
			#include <common>

			uniform mat4 cameraWorldMatrix;
			uniform mat4 invProjectionMatrix;
			uniform sampler2D normalAttribute;
			uniform BVH bvh;
			uniform float seed;
			uniform float opacity;
			varying vec2 vUv;

			void main() {

				// get [-1, 1] normalized device coordinates
				vec2 ndc = 2.0 * vUv - vec2( 1.0 );
				vec3 rayOrigin, rayDirection;
				ndcToCameraRay( ndc, cameraWorldMatrix, invProjectionMatrix, rayOrigin, rayDirection );

				// Lambertian render
				gl_FragColor = vec4( 0.0 );

				vec3 throughputColor = vec3( 1.0 );
				vec3 randomPoint = vec3( .0 );

				// hit results
				uvec4 faceIndices = uvec4( 0u );
				vec3 faceNormal = vec3( 0.0, 0.0, 1.0 );
				vec3 barycoord = vec3( 0.0 );
				float side = 1.0;
				float dist = 0.0;

				for ( int i = 0; i < BOUNCES; i ++ ) {

					if ( ! bvhIntersectFirstHit( bvh, rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist ) ) {

						float value = ( rayDirection.y + 0.5 ) / 1.5;
						vec3 skyColor = mix( vec3( 1.0 ), vec3( 0.75, 0.85, 1.0 ), value );

						gl_FragColor = vec4( skyColor * throughputColor * 2.0, 1.0 );

						break;

					}

					// 1 / PI attenuation for physically correct lambert model
					// https://www.rorydriscoll.com/2009/01/25/energy-conservation-in-games/
					throughputColor *= 1.0 / PI;

					randomPoint = vec3(
						rand( vUv + float( i + 1 ) + vec2( seed, seed ) ),
						rand( - vUv * seed + float( i ) - seed ),
						rand( - vUv * float( i + 1 ) - vec2( seed, - seed ) )
					);
					randomPoint -= 0.5;
					randomPoint *= 2.0;

					// ensure the random vector is not 0,0,0 and that it won't exactly negate
					// the surface normal

					float pointLength = max( length( randomPoint ), 1e-4 );
					randomPoint /= pointLength;
					randomPoint *= 0.999;

					// fetch the interpolated smooth normal
					vec3 normal =
						side *
						textureSampleBarycoord(
							normalAttribute,
							barycoord,
							faceIndices.xyz
						).xyz;

					// adjust the hit point by the surface normal by a factor of some offset and the
					// maximum component-wise value of the current point to accommodate floating point
					// error as values increase.
					vec3 point = rayOrigin + rayDirection * dist;
					vec3 absPoint = abs( point );
					float maxPoint = max( absPoint.x, max( absPoint.y, absPoint.z ) );
					rayOrigin = point + faceNormal * ( maxPoint + 1.0 ) * RAY_OFFSET;
					rayDirection = normalize( normal + randomPoint );

				}

				gl_FragColor.a = opacity;

			}

		`});r=new p.FullScreenQuad(m),m.transparent=!0,m.depthWrite=!1,new(0,g.GLTFLoader)().load("https://raw.githubusercontent.com/gkjohnson/3d-demo-data/main/models/dragon-attenuation/DragonAttenuation.glb",e=>{let t;e.scene.traverse(e=>{e.isMesh&&"Dragon"===e.name&&(t=e,e.geometry.scale(.25,.25,.25).rotateX(Math.PI/2))});let n=new h.PlaneGeometry(5,5,1,1);n.rotateX(-Math.PI/2);let i=(0,y.mergeGeometries)([n,t.geometry],!1);i.translate(0,-.5,0),d=new h.Mesh(i,new h.MeshStandardMaterial),a.add(d);let r=new S.MeshBVH(d.geometry,{maxLeafTris:1,strategy:C.SAH});m.uniforms.bvh.value.updateFrom(r),m.uniforms.normalAttribute.value.updateFrom(d.geometry.attributes.normal)});let u=e.extensions.get("OES_texture_float_linear");l=new h.WebGLRenderTarget(1,1,{format:h.RGBAFormat,type:u?h.FloatType:h.HalfFloatType}),o=new p.FullScreenQuad(new h.MeshBasicMaterial({map:l.texture})),new w.OrbitControls(t,e.domElement).addEventListener("change",()=>{_=0}),(n=new b.GUI).add(F,"enableRaytracing").name("enable"),n.add(F,"accumulate"),n.add(F,"smoothImageScaling"),n.add(F,"resolutionScale",.1,1,.01).onChange(A),n.add(F,"bounces",1,10,1).onChange(e=>{m.defines.BOUNCES=parseInt(e),m.needsUpdate=!0,_=0}),n.open(),window.addEventListener("resize",A,!1),A()})(),function n(){if(i.update(),requestAnimationFrame(n),e.domElement.style.imageRendering=F.smoothImageScaling?"auto":"pixelated",d&&F.enableRaytracing){if(F.accumulate){if(0===_)t.clearViewOffset();else{let e=l.width,a=l.height;t.setViewOffset(e,a,Math.random()-.5,Math.random()-.5,e,a)}}else _=0;t.updateMatrixWorld();let a=(r.material.uniforms.seed.value+.11111)%2;r.material.uniforms.seed.value=a,r.material.uniforms.cameraWorldMatrix.value.copy(t.matrixWorld),r.material.uniforms.invProjectionMatrix.value.copy(t.projectionMatrixInverse),r.material.uniforms.opacity.value=1/(_+1),e.autoClear=0===_,e.setRenderTarget(l),r.render(e),e.setRenderTarget(null),o.render(e),e.autoClear=!0,_++}else _=0,t.clearViewOffset(),e.render(a,t);s.innerText=`samples: ${_}`}();
//# sourceMappingURL=gpuPathTracing.f27717e8.js.map
