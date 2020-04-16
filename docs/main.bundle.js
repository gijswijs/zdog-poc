!function(t){var e={};function r(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(n,i,function(e){return t[e]}.bind(null,i));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=13)}([function(t,e,r){
/*!
 * Zdog v1.1.2
 * Round, flat, designer-friendly pseudo-3D engine
 * Licensed MIT
 * https://zzz.dog
 * Copyright 2020 Metafizzy
 */var n,i;n=this,i=function(){var t={};t.TAU=2*Math.PI,t.extend=function(t,e){for(var r in e)t[r]=e[r];return t},t.lerp=function(t,e,r){return(e-t)*r+t},t.modulo=function(t,e){return(t%e+e)%e};var e={2:function(t){return t*t},3:function(t){return t*t*t},4:function(t){return t*t*t*t},5:function(t){return t*t*t*t*t}};return t.easeInOut=function(t,r){if(1==r)return t;var n=(t=Math.max(0,Math.min(1,t)))<.5,i=n?t:1-t,o=(e[r]||e[2])(i/=.5);return o/=2,n?o:1-o},t},t.exports?t.exports=i():n.Zdog=i()},function(t,e,r){!function(e,n){if(t.exports)t.exports=n(r(0),r(3),r(7),r(8));else{var i=e.Zdog;i.Anchor=n(i,i.Vector,i.CanvasRenderer,i.SvgRenderer)}}(this,(function(t,e,r,n){var i=t.TAU,o={x:1,y:1,z:1};function s(t){this.create(t||{})}return s.prototype.create=function(r){this.children=[],t.extend(this,this.constructor.defaults),this.setOptions(r),this.translate=new e(r.translate),this.rotate=new e(r.rotate),this.scale=new e(o).multiply(this.scale),this.origin=new e,this.renderOrigin=new e,this.addTo&&this.addTo.addChild(this)},s.defaults={},s.optionKeys=Object.keys(s.defaults).concat(["rotate","translate","scale","addTo"]),s.prototype.setOptions=function(t){var e=this.constructor.optionKeys;for(var r in t)-1!=e.indexOf(r)&&(this[r]=t[r])},s.prototype.addChild=function(t){-1==this.children.indexOf(t)&&(t.remove(),t.addTo=this,this.children.push(t))},s.prototype.removeChild=function(t){var e=this.children.indexOf(t);-1!=e&&this.children.splice(e,1)},s.prototype.remove=function(){this.addTo&&this.addTo.removeChild(this)},s.prototype.update=function(){this.reset(),this.children.forEach((function(t){t.update()})),this.transform(this.translate,this.rotate,this.scale)},s.prototype.reset=function(){this.renderOrigin.set(this.origin)},s.prototype.transform=function(t,e,r){this.renderOrigin.transform(t,e,r),this.children.forEach((function(n){n.transform(t,e,r)}))},s.prototype.updateGraph=function(){this.update(),this.updateFlatGraph(),this.flatGraph.forEach((function(t){t.updateSortValue()})),this.flatGraph.sort(s.shapeSorter)},s.shapeSorter=function(t,e){return t.sortValue-e.sortValue},Object.defineProperty(s.prototype,"flatGraph",{get:function(){return this._flatGraph||this.updateFlatGraph(),this._flatGraph},set:function(t){this._flatGraph=t}}),s.prototype.updateFlatGraph=function(){this.flatGraph=this.getFlatGraph()},s.prototype.getFlatGraph=function(){var t=[this];return this.addChildFlatGraph(t)},s.prototype.addChildFlatGraph=function(t){return this.children.forEach((function(e){var r=e.getFlatGraph();Array.prototype.push.apply(t,r)})),t},s.prototype.updateSortValue=function(){this.sortValue=this.renderOrigin.z},s.prototype.render=function(){},s.prototype.renderGraphCanvas=function(t){if(!t)throw new Error("ctx is "+t+". Canvas context required for render. Check .renderGraphCanvas( ctx ).");this.flatGraph.forEach((function(e){e.render(t,r)}))},s.prototype.renderGraphSvg=function(t){if(!t)throw new Error("svg is "+t+". SVG required for render. Check .renderGraphSvg( svg ).");this.flatGraph.forEach((function(e){e.render(t,n)}))},s.prototype.copy=function(e){var r={};return this.constructor.optionKeys.forEach((function(t){r[t]=this[t]}),this),t.extend(r,e),new(0,this.constructor)(r)},s.prototype.copyGraph=function(t){var e=this.copy(t);return this.children.forEach((function(t){t.copyGraph({addTo:e})})),e},s.prototype.normalizeRotate=function(){this.rotate.x=t.modulo(this.rotate.x,i),this.rotate.y=t.modulo(this.rotate.y,i),this.rotate.z=t.modulo(this.rotate.z,i)},s.subclass=function e(r){return function(n){function i(t){this.create(t||{})}return i.prototype=Object.create(r.prototype),i.prototype.constructor=i,i.defaults=t.extend({},r.defaults),t.extend(i.defaults,n),i.optionKeys=r.optionKeys.slice(0),Object.keys(i.defaults).forEach((function(t){1!=!i.optionKeys.indexOf(t)&&i.optionKeys.push(t)})),i.subclass=e(i),i}}(s),s}))},function(t,e,r){!function(e,n){if(t.exports)t.exports=n(r(0),r(3),r(5),r(1));else{var i=e.Zdog;i.Shape=n(i,i.Vector,i.PathCommand,i.Anchor)}}(this,(function(t,e,r,n){var i=n.subclass({stroke:1,fill:!1,color:"#333",closed:!0,visible:!0,path:[{}],front:{z:1},backface:!0});i.prototype.create=function(t){n.prototype.create.call(this,t),this.updatePath(),this.front=new e(t.front||this.front),this.renderFront=new e(this.front),this.renderNormal=new e};var o=["move","line","bezier","arc"];i.prototype.updatePath=function(){this.setPath(),this.updatePathCommands()},i.prototype.setPath=function(){},i.prototype.updatePathCommands=function(){var t;this.pathCommands=this.path.map((function(e,n){var i=Object.keys(e),s=i[0],a=e[s];1==i.length&&-1!=o.indexOf(s)||(s="line",a=e);var h="line"==s||"move"==s,c=Array.isArray(a);h&&!c&&(a=[a]);var p=new r(s=0===n?"move":s,a,t);return t=p.endRenderPoint,p}))},i.prototype.reset=function(){this.renderOrigin.set(this.origin),this.renderFront.set(this.front),this.pathCommands.forEach((function(t){t.reset()}))},i.prototype.transform=function(t,e,r){this.renderOrigin.transform(t,e,r),this.renderFront.transform(t,e,r),this.renderNormal.set(this.renderOrigin).subtract(this.renderFront),this.pathCommands.forEach((function(n){n.transform(t,e,r)})),this.children.forEach((function(n){n.transform(t,e,r)}))},i.prototype.updateSortValue=function(){var t=this.pathCommands.length,e=this.pathCommands[0].endRenderPoint,r=this.pathCommands[t-1].endRenderPoint;t>2&&e.isSame(r)&&(t-=1);for(var n=0,i=0;i<t;i++)n+=this.pathCommands[i].endRenderPoint.z;this.sortValue=n/t},i.prototype.render=function(t,e){var r=this.pathCommands.length;if(this.visible&&r&&(this.isFacingBack=this.renderNormal.z>0,this.backface||!this.isFacingBack)){if(!e)throw new Error("Zdog renderer required. Set to "+e);var n=1==r;e.isCanvas&&n?this.renderCanvasDot(t,e):this.renderPath(t,e)}};var s=t.TAU;i.prototype.renderCanvasDot=function(t){var e=this.getLineWidth();if(e){t.fillStyle=this.getRenderColor();var r=this.pathCommands[0].endRenderPoint;t.beginPath();var n=e/2;t.arc(r.x,r.y,n,0,s),t.fill()}},i.prototype.getLineWidth=function(){return this.stroke?1==this.stroke?1:this.stroke:0},i.prototype.getRenderColor=function(){return"string"==typeof this.backface&&this.isFacingBack?this.backface:this.color},i.prototype.renderPath=function(t,e){var r=this.getRenderElement(t,e),n=!(2==this.pathCommands.length&&"line"==this.pathCommands[1].method)&&this.closed,i=this.getRenderColor();e.renderPath(t,r,this.pathCommands,n),e.stroke(t,r,this.stroke,i,this.getLineWidth()),e.fill(t,r,this.fill,i),e.end(t,r)};return i.prototype.getRenderElement=function(t,e){if(e.isSvg)return this.svgElement||(this.svgElement=document.createElementNS("http://www.w3.org/2000/svg","path"),this.svgElement.setAttribute("stroke-linecap","round"),this.svgElement.setAttribute("stroke-linejoin","round")),this.svgElement},i}))},function(t,e,r){!function(e,n){if(t.exports)t.exports=n(r(0));else{var i=e.Zdog;i.Vector=n(i)}}(this,(function(t){function e(t){this.set(t)}var r=t.TAU;function n(t,e,n,i){if(e&&e%r!=0){var o=Math.cos(e),s=Math.sin(e),a=t[n],h=t[i];t[n]=a*o-h*s,t[i]=h*o+a*s}}function i(t){return Math.abs(t-1)<1e-8?1:Math.sqrt(t)}return e.prototype.set=function(t){return this.x=t&&t.x||0,this.y=t&&t.y||0,this.z=t&&t.z||0,this},e.prototype.write=function(t){return t?(this.x=null!=t.x?t.x:this.x,this.y=null!=t.y?t.y:this.y,this.z=null!=t.z?t.z:this.z,this):this},e.prototype.rotate=function(t){if(t)return this.rotateZ(t.z),this.rotateY(t.y),this.rotateX(t.x),this},e.prototype.rotateZ=function(t){n(this,t,"x","y")},e.prototype.rotateX=function(t){n(this,t,"y","z")},e.prototype.rotateY=function(t){n(this,t,"x","z")},e.prototype.isSame=function(t){return!!t&&(this.x===t.x&&this.y===t.y&&this.z===t.z)},e.prototype.add=function(t){return t?(this.x+=t.x||0,this.y+=t.y||0,this.z+=t.z||0,this):this},e.prototype.subtract=function(t){return t?(this.x-=t.x||0,this.y-=t.y||0,this.z-=t.z||0,this):this},e.prototype.multiply=function(t){return null==t||("number"==typeof t?(this.x*=t,this.y*=t,this.z*=t):(this.x*=null!=t.x?t.x:1,this.y*=null!=t.y?t.y:1,this.z*=null!=t.z?t.z:1)),this},e.prototype.transform=function(t,e,r){return this.multiply(r),this.rotate(e),this.add(t),this},e.prototype.lerp=function(e,r){return this.x=t.lerp(this.x,e.x||0,r),this.y=t.lerp(this.y,e.y||0,r),this.z=t.lerp(this.z,e.z||0,r),this},e.prototype.magnitude=function(){return i(this.x*this.x+this.y*this.y+this.z*this.z)},e.prototype.magnitude2d=function(){return i(this.x*this.x+this.y*this.y)},e.prototype.copy=function(){return new e(this)},e}))},function(t,e,r){var n,i,o,s,a,h,c,p,u,d,l,f,y,g,v,m,x,b,w,S,_,E;s=this,t.exports?t.exports=(a=r(0),h=r(7),c=r(8),p=r(3),u=r(1),d=r(9),l=r(14),f=r(5),y=r(2),g=r(10),v=r(11),m=r(15),x=r(6),b=r(16),w=r(17),S=r(18),_=r(19),E=r(20),a.CanvasRenderer=h,a.SvgRenderer=c,a.Vector=p,a.Anchor=u,a.Dragger=d,a.Illustration=l,a.PathCommand=f,a.Shape=y,a.Group=g,a.Rect=v,a.RoundedRect=m,a.Ellipse=x,a.Polygon=b,a.Hemisphere=w,a.Cylinder=S,a.Cone=_,a.Box=E,a):(i=[],n=s.Zdog,void 0===(o="function"==typeof n?n.apply(e,i):n)||(t.exports=o))},function(t,e,r){!function(e,n){if(t.exports)t.exports=n(r(3));else{var i=e.Zdog;i.PathCommand=n(i.Vector)}}(this,(function(t){function e(e,i,o){this.method=e,this.points=i.map(r),this.renderPoints=i.map(n),this.previousPoint=o,this.endRenderPoint=this.renderPoints[this.renderPoints.length-1],"arc"==e&&(this.controlPoints=[new t,new t])}function r(e){return e instanceof t?e:new t(e)}function n(e){return new t(e)}e.prototype.reset=function(){var t=this.points;this.renderPoints.forEach((function(e,r){var n=t[r];e.set(n)}))},e.prototype.transform=function(t,e,r){this.renderPoints.forEach((function(n){n.transform(t,e,r)}))},e.prototype.render=function(t,e,r){return this[this.method](t,e,r)},e.prototype.move=function(t,e,r){return r.move(t,e,this.renderPoints[0])},e.prototype.line=function(t,e,r){return r.line(t,e,this.renderPoints[0])},e.prototype.bezier=function(t,e,r){var n=this.renderPoints[0],i=this.renderPoints[1],o=this.renderPoints[2];return r.bezier(t,e,n,i,o)};return e.prototype.arc=function(t,e,r){var n=this.previousPoint,i=this.renderPoints[0],o=this.renderPoints[1],s=this.controlPoints[0],a=this.controlPoints[1];return s.set(n).lerp(i,9/16),a.set(o).lerp(i,9/16),r.bezier(t,e,s,a,o)},e}))},function(t,e,r){!function(e,n){if(t.exports)t.exports=n(r(2));else{var i=e.Zdog;i.Ellipse=n(i.Shape)}}(this,(function(t){var e=t.subclass({diameter:1,width:void 0,height:void 0,quarters:4,closed:!1});return e.prototype.setPath=function(){var t=(null!=this.width?this.width:this.diameter)/2,e=(null!=this.height?this.height:this.diameter)/2;this.path=[{x:0,y:-e},{arc:[{x:t,y:-e},{x:t,y:0}]}],this.quarters>1&&this.path.push({arc:[{x:t,y:e},{x:0,y:e}]}),this.quarters>2&&this.path.push({arc:[{x:-t,y:e},{x:-t,y:0}]}),this.quarters>3&&this.path.push({arc:[{x:-t,y:-e},{x:0,y:-e}]})},e}))},function(t,e,r){var n,i;n=this,i=function(){var t={isCanvas:!0,begin:function(t){t.beginPath()},move:function(t,e,r){t.moveTo(r.x,r.y)},line:function(t,e,r){t.lineTo(r.x,r.y)},bezier:function(t,e,r,n,i){t.bezierCurveTo(r.x,r.y,n.x,n.y,i.x,i.y)},closePath:function(t){t.closePath()},setPath:function(){},renderPath:function(e,r,n,i){this.begin(e,r),n.forEach((function(n){n.render(e,r,t)})),i&&this.closePath(e,r)},stroke:function(t,e,r,n,i){r&&(t.strokeStyle=n,t.lineWidth=i,t.stroke())},fill:function(t,e,r,n){r&&(t.fillStyle=n,t.fill())},end:function(){}};return t},t.exports?t.exports=i():n.Zdog.CanvasRenderer=i()},function(t,e,r){var n,i;n=this,i=function(){var t={isSvg:!0},e=t.round=function(t){return Math.round(1e3*t)/1e3};function r(t){return e(t.x)+","+e(t.y)+" "}return t.begin=function(){},t.move=function(t,e,n){return"M"+r(n)},t.line=function(t,e,n){return"L"+r(n)},t.bezier=function(t,e,n,i,o){return"C"+r(n)+r(i)+r(o)},t.closePath=function(){return"Z"},t.setPath=function(t,e,r){e.setAttribute("d",r)},t.renderPath=function(e,r,n,i){var o="";n.forEach((function(n){o+=n.render(e,r,t)})),i&&(o+=this.closePath(e,r)),this.setPath(e,r,o)},t.stroke=function(t,e,r,n,i){r&&(e.setAttribute("stroke",n),e.setAttribute("stroke-width",i))},t.fill=function(t,e,r,n){var i=r?n:"none";e.setAttribute("fill",i)},t.end=function(t,e){t.appendChild(e)},t},t.exports?t.exports=i():n.Zdog.SvgRenderer=i()},function(t,e,r){var n,i;n=this,i=function(){var t="undefined"!=typeof window,e="mousedown",r="mousemove",n="mouseup";function i(){}function o(t){this.create(t||{})}return t&&(window.PointerEvent?(e="pointerdown",r="pointermove",n="pointerup"):"ontouchstart"in window&&(e="touchstart",r="touchmove",n="touchend")),o.prototype.create=function(t){this.onDragStart=t.onDragStart||i,this.onDragMove=t.onDragMove||i,this.onDragEnd=t.onDragEnd||i,this.bindDrag(t.startElement)},o.prototype.bindDrag=function(t){(t=this.getQueryElement(t))&&(t.style.touchAction="none",t.addEventListener(e,this))},o.prototype.getQueryElement=function(t){return"string"==typeof t&&(t=document.querySelector(t)),t},o.prototype.handleEvent=function(t){var e=this["on"+t.type];e&&e.call(this,t)},o.prototype.onmousedown=o.prototype.onpointerdown=function(t){this.dragStart(t,t)},o.prototype.ontouchstart=function(t){this.dragStart(t,t.changedTouches[0])},o.prototype.dragStart=function(e,i){e.preventDefault(),this.dragStartX=i.pageX,this.dragStartY=i.pageY,t&&(window.addEventListener(r,this),window.addEventListener(n,this)),this.onDragStart(i)},o.prototype.ontouchmove=function(t){this.dragMove(t,t.changedTouches[0])},o.prototype.onmousemove=o.prototype.onpointermove=function(t){this.dragMove(t,t)},o.prototype.dragMove=function(t,e){t.preventDefault();var r=e.pageX-this.dragStartX,n=e.pageY-this.dragStartY;this.onDragMove(e,r,n)},o.prototype.onmouseup=o.prototype.onpointerup=o.prototype.ontouchend=o.prototype.dragEnd=function(){window.removeEventListener(r,this),window.removeEventListener(n,this),this.onDragEnd()},o},t.exports?t.exports=i():n.Zdog.Dragger=i()},function(t,e,r){!function(e,n){if(t.exports)t.exports=n(r(1));else{var i=e.Zdog;i.Group=n(i.Anchor)}}(this,(function(t){var e=t.subclass({updateSort:!1,visible:!0});return e.prototype.updateSortValue=function(){var e=0;this.flatGraph.forEach((function(t){t.updateSortValue(),e+=t.sortValue})),this.sortValue=e/this.flatGraph.length,this.updateSort&&this.flatGraph.sort(t.shapeSorter)},e.prototype.render=function(t,e){this.visible&&this.flatGraph.forEach((function(r){r.render(t,e)}))},e.prototype.updateFlatGraph=function(){this.flatGraph=this.addChildFlatGraph([])},e.prototype.getFlatGraph=function(){return[this]},e}))},function(t,e,r){!function(e,n){if(t.exports)t.exports=n(r(2));else{var i=e.Zdog;i.Rect=n(i.Shape)}}(this,(function(t){var e=t.subclass({width:1,height:1});return e.prototype.setPath=function(){var t=this.width/2,e=this.height/2;this.path=[{x:-t,y:-e},{x:t,y:-e},{x:t,y:e},{x:-t,y:e}]},e}))},function(t,e,r){"use strict";r(21);e.a=()=>{const t=document.createElement("canvas");return t.className="zdog-canvas",t.setAttribute("width","700"),t.setAttribute("height","600"),t}},function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var zdog_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(4),zdog_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(zdog_js__WEBPACK_IMPORTED_MODULE_0__),_component__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(12);document.body.appendChild(Object(_component__WEBPACK_IMPORTED_MODULE_1__.a)());let illo=new zdog_js__WEBPACK_IMPORTED_MODULE_0___default.a.Illustration({element:".zdog-canvas",dragRotate:!0,rotate:{y:-.3,x:-.5}}),spool1=new zdog_js__WEBPACK_IMPORTED_MODULE_0___default.a.Anchor({addTo:illo}),spool2=spool1.copy({translate:{x:208}}),spool0=spool1.copy({translate:{x:-208}}),disks=new Array(4).fill(0),stackHeight=disks.length,colors=["#A57548","#BA1200","#F45866","#82DDF0","#5296A5","#C45AB3"],diameter=150,topDiameter=50,height=300,relativeDiff=.3,bottomStroke=height/stackHeight*(1+relativeDiff),topStroke=height/stackHeight*(1-relativeDiff),strokeStep=(bottomStroke-topStroke)/(stackHeight-1),diameterStep=(diameter-topDiameter)/(stackHeight-1),diskObjects=[],stroke=bottomStroke,bottomTranslate=200;for(let t=0;t<stackHeight;t++){let e=bottomTranslate-t*bottomStroke+(t*(t+1)/2-t)*strokeStep-.5*stroke;diskObjects.unshift(new zdog_js__WEBPACK_IMPORTED_MODULE_0___default.a.Ellipse({addTo:spool0,diameter:diameter,stroke:stroke,color:colors[t%colors.length],rotate:{x:zdog_js__WEBPACK_IMPORTED_MODULE_0___default.a.TAU/4},translate:{y:e}})),stroke-=strokeStep,diameter-=diameterStep}illo.updateRenderGraph();let steps=0,stepTimer=500;function animate(){illo.updateRenderGraph(),requestAnimationFrame(animate)}function hanoi(t,e,r){if(t.indexOf(t[e])<e){let n=e-t.slice(0,e).reverse().indexOf(t[e])-1;hanoi(t,n,3-t[e]-r)}t[e]=r,steps+=1,setTimeout(moveDisk,steps*stepTimer,diskObjects[e],r),e>0&&hanoi(t,e-1,r)}function moveDisk(disk,to){let spool=eval("spool"+to),height=spool.children.length>0?spool.children.reduce((t,e)=>t+e.stroke,0):0,translate=bottomTranslate-height-disk.stroke/2;spool.addChild(disk),disk.translate={y:translate},illo.updateRenderGraph()}hanoi(disks,stackHeight-1,2),animate()},function(t,e,r){!function(e,n){if(t.exports)t.exports=n(r(0),r(1),r(9));else{var i=e.Zdog;i.Illustration=n(i,i.Anchor,i.Dragger)}}(this,(function(t,e,r){function n(){}var i=t.TAU,o=e.subclass({element:void 0,centered:!0,zoom:1,dragRotate:!1,resize:!1,onPrerender:n,onDragStart:n,onDragMove:n,onDragEnd:n,onResize:n});return t.extend(o.prototype,r.prototype),o.prototype.create=function(t){e.prototype.create.call(this,t),r.prototype.create.call(this,t),this.setElement(this.element),this.setDragRotate(this.dragRotate),this.setResize(this.resize)},o.prototype.setElement=function(t){if(!(t=this.getQueryElement(t)))throw new Error("Zdog.Illustration element required. Set to "+t);var e=t.nodeName.toLowerCase();"canvas"==e?this.setCanvas(t):"svg"==e&&this.setSvg(t)},o.prototype.setSize=function(t,e){t=Math.round(t),e=Math.round(e),this.isCanvas?this.setSizeCanvas(t,e):this.isSvg&&this.setSizeSvg(t,e)},o.prototype.setResize=function(t){this.resize=t,this.resizeListener||(this.resizeListener=this.onWindowResize.bind(this)),t?(window.addEventListener("resize",this.resizeListener),this.onWindowResize()):window.removeEventListener("resize",this.resizeListener)},o.prototype.onWindowResize=function(){this.setMeasuredSize(),this.onResize(this.width,this.height)},o.prototype.setMeasuredSize=function(){var t,e;if("fullscreen"==this.resize)t=window.innerWidth,e=window.innerHeight;else{var r=this.element.getBoundingClientRect();t=r.width,e=r.height}this.setSize(t,e)},o.prototype.renderGraph=function(t){this.isCanvas?this.renderGraphCanvas(t):this.isSvg&&this.renderGraphSvg(t)},o.prototype.updateRenderGraph=function(t){this.updateGraph(),this.renderGraph(t)},o.prototype.setCanvas=function(t){this.element=t,this.isCanvas=!0,this.ctx=this.element.getContext("2d"),this.setSizeCanvas(t.width,t.height)},o.prototype.setSizeCanvas=function(t,e){this.width=t,this.height=e;var r=this.pixelRatio=window.devicePixelRatio||1;this.element.width=this.canvasWidth=t*r,this.element.height=this.canvasHeight=e*r,r>1&&!this.resize&&(this.element.style.width=t+"px",this.element.style.height=e+"px")},o.prototype.renderGraphCanvas=function(t){t=t||this,this.prerenderCanvas(),e.prototype.renderGraphCanvas.call(t,this.ctx),this.postrenderCanvas()},o.prototype.prerenderCanvas=function(){var t=this.ctx;if(t.lineCap="round",t.lineJoin="round",t.clearRect(0,0,this.canvasWidth,this.canvasHeight),t.save(),this.centered){var e=this.width/2*this.pixelRatio,r=this.height/2*this.pixelRatio;t.translate(e,r)}var n=this.pixelRatio*this.zoom;t.scale(n,n),this.onPrerender(t)},o.prototype.postrenderCanvas=function(){this.ctx.restore()},o.prototype.setSvg=function(t){this.element=t,this.isSvg=!0,this.pixelRatio=1;var e=t.getAttribute("width"),r=t.getAttribute("height");this.setSizeSvg(e,r)},o.prototype.setSizeSvg=function(t,e){this.width=t,this.height=e;var r=t/this.zoom,n=e/this.zoom,i=this.centered?-r/2:0,o=this.centered?-n/2:0;this.element.setAttribute("viewBox",i+" "+o+" "+r+" "+n),this.resize?(this.element.removeAttribute("width"),this.element.removeAttribute("height")):(this.element.setAttribute("width",t),this.element.setAttribute("height",e))},o.prototype.renderGraphSvg=function(t){t=t||this,function(t){for(;t.firstChild;)t.removeChild(t.firstChild)}(this.element),this.onPrerender(this.element),e.prototype.renderGraphSvg.call(t,this.element)},o.prototype.setDragRotate=function(t){t&&(!0===t&&(t=this),this.dragRotate=t,this.bindDrag(this.element))},o.prototype.dragStart=function(){this.dragStartRX=this.dragRotate.rotate.x,this.dragStartRY=this.dragRotate.rotate.y,r.prototype.dragStart.apply(this,arguments)},o.prototype.dragMove=function(t,e){var n=e.pageX-this.dragStartX,o=e.pageY-this.dragStartY,s=Math.min(this.width,this.height),a=n/s*i,h=o/s*i;this.dragRotate.rotate.x=this.dragStartRX-h,this.dragRotate.rotate.y=this.dragStartRY-a,r.prototype.dragMove.apply(this,arguments)},o}))},function(t,e,r){!function(e,n){if(t.exports)t.exports=n(r(2));else{var i=e.Zdog;i.RoundedRect=n(i.Shape)}}(this,(function(t){var e=t.subclass({width:1,height:1,cornerRadius:.25,closed:!1});return e.prototype.setPath=function(){var t=this.width/2,e=this.height/2,r=Math.min(t,e),n=Math.min(this.cornerRadius,r),i=t-n,o=e-n,s=[{x:i,y:-e},{arc:[{x:t,y:-e},{x:t,y:-o}]}];o&&s.push({x:t,y:o}),s.push({arc:[{x:t,y:e},{x:i,y:e}]}),i&&s.push({x:-i,y:e}),s.push({arc:[{x:-t,y:e},{x:-t,y:o}]}),o&&s.push({x:-t,y:-o}),s.push({arc:[{x:-t,y:-e},{x:-i,y:-e}]}),i&&s.push({x:i,y:-e}),this.path=s},e}))},function(t,e,r){!function(e,n){if(t.exports)t.exports=n(r(0),r(2));else{var i=e.Zdog;i.Polygon=n(i,i.Shape)}}(this,(function(t,e){var r=e.subclass({sides:3,radius:.5}),n=t.TAU;return r.prototype.setPath=function(){this.path=[];for(var t=0;t<this.sides;t++){var e=t/this.sides*n-n/4,r=Math.cos(e)*this.radius,i=Math.sin(e)*this.radius;this.path.push({x:r,y:i})}},r}))},function(t,e,r){!function(e,n){if(t.exports)t.exports=n(r(0),r(3),r(1),r(6));else{var i=e.Zdog;i.Hemisphere=n(i,i.Vector,i.Anchor,i.Ellipse)}}(this,(function(t,e,r,n){var i=n.subclass({fill:!0}),o=t.TAU;i.prototype.create=function(){n.prototype.create.apply(this,arguments),this.apex=new r({addTo:this,translate:{z:this.diameter/2}}),this.renderCentroid=new e},i.prototype.updateSortValue=function(){this.renderCentroid.set(this.renderOrigin).lerp(this.apex.renderOrigin,3/8),this.sortValue=this.renderCentroid.z},i.prototype.render=function(t,e){this.renderDome(t,e),n.prototype.render.apply(this,arguments)},i.prototype.renderDome=function(t,e){if(this.visible){var r=this.getDomeRenderElement(t,e),n=Math.atan2(this.renderNormal.y,this.renderNormal.x),i=this.diameter/2*this.renderNormal.magnitude(),s=this.renderOrigin.x,a=this.renderOrigin.y;if(e.isCanvas){var h=n+o/4,c=n-o/4;t.beginPath(),t.arc(s,a,i,h,c)}else e.isSvg&&(n=(n-o/4)/o*360,this.domeSvgElement.setAttribute("d","M "+-i+",0 A "+i+","+i+" 0 0 1 "+i+",0"),this.domeSvgElement.setAttribute("transform","translate("+s+","+a+" ) rotate("+n+")"));e.stroke(t,r,this.stroke,this.color,this.getLineWidth()),e.fill(t,r,this.fill,this.color),e.end(t,r)}};return i.prototype.getDomeRenderElement=function(t,e){if(e.isSvg)return this.domeSvgElement||(this.domeSvgElement=document.createElementNS("http://www.w3.org/2000/svg","path"),this.domeSvgElement.setAttribute("stroke-linecap","round"),this.domeSvgElement.setAttribute("stroke-linejoin","round")),this.domeSvgElement},i}))},function(t,e,r){!function(e,n){if(t.exports)t.exports=n(r(0),r(5),r(2),r(10),r(6));else{var i=e.Zdog;i.Cylinder=n(i,i.PathCommand,i.Shape,i.Group,i.Ellipse)}}(this,(function(t,e,r,n,i){function o(){}var s=n.subclass({color:"#333",updateSort:!0});s.prototype.create=function(){n.prototype.create.apply(this,arguments),this.pathCommands=[new e("move",[{}]),new e("line",[{}])]},s.prototype.render=function(t,e){this.renderCylinderSurface(t,e),n.prototype.render.apply(this,arguments)},s.prototype.renderCylinderSurface=function(t,e){if(this.visible){var r=this.getRenderElement(t,e),n=this.frontBase,i=this.rearBase,o=n.renderNormal.magnitude(),s=n.diameter*o+n.getLineWidth();this.pathCommands[0].renderPoints[0].set(n.renderOrigin),this.pathCommands[1].renderPoints[0].set(i.renderOrigin),e.isCanvas&&(t.lineCap="butt"),e.renderPath(t,r,this.pathCommands),e.stroke(t,r,!0,this.color,s),e.end(t,r),e.isCanvas&&(t.lineCap="round")}};s.prototype.getRenderElement=function(t,e){if(e.isSvg)return this.svgElement||(this.svgElement=document.createElementNS("http://www.w3.org/2000/svg","path")),this.svgElement},s.prototype.copyGraph=o,i.subclass().prototype.copyGraph=o;var a=r.subclass({diameter:1,length:1,frontFace:void 0,fill:!0}),h=t.TAU;a.prototype.create=function(){r.prototype.create.apply(this,arguments),this.group=new s({addTo:this,color:this.color,visible:this.visible});var t=this.length/2,e=this.backface||!0;this.frontBase=this.group.frontBase=new i({addTo:this.group,diameter:this.diameter,translate:{z:t},rotate:{y:h/2},color:this.color,stroke:this.stroke,fill:this.fill,backface:this.frontFace||e,visible:this.visible}),this.rearBase=this.group.rearBase=this.frontBase.copy({translate:{z:-t},rotate:{y:0},backface:e})},a.prototype.render=function(){};return["stroke","fill","color","visible"].forEach((function(t){var e="_"+t;Object.defineProperty(a.prototype,t,{get:function(){return this[e]},set:function(r){this[e]=r,this.frontBase&&(this.frontBase[t]=r,this.rearBase[t]=r,this.group[t]=r)}})})),a}))},function(t,e,r){!function(e,n){if(t.exports)t.exports=n(r(0),r(3),r(5),r(1),r(6));else{var i=e.Zdog;i.Cone=n(i,i.Vector,i.PathCommand,i.Anchor,i.Ellipse)}}(this,(function(t,e,r,n,i){var o=i.subclass({length:1,fill:!0}),s=t.TAU;o.prototype.create=function(){i.prototype.create.apply(this,arguments),this.apex=new n({addTo:this,translate:{z:this.length}}),this.renderApex=new e,this.renderCentroid=new e,this.tangentA=new e,this.tangentB=new e,this.surfacePathCommands=[new r("move",[{}]),new r("line",[{}]),new r("line",[{}])]},o.prototype.updateSortValue=function(){this.renderCentroid.set(this.renderOrigin).lerp(this.apex.renderOrigin,1/3),this.sortValue=this.renderCentroid.z},o.prototype.render=function(t,e){this.renderConeSurface(t,e),i.prototype.render.apply(this,arguments)},o.prototype.renderConeSurface=function(t,e){if(this.visible){this.renderApex.set(this.apex.renderOrigin).subtract(this.renderOrigin);var r=this.renderNormal.magnitude(),n=this.renderApex.magnitude2d(),i=this.renderNormal.magnitude2d(),o=Math.acos(i/r),a=Math.sin(o),h=this.diameter/2*r;if(h*a<n){var c=Math.atan2(this.renderNormal.y,this.renderNormal.x)+s/2,p=n/a,u=Math.acos(h/p),d=this.tangentA,l=this.tangentB;d.x=Math.cos(u)*h*a,d.y=Math.sin(u)*h,l.set(this.tangentA),l.y*=-1,d.rotateZ(c),l.rotateZ(c),d.add(this.renderOrigin),l.add(this.renderOrigin),this.setSurfaceRenderPoint(0,d),this.setSurfaceRenderPoint(1,this.apex.renderOrigin),this.setSurfaceRenderPoint(2,l);var f=this.getSurfaceRenderElement(t,e);e.renderPath(t,f,this.surfacePathCommands),e.stroke(t,f,this.stroke,this.color,this.getLineWidth()),e.fill(t,f,this.fill,this.color),e.end(t,f)}}};return o.prototype.getSurfaceRenderElement=function(t,e){if(e.isSvg)return this.surfaceSvgElement||(this.surfaceSvgElement=document.createElementNS("http://www.w3.org/2000/svg","path"),this.surfaceSvgElement.setAttribute("stroke-linecap","round"),this.surfaceSvgElement.setAttribute("stroke-linejoin","round")),this.surfaceSvgElement},o.prototype.setSurfaceRenderPoint=function(t,e){this.surfacePathCommands[t].renderPoints[0].set(e)},o}))},function(t,e,r){!function(e,n){if(t.exports)t.exports=n(r(0),r(1),r(2),r(11));else{var i=e.Zdog;i.Box=n(i,i.Anchor,i.Shape,i.Rect)}}(this,(function(t,e,r,n){var i=n.subclass();i.prototype.copyGraph=function(){};var o=t.TAU,s=["frontFace","rearFace","leftFace","rightFace","topFace","bottomFace"],a=t.extend({},r.defaults);delete a.path,s.forEach((function(t){a[t]=!0})),t.extend(a,{width:1,height:1,depth:1,fill:!0});var h=e.subclass(a);h.prototype.create=function(t){e.prototype.create.call(this,t),this.updatePath(),this.fill=this.fill},h.prototype.updatePath=function(){s.forEach((function(t){this[t]=this[t]}),this)},s.forEach((function(t){var e="_"+t;Object.defineProperty(h.prototype,t,{get:function(){return this[e]},set:function(r){this[e]=r,this.setFace(t,r)}})})),h.prototype.setFace=function(t,e){var r=t+"Rect",n=this[r];if(e){var o=this.getFaceOptions(t);o.color="string"==typeof e?e:this.color,n?n.setOptions(o):n=this[r]=new i(o),n.updatePath(),this.addChild(n)}else this.removeChild(n)},h.prototype.getFaceOptions=function(t){return{frontFace:{width:this.width,height:this.height,translate:{z:this.depth/2}},rearFace:{width:this.width,height:this.height,translate:{z:-this.depth/2},rotate:{y:o/2}},leftFace:{width:this.depth,height:this.height,translate:{x:-this.width/2},rotate:{y:-o/4}},rightFace:{width:this.depth,height:this.height,translate:{x:this.width/2},rotate:{y:o/4}},topFace:{width:this.width,height:this.depth,translate:{y:-this.height/2},rotate:{x:-o/4}},bottomFace:{width:this.width,height:this.depth,translate:{y:this.height/2},rotate:{x:o/4}}}[t]};return["color","stroke","fill","backface","front","visible"].forEach((function(t){var e="_"+t;Object.defineProperty(h.prototype,t,{get:function(){return this[e]},set:function(r){this[e]=r,s.forEach((function(e){var n=this[e+"Rect"],i="string"==typeof this[e];n&&!("color"==t&&i)&&(n[t]=r)}),this)}})})),h}))},function(t,e,r){var n=r(22),i=r(23);"string"==typeof(i=i.__esModule?i.default:i)&&(i=[[t.i,i,""]]);var o={insert:"head",singleton:!1},s=(n(i,o),i.locals?i.locals:{});t.exports=s},function(t,e,r){"use strict";var n,i=function(){return void 0===n&&(n=Boolean(window&&document&&document.all&&!window.atob)),n},o=function(){var t={};return function(e){if(void 0===t[e]){var r=document.querySelector(e);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(t){r=null}t[e]=r}return t[e]}}(),s=[];function a(t){for(var e=-1,r=0;r<s.length;r++)if(s[r].identifier===t){e=r;break}return e}function h(t,e){for(var r={},n=[],i=0;i<t.length;i++){var o=t[i],h=e.base?o[0]+e.base:o[0],c=r[h]||0,p="".concat(h," ").concat(c);r[h]=c+1;var u=a(p),d={css:o[1],media:o[2],sourceMap:o[3]};-1!==u?(s[u].references++,s[u].updater(d)):s.push({identifier:p,updater:g(d,e),references:1}),n.push(p)}return n}function c(t){var e=document.createElement("style"),n=t.attributes||{};if(void 0===n.nonce){var i=r.nc;i&&(n.nonce=i)}if(Object.keys(n).forEach((function(t){e.setAttribute(t,n[t])})),"function"==typeof t.insert)t.insert(e);else{var s=o(t.insert||"head");if(!s)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");s.appendChild(e)}return e}var p,u=(p=[],function(t,e){return p[t]=e,p.filter(Boolean).join("\n")});function d(t,e,r,n){var i=r?"":n.media?"@media ".concat(n.media," {").concat(n.css,"}"):n.css;if(t.styleSheet)t.styleSheet.cssText=u(e,i);else{var o=document.createTextNode(i),s=t.childNodes;s[e]&&t.removeChild(s[e]),s.length?t.insertBefore(o,s[e]):t.appendChild(o)}}function l(t,e,r){var n=r.css,i=r.media,o=r.sourceMap;if(i?t.setAttribute("media",i):t.removeAttribute("media"),o&&btoa&&(n+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}var f=null,y=0;function g(t,e){var r,n,i;if(e.singleton){var o=y++;r=f||(f=c(e)),n=d.bind(null,r,o,!1),i=d.bind(null,r,o,!0)}else r=c(e),n=l.bind(null,r,e),i=function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(r)};return n(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;n(t=e)}else i()}}t.exports=function(t,e){(e=e||{}).singleton||"boolean"==typeof e.singleton||(e.singleton=i());var r=h(t=t||[],e);return function(t){if(t=t||[],"[object Array]"===Object.prototype.toString.call(t)){for(var n=0;n<r.length;n++){var i=a(r[n]);s[i].references--}for(var o=h(t,e),c=0;c<r.length;c++){var p=a(r[c]);0===s[p].references&&(s[p].updater(),s.splice(p,1))}r=o}}}},function(t,e,r){(e=r(24)(!1)).push([t.i,".zdog-canvas {\r\n  display: block;\r\n  background: #FDB;\r\n  border-radius: 8px;\r\n  cursor: move;\r\n}",""]),t.exports=e},function(t,e,r){"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var r=function(t,e){var r=t[1]||"",n=t[3];if(!n)return r;if(e&&"function"==typeof btoa){var i=(s=n,a=btoa(unescape(encodeURIComponent(JSON.stringify(s)))),h="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(a),"/*# ".concat(h," */")),o=n.sources.map((function(t){return"/*# sourceURL=".concat(n.sourceRoot||"").concat(t," */")}));return[r].concat(o).concat([i]).join("\n")}var s,a,h;return[r].join("\n")}(e,t);return e[2]?"@media ".concat(e[2]," {").concat(r,"}"):r})).join("")},e.i=function(t,r,n){"string"==typeof t&&(t=[[null,t,""]]);var i={};if(n)for(var o=0;o<this.length;o++){var s=this[o][0];null!=s&&(i[s]=!0)}for(var a=0;a<t.length;a++){var h=[].concat(t[a]);n&&i[h[0]]||(r&&(h[2]?h[2]="".concat(r," and ").concat(h[2]):h[2]=r),e.push(h))}},e}}]);