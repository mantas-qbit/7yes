<script lang="ts" setup>

const menu = [
  {
    label: 'Categories',
    to: 'fake-link',
    children: [
      {
        label: 'Category one',
        to: 'fake-link'
      },
      {
        label: 'Category Two',
        to: 'fake-link'
      },
      {
        label: 'Category Three',
        to: 'fake-link'
      }
    ]
  },
  {
    label: 'Pages',
    to: 'fake-link',
    children: [
      {
        label: 'Page one',
        to: 'fake-link'
      },
      {
        label: 'Page Two',
        to: 'fake-link'
      },
      {
        label: 'Page Three',
        to: 'fake-link'
      }
    ]
  },
  {
    label: 'Account',
    to: 'fake-link',
    children: [
      {
        label: 'Profile',
        to: 'fake-link'
      },
      {
        label: 'Settings',
        to: 'fake-link'
      },
      {
        label: 'Logout',
        to: 'fake-link'
      }
    ]
  },
  {
    label: 'Blog',
    to: 'fake-link'
  },
  {
    label: 'Reviews',
    to: 'fake-link'
  }
]

</script>

<template>
  <header class="h-16 lg:h-20 fixed w-full top-0 bg-white/95 backdrop-blur-sm z-50">
    <div class="containerize h-full center !justify-between">
      <section class="center gap-32 h-full">
        <NuxtLink to="/" class="text-5xl font-semibold text-brand-primary">
          <p>7 <span class="font-[700] text-black">yes</span></p>
        </NuxtLink>

        <div class="center gap-10">
          <NuxtLink v-for="button in menu" :key="`menu-${button.label.toLowerCase()}`" :to="{ name: button.to }" class="center gap-1">
            <p>{{ button.label }}</p>
            <Icon v-if="button.children" icon="material-symbols:keyboard-arrow-down-rounded" class="text-xl" />
          </NuxtLink>
        </div>
      </section>

      <section class="center gap-5">
        <div class="center gap-1">
          <Icon icon="tabler:sun" class="text-xl" />

          <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" class="sr-only peer">
            <div class="relative w-11 h-6 bg-brand-primary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
          </label>

          <Icon icon="tabler:moon" class="text-lg" />
        </div>

        <button>
          <Icon icon="tabler:search" class="text-2xl" />
        </button>

        <NuxtLink :to="{ name: 'fake-link'}">
          <Icon icon="tabler:user" class="text-2xl" />
        </NuxtLink>

      </section>
    </div>
  </header>
</template>