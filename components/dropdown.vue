<script lang="ts" setup>
    defineProps({
        to: {
            type: String,
            required: true
        },
        children: {
            type: Array as PropType<{ label: string, to: string }[]>,
            default: null
        }
    })
</script>
<template>
    <div class="m-1 hs-dropdown [--trigger:hover] relative inline-flex z-50">
        <NuxtLink id="hs-dropdown-hover-event" :to type="button" class="hs-dropdown-toggle inline-flex items-center gap-1 disabled:opacity-50 disabled:pointer-events-none cursor-pointer" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
            <slot />
        </NuxtLink>

        <div v-if="children" class="hs-dropdown-menu transition-[opacity,margin] duration-200 hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 nav-bg shadow-md rounded-lg mt-2 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full" role="menu" aria-orientation="vertical" aria-labelledby="hs-dropdown-hover-event">
            <div class="p-1 space-y-0.5 px-3">
                <NuxtLink v-for="child in children" :key="child.label" :to="child.to" class="flex items-center gap-x-3.5 py-2 focus:outline-none border-b-2 border-transparent hover:border-brand-primary" >
                    {{ child.label }}
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<style scoped>
  .nav-bg{
    background-color: #ffffffec;
  }
  .dark-mode .nav-bg{
    background-color: #111111ec;
  }
</style>