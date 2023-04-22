<template>
	<div class="col-12 text-center text-caption" style="color: #ffff">
		&copy; Richard  <br/>  {{ currentYear }}
	</div>
</template>

<script type="text/javascript">
	export default {
    name: 'CopyrightComponent',
		computed: {
			currentYear(){
				return new Date().getFullYear();
			},
		}
	};
</script>
