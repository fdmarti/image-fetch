<template>
	<a
		class="p-5 border-2 max-w-[200px] h-[200px] flex flex-col items-center rounded-3xl hover:opacity-80 hover:cursor-pointer shadow"
		:href="path"
		:download="id"
	>
		<picture>
			<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-download dark:text-gray-100"><path d="M0 0h24v24H0z" stroke="none"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 11l5 5 5-5m-5-7v12"/></svg>
		</picture>
		<h3 class="text-center font-semibold text-sm mt-5 dark:text-gray-50 max-w-[200px] truncate px-3">{{ mainUrl }}</h3>
	</a>
</template>

<script lang="ts" setup>
	import type { PageZip } from '~/interface/PageZip';

	const { pageData } = defineProps<{ pageData: PageZip }>();
	const { id, path,mainUrl } = pageData;
	
</script>
