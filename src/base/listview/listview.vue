<template>
	<scroll @scroll="scroll"
		:listen-scroll = "listenScroll"
		:probe-type="probeType"
		:data="data"
		class="listview"
		ref="listview"
		>
		<ul>
			<li v-for="group in data" class="list-group" ref="listGroup">
				<h2 class="list-group-title">{{ group.title }}</h2>
				<ul>
					<li v-for="item in group.items" @click="singer(item)" class="list-group-item">
						<img v-lazy="item.avatar" class="avatar" alt="" />
						<span class="name">{{ item.name }}</span>
					</li>
				</ul>
			</li>
		</ul>
		
		<div class="list-shortcut"
			@touchstart.stop.event = "onShortcutTouchStart"
			@touchmove.stop.prevent = "onShortcutTouchMove"
			@touchend.top>
			<ul>
				<li v-for="(item,index) in shortcutList" 
					:data-index="index" class="item" 
					:class="{'current':currentIndex === index}">
					{{ item }}
					
				</li>
			</ul>
		</div>
		<!--用来滚动 固定在顶部的-->
		<div class="list-fixed" ref="fixed" v-show="fixedTitle">
			<div class="fixed-title">{{ fixedTitle }}</div>
		</div>
		<div class="loading-container" v-show="!data.length">
			<loading></loading>
		</div>
	</scroll>
	
</template>

<script>
	import Scroll from 'base/scroll/scroll'
	import Loading from 'base/loading/loading'
	import {getData} from 'common/js/dom'
	const TITLE_HEIGHT = 30
	const AHCHOR_HEIGHT = 18
	
	export default{
		props:{
			data:{
				type:Array,
				default:[]
			}
		},
		computed:{
			shortcutList() { //截取出来数组遍历
				return this.data.map( (group) => {
					return group.title.substr(0,1)
				})
			},
			fixedTitle() { //靠currentIndex的值来进行  取出来title值。
				if( this.scrollY > 0){
					return ''
				}
				return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
			}
		},
		data() {
			return {
				scrollY : -1,	//滚动的y值
				currentIndex : 0,//当前的索引
				diff : -1  //头部固定条的差值
			}
		},
		created(){
			this.probeType = 3 //在滚动的时候可以进行派发。
			this.listenScroll = true  //在created的时候定义这些属性是为了防止在data中被监听。
			this.touch = {}
			this.listHeight = []
		},
		methods:{
			//子组件中通过方法触发父组件的方法并且传递数据
			singer(item){
				this.$emit('singerDetail',item)
			},
			onShortcutTouchStart(e){
				let anchorIndex = getData(e.target,'index')
				let firstTouch = e.touches[0]
				this.touch.y1 = firstTouch.pageY   //让touch对象的pageY位置 等于属性y1的值	
				this.touch.anchorIndex = anchorIndex  //让touch对象的属性anchorIndex指向等于当前的Index
			},
			onShortcutTouchMove(e) {
				let firstTouch = e.touches[0]
				this.touch.y2 = firstTouch.pageY
				let delta = (this.touch.y2 - this.touch.y1)/AHCHOR_HEIGHT | 0
				let anchorIndex = parseInt(this.touch.anchorIndex) + delta
				this._scrollTo(anchorIndex)  //调用scrollto方法
			},
			refresh() {
				this.$refs.listview.refresh()
			},
			scroll(pos){ //接受子组件传递过来的数据
				this.scrollY = pos.y
			},
			_calculateHeight(){
				this.listHeight = []
				const list = this.$refs.listGroup
				
				let height = 0
				this.listHeight.push(height)   //[0,10,20,30]这样子的排列
				for(let i=0;i < list.length;i++){
					let item = list[i]
					height += item.clientHeight
					this.listHeight.push(height)
				}
			},
			_scrollTo(index){
				if(!index && index !== 0){
					return 
				}
				if(index < 0){
					index = 0
				}else if (index > this.listHeight.length - 2){
					index = this.listHeight.length - 2  //index大于最后一个的索引就让他等于最后一个
				}
				this.scrollY = -this.listHeight[index]
				this.$refs.listview.scrollToElement(this.$refs.listGroup[index],0)
			}
		},
		watch:{
			data(){
				setTimeout( () =>{
					this._calculateHeight()
				},20)	//在有数据传递过来的时候进行计算得到listHeight数组
			},
			scrollY(newY){		//滚动的时候通过方法调用判断出currentIndex，计算出diff值 然后通过watch监听
				const listHeight = this.listHeight
				if(newY > 0){
					this.currentIndex = 0
					return
				}
				for(let i = 0;i < listHeight.length-1 ;i++){
					let height1 = listHeight[i]
					let height2 = listHeight[i+1]
					if(-newY >= height1 && -newY < height2){
						this.currentIndex = i
						this.diff = height2 + newY //计算出diff 就是下面的高度跟页面额当前y的高度差
						return
					}
				}
				//当滚动到底部，且-newY大于最后一个元素的上限
				this.currentIndex = listHeight.length - 2
			},
			diff(newVal){
				let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal-TITLE_HEIGHT : 0
				if(this.fixedTop === fixedTop){
					return
				}
				this.fixedTop = fixedTop
				this.$refs.fixed.style.transform = 	`tranlate3d(0,${fixedTop}px,0)`
			}
		},
		components:{
			Scroll,
			Loading
			
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import '~common/stylus/variable'
	.listview
		position:relative
		width:100%
		height:100%
		overflow:hidden
		background:$color-background
		.list-group
			padding-bottom:30px
			.list-group-title
				height:30px
				line-height:30px
				padding-left:20px
				font-size:$font-size-small
				color:$color-text-l
				background:$color-highlight-background
			.list-group-item
				display:flex
				align-items:center
				padding:20px 0 0 30px
				.avatar 
					width:50px
					height:50px
					border-radius:50%
				.name
					margin-left:20px
					color:$color-text-l
					font-size:$font-size-medium
		.list-shortcut
			position:absolute
			z-index:30
			right:0
			top:50%
			transform:translateY(-50%)
			width:20px
			padding:20px 0 
			border-radius:10px
			text-align:center
			background:$color-background-d
			font-family:Helvetica
			.item
				padding:3px
				line-height:1
				color:$color-text-l
				font-size:$font-size-small
				&.current
					color:$color-theme	
		.list-fixed
			position:absolute
			top:-1px
			left:0
			width:100%
			.fixed-title
				height:30px
				line-height:30px
				padding-left:20px
				transition:0.4s
				font-size:$font-size-small
				color:$color-text-l
				background:$color-highlight-background
		.loading-container
			position:absolute
			width:100%
			top:50%
			transform:translateY(-50%)
</style>