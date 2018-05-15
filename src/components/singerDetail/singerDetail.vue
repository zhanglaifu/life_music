<template>
	<transition name="fade">
		<musiclist :songs="songs" :title="title" :bg-image="bgImage"></musiclist>
	</transition>
</template>

<script>
	import { mapGetters } from "vuex"
	import {getSingerDetail } from 'api/singer'
	import {ERR_OK} from "api/config"
	import musiclist from 'components/music-list/music-list'
	import {createSong,isValidMusic,processSongsUrl} from 'common/js/song'
	
	export default{
		
		
		computed:{
			...mapGetters([
				"singer"
			]),
			title(){
			    return this.singer.name
			},
			bgImage(){
			    return this.singer.avatar
			}
		},
		created(){
			this._getSingerDetail()
		},
		data(){
		    return {
		        songs:[]
			}
		},
		methods:{
			
			_getSingerDetail(){  //向singer.js中传递一个id然后通过jsonp查找数据
				if(!this.singer.id){
				    this.$router.push({path:'/singer'})
				}
				getSingerDetail(this.singer.id).then( (res)=> {
					if(res.code === ERR_OK) {
						processSongsUrl(this._normalizeSongs(res.data.list)).then((songs) => {
							console.log(songs)
            			 	this.songs = songs
           			 	})
					}
				})
			},
            _normalizeSongs(list){
			    let ret = []
				list.forEach( (item) => {
				    let { musicData } = item //取出musicdata数据
					if(musicData.songid && musicData.albummid) {
				        if(isValidMusic(musicData)) {
				        	ret.push( createSong(musicData) )
				        }
					}

				})
                return ret
			}
		},
		components:{
		    musiclist
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.singer-detail
		position: fixed
		left:0
		right:0
		top:0
		bottom:0
		background:#222
		z-index:99
	.fade-enter-active,.fade-leave-active
		transition:all 0.3s
	.fade-enter,.fade-leave-to
		transform:translate3d(100%,0,0)
</style>
