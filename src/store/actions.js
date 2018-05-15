import * as types from './mutation-types'
import {playMode} from 'common/js/config'
import { shuffle } from 'common/js/util'
import {saveSearch,clearSearch,deleteSearch,savePlay,saveFavorite,deleteFavorite} from 'common/js/cache'

function findIndex(list,song) { //es6的语法 接受两个参数一个是匿名函数另外一个是匹配的值   //函数返回index满足条件的索引的值。	
	return list.findIndex( (item)=>{
			return item.id === song.id
		})
	}
	

//接受两个参数一个是context上下文对象，第二个是payload负载

export const selectPlay = function ({ commit,state},{list,index}){
    commit(types.SET_SEQUENCELIST,list)
    if(state.mode===playMode.random){
    	let randomList = shuffle(list)
    	index = findIndex(randomList,list[index])
    	commit(types.SET_PLAYLIST,randomList)  //设置播放列表  随机的列表
    }else{
    	commit(types.SET_PLAYLIST,list)
    }
 
    commit(types.SET_CURRENTINDEX,index)
    commit(types.SET_FULLSCREEN,true)
    commit(types.SET_PLAYING,true)
}

//点击随机播放全部的时候触发
export const randomPlay = function({commit},{list})  {
	commit(types.SET_MODE,playMode.random)
	commit(types.SET_SEQUENCELIST,list)
	let randomList = shuffle(list)
	commit(types.SET_PLAYLIST,randomList)
	commit(types.SET_CURRENTINDEX,0)
	commit(types.SET_FULLSCREEN,true)
	commit(types.SET_PLAYING,true)
}

//将搜索的歌曲push到播放列表中。
export const insertSong = function ({commit,state},song) {
	let playList  = state.playList.slice()
	let sequenceList = state.sequenceList.slice()
	let currentIndex = state.currentIndex
	//记录当前歌曲
	let currentSong = playList[currentIndex]
	//查找当前列表中是否有带插入的歌曲并返回其索引
	
	let fpIndex = findIndex(playList,song)
	currentIndex++
	playList.splice(currentIndex,0,song)
	//如果已经包含了这首歌
	if(fpIndex > -1){
		//如果当前插入的序号大于列表中的序号
		if(currentIndex > fpIndex) {
			playList.splice(fpIndex,1)
			currentIndex--
		} else {
			playList.splice(fpIndex+1,1) //以为添加了一个歌曲 所以要加1
		}
	}
	
	let currentSIndex = findIndex(sequenceList,currentSong) + 1 
	
	let fsIndex = findIndex(sequenceList,song)
	sequenceList.splice(currentSIndex,0,song)
	
	if(fsIndex > -1) {
		if(currentSIndex > fsIndex) {
			sequenceList.splice(fsIndex,1)
		} else {
			sequenceList.splice(fsIndex+1,1)
		}
	}
	commit(types.SET_PLAYLIST,playList)
	commit(types.SET_SEQUENCELIST,sequenceList)
	commit(types.SET_CURRENTINDEX,currentIndex)
	commit(types.SET_FULLSCREEN,true)
	commit(types.SET_PLAYING,true)
}

export const saveSearchHistory = function({commit},query) {
	commit(types.SET_SEARCHHISTORY,saveSearch(query))
}

export const deleteSearchHistory = function({commit},query) {
	commit(types.SET_SEARCHHISTORY,deleteSearch(query))
}

export const clearSearchHistory = function({commit}) {
	commit(types.SET_SEARCHHISTORY,clearSearch())
}

export const deleteSong = function ({commit,state},song) {
	let playList = state.playList.slice()
	let sequenceList = state.sequenceList.slice()
	let currentIndex = state.currentIndex
	let pIndex = findIndex(playList,song)
	playList.splice(pIndex,1)   //将当前的歌曲给删掉 
	let sIndex=  findIndex(sequenceList,song)
	sequenceList.splice(sIndex,1)
	if(currentIndex > pIndex || currentIndex === playList.length) {
		currentIndex--
	}
	 commit(types.SET_PLAYLIST, playList)
	 commit(types.SET_SEQUENCELIST, sequenceList)
	 commit(types.SET_CURRENTINDEX, currentIndex)
	
	  if (!playList.length) {
	    commit(types.SET_PLAYING, false)
	  } else {
	    commit(types.SET_PLAYING, true)
	  }
}

export const deleteSongList = function ({commit}) {
  commit(types.SET_CURRENTINDEX, -1)
  commit(types.SET_PLAYLIST, [])
  commit(types.SET_SEQUENCELIST, [])
  commit(types.SET_PLAYING, false)
}

export const savePlayHistory = function ({commit}, song) {
  commit(types.SET_PLAYHISTORY, savePlay(song))
}

export const saveFavoriteList = function({commit},song) {
	commit(types.SET_FAVORITELIST,saveFavorite(song))
}
export const deleteFavoriteList = function({commit},song) {
	commit(types.SET_FAVORITELIST,deleteFavorite(song))
}
