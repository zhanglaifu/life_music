import { playMode } from 'common/js/config'
import {loadSearch} from 'common/js/cache'
const state = {
	singer : {},
	playing:false,
	fullScreen:false,
	sequenceList:[],
	playList:[],
	currentIndex:-1,
	mode:playMode.sequence,
	disc:{},
	topList:{},
	searchHistory:loadSearch(),  //初始值从缓存中读取。
	playHistory:[],
	favoriteList : []
}
export default state
