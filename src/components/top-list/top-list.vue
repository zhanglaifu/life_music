<template>
	<transition name="slide">
		<music-list :rank="rank" :title="title" :bg-image="bgImage" :songs="songs"></music-list>
	</transition>
</template>

<script>
	import MusicList from 'components/music-list/music-list'
	import {getMusicList} from 'api/rank'
	import {mapGetters} from 'vuex'
	import {createSong,isValidMusic,processSongsUrl} from 'common/js/song'
	import {ERR_OK} from 'api/config'
	export default {
		data(){
			return {
				songs:[],
				rank:true
			}
		},
		computed: {
			title() {
				return this.topList.topTitle
			},
			bgImage() {
				return this.songs.length ? this.songs[0].image : ''
			},
			...mapGetters([
				'topList'
			])
		},
		created() {
			this._getMusicList()
		},
		methods:{
			_getMusicList() {
				if(!this.topList.id) {
					this.$router.push('/rank')
					return
				}
				getMusicList(this.$route.params.id).then( (res) => {
					if(res.code === ERR_OK ) {
						processSongsUrl(this._normalizeSongs(res.songlist)).then((songs) => {
							//console.log(songs)
							this.songs = songs;
						})
					}
				})
			},
			_normalizeSongs(list) {
				let ret = []
				list.forEach( (item) => {
					const musicData = item.data
					if(musicData.songid && musicData.albummid) {
						if(isValidMusic(musicData)) {
							ret.push(createSong(musicData));
						}
					}
				})
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