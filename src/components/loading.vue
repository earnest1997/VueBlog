<template>
	<div id="loading">
		<img class="loading" src="../assets/img/loading.gif">
	</div>
</template>
<script type="text/javascript">
export default {
	name:'loading',
	data(){
		return{

		}
	}
}
</script>
<style type="text/css">
#loading{
	width:100%;
	height:100vh;
	position: absolute;
	display: flex;
	display: -webkit-flex;
	-webkit-justify-content:center;
	justify-content:center;
	-webkit-align-items:center;
	align-items: center;
	/*下面这句话不能少*/
	z-index: 100000; 
	background-color:#fff;
}

</style>