<template>
	<transition name="slide">
		<music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
	</transition>
</template>

<script>
	import MusicList from 'components/music-list/music-list'
	import {getSongList} from 'api/recommend'
	import {ERR_OK} from 'api/config'
	import {mapGetters} from 'vuex'
	import {createSong,isValidMusic,processSongsUrl} from 'common/js/song'
	export default {
		computed:{
			title() {
				return this.disc.dissname
			},
			bgImage() {
				return this.disc.imgurl
			},
			...mapGetters([
				'disc'
			])
		},
		data() {
			return {
				songs: []
			}
		},
		created() {
			this._getSongList()
		},
		methods:{
			_getSongList() {
				if(!this.disc.dissid) {
					this.$router.push('/recommend')
					return
				}
				getSongList(this.disc.dissid).then( (res) => {
					//console.log(res)
					if(res.code === ERR_OK) {
						//console.log("ok")
						processSongsUrl(this._normalizeSongs(res.cdlist[0].songlist)).then((songs) => {
							this.songs = songs;
						})
					//	this.songs = this._normalizeSongs(res.cdlist[0].songlist)
					}
				}).catch( () => {
					console.log('获取song出错')
				})
			},
			_normalizeSongs(list) {
				let ret = []
				//console.log("nor")
				list.forEach((musicData) => {
					if(musicData.songid && musicData.albummid) {
//						if(isValidMusic(musicData)){
							ret.push(createSong(musicData))
						//}
					}
				})
				//console.log(ret)
				return ret
			}
		},
		components:{
			MusicList
		}
	}
</script>

<style scoped lang="stylus" rel="styleet/stylus">
	.slide-enter,.slide-leave-to
		transform:translate3d(100%,0,0)
	.slide-enter-active,.slide-leave-active
		transition:0.4s
		-webkit-transition:0.4s
</style>