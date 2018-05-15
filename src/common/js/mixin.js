import {mapGetters,mapActions,mapMutations} from 'vuex'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
export const playlistMixin = {
	computed: {
		...mapGetters([
			'playList'
		])
	},
	mounted() {
		this.handlePlayList(this.playList)
	},
	activated() {
		this.handlePlayList(this.playList)
	},
	watch:{
		playList(newVal) {
			this.handlePlayList(newVal)
		}
	},
	methods:{
		handlePlayList(playList) {
			throw new Error('component must implement handlePlayList method')
		}
	}
}


export const searchMixin = {
	data() {
		return {
			query:'',
			refreshDelay:120
		}
	},
	computed: {
		...mapGetters([
			'searchHistory'
		])
	},
	methods:{
		blur(){
			this.$refs.searchBox.blur()
		},
		onQueryChange(query){
			this.query = query
		},
		addQuery(query) {
			this.$refs.searchBox.setQuery(query)
		},
		saveSearch() {  //当点击列表中的歌曲的时候就调用这个方法将歌曲存到localStorage
			//alert(1)
			this.saveSearchHistory(this.query)
		},
		...mapActions([
			'saveSearchHistory',
			'deleteSearchHistory'
		])
	},
	
}

export const playerMixin = {
	computed: {
		iconMode() {
			return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
		},
		...mapGetters([
			'sequenceList',
			'playList',
			'currentSong',
			'mode',
			'favoriteList'
		])
	},
	methods: {
	  	//改变播放模式
        changeMode(){
        	const mode = (this.mode + 1) % 3
        	this.SET_MODE(mode)
        	let list = null
        	if(mode === playMode.random){
        		list = shuffle(this.sequenceList)
        	}else{
        		list = this.sequenceList
        	}
        	this.resetCurrentIndex(list) //得到当前歌曲在播放列表总的索引  
        	//只是改变模式 找到索引是为了不让他跳转
        	this.SET_PLAYLIST(list)  //设置播放列表
        },
        resetCurrentIndex(list){ //找到当前播放的index的值 并且设置currentIndex
        	let index = list.findIndex( (item)=>{
        		return item.id === this.currentSong.id
        	})
        	this.SET_CURRENTINDEX(index)  //设置index
        },
        toggleFavorite(song) {
        	if(this.isFavorite(song)) {
        		this.deleteFavoriteList(song)
        	}else {
        		this.saveFavoriteList(song)
        	}
        },
        getFavoriteIcon(song) {
        	if(this.isFavorite(song)) {
        		return 'icon-favorite'
        	}
        	return 'icon-not-favorite'
        },
        isFavorite(song) {
        	const index = this.favoriteList.findIndex( (item) => {
        		return item.id === song.id
        	})
        	return index > -1
        },
        ...mapMutations({
        	SET_PLAYING:'SET_PLAYING',
            SET_CURRENTINDEX : 'SET_CURRENTINDEX',
            SET_MODE:'SET_MODE',
            SET_PLAYLIST:'SET_PLAYLIST',
          
   	 	}),
   	 	...mapActions({
   	 		saveFavoriteList:"saveFavoriteList",
           	deleteFavoriteList:'deleteFavoriteList'
   	 	})
        
	}
}
