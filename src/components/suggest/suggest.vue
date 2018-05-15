<template>
	<scroll class="suggest"
		ref='suggest'
		:data="result"
		:pullup="pullup"
		:beforeScroll="beforeScroll"
		@scrollToEnd = "searchMore"
		@beforeScroll="listScroll"
		>
		<ul class="suggest-list">
			<li class="suggest-item" v-for="item in result" @click="selectItem(item)">
				<div class="icon">
					<i :class="getIconCls(item)"></i>
				</div>
				<div class="name">
					<p class="text" v-html="getDisplayName(item)"></p>
				</div>
			</li>
			<loading v-show="hasMore" title=""></loading>
		</ul>
		<div class="no-result-wrapper" v-show="!hasMore && !result.length" >
			<no-result title="抱歉，暂无搜索结果"></no-result>
		</div>
	</scroll>
</template>

<script>
	import {search} from 'api/search'
	import {ERR_OK} from 'api/config'
	import Scroll from 'base/scroll/scroll'
	import Loading from "base/loading/loading"
	import {createSong,isValidMusic,processSongsUrl} from 'common/js/song'
	import { mapMutations,mapActions} from 'vuex'
	import Singer from 'common/js/singer'
	import noResult from 'base/no-result/no-result'
	
	const TYPE_SINGER = "singer"
	const perpage = 20
	
	export default {
		props:{
			query:{
				type:String,
				default:''
			},
			showSinger:{
				type:Boolean,
				default:true
			}
		},
		data(){
			return {
				page:1,
				result:[],
				pullup:true,
				beforeScroll:true,
				hasMore:true
			}
		},
		methods:{
			refresh(){
				this.$refs.suggest.refresh()
			},
			listScroll(){  //派发一个事件将searchBox失去焦点。
				this.$emit('inputBlur')
			},
			searchMore(){  //查找更多的时候执行的函数。
				if(!this.hasMore) {
					return
				}
				this.page++  //请求下一页的数据  page++  发送请求 接受数据进行合并
				search(this.query,this.page,this.showSinger,perpage).then( (res) => {
					//console.log(res)
					if(res.code === ERR_OK) {
						this._genResult(res.data).then((songs) => {
							this.result = this.result.concat(songs)
						})
						//console.log(this.result)
						this.checkMore(res.data)
					}
				})		
			},
			checkMore(data) {
				const song = data.song
				//console.log(song)
				if(!song.list.length || (song.curnum + (song.curpage-1) * perpage) > song.totalnum) {
					//console.log(song)
					this.hasMore  = false
				}
			},
			selectItem(item) {
				if(item.type === TYPE_SINGER) {
					const singer = new Singer({
						id:item.singermid,
						name:item.singername
					})
					this.$router.push({
						path:`/search/${singer.id}`
					})
					this.setSinger(singer)
				}else {
					this.insertSong(item) //通过action将数据item放到播放列表中。
				}
				this.$emit('select',item)   //点击的时候存储当前的query到localstorage
			},
			getDisplayName(item) {
				if(item.type === TYPE_SINGER) { 
					return item.singername
				}else {
					return `${item.name}-${item.singer}`
				}
			},
			getIconCls(item) {
				if(item.type === TYPE_SINGER) {
					return 'icon-mine'
				} else {
					return 'icon-music'
				}
			},
			listScroll() {
				this.$emit('listScroll') //listScroll是父组件接受的事件 接受scroll子组件派发的事件然后再派发事件listScroll
			},
			search(){   //query查询值变化执行的函数
				this.page = 1
				this.hasMore = true
				this.$refs.suggest.scrollTo(0,0)
				search(this.query,this.page,this.showSinger,perpage).then( (res)=>{
					//console.log(res)
					if(res.code === ERR_OK) {
						this._genResult(res.data).then((res) => {
							this.result = this.result.concat(res);
							
						})
						this.checkMore(res.data)
					}
				})
			},
			_genResult(data) {
				let ret = []
				if(data.zhida && data.zhida.singerid) {
					ret.push({...data.zhida,...{type:TYPE_SINGER}})
				}
				return processSongsUrl(this._normalizeSongs(data.song.list)).then((songs) => {
					//console.log(songs)
					ret = ret.concat(songs)
					//console.log(ret)
					return ret
				})
			},
			_normalizeSongs(list) {
				let ret = []
				list.forEach((musicData) => {
					if(musicData.songid && musicData.albummid) {
						if(isValidMusic(musicData)){
							ret.push(createSong(musicData))  
						}
					}
				})
				return ret
			},
			...mapMutations({
				setSinger:'SET_SINGER'
			}),
			...mapActions(['insertSong'])
		},
		watch:{
			query(newQuery) {
				this.result=[]
				this.query = newQuery
				//console.log(this.query)
				this.search()
			}
		},
		components:{
			Scroll,
			Loading,
			noResult
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	@import "~common/stylus/mixin"
	.suggest
	    height: 100%
	    overflow: hidden
	 	.suggest-list
	      	padding: 0 30px
		    .suggest-item
		        display: flex
		        align-items: center
		        padding-bottom: 20px
			    .icon
			        flex: 0 0 30px
			        width: 30px
			        [class^="icon-"]
				        font-size: 14px
				        color: $color-text-d
			    .name
			        flex: 1
			        font-size: $font-size-medium
			        color: $color-text-d
			        overflow: hidden
			        .text
			          no-wrap()
	   
</style>