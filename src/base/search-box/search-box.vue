<template>
	<div class="search-box">
		<i class="icon-search"></i>
		<input type="text" ref="query" :placeholder="placeholder" v-model="query" class="box" />
		<i @click="clear" v-show="query" class="icon-dismiss"></i>
	</div>
</template>

<script>
	import {debounce} from 'common/js/search'
	export default {
		props: {
			placeholder: {
				type: String,
				default:'搜索歌曲、歌手'
			}
		},
		data() {
			return {
				query :''
			}
		},
		methods: {
			clear() {
				this.query=""
			},
			setQuery(query){
				this.query=query
			},
			blur() {
				this.$refs.query.blur()
			}
			
		},
		
		created() {
			//文本发生的时候派发事件传递数据。
			this.$watch('query',debounce( (newQuery) => {
				this.$emit('query',newQuery)
			},200))
			
		}
	}
</script>

<style scoped lang="stylus" rel="styleet/stylus">
	@import "~common/stylus/variable"
	.search-box
		display:flex
		align-items:center
		box-sizing:border-box
		width:100%
		padding:0 6px
		height:40px
		background:$color-highlight-background
		border-radius:6px
		.icon-search
			font-size:24px
			color:$color-background
		.box
			flex:1
			margin:0 5px
			line-height:18px
			background:$color-highlight-background
			color:$color-text
			font-size:$font-size-medium
			&::placeholder 
				color:$color-text-d
		.icon-dismiss
			font-size:16px
			color:$color-background
</style>