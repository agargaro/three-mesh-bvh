import{C as Me,W as be,S as ve,D as Se,A as Te,P as Ce,aj as Ee,G as Ie,M as F,T as Ae,d as He,aD as Le,c as ee,aE as We,m as Re,aF as Be,aG as te,aH as ne,u as $,af as oe,w as Oe,j as fe,V as z,z as Pe,L as ue,n as De}from"./ExtendedTriangle-Chm2bbkR.js";import{S as Ne}from"./stats.min-GTpOrGrX.js";import{g as ze}from"./lil-gui.module.min-Bc0DeA9g.js";import{O as Ue}from"./OrbitControls-lzJCl7xY.js";import{M as Fe,I as X,N as se,a as Xe}from"./MeshBVH-CPVAl5W3.js";import{M as Ve}from"./MeshBVHHelper-jLfel8l5.js";import"./_commonjsHelpers-Cpj98o6Y.js";const d={toolMode:"lasso",selectionMode:"intersection",liveUpdate:!1,selectModel:!1,wireframe:!1,useBoundsTree:!0,displayHelper:!1,helperDepth:10,rotate:!0};let A,C,W,V,Q,R,T,b,N,H,O,pe,B;const n=[];let Z=!1,_=!1,D=!1;Ge();ye();function Ge(){pe=document.getElementById("output");const s=new Me(2503224);A=new be({antialias:!0}),A.setPixelRatio(window.devicePixelRatio),A.setSize(window.innerWidth,window.innerHeight),A.setClearColor(s,1),A.shadowMap.enabled=!0,document.body.appendChild(A.domElement),W=new ve;const l=new Se(16777215,3);l.castShadow=!0,l.shadow.mapSize.set(2048,2048),l.position.set(10,10,10),W.add(l),W.add(new Te(11583173,2.5)),C=new Ce(75,window.innerWidth/window.innerHeight,.1,50),C.position.set(2,4,6),C.far=100,C.updateProjectionMatrix(),W.add(C),T=new Ee,T.material.color.set(16750592),T.renderOrder=1,T.position.z=-.2,T.depthTest=!1,T.scale.setScalar(1),C.add(T),B=new Ie,W.add(B),b=new F(new Ae(1.5,.5,500,60).toNonIndexed(),new He({polygonOffset:!0,polygonOffsetFactor:1})),b.geometry.boundsTree=new Fe(b.geometry),b.geometry.setAttribute("color",new Le(new Array(b.geometry.index.count*3).fill(255),3,!0)),b.castShadow=!0,b.receiveShadow=!0,B.add(b),N=new Ve(b,10),B.add(N),H=new F,H.geometry=b.geometry.clone(),H.geometry.drawRange.count=0,H.material=new ee({opacity:.05,transparent:!0,depthWrite:!1}),H.material.color.set(16750592),H.renderOrder=1,B.add(H),O=new F,O.geometry=H.geometry,O.material=new ee({opacity:.25,transparent:!0,wireframe:!0,depthWrite:!1}),O.material.color.copy(H.material.color),O.renderOrder=2,B.add(O);const g=new We(10,10,16777215,16777215);g.material.opacity=.2,g.material.transparent=!0,g.position.y=-2.75,W.add(g);const h=new F(new Re,new Be({color:0,opacity:.2,depthWrite:!1}));h.position.y=-2.74,h.rotation.x=-Math.PI/2,h.scale.setScalar(20),h.renderOrder=2,h.receiveShadow=!0,W.add(h),Q=new Ne,document.body.appendChild(Q.dom),R=new Ue(C,A.domElement),R.minDistance=3,R.touches.ONE=te.PAN,R.mouseButtons.LEFT=ne.PAN,R.touches.TWO=te.ROTATE,R.mouseButtons.RIGHT=ne.ROTATE,R.enablePan=!1,V=new ze;const u=V.addFolder("selection");u.add(d,"toolMode",["lasso","box"]),u.add(d,"selectionMode",["centroid","centroid-visible","intersection"]),u.add(d,"selectModel"),u.add(d,"liveUpdate"),u.add(d,"useBoundsTree"),u.open();const e=V.addFolder("display");e.add(d,"wireframe"),e.add(d,"rotate"),e.add(d,"displayHelper"),e.add(d,"helperDepth",1,30,1).onChange(f=>{N.depth=f,N.update()}),e.open(),V.open();let r=-1/0,o=-1/0,i=-1/0,c=-1/0;const t=new $,a=new $,p=new $;A.domElement.addEventListener("pointerdown",f=>{i=f.clientX,c=f.clientY,r=f.clientX/window.innerWidth*2-1,o=-(f.clientY/window.innerHeight*2-1),n.length=0,Z=!0}),A.domElement.addEventListener("pointerup",()=>{T.visible=!1,Z=!1,n.length&&(D=!0)}),A.domElement.addEventListener("pointermove",f=>{if(!(1&f.buttons))return;const v=f.clientX,M=f.clientY,y=f.clientX/window.innerWidth*2-1,x=-(f.clientY/window.innerHeight*2-1);if(d.toolMode==="box")n.length=3*5,n[0]=r,n[1]=o,n[2]=0,n[3]=y,n[4]=o,n[5]=0,n[6]=y,n[7]=x,n[8]=0,n[9]=r,n[10]=x,n[11]=0,n[12]=r,n[13]=o,n[14]=0,(v!==i||M!==c)&&(_=!0),i=v,c=M,T.visible=!0,d.liveUpdate&&(D=!0);else if(Math.abs(v-i)>=3||Math.abs(M-c)>=3){const E=(n.length/3-1)*3;let w=!1;n.length>3&&(t.set(n[E-3],n[E-3+1]),a.set(n[E],n[E+1]),a.sub(t).normalize(),t.set(n[E],n[E+1]),p.set(y,x),p.sub(t).normalize(),w=a.dot(p)>.99),w?(n[E]=y,n[E+1]=x):n.push(y,x,0),_=!0,T.visible=!0,i=v,c=M,d.liveUpdate&&(D=!0)}}),window.addEventListener("resize",function(){C.aspect=window.innerWidth/window.innerHeight,C.updateProjectionMatrix(),A.setSize(window.innerWidth,window.innerHeight)},!1)}function ye(){if(Q.update(),requestAnimationFrame(ye),b.material.wireframe=d.wireframe,N.visible=d.displayHelper,_){if(d.toolMode==="lasso"){const l=n.length;n.push(n[0],n[1],n[2]),T.geometry.setAttribute("position",new oe(n,3,!1)),n.length=l}else T.geometry.setAttribute("position",new oe(n,3,!1));T.frustumCulled=!1,_=!1}D&&(D=!1,n.length>0&&Ye());const s=Math.tan(Oe.DEG2RAD*C.fov/2)*T.position.z;T.scale.set(-s*C.aspect,-s,1),A.render(W,C),d.rotate&&(B.rotation.y+=.01,d.liveUpdate&&Z&&(D=!0))}const re=new fe,ie=new z,J=new Pe,G=new z,ae=new z,le=new z,Y=new fe,ce=new Array(8).fill().map(()=>new z),j=new Array(12).fill().map(()=>new ue),P=[],k=[];function Ye(){for(Y.copy(b.matrixWorld).premultiply(C.matrixWorldInverse).premultiply(C.projectionMatrix);P.length<n.length;)P.push(new ue);P.length=n.length;for(let e=0,r=n.length;e<r;e+=3){const o=P[e],i=(e+3)%r;o.start.x=n[e],o.start.y=n[e+1],o.end.x=n[i],o.end.y=n[i+1]}re.copy(b.matrixWorld).invert(),ie.set(0,0,0).applyMatrix4(C.matrixWorld).applyMatrix4(re);const s=window.performance.now(),l=[];b.geometry.boundsTree.shapecast({intersectsBounds:(e,r,o,i)=>{if(!d.useBoundsTree)return X;const{min:c,max:t}=e;let a=0,p=1/0,f=-1/0,v=1/0;for(let w=0;w<=1;w++)for(let I=0;I<=1;I++)for(let S=0;S<=1;S++){const m=ce[a];m.x=w===0?c.x:t.x,m.y=I===0?c.y:t.y,m.z=S===0?c.z:t.z,m.w=1,m.applyMatrix4(Y),a++,m.y<p&&(p=m.y),m.y>f&&(f=m.y),m.x<v&&(v=m.x)}const M=k[i-1]||P,y=k[i]||[];y.length=0,k[i]=y;for(let w=0,I=M.length;w<I;w++){const S=M[w],m=S.start.x,U=S.start.y,me=S.end.x,q=S.end.y;if(m<v&&me<v)continue;const he=U>f,we=q>f;if(he&&we)continue;const ge=U<p,xe=q<p;ge&&xe||y.push(S)}if(y.length===0)return se;const x=je(ce),L=x.map((w,I)=>{const S=x[(I+1)%x.length],m=j[I];return m.start.copy(w),m.end.copy(S),m});if(K(y[0].start,L)%2===1)return X;let E=0;for(let w=0,I=x.length;w<I;w++){const S=x[w],m=K(S,y);if(w===0&&(E=m),E!==m)return X}for(let w=0,I=L.length;w<I;w++){const S=L[w];for(let m=0,U=y.length;m<U;m++)if(de(S,y[m]))return X}return E%2===0?se:Xe},intersectsTriangle:(e,r,o,i)=>{const c=r*3,t=c+0,a=c+1,p=c+2,f=d.useBoundsTree?k[i]:P;if(d.selectionMode==="centroid"||d.selectionMode==="centroid-visible"){if(G.copy(e.a).add(e.b).add(e.c).multiplyScalar(1/3),ae.copy(G).applyMatrix4(Y),o||K(ae,f)%2===1)return d.selectionMode==="centroid-visible"&&(e.getNormal(le),J.origin.copy(G).addScaledVector(le,1e-6),J.direction.subVectors(ie,G),b.geometry.boundsTree.raycastFirst(J,De))?!1:(l.push(t,a,p),d.selectModel)}else if(d.selectionMode==="intersection"){if(o)return l.push(t,a,p),d.selectModel;const v=[e.a,e.b,e.c];for(let y=0;y<3;y++){const x=v[y];if(x.applyMatrix4(Y),K(x,f)%2===1)return l.push(t,a,p),d.selectModel}const M=[j[0],j[1],j[2]];M[0].start.copy(e.a),M[0].end.copy(e.b),M[1].start.copy(e.b),M[1].end.copy(e.c),M[2].start.copy(e.c),M[2].end.copy(e.a);for(let y=0;y<3;y++){const x=M[y];for(let L=0,E=f.length;L<E;L++)if(de(x,f[L]))return l.push(t,a,p),d.selectModel}}return!1}});const g=window.performance.now()-s;pe.innerText=`${g.toFixed(3)}ms`;const h=b.geometry.index,u=H.geometry.index;if(l.length&&d.selectModel){for(let e=0,r=h.count;e<r;e++){const o=h.getX(e);u.setX(e,o)}H.geometry.drawRange.count=1/0,u.needsUpdate=!0}else{for(let e=0,r=l.length;e<r;e++){const o=h.getX(l[e]);u.setX(e,o)}H.geometry.drawRange.count=l.length,u.needsUpdate=!0}}function je(s){function l(t,a,p){const f=(a.y-t.y)*(p.x-a.x)-(a.x-t.x)*(p.y-a.y);return f==0?0:f>0?1:2}function g(t,a){return(t.x-a.x)*(t.x-a.x)+(t.y-a.y)*(t.y-a.y)}function h(t,a){const p=l(r,t,a);return p==0?g(r,a)>=g(r,t)?-1:1:p==2?-1:1}let u=1/0,e=-1;for(let t=0,a=s.length;t<a;t++){const p=s[t];p.y<u&&(e=t,u=p.y)}const r=s[e];s[e]=s[0],s[0]=r,s=s.sort(h);let o=1;const i=s.length;for(let t=1;t<i;t++){for(;t<i-1&&l(r,s[t],s[t+1])==0;)t++;s[o]=s[t],o++}if(o<3)return null;const c=[s[0],s[1],s[2]];for(let t=3;t<o;t++){for(;l(c[c.length-2],c[c.length-1],s[t])!==2;)c.pop();c.push(s[t])}return c}function ke(s,l,g,h){const{start:u,end:e}=l,r=s.x,o=s.y,i=u.y,c=e.y;if(i===c||o>i&&o>c||o<i&&o<c)return!1;const t=u.x,a=e.x;if(r>t&&r>a)return!1;if(r<t&&r<a)return!(o===i&&g!==h);const p=a-t,v=c-i,M=-p,y=r-t,x=o-i,L=v*y+M*x;return Math.sign(L)!==Math.sign(v)}function K(s,l){let g=0;const h=l[l.length-1];let u=h.start.y>h.end.y;for(let e=0,r=l.length;e<r;e++){const o=l[e],i=o.start.y>o.end.y;ke(s,o,u,i)&&g++,u=i}return g}function de(s,l){function g(o,i,c){return(c.y-o.y)*(i.x-o.x)>(i.y-o.y)*(c.x-o.x)}const h=s.start,u=s.end,e=l.start,r=l.end;return g(h,e,r)!==g(u,e,r)&&g(h,u,e)!==g(h,u,r)}
