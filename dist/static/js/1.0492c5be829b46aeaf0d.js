webpackJsonp([1],{581:function(t,i,e){e(606);var n=e(9)(e(608),e(614),"data-v-0804419f",null);t.exports=n.exports},595:function(t,i,e){"use strict";function n(){var t=r.a({},l.b,{channel:"singer",page:"list",key:"all_all_all",pagesize:100,pagenum:1,hostUin:0,needNewCode:0,platform:"yqq"});return o.a("https://c.y.qq.com/v8/fcg-bin/v8.fcg",t,l.c)}function a(t){var i=r.a({},l.b,{hostUin:0,needNewCode:0,platform:"yqq",order:"listen",begin:0,num:80,songstatus:1,g_tk:1664029744,singermid:t});return o.a("https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg",i,l.c)}i.b=n,i.a=a;var s=e(86),r=e.n(s),o=e(194),l=e(57)},606:function(t,i,e){var n=e(607);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);e(579)("141c41ec",n,!0)},607:function(t,i,e){i=t.exports=e(578)(!0),i.push([t.i,".singer[data-v-0804419f]{position:fixed;top:88px;bottom:0;width:100%}","",{version:3,sources:["C:/Users/zhanglaifu/Desktop/vue-music-chapter1/src/components/singer/singer.vue"],names:[],mappings:"AACA,yBACE,eAAgB,AAChB,SAAU,AACV,SAAU,AACV,UAAY,CACb",file:"singer.vue",sourcesContent:["\n.singer[data-v-0804419f] {\n  position: fixed;\n  top: 88px;\n  bottom: 0;\n  width: 100%;\n}"],sourceRoot:""}])},608:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=e(58),a=e.n(n),s=e(609),r=e.n(s),o=e(595),l=e(57),A=e(203),c=e(49),u=e(85);i.default={mixins:[u.b],data:function(){return{singers:[]}},created:function(){this._getSingerList()},methods:a.a({handlePlayList:function(t){var i=t.length?"60px":0;this.$refs.singer.style.bottom=i,this.$refs.list.refresh()},jump:function(t){this.$router.push({path:"/singer/"+t.id}),this.setSinger(t)}},c.d({setSinger:"SET_SINGER"}),{_getSingerList:function(){var t=this;o.b().then(function(i){i.code===l.a&&(t.singers=t._normalizeSinger(i.data.list))})},_normalizeSinger:function(t){var i={hot:{title:"热门",items:[]}};t.forEach(function(t,e){e<10&&i.hot.items.push(new A.a({name:t.Fsinger_name,id:t.Fsinger_mid}));var n=t.Findex;i[n]||(i[n]={title:n,items:[]}),i[n].items.push(new A.a({name:t.Fsinger_name,id:t.Fsinger_mid}))});var e=[],n=[];for(var a in i){var s=i[a];s.title.match(/[a-zA-Z]/)?e.push(s):"热门"===s.title&&n.push(s)}return e.sort(function(t,i){return t.title.charCodeAt(0)-i.title.charCodeAt(0)}),n.concat(e)}}),components:{listView:r.a}}},609:function(t,i,e){e(610);var n=e(9)(e(612),e(613),"data-v-46abeafa",null);t.exports=n.exports},610:function(t,i,e){var n=e(611);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);e(579)("2ea3cf2e",n,!0)},611:function(t,i,e){i=t.exports=e(578)(!0),i.push([t.i,".listview[data-v-46abeafa]{position:relative;width:100%;height:100%;overflow:hidden;background:#222}.listview .list-group[data-v-46abeafa]{padding-bottom:30px}.listview .list-group .list-group-title[data-v-46abeafa]{height:30px;line-height:30px;padding-left:20px;font-size:12px;color:hsla(0,0%,100%,.5);background:#333}.listview .list-group .list-group-item[data-v-46abeafa]{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;padding:20px 0 0 30px}.listview .list-group .list-group-item .avatar[data-v-46abeafa]{width:50px;height:50px;border-radius:50%}.listview .list-group .list-group-item .name[data-v-46abeafa]{margin-left:20px;color:hsla(0,0%,100%,.5);font-size:14px}.listview .list-shortcut[data-v-46abeafa]{position:absolute;z-index:30;right:0;top:50%;transform:translateY(-50%);width:20px;padding:20px 0;border-radius:10px;text-align:center;background:rgba(0,0,0,.3);font-family:Helvetica}.listview .list-shortcut .item[data-v-46abeafa]{padding:3px;line-height:1;color:hsla(0,0%,100%,.5);font-size:12px}.listview .list-shortcut .item.current[data-v-46abeafa]{color:#ffcd32}.listview .list-fixed[data-v-46abeafa]{position:absolute;top:-1px;left:0;width:100%}.listview .list-fixed .fixed-title[data-v-46abeafa]{height:30px;line-height:30px;padding-left:20px;transition:.4s;font-size:12px;color:hsla(0,0%,100%,.5);background:#333}.listview .loading-container[data-v-46abeafa]{position:absolute;width:100%;top:50%;transform:translateY(-50%)}","",{version:3,sources:["C:/Users/zhanglaifu/Desktop/vue-music-chapter1/src/base/listview/listview.vue"],names:[],mappings:"AACA,2BACE,kBAAmB,AACnB,WAAY,AACZ,YAAa,AACb,gBAAiB,AACjB,eAAiB,CAClB,AACD,uCACE,mBAAqB,CACtB,AACD,yDACE,YAAa,AACb,iBAAkB,AAClB,kBAAmB,AACnB,eAAgB,AAChB,yBAA6B,AAC7B,eAAiB,CAClB,AACD,wDACE,oBAAqB,AACrB,aAAc,AACd,sBAAuB,AACnB,mBAAoB,AACxB,qBAAuB,CACxB,AACD,gEACE,WAAY,AACZ,YAAa,AACb,iBAAmB,CACpB,AACD,8DACE,iBAAkB,AAClB,yBAA6B,AAC7B,cAAgB,CACjB,AACD,0CACE,kBAAmB,AACnB,WAAY,AACZ,QAAS,AACT,QAAS,AACT,2BAA4B,AAC5B,WAAY,AACZ,eAAgB,AAChB,mBAAoB,AACpB,kBAAmB,AACnB,0BAA4B,AAC5B,qBAAuB,CACxB,AACD,gDACE,YAAa,AACb,cAAe,AACf,yBAA6B,AAC7B,cAAgB,CACjB,AACD,wDACE,aAAe,CAChB,AACD,uCACE,kBAAmB,AACnB,SAAU,AACV,OAAQ,AACR,UAAY,CACb,AACD,oDACE,YAAa,AACb,iBAAkB,AAClB,kBAAmB,AACnB,eAAiB,AACjB,eAAgB,AAChB,yBAA6B,AAC7B,eAAiB,CAClB,AACD,8CACE,kBAAmB,AACnB,WAAY,AACZ,QAAS,AACT,0BAA4B,CAC7B",file:"listview.vue",sourcesContent:["\n.listview[data-v-46abeafa] {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  background: #222;\n}\n.listview .list-group[data-v-46abeafa] {\n  padding-bottom: 30px;\n}\n.listview .list-group .list-group-title[data-v-46abeafa] {\n  height: 30px;\n  line-height: 30px;\n  padding-left: 20px;\n  font-size: 12px;\n  color: rgba(255,255,255,0.5);\n  background: #333;\n}\n.listview .list-group .list-group-item[data-v-46abeafa] {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n      align-items: center;\n  padding: 20px 0 0 30px;\n}\n.listview .list-group .list-group-item .avatar[data-v-46abeafa] {\n  width: 50px;\n  height: 50px;\n  border-radius: 50%;\n}\n.listview .list-group .list-group-item .name[data-v-46abeafa] {\n  margin-left: 20px;\n  color: rgba(255,255,255,0.5);\n  font-size: 14px;\n}\n.listview .list-shortcut[data-v-46abeafa] {\n  position: absolute;\n  z-index: 30;\n  right: 0;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 20px;\n  padding: 20px 0;\n  border-radius: 10px;\n  text-align: center;\n  background: rgba(0,0,0,0.3);\n  font-family: Helvetica;\n}\n.listview .list-shortcut .item[data-v-46abeafa] {\n  padding: 3px;\n  line-height: 1;\n  color: rgba(255,255,255,0.5);\n  font-size: 12px;\n}\n.listview .list-shortcut .item.current[data-v-46abeafa] {\n  color: #ffcd32;\n}\n.listview .list-fixed[data-v-46abeafa] {\n  position: absolute;\n  top: -1px;\n  left: 0;\n  width: 100%;\n}\n.listview .list-fixed .fixed-title[data-v-46abeafa] {\n  height: 30px;\n  line-height: 30px;\n  padding-left: 20px;\n  transition: 0.4s;\n  font-size: 12px;\n  color: rgba(255,255,255,0.5);\n  background: #333;\n}\n.listview .loading-container[data-v-46abeafa] {\n  position: absolute;\n  width: 100%;\n  top: 50%;\n  transform: translateY(-50%);\n}"],sourceRoot:""}])},612:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=e(66),a=e.n(n),s=e(195),r=e.n(s),o=e(132);i.default={props:{data:{type:Array,default:[]}},computed:{shortcutList:function(){return this.data.map(function(t){return t.title.substr(0,1)})},fixedTitle:function(){return this.scrollY>0?"":this.data[this.currentIndex]?this.data[this.currentIndex].title:""}},data:function(){return{scrollY:-1,currentIndex:0,diff:-1}},created:function(){this.probeType=3,this.listenScroll=!0,this.touch={},this.listHeight=[]},methods:{singer:function(t){this.$emit("singerDetail",t)},onShortcutTouchStart:function(t){var i=o.b(t.target,"index"),e=t.touches[0];this.touch.y1=e.pageY,this.touch.anchorIndex=i},onShortcutTouchMove:function(t){var i=t.touches[0];this.touch.y2=i.pageY;var e=(this.touch.y2-this.touch.y1)/18|0,n=parseInt(this.touch.anchorIndex)+e;this._scrollTo(n)},refresh:function(){this.$refs.listview.refresh()},scroll:function(t){this.scrollY=t.y},_calculateHeight:function(){this.listHeight=[];var t=this.$refs.listGroup,i=0;this.listHeight.push(i);for(var e=0;e<t.length;e++){i+=t[e].clientHeight,this.listHeight.push(i)}},_scrollTo:function(t){(t||0===t)&&(t<0?t=0:t>this.listHeight.length-2&&(t=this.listHeight.length-2),this.scrollY=-this.listHeight[t],this.$refs.listview.scrollToElement(this.$refs.listGroup[t],0))}},watch:{data:function(){var t=this;setTimeout(function(){t._calculateHeight()},20)},scrollY:function(t){var i=this.listHeight;if(t>0)return void(this.currentIndex=0);for(var e=0;e<i.length-1;e++){var n=i[e],a=i[e+1];if(-t>=n&&-t<a)return this.currentIndex=e,void(this.diff=a+t)}this.currentIndex=i.length-2},diff:function(t){var i=t>0&&t<30?t-30:0;this.fixedTop!==i&&(this.fixedTop=i,this.$refs.fixed.style.transform="tranlate3d(0,"+i+"px,0)")}},components:{Scroll:a.a,Loading:r.a}}},613:function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("scroll",{ref:"listview",staticClass:"listview",attrs:{"listen-scroll":t.listenScroll,"probe-type":t.probeType,data:t.data},on:{scroll:t.scroll}},[e("ul",t._l(t.data,function(i){return e("li",{ref:"listGroup",refInFor:!0,staticClass:"list-group"},[e("h2",{staticClass:"list-group-title"},[t._v(t._s(i.title))]),t._v(" "),e("ul",t._l(i.items,function(i){return e("li",{staticClass:"list-group-item",on:{click:function(e){t.singer(i)}}},[e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:i.avatar,expression:"item.avatar"}],staticClass:"avatar",attrs:{alt:""}}),t._v(" "),e("span",{staticClass:"name"},[t._v(t._s(i.name))])])}))])})),t._v(" "),e("div",{staticClass:"list-shortcut",on:{touchstart:function(i){return"button"in i||!t._k(i.keyCode,"event",void 0,i.key,void 0)?(i.stopPropagation(),t.onShortcutTouchStart(i)):null},touchmove:function(i){return i.stopPropagation(),i.preventDefault(),t.onShortcutTouchMove(i)},touchend:function(i){if(!("button"in i)&&t._k(i.keyCode,"top",void 0,i.key,void 0))return null}}},[e("ul",t._l(t.shortcutList,function(i,n){return e("li",{staticClass:"item",class:{current:t.currentIndex===n},attrs:{"data-index":n}},[t._v("\n\t\t\t\t"+t._s(i)+"\n\t\t\t\t\n\t\t\t")])}))]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.fixedTitle,expression:"fixedTitle"}],ref:"fixed",staticClass:"list-fixed"},[e("div",{staticClass:"fixed-title"},[t._v(t._s(t.fixedTitle))])]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:!t.data.length,expression:"!data.length"}],staticClass:"loading-container"},[e("loading")],1)])},staticRenderFns:[]}},614:function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{ref:"singer",staticClass:"singer"},[e("list-view",{ref:"list",attrs:{data:t.singers},on:{singerDetail:t.jump}}),t._v(" "),e("router-view")],1)},staticRenderFns:[]}}});
//# sourceMappingURL=1.0492c5be829b46aeaf0d.js.map