<template>
	<div id="close-icon-demo" class="app-page">
		<div class="app-page-header">
			<navigation-bar page-title="close-icon按钮"></navigation-bar>
		</div>
		<div class="app-page-section">
			<scroll-view :scroll-y="true">
				<div style="height: 32px;"></div>
				<close-icon></close-icon>
				<close-icon background="rgba(0,0,0,0)" color="#000000" size="72px" line-height="4px"></close-icon>
			</scroll-view>
		</div>
	</div>
</template>

<script>
	import componentNavigationBar from "@/components/navigation-bar"
	import componentScrollView from "@/components/scroll-view"
	import componentCloseIcon from "@/components/close-icon"
	export default {
		name: "close-icon-demo",
		components: {
			'navigation-bar': componentNavigationBar,
			'scroll-view': componentScrollView,
			'close-icon': componentCloseIcon
		}
	}
</script>

<style scoped="scoped">

</style>
