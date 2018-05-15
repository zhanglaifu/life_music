<template>
	<div ref="wrapper">
		<slot></slot>
	</div>
</template>

<script>
	import BScroll from "better-scroll"
	export default {
		props:{
			probeType:{
				type:Number,
				default:1
			},
			click:{
				type:Boolean,
				default:true
			},
			data:{
				type:Array,
				default:null
			},
			listenScroll:{
				type:Boolean,
				default:false
			},
			pullup: {
				type:Boolean,
				default:false
			},
			beforeScroll: {
				type:Boolean,
				default:false
			},
			refreshDelay:{
				type:Number,
				default:20
			}
		},
		mounted(){
			setTimeout( () => {
				this._initScroll()
			},20)
		},
		methods:{
			_initScroll(){
				if(!this.$refs.wrapper){
					return
				}
				this.scroll = new BScroll(this.$refs.wrapper,{
					probeType:this.probeType,
					click:this.click
				})
				
				if(this.listenScroll){
					let me = this
					this.scroll.on('scroll',(pos) => { //父子组件之间通信
						me.$emit('scroll',pos)
					})
				}
				
				if(this.pullup) {
					this.scroll.on('scrollEnd',() => {
						if(this.scroll.y <= (this.scroll.maxScrollY + 50)){    //当滚动的y值小于maxscrollY+50的时候，maxScrollY是负值。
							this.$emit('scrollToEnd')
						}
					})
				} 
				
				//在滚动之前派发一个事件用于父组件进行处理数据
				if(this.beforeScroll) {
					this.scroll.on('beforeScrollStart',() => {
						this.$emit('beforeScroll')
					})
				} 
			},
			enable(){
				this.scroll && this.scroll.enable()
			},
			disable(){
				this.scroll && this.scroll.disable()
			},
			refresh(){
				this.scroll && this.scroll.refresh()
			},
			scrollTo(){
				this.scroll && this.scroll.scrollTo.apply(this.scroll,arguments)
			},
			scrollToElement(){
				this.scroll && this.scroll.scrollToElement.apply(this.scroll,arguments)
			}
		},
		watch:{
			data(){		//监听数据data变化 ， 调用refresh方法对高度进行重新计算
				setTimeout( () => {
					this.refresh()
				},this.refreshDelay)
			}
		}
	}
</script>

<style>
</style>