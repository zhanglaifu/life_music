<template>
	<div class="singer" ref="singer">
		<list-view :data="singers" @singerDetail="jump" ref="list"></list-view>
		<router-view></router-view>
	</div>
</template>

<script>
	import listView from 'base/listview/listview'
	import {getSingerList} from "api/singer"
	import {ERR_OK} from 'api/config'
	import Singer from 'common/js/singer'
	import { mapMutations } from 'vuex'
	import {playlistMixin} from 'common/js/mixin'
	const HOT_SINGER_LEN = 10
	const HOT_NAME = "热门"
	export default{
		mixins:[playlistMixin],
		data(){
			return {
				singers:[]
			}
		},
		created(){
			this._getSingerList()
		},
		methods:{
			handlePlayList(playList){
//				if(playList.length){
//					this.$refs.singer.style.bottom="60px"
//					this.$refs.list.refresh()
//				}else{
//					this.$refs.singer.style.bottom = '0'
//				}
				const bottom = playList.length ? '60px' : 0
				this.$refs.singer.style.bottom = bottom
				this.$refs.list.refresh()
			},
			//这个方法是子组件触发的方法  然后push进入一条路由
			jump(singer){
				this.$router.push(
					{path:`/singer/${singer.id}`}
				)
				this.setSinger(singer)
			},
			
			...mapMutations({
				setSinger:'SET_SINGER'
			}),
			
			_getSingerList(){
				getSingerList().then((res) => {
					if(res.code === ERR_OK){
						this.singers = this._normalizeSinger(res.data.list)  //对异步请求的数据进行处理成数组方便后面进行遍历出来
					}
				})
			},
			_normalizeSinger(list){
				let map = {
					hot:{
						title : HOT_NAME,
						items:[]
					}
				}
				list.forEach( (item,index) => {
					if(index < HOT_SINGER_LEN) {  //将限制10条热门
						map.hot.items.push(new Singer({
							name:item.Fsinger_name,
							id:item.Fsinger_mid
						}))
					}
					const key = item.Findex
					if(!map[key]){
						map[key] = {
							title : key,  
							items : []
						}
					}
					map[key].items.push(new Singer({
						name:item.Fsinger_name,  //遍历每一个对象 获得每一个item 然后通过设置Findex 为key 将key对应的值(对象)中的数组push进去需要的数据
						id:item.Fsinger_mid
					}))
				})
				//为了得到有序列表，需要处理map 因为返回的 是一个对象里面包裹的是一个title属性跟items对象数组 ，如果再进行遍历的话会不按照顺序排列。
				let ret = []
				let hot = []
				for (let key in map) {
					let val = map[key]
					if(val.title.match(/[a-zA-Z]/)){
						ret.push(val)
					}else if (val.title === HOT_NAME){
						hot.push(val)
					}
				}
				ret.sort( (a,b) => {  //通过sort方法 排列A-Z 
					return a.title.charCodeAt(0) - b.title.charCodeAt(0)
				})
				return hot.concat(ret)
			}
		},
		components:{
			listView,
			
		}
	}
</script>

<style scoped lang="stylus" rel = "stylesheet/stylus">
	.singer
		position:fixed
		top:88px
		bottom:0
		width:100%
</style>