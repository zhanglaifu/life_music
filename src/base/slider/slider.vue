<template>
	<div class="slider" ref="slider">
		<div class="slider-group" ref="sliderGroup">
			<slot></slot>
		</div>
		<div class="dots">
			<span class="dot" :class="{active:currentPageIndex === index}" v-for="(item,index) in dots"></span>
		</div>
	</div>
	
</template>

<script>
	import {addClass} from "common/js/dom"
	import BScroll from "better-scroll"
	export default{
		name:'slider',
		props:{ 		//不知道为什么能传
			loop:{
				type:Boolean,
				default:true
			},
			autoPlay:{
				type:Boolean,
				default:true
			},
			interval:{
				type:Number,
				default:2000
			}
		},
		data(){
			return {
				dots: [],
				currentPageIndex : 0  //当前索引
			}
		},
		mounted(){
			setTimeout( ()=>{
				this._setSliderWidth()
				this._initDots()
				this._initSlider()
				
				if(this.autoPlay){
					this._play()
				}
			},20)
			//resize的时候进行重新计算轮播的宽度
			window.addEventListener("resize",()=>{
				if(!this.slider){
					return
				}
				this._setSliderWidth(true)
				this.slider.refresh()
			})
		},
		activated(){
			if(this.autoPlay){
				this._play()
			}
		},
		deactivated(){
			clearTimeout(this.timer)
		},
		beforeDestroy(){
			clearTimeout(this.timer)
		},
		methods:{
			_setSliderWidth(isResize){
				this.children = this.$refs.sliderGroup.children
				let widthAll = 0
				let sliderWidth = this.$refs.slider.clientWidth
				for (let i=0; i < this.children.length;i++){
					let child = this.children[i]
					addClass(child,'slider-item')   //遍历主要是为了给每一个slider item加上类名。
					child.style.width = sliderWidth + 'px'   //让每一个轮播图的宽度都为最外围的sliderWidth的宽度。
					widthAll += sliderWidth
				}
				
				if(this.loop && !isResize){  
					widthAll += 2*sliderWidth
				}
				
				this.$refs.sliderGroup.style.width = widthAll + 'px'   //设置包裹的sliderGroup的宽度
			},
			_initSlider(){
				this.slider = new BScroll(this.$refs.slider,{
					scrollX:true,
					scrollY:false,
					momentum:false,
					snap:true,
					snapLoop:this.loop,
					snapThreshold:0.3,
					snapSpeed:400
				})
				
				this.slider.on("scrollEnd",() => {
					let pageIndex = this.slider.getCurrentPage().pageX   //获得当前的轮播index 
					//getCurrentPage方法返回一个对象，包含四个属性 x,y,pageX,pageY
					//其中，x 和 y 表示偏移的坐标值，pageX 和 pageY 表示横轴方向和纵轴方向的页面数。
					if(this.loop){
						pageIndex -= 1
					}
					this.currentPageIndex = pageIndex  //让轮播的小点索引等于当前额索引。
					
					//在结束当前滚动的时候检查是否是自动播放 如果是就再调用play方法。
					if(this.autoPlay){
						this._play()
					}
				})
				
				//开始滚动的时候如果是自动播放的就清除定时器   自动播放的时候是不会触发这个函数的
				this.slider.on("beforeScrollStart",()=>{
					//console.log('1')
					if(this.autoPlay){
						clearTimeout(this.timer)
					}
				})
				
			},
			
			_initDots(){
				this.dots = new Array(this.children.length)
			},
			
			_play(){
				//滚动方法，做一个延迟执行的定时器   如果
				let pageIndex = this.currentPageIndex + 1
				if(this.loop){
					pageIndex += 1
				}
				this.timer = setTimeout( () => {
					this.slider.goToPage(pageIndex,0,400) //x轴的页数，y轴的页数，持续的时间
				},this.interval)
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.slider
		min-height:1px
		.slider-group
			position:relative
			overflow:hidden
			white-space:nowrap
			.slider-item
				float:left
				box-sizing:border-box
				overflow:hidden
				text-align:center
				a
					display:block
					width:100%
					overflow:hidden
					text-decoration:none
				img
					display:block
					width:100%
		.dots
			position: absolute
			right:0
			left:0
			bottom:18px
			text-align:center
			font-size:0
			.dot
				display:inline-block
				margin:0 4px
				width:8px
				height:8px
				border-radius:50%
				background:#ddd
				transition:0.3s
				&.active
					width:20px
					border-radius:5px
					background:red
	
</style>