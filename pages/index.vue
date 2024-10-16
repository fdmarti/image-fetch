<template>
    <h2 class="text-center dark:text-gray-200 text-gray-800 font-medium mt-5">
        Upload a valid URL with images to download
    </h2>
    <form
        class="max-w-3xl flex flex-col items-center mx-auto gap-4 mt-5 pb-5"
        @submit.prevent="handleSubmitForm"
    >
        <input
            type="url"
            placeholder="https://example.com/"
            class="py-2 px-4 w-full rounded-md outline-none bg-gray-200 focus:outline-slate-200"
            v-model="url"
            required
        />
        <ButtonAction>
            <span v-if="isLoading">Cargando...</span>
            <span v-else>Download images</span>
        </ButtonAction>
    </form>

    <hr />

    <section
        v-if="urlToDownloadList.length > 0"
        class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 pt-5 px-3 place-items-center"
    >
        <CardDownload v-for="url in urlToDownloadList" :pageData="url" />
    </section>
</template>
<script setup lang="ts">
useHead({
    title: 'Image Fetch',
    meta: [
        {
            name: 'description',
            content: 'Page that dowload image for any website with the img tag',
        },
    ],
});

const { urlToDownloadList } = useUseDownolad();
const { loadUrlFromPath, updateLocalStorageUrlList } = useUseLocalStorage();
const { url, isLoading, handleSubmitForm } = useFetchImage();

watch(urlToDownloadList.value, (newValue) => {
    updateLocalStorageUrlList(newValue);
});

onMounted(() => {
    const list = loadUrlFromPath();
    if (list.length > 0) {
        urlToDownloadList.value = list;
    }
});
</script>
