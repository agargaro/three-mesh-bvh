let e,t,i,n,r,a,o,l;var d=globalThis,c={},s={},u=d.parcelRequire4485;null==u&&((u=function(e){if(e in c)return c[e].exports;if(e in s){var t=s[e];delete s[e];var i={id:e,exports:{}};return c[e]=i,t.call(i.exports,i,i.exports),i.exports}var n=Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,t){s[e]=t},d.parcelRequire4485=u);var m=u.register;m("RPVlj",function(e,t){Object.defineProperty(e.exports,"FullScreenQuad",{get:()=>a,set:void 0,enumerable:!0,configurable:!0});var i=u("ilwiq");let n=new i.OrthographicCamera(-1,1,1,-1,0,1),r=new i.BufferGeometry;r.setAttribute("position",new i.Float32BufferAttribute([-1,3,0,-1,-1,0,3,-1,0],3)),r.setAttribute("uv",new i.Float32BufferAttribute([0,2,0,0,2,0],2));class a{constructor(e){this._mesh=new i.Mesh(r,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,n)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}}),m("c8CJQ",function(e,t){var i;e.exports,e.exports=((i=function(){function e(e){return r.appendChild(e.dom),e}function t(e){for(var t=0;t<r.children.length;t++)r.children[t].style.display=t===e?"block":"none";n=e}var n=0,r=document.createElement("div");r.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",r.addEventListener("click",function(e){e.preventDefault(),t(++n%r.children.length)},!1);var a=(performance||Date).now(),o=a,l=0,d=e(new i.Panel("FPS","#0ff","#002")),c=e(new i.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var s=e(new i.Panel("MB","#f08","#201"));return t(0),{REVISION:16,dom:r,addPanel:e,showPanel:t,begin:function(){a=(performance||Date).now()},end:function(){l++;var e=(performance||Date).now();if(c.update(e-a,200),e>o+1e3&&(d.update(1e3*l/(e-o),100),o=e,l=0,s)){var t=performance.memory;s.update(t.usedJSHeapSize/1048576,t.jsHeapSizeLimit/1048576)}return e},update:function(){a=this.end()},domElement:r,setMode:t}}).Panel=function(e,t,i){var n=1/0,r=0,a=Math.round,o=a(window.devicePixelRatio||1),l=80*o,d=48*o,c=3*o,s=2*o,u=3*o,m=15*o,f=74*o,v=30*o,p=document.createElement("canvas");p.width=l,p.height=d,p.style.cssText="width:80px;height:48px";var h=p.getContext("2d");return h.font="bold "+9*o+"px Helvetica,Arial,sans-serif",h.textBaseline="top",h.fillStyle=i,h.fillRect(0,0,l,d),h.fillStyle=t,h.fillText(e,c,s),h.fillRect(u,m,f,v),h.fillStyle=i,h.globalAlpha=.9,h.fillRect(u,m,f,v),{dom:p,update:function(d,w){n=Math.min(n,d),r=Math.max(r,d),h.fillStyle=i,h.globalAlpha=1,h.fillRect(0,0,l,m),h.fillStyle=t,h.fillText(a(d)+" "+e+" ("+a(n)+"-"+a(r)+")",c,s),h.drawImage(p,u+o,m,f-o,v,u,m,f-o,v),h.fillRect(u+f-o,m,o,v),h.fillStyle=i,h.globalAlpha=.9,h.fillRect(u+f-o,m,o,a((1-d/w)*v))}}},i)});var f=u("ilwiq"),v=u("5Rd1x"),p=u("RPVlj"),h=u("c8CJQ"),w=u("jiuw3"),x=u("gcCUH"),g=u("5LGag"),M=u("ff8ed"),y=u("boAbX"),b=u("Mleu6");const S={enableRaytracing:!0,animate:!0,resolutionScale:1/window.devicePixelRatio,smoothNormals:!0};function P(){t.aspect=window.innerWidth/window.innerHeight,t.updateProjectionMatrix();let i=window.innerWidth,n=window.innerHeight,r=window.devicePixelRatio*S.resolutionScale;e.setSize(i,n),e.setPixelRatio(r)}(function(){(e=new f.WebGLRenderer({antialias:!1})).setPixelRatio(window.devicePixelRatio),e.setClearColor(594970),e.setSize(window.innerWidth,window.innerHeight),e.outputEncoding=f.sRGBEncoding,document.body.appendChild(e.domElement),i=new f.Scene;let d=new f.DirectionalLight(16777215,1);d.position.set(1,1,1),i.add(d),i.add(new f.AmbientLight(11583173,.5)),(t=new f.PerspectiveCamera(75,window.innerWidth/window.innerHeight,.1,50)).position.set(0,0,4),t.far=100,t.updateProjectionMatrix(),r=new(h&&h.__esModule?h.default:h),document.body.appendChild(r.dom);let c=new f.TorusKnotGeometry(1,.3,300,50),s=new M.MeshBVH(c,{maxLeafTris:1,strategy:b.SAH});o=new f.Mesh(c,new f.MeshStandardMaterial),i.add(o),l=new f.Clock;let u=new f.ShaderMaterial({defines:{SMOOTH_NORMALS:1},uniforms:{bvh:{value:new y.MeshBVHUniformStruct},normalAttribute:{value:new g.FloatVertexAttributeTexture},cameraWorldMatrix:{value:new f.Matrix4},invProjectionMatrix:{value:new f.Matrix4},invModelMatrix:{value:new f.Matrix4}},vertexShader:`

			varying vec2 vUv;
			void main() {

				vec4 mvPosition = vec4( position, 1.0 );
				mvPosition = modelViewMatrix * mvPosition;
				gl_Position = projectionMatrix * mvPosition;

				vUv = uv;

			}

		`,fragmentShader:`
			precision highp isampler2D;
			precision highp usampler2D;

			${x.common_functions}
			${x.bvh_struct_definitions}
			${x.bvh_ray_functions}

			uniform mat4 cameraWorldMatrix;
			uniform mat4 invProjectionMatrix;
			uniform mat4 invModelMatrix;
			uniform sampler2D normalAttribute;
			uniform BVH bvh;
			varying vec2 vUv;

			void main() {

				// get [-1, 1] normalized device coordinates
				vec2 ndc = 2.0 * vUv - vec2( 1.0 );
				vec3 rayOrigin, rayDirection;
				ndcToCameraRay(
					ndc, invModelMatrix * cameraWorldMatrix, invProjectionMatrix,
					rayOrigin, rayDirection
				);

				// hit results
				uvec4 faceIndices = uvec4( 0u );
				vec3 faceNormal = vec3( 0.0, 0.0, 1.0 );
				vec3 barycoord = vec3( 0.0 );
				float side = 1.0;
				float dist = 0.0;

				// get intersection
				bool didHit = bvhIntersectFirstHit( bvh, rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist );

				#if SMOOTH_NORMALS

					vec3 normal = textureSampleBarycoord(
						normalAttribute,
						barycoord,
						faceIndices.xyz
					).xyz;

				#else

					vec3 normal = face.normal;

				#endif

				// set the color
				gl_FragColor = ! didHit ? vec4( 0.0366, 0.0813, 0.1057, 1.0 ) : vec4( normal, 1.0 );

			}
		`});a=new p.FullScreenQuad(u),u.uniforms.bvh.value.updateFrom(s),u.uniforms.normalAttribute.value.updateFrom(c.attributes.normal),new v.OrbitControls(t,e.domElement),(n=new w.GUI).add(S,"enableRaytracing"),n.add(S,"animate"),n.add(S,"smoothNormals").onChange(e=>{a.material.defines.SMOOTH_NORMALS=Number(e),a.material.needsUpdate=!0}),n.add(S,"resolutionScale",.1,1,.01).onChange(P),n.open(),window.addEventListener("resize",P,!1),P()})(),function n(){r.update(),requestAnimationFrame(n);let d=l.getDelta();if(S.animate&&(o.rotation.y+=d),S.enableRaytracing){t.updateMatrixWorld(),o.updateMatrixWorld();let i=a.material.uniforms;i.cameraWorldMatrix.value.copy(t.matrixWorld),i.invProjectionMatrix.value.copy(t.projectionMatrixInverse),i.invModelMatrix.value.copy(o.matrixWorld).invert(),a.render(e)}else e.render(i,t)}();
//# sourceMappingURL=gpuPathTracingSimple.15e03ba2.js.map
