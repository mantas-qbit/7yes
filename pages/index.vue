<script lang="ts" setup>
const cartStore = useCartStore()

await Promise.all([
  cartStore.refreshProducts()
])

const products = computed(() => cartStore.products)
</script>

<template>
  <div class="grid grid-cols-2 gap-32">
    <section class="w-full space-y-8 h-screen">
      <p>Home > Shop > Checkout</p>
      <h1 class="text-3xl font-semibold">Checkout</h1>
    </section>

    <section class="w-full space-y-8">
      <div class="space-y-8 sticky top-20">
        <h2 class="text-3xl font-semibold">Order summary <span class="text-brand-light-gray font-normal text-base">({{ products?.length ?? 0 }} items)</span></h2>
        <hr>

        <CartProduct v-for="product in products" v-model:quantity="product.quantity" :key="product.uuid" :thumbnail="product.thumbnail" :title="product.title" :price="product.price" :discount="product.discount" :stock="product.stock" :features="product.features" @remove="cartStore.remove(product)"/>

        <div v-if="!products || products.length === 0" class="space-y-8">
          <p>Your cart is empty!</p>
          <hr>
        </div>

        <div class="p-2 border-2 border-dashed rounded-2xl center gap-5 w-max ">
          <input type="text" class="text-center border-transparent !outline-none uppercase font-medium" placeholder="YOUR COUPON CODE">
          <button class="p-3 px-6 bg-[#edf1f5] rounded-xl hoverable">
            Apply coupon
          </button>
        </div>

        <div class="space-y-2">
          <div class="w-full center !justify-between">
            <p>Subtotal:</p>
            <p>{{ priceToCurrency(cartStore.cartTotals.subtotal) }}</p>
          </div>
          <div class="w-full center !justify-between">
            <p>Taxes:</p>
            <p>{{ priceToCurrency(cartStore.cartTotals.taxes) }}</p>
          </div>
          <div v-if="cartStore.shipping" class="w-full center !justify-between">
            <p>Shipping cost:</p>
            <p>{{ priceToCurrency(cartStore.cartTotals.shipping) }}</p>
          </div>
        </div>

        <hr>
        
        <div class="w-full center text-lg !justify-between">
          <p>Total:</p>
          <p>{{ priceToCurrency(cartStore.cartTotals.total) }}</p>
        </div>
      </div>
    </section>
  </div>
</template>