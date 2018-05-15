<template>
    <div class="progress-bar" ref="progressBar" @click="progressClick">
        <div class="bar-inner">
            <div class="progress" ref="progress"></div>
            <div class="progress-btn-wrapper" ref="progressBtn"
                @touchstart.prevent = 'progressTouchStart'
                 @touchmove.prevent = 'progressTouchMove'
                 @touchend = 'progressTouchEnd'
            >
                <div class="progress-btn"></div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">

    import {prefixStyle} from 'common/js/dom'
   	const progressBtnWidth = 16
    const transform = prefixStyle('transform')
//  console.log(transform)
    export default{
        created(){
            this.touch = {}
        },
        props:{
            percent : {
                type:Number,
                default:0
            }
        },
        watch:{
            percent(newPercent) {
                if(newPercent >= 0 && !this.touch.initiated){  //这个initiated就是用来确定优先级的 touch优先级最高 所以在拖动小球的时候小球不会又被拉回去
                    const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
                    const offsetWidth = newPercent * barWidth //偏移的宽度
                    this.$refs.progress.style.width = `${offsetWidth}px`
                    this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)` //小球的偏移
                }
            }
        },
        methods:{
        	progressClick(e){
        		const rect = this.$refs.progressBar.getBoundingClientRect()
        		const offsetWidth = e.pageX - rect.left
        		this._offset(offsetWidth)
        		this._trigglePercent(offsetWidth)
        	},
            progressTouchStart(e){
                this.touch.initiated = true
                this.touch.startX = e.touches[0].pageX  //记录偏离左边的距离
                this.touch.left = this.$refs.progress.clientWidth //进度条进行的位置宽度
            },
            progressTouchMove(e){
                if(!this.touch.initiated){
                    return
                }
                const deltaX = e.touches[0].pageX  - this.touch.startX  //偏移了多少距离。
                const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth,Math.max(0,this.touch.left + deltaX))
            	this.touch.width = offsetWidth  //向touch对象中塞入一个进度条目前的宽度
            	this._offset(offsetWidth)
            },
            progressTouchEnd(){
            	this.touch.initiated=false
            	this._trigglePercent(this.touch.width)
            },
            //让按钮跟进度条动起来
            _offset(offsetWidth){
            	this.$refs.progress.style.width = `${offsetWidth}px`
            	this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`
            },
            _trigglePercent(width){
            	const newPercent = width/(this.$refs.progressBar.clientWidth-progressBtnWidth)
            	this.$emit('percentChange',newPercent)
            }
            
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
	
	.progress-bar
		height:30px
		.bar-inner
			position: relative
			top:13px
			height:4px
			background:rgba(0,0,0,0.3)
			.progress
				position: absolute
				height:100%
				background:$color-theme
			.progress-btn-wrapper
				position: absolute
				left:-8px
				top:-13px
				width:30px
				height:30px
				.progress-btn
					position: relative
					top:7px
					left:7px
					box-sizing:border-box
					width:16px
					height:16px
					border:3px solid $color-text
					border-radius:50%
					background:$color-theme
</style>