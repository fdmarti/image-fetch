<template>
    <header class="flex justify-between items-center p-5">
        <div>
            <NuxtLink to="/">
                <h1 class="dark:text-gray-200 text-gray-800 font-bold text-3xl">
                    Image Fetch
                </h1>
            </NuxtLink>
        </div>
        <nav>
            <ul class="flex gap-5 text-gray-200 font-semibold items-center">
                <section>
                    <ButtonTheme v-if="isDark" @click="changeTheme">
                        <ImagesSun />
                    </ButtonTheme>
                    <ButtonTheme v-else @click="changeTheme">
                        <ImagesMoon />
                    </ButtonTheme>
                </section>
            </ul>
        </nav>
    </header>
</template>
<script setup lang="ts">
import { useDark } from '../composables';

const { changeTheme, isDark, loadCurrentTheme } = useDark();

onMounted(() => loadCurrentTheme('image-fetch-theme'));
</script>
