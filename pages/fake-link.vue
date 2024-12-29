<script lang="ts" setup>

</script>

<template>
    <div class="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div class="text-center">
            <h1 class="mt-4 text-balance text-5xl font-semibold tracking-tight sm:text-7xl">Fake page!</h1>
            <p class="mt-6 text-pretty text-lg font-medium text-brand-light-gray sm:text-xl/8">This is a placeholder page for links.</p>
            <div class="mt-10 flex items-center justify-center gap-x-6">
            <NuxtLink :to="{ name: 'index' }" class="rounded-md bg-brand-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                Go back home
            </NuxtLink>
            </div>
        </div>
    </div>
</template>