import{M as u,f as x,W as E,S as G,D as P,A as W,P as j,ai as v,d as z,c as A,R as L,b as V,V as m,aj as D}from"./ExtendedTriangle-Chm2bbkR.js";import{O as I}from"./OrbitControls-lzJCl7xY.js";import{M as F}from"./MeshBVHHelper-jLfel8l5.js";import{A as k}from"./MeshBVH-CPVAl5W3.js";import{a as q,c as _,d as J}from"./ExtensionUtilities-0qN33-Z7.js";u.prototype.raycast=q;x.prototype.computeBoundsTree=_;x.prototype.disposeBoundsTree=J;let r,i,n,p=[],s=null;function o(){if(s===null)throw new Error;const f=1103515245,a=12345,d=2e31;return s=(f*s+a)%d,s/d}K();M();function K(){r=new E({antialias:!0}),r.setPixelRatio(window.devicePixelRatio),r.setSize(window.innerWidth,window.innerHeight),r.setClearColor(1118481,1),r.outputEncoding=void 0,document.body.appendChild(r.domElement),n=new G;const a=new P(16777215,1);a.position.set(1,1,1),n.add(a),n.add(new W(11583173,.8)),i=new j(75,window.innerWidth/window.innerHeight,.1,50),i.position.set(0,0,4),i.far=100,i.updateProjectionMatrix(),new I(i,r.domElement);const d=7830035629,T=4697211981,B={strategy:k,packData:!1,maxDepth:1},l=new v(1,1,40,10);l.computeBoundsTree(B),s=d,o();for(var w=0;w<10;w++){let e=new u(l,new z);if(e.rotation.x=o()*10,e.rotation.y=o()*10,e.rotation.z=o()*10,e.position.x=o(),e.position.y=o(),e.position.z=o(),w===2){p.push(e),n.add(e);const S=e.clone();S.material=new A({wireframe:!0,color:16737894}),n.add(S);const C=new F(e,10);n.add(C)}e.updateMatrix(!0),e.updateMatrixWorld(!0)}s=T,o();const t=new L;t.firstHitOnly=!1,t.ray.origin.set(o()*10,o()*10,o()*10),t.ray.direction.copy(t.ray.origin).multiplyScalar(-1).normalize();const O=new V(.1),c=new u(O);c.position.copy(t.ray.at(0,new m)),n.add(c);const h=t.intersectObjects(p,!0);t.firstHitOnly=!0;const y=t.intersectObjects(p,!0);l.boundsTree=null;const R=t.intersectObjects(p,!0);console.log("FIRST HIT",y),console.log("BVH HITS",h),console.log("OG HITS",R);const g=c.clone();g.position.copy(y[0].point),n.add(g);const H=c.clone();H.position.copy(h[0].point),n.add(H);const b=new D;b.geometry.setFromPoints([t.ray.at(0,new m),t.ray.at(20,new m)]),n.add(b),window.addEventListener("resize",function(){i.aspect=window.innerWidth/window.innerHeight,i.updateProjectionMatrix(),r.setSize(window.innerWidth,window.innerHeight)},!1)}function M(){requestAnimationFrame(M),r.render(n,i)}
