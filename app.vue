<script lang="ts" setup>
const colorMode = useColorMode()

</script>

<template>
  <main :class="colorMode.value">
    <AppNavigation />
    
    <div class="containerize pt-20">
      <div class="nuxt-page">
        <NuxtPage/>
      </div>

      <AppFooter />
    </div>
  </main>
</template>

<style>
  body {
    background-color: #fff;
    color: rgba(0,0,0,0.8);
  }
  .dark-mode body {
    background-color: #1f1f1f;
    color: #ebf4f1;
  }
</style>