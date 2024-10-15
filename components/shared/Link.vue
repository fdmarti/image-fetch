<template>
    <NuxtLink :to="route" class="hover:text-green-400">
        {{ text }}
    </NuxtLink>
</template>

<script setup lang="ts">
interface Props {
    text: string;
    route: string;
}

const { text, route } = defineProps<Props>();
</script>
