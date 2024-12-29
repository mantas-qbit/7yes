<script lang="ts" setup>

defineProps({
    routes: {
        type: Object as PropType<{ label: string, to: string }[]>,
        required: true
    },
})

</script>
<template>
    <nav class="flex" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li v-for="(route, index) in routes" :key="route.to" >
            <div class="flex items-center">
                <svg v-if="index !== 0" class="rtl:rotate-180 w-2 h-2 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m1 9 4-4-4-4"/>
                </svg>
                <NuxtLink :to="{ name: route.to }" class="ms-1 text-sm font-medium text-brand-light-gray hover:text-brand-primary md:ms-2" :class="{
                    '!text-brand-primary': index === routes.length - 1
                }">{{ route.label }}</NuxtLink>
            </div>
        </li>
    </ol>
    </nav>
</template>