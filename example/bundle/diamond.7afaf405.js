let e,r,t,a,i,n,o,l,c;var s=globalThis,d={},m={},f=s.parcelRequire4485;null==f&&((f=function(e){if(e in d)return d[e].exports;if(e in m){var r=m[e];delete m[e];var t={id:e,exports:{}};return d[e]=t,r.call(t.exports,t,t.exports),t.exports}var a=Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,r){m[e]=r},s.parcelRequire4485=f),f.register;var u=f("ilwiq"),h=f("jiuw3"),p=f("5Rd1x"),v=f("7lx9d"),u=f("ilwiq");class g extends u.DataTextureLoader{constructor(e){super(e),this.type=u.HalfFloatType}parse(e){let r=function(e,r){switch(e){case 1:console.error("THREE.RGBELoader Read Error: "+(r||""));break;case 2:console.error("THREE.RGBELoader Write Error: "+(r||""));break;case 3:console.error("THREE.RGBELoader Bad File Format: "+(r||""));break;default:console.error("THREE.RGBELoader: Error: "+(r||""))}return -1},t=function(e,r,t){r=r||1024;let a=e.pos,i=-1,n=0,o="",l=String.fromCharCode.apply(null,new Uint16Array(e.subarray(a,a+128)));for(;0>(i=l.indexOf("\n"))&&n<r&&a<e.byteLength;)o+=l,n+=l.length,a+=128,l+=String.fromCharCode.apply(null,new Uint16Array(e.subarray(a,a+128)));return -1<i&&(!1!==t&&(e.pos+=n+i+1),o+l.slice(0,i))},a=new Uint8Array(e);a.pos=0;let i=function(e){let a,i;let n=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,o=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,l=/^\s*FORMAT=(\S+)\s*$/,c=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,s={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0};if(e.pos>=e.byteLength||!(a=t(e)))return r(1,"no header found");if(!(i=a.match(/^#\?(\S+)/)))return r(3,"bad initial token");for(s.valid|=1,s.programtype=i[1],s.string+=a+"\n";!1!==(a=t(e));){if(s.string+=a+"\n","#"===a.charAt(0)){s.comments+=a+"\n";continue}if((i=a.match(n))&&(s.gamma=parseFloat(i[1])),(i=a.match(o))&&(s.exposure=parseFloat(i[1])),(i=a.match(l))&&(s.valid|=2,s.format=i[1]),(i=a.match(c))&&(s.valid|=4,s.height=parseInt(i[1],10),s.width=parseInt(i[2],10)),2&s.valid&&4&s.valid)break}return 2&s.valid?4&s.valid?s:r(3,"missing image size specifier"):r(3,"missing format specifier")}(a);if(-1!==i){let e=i.width,t=i.height,n=function(e,t,a){if(t<8||t>32767||2!==e[0]||2!==e[1]||128&e[2])return new Uint8Array(e);if(t!==(e[2]<<8|e[3]))return r(3,"wrong scanline width");let i=new Uint8Array(4*t*a);if(!i.length)return r(4,"unable to allocate buffer space");let n=0,o=0,l=4*t,c=new Uint8Array(4),s=new Uint8Array(l),d=a;for(;d>0&&o<e.byteLength;){if(o+4>e.byteLength)return r(1);if(c[0]=e[o++],c[1]=e[o++],c[2]=e[o++],c[3]=e[o++],2!=c[0]||2!=c[1]||(c[2]<<8|c[3])!=t)return r(3,"bad rgbe scanline format");let a=0,m;for(;a<l&&o<e.byteLength;){let t=(m=e[o++])>128;if(t&&(m-=128),0===m||a+m>l)return r(3,"bad scanline data");if(t){let r=e[o++];for(let e=0;e<m;e++)s[a++]=r}else s.set(e.subarray(o,o+m),a),a+=m,o+=m}for(let e=0;e<t;e++){let r=0;i[n]=s[e+r],r+=t,i[n+1]=s[e+r],r+=t,i[n+2]=s[e+r],r+=t,i[n+3]=s[e+r],n+=4}d--}return i}(a.subarray(a.pos),e,t);if(-1!==n){let r,a,o;switch(this.type){case u.FloatType:o=n.length/4;let l=new Float32Array(4*o);for(let e=0;e<o;e++)!function(e,r,t,a){let i=Math.pow(2,e[r+3]-128)/255;t[a+0]=e[r+0]*i,t[a+1]=e[r+1]*i,t[a+2]=e[r+2]*i,t[a+3]=1}(n,4*e,l,4*e);r=l,a=u.FloatType;break;case u.HalfFloatType:o=n.length/4;let c=new Uint16Array(4*o);for(let e=0;e<o;e++)!function(e,r,t,a){let i=Math.pow(2,e[r+3]-128)/255;t[a+0]=(0,u.DataUtils).toHalfFloat(Math.min(e[r+0]*i,65504)),t[a+1]=(0,u.DataUtils).toHalfFloat(Math.min(e[r+1]*i,65504)),t[a+2]=(0,u.DataUtils).toHalfFloat(Math.min(e[r+2]*i,65504)),t[a+3]=(0,u.DataUtils).toHalfFloat(1)}(n,4*e,c,4*e);r=c,a=u.HalfFloatType;break;default:console.error("THREE.RGBELoader: unsupported type: ",this.type)}return{width:e,height:t,data:r,header:i.string,gamma:i.gamma,exposure:i.exposure,type:a}}}return null}setDataType(e){return this.type=e,this}load(e,r,t,a){return super.load(e,function(e,t){switch(e.type){case u.FloatType:case u.HalfFloatType:e.encoding=u.LinearEncoding,e.minFilter=u.LinearFilter,e.magFilter=u.LinearFilter,e.generateMipmaps=!1,e.flipY=!0}r&&r(e,t)},t,a)}}var y=function(){var e=0,r=document.createElement("div");function t(e){return r.appendChild(e.dom),e}function a(t){for(var a=0;a<r.children.length;a++)r.children[a].style.display=a===t?"block":"none";e=t}r.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",r.addEventListener("click",function(t){t.preventDefault(),a(++e%r.children.length)},!1);var i=(performance||Date).now(),n=i,o=0,l=t(new y.Panel("FPS","#0ff","#002")),c=t(new y.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var s=t(new y.Panel("MB","#f08","#201"));return a(0),{REVISION:16,dom:r,addPanel:t,showPanel:a,begin:function(){i=(performance||Date).now()},end:function(){o++;var e=(performance||Date).now();if(c.update(e-i,200),e>=n+1e3&&(l.update(1e3*o/(e-n),100),n=e,o=0,s)){var r=performance.memory;s.update(r.usedJSHeapSize/1048576,r.jsHeapSizeLimit/1048576)}return e},update:function(){i=this.end()},domElement:r,setMode:a}};y.Panel=function(e,r,t){var a=1/0,i=0,n=Math.round,o=n(window.devicePixelRatio||1),l=80*o,c=48*o,s=3*o,d=2*o,m=3*o,f=15*o,u=74*o,h=30*o,p=document.createElement("canvas");p.width=l,p.height=c,p.style.cssText="width:80px;height:48px";var v=p.getContext("2d");return v.font="bold "+9*o+"px Helvetica,Arial,sans-serif",v.textBaseline="top",v.fillStyle=t,v.fillRect(0,0,l,c),v.fillStyle=r,v.fillText(e,s,d),v.fillRect(m,f,u,h),v.fillStyle=t,v.globalAlpha=.9,v.fillRect(m,f,u,h),{dom:p,update:function(c,g){a=Math.min(a,c),i=Math.max(i,c),v.fillStyle=t,v.globalAlpha=1,v.fillRect(0,0,l,f),v.fillStyle=r,v.fillText(n(c)+" "+e+" ("+n(a)+"-"+n(i)+")",s,d),v.drawImage(p,m+o,f,u-o,h,m,f,u-o,h),v.fillRect(m+u-o,f,o,h),v.fillStyle=t,v.globalAlpha=.9,v.fillRect(m+u-o,f,o,n((1-c/g)*h))}}};var w=f("gcCUH"),b=f("ff8ed"),x=f("boAbX"),M=f("Mleu6");const D={color:"#ffffff",bounces:3,ior:2.4,aberrationStrength:.01,fastChroma:!1,animate:!0};!async function(){let s;e=new u.Scene,(r=new u.PerspectiveCamera(75,window.innerWidth/window.innerHeight,.1,1e3)).position.set(28,15,7),(t=new u.WebGLRenderer({antialias:!1})).setSize(window.innerWidth,window.innerHeight),t.outputEncoding=u.sRGBEncoding,t.toneMapping=u.ACESFilmicToneMapping,document.body.appendChild(t.domElement),i=new p.OrbitControls(r,t.domElement),c=new u.Clock;let d=new g().loadAsync("https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/equirectangular/venice_sunset_1k.hdr"),m=new(0,v.GLTFLoader)().loadAsync("https://raw.githubusercontent.com/gkjohnson/3d-demo-data/main/models/diamond/diamond.glb");[a,s]=await Promise.all([d,m]),a.mapping=u.EquirectangularReflectionMapping,a.generateMipmaps=!0,a.minFilter=u.LinearMipmapLinearFilter,a.magFilter=u.LinearFilter,e.background=a;let f=new u.ShaderMaterial({uniforms:{envMap:{value:a},bvh:{value:new x.MeshBVHUniformStruct},projectionMatrixInv:{value:r.projectionMatrixInverse},viewMatrixInv:{value:r.matrixWorld},resolution:{value:new u.Vector2},bounces:{value:3},ior:{value:2.4},color:{value:new u.Color(1,1,1)},fastChroma:{value:!1},aberrationStrength:{value:.01}},vertexShader:`
			varying vec3 vWorldPosition;
			varying vec3 vNormal;
			uniform mat4 viewMatrixInv;
			void main() {

				vWorldPosition = ( modelMatrix * vec4( position, 1.0 ) ).xyz;
				vNormal = ( viewMatrixInv * vec4( normalMatrix * normal, 0.0 ) ).xyz;
				gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position , 1.0 );

			}
		`,fragmentShader:`
			#define RAY_OFFSET 0.001

			#include <common>
			precision highp isampler2D;
			precision highp usampler2D;

			${w.common_functions}
			${w.bvh_struct_definitions}
			${w.bvh_ray_functions}

			varying vec3 vWorldPosition;
			varying vec3 vNormal;

			uniform sampler2D envMap;
			uniform float bounces;
			uniform BVH bvh;
			uniform float ior;
			uniform vec3 color;
			uniform bool fastChroma;
			uniform mat4 projectionMatrixInv;
			uniform mat4 viewMatrixInv;
			uniform mat4 modelMatrix;
			uniform vec2 resolution;
			uniform float aberrationStrength;

			#include <cube_uv_reflection_fragment>

			// performs an iterative bounce lookup modeling internal reflection and returns
			// a final ray direction.
			vec3 totalInternalReflection( vec3 incomingOrigin, vec3 incomingDirection, vec3 normal, float ior, mat4 modelMatrixInverse ) {

				vec3 rayOrigin = incomingOrigin;
				vec3 rayDirection = incomingDirection;

				// refract the ray direction on the way into the diamond and adjust offset from
				// the diamond surface for raytracing
				rayDirection = refract( rayDirection, normal, 1.0 / ior );
				rayOrigin = vWorldPosition + rayDirection * RAY_OFFSET;

				// transform the ray into the local coordinates of the model
				rayOrigin = ( modelMatrixInverse * vec4( rayOrigin, 1.0 ) ).xyz;
				rayDirection = normalize( ( modelMatrixInverse * vec4( rayDirection, 0.0 ) ).xyz );

				// perform multiple ray casts
				for( float i = 0.0; i < bounces; i ++ ) {

					// results
					uvec4 faceIndices = uvec4( 0u );
					vec3 faceNormal = vec3( 0.0, 0.0, 1.0 );
					vec3 barycoord = vec3( 0.0 );
					float side = 1.0;
					float dist = 0.0;

					// perform the raycast
					// the diamond is a water tight model so we assume we always hit a surface
					bvhIntersectFirstHit( bvh, rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist );

					// derive the new ray origin from the hit results
					vec3 hitPos = rayOrigin + rayDirection * dist;

					// if we don't internally reflect then end the ray tracing and sample
					vec3 refractedDirection = refract( rayDirection, faceNormal, ior );
					bool totalInternalReflection = length( refract( rayDirection, faceNormal, ior ) ) == 0.0;
					if ( ! totalInternalReflection ) {

						rayDirection = refractedDirection;
						break;

					}

					// otherwise reflect off the surface internally for another hit
					rayDirection = reflect( rayDirection, faceNormal );
					rayOrigin = hitPos + rayDirection * RAY_OFFSET;

				}

				// return the final ray direction in world space
				return normalize( ( modelMatrix * vec4( rayDirection, 0.0 ) ).xyz );
			}

			vec4 envSample( sampler2D envMap, vec3 rayDirection ) {

				vec2 uvv = equirectUv( rayDirection );
				return texture( envMap, uvv );

			}

			void main() {

				mat4 modelMatrixInverse = inverse( modelMatrix );
				vec2 uv = gl_FragCoord.xy / resolution;

				vec3 normal = vNormal;
				vec3 rayOrigin = cameraPosition;
				vec3 rayDirection = normalize( vWorldPosition - cameraPosition );

				if ( aberrationStrength != 0.0 ) {

					// perform chromatic aberration lookups
					vec3 rayDirectionG = totalInternalReflection( rayOrigin, rayDirection, normal, max( ior, 1.0 ), modelMatrixInverse );
					vec3 rayDirectionR, rayDirectionB;

					if ( fastChroma ) {

						// fast chroma does a quick uv offset on lookup
						rayDirectionR = normalize( rayDirectionG + 1.0 * vec3( aberrationStrength / 2.0 ) );
						rayDirectionB = normalize( rayDirectionG - 1.0 * vec3( aberrationStrength / 2.0 ) );

					} else {

						// compared to a proper ray trace of diffracted rays
						float iorR = max( ior * ( 1.0 - aberrationStrength ), 1.0 );
						float iorB = max( ior * ( 1.0 + aberrationStrength ), 1.0 );
						rayDirectionR = totalInternalReflection(
							rayOrigin, rayDirection, normal,
							iorR, modelMatrixInverse
						);
						rayDirectionB = totalInternalReflection(
							rayOrigin, rayDirection, normal,
							iorB, modelMatrixInverse
						);

					}

					// get the color lookup
					float r = envSample( envMap, rayDirectionR ).r;
					float g = envSample( envMap, rayDirectionG ).g;
					float b = envSample( envMap, rayDirectionB ).b;
					gl_FragColor.rgb = vec3( r, g, b ) * color;
					gl_FragColor.a = 1.0;

				} else {

					// no chromatic aberration lookups
					rayDirection = totalInternalReflection( rayOrigin, rayDirection, normal, max( ior, 1.0 ), modelMatrixInverse );
					gl_FragColor.rgb = envSample( envMap, rayDirection ).rgb * color;
					gl_FragColor.a = 1.0;

				}

				#include <tonemapping_fragment>
				#include <encodings_fragment>

			}
		`}),R=s.scene.children[0].children[0].children[0].children[0].children[0].geometry;R.scale(10,10,10);let S=new b.MeshBVH(R,{strategy:M.SAH,maxLeafTris:1});f.uniforms.bvh.value.updateFrom(S),n=new u.Mesh(R,f),e.add(n),(o=new h.GUI).add(D,"animate"),o.addColor(D,"color").name("Color").onChange(e=>{n.material.uniforms.color.value.set(e)}),o.add(D,"bounces",1,10,1).name("Bounces").onChange(e=>{n.material.uniforms.bounces.value=e}),o.add(D,"ior",1,5,.01).name("IOR").onChange(e=>{n.material.uniforms.ior.value=e}),o.add(D,"fastChroma").onChange(e=>{n.material.uniforms.fastChroma.value=e}),o.add(D,"aberrationStrength",0,.1,1e-4).onChange(e=>{n.material.uniforms.aberrationStrength.value=e}),(l=new y).showPanel(0),document.body.appendChild(l.dom),function a(){D.animate&&(n.rotation.y+=.25*c.getDelta()),l.update(),i.update(),t.render(e,r),requestAnimationFrame(a)}(),window.addEventListener("resize",function(){r.aspect=window.innerWidth/window.innerHeight,r.updateProjectionMatrix(),n.material.uniforms.resolution.value.set(window.innerWidth,window.innerHeight),t.setSize(window.innerWidth,window.innerHeight)},!1)}();
//# sourceMappingURL=diamond.7afaf405.js.map
