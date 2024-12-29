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

const mobileMenu = computed(() => {
  return [{
    label: '',
    to: '',
    children: menu.map(item => {
      return {
        label: item.label,
        to: item.to
      }
    })
  }]
})
const colorMode = useColorMode()

const color = ref(false)

watch(color, (val) => {
  colorMode.preference = val ? 'dark' : 'light'
})

onMounted(() => {
  color.value = colorMode.value === 'dark'
})
</script>

<template>
  <header class="h-16 lg:h-20 fixed w-full top-0 nav-bg transition-colors duration-200 backdrop-blur-sm z-50">
    <div class="containerize h-full center !justify-between">
      <section class="center gap-32 h-full">
        <NuxtLink to="/" class="text-4xl sm:text-5xl font-semibold text-brand-primary">
          <p>7 <span class="font-[700] text-black dark:text-white transition-colors duration-200">yes</span></p>
        </NuxtLink>

        <div class="center gap-10 !hidden xl:!flex">
          <Dropdown v-for="button in menu" :key="button.to" :to="button.to" :children="button.children">
            <template #default>
              <p> {{ button.label }} </p>
              <Icon v-if="button.children" class="text-xl transition-all duration-200" icon="material-symbols:keyboard-arrow-down-rounded" alt="arrow icon"/>
            </template>
          </Dropdown>
        </div>
      </section>

      <section class="center gap-5">
        <div class="center gap-1">
          <Icon icon="tabler:sun" class="text-xl" />

          <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="color" value="" class="sr-only peer">
            <div class="relative w-11 h-6 bg-brand-primary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
          </label>

          <Icon icon="tabler:moon" class="text-lg" />
        </div>

        <button>
          <Icon icon="tabler:search" class="text-2xl" />
        </button>

        <NuxtLink class="hidden xl:block" :to="{ name: 'fake-link'}">
          <Icon icon="tabler:user" class="text-2xl" />
        </NuxtLink>

        <Dropdown v-for="button in mobileMenu" class="block xl:hidden" :key="button.to" :to="button.to" :children="button.children">
          <template #default>
            <Icon icon="mdi:menu" class="-ml-2 text-2xl" />
          </template>
        </Dropdown>
          
      </section>
    </div>
  </header>
</template>

<style scoped>
  .nav-bg{
    background-color: #ffffffec;
  }
  .dark-mode .nav-bg{
    background-color: #1f1f1fec;
  }
</style>