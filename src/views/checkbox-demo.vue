<template>
	<div id="checkbox-demo" class="app-page">
		<div class="app-page-header">
			<navigation-bar page-title="checkbox"></navigation-bar>
		</div>
		<div class="app-page-section">
			<scroll-view :scroll-y="true">
				<div style="height: 32px;"></div>
				<checkbox v-bind:value="true">第一个复选框</checkbox>
				<checkbox v-bind:value="false">第二个复选框</checkbox>
			</scroll-view>
		</div>
	</div>
</template>

<script>
	import componentNavigationBar from "@/components/navigation-bar"
	import componentScrollView from "@/components/scroll-view"
	import componentCheckbox from "@/components/checkbox"
	export default {
		name: "checkbox-demo",
		components: {
			'navigation-bar': componentNavigationBar,
			'scroll-view': componentScrollView,
			'checkbox': componentCheckbox
		}
	}
</script>

<style scoped="scoped">

</style>
