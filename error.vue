<template>
	<div class="default min-h-[100vh] bg-slate-300 relative">
		<div class="bg-slate-200 relative py-7 px-3 sm:px-0 w-full text-center">
			<h1 class="text-gray-800 font-bold text-7xl mb-3">
				{{ error.statusCode }}
			</h1>
			<p class="text-gray-600 mb-5">{{ error.statusMessage }}</p>

			<RouterLink class="text-xl" to="/">Go back Home</RouterLink>
		</div>
	</div>
</template>

<script setup lang="ts">
	useHead({
		title: 'Error',
		meta: [{ name: 'description', content: "Page that doesn't exist" }],
	});

	interface Props {
		error: any;
	}

	const { error } = defineProps<Props>();
</script>
