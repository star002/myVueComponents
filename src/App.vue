<template>
	<div id="app">
		<router-view />
	</div>
</template>
<style>
	body,
	html {
		margin: 0;
		padding: 0;
		height: 100%;
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		background: #F0EFF6;
	}

	#app {
		width: 100%;
		height: 100%;
		overflow: hidden;
		max-width: 750px;
		margin: 0 auto;
	}
</style>
