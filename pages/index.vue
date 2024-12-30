<script lang="ts" setup>
import { listCities, listCountries } from 'cclist'
import { toast } from 'vue3-toastify'

useSeoMeta({
  title: 'Secure Checkout - Complete Your Order Quickly',
  ogTitle: 'Fast & Secure Checkout - Shipping and Payment Made Simple',
  description: 'Complete your order seamlessly with our user-friendly checkout process. Choose from multiple shipping methods.',
  ogDescription: 'Simplify your shopping journey with our streamlined checkout. Select from flexible shipping options and secure payment methods.',
  ogUrl: 'https://7yes.qbit.lt',
  ogType: 'website',
  ogImage: {
      url: 'https://7yes.qbit.lt/images/seo.webp',
      width: 2000,
      height: 1047,
      alt: '7Yes - Checkout page',
      type: 'image/png',
  },
})

const cartStore = useCartStore()

await Promise.all([
  cartStore.refreshProducts()
])

const products = computed(() => cartStore.products)

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  country: '',
  city: '',
  zip: '',
  addressLine1: '', // might need line 2 and 3
  notes: '',
  billing: {
    // used data:
    sameAsShipping: false,
    // prop data:
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    zip: '',
    addressLine1: '',
    notes: ''
  },
  payment: 'card',
  acceptTerms: false
})

const shippingMethods = [
  {
    id: 'shipping-standard',
    label: 'Standard Delivery',
    price: 8,
    duration: 'Delivery in 5 - 8 working days'
  },
  {
    id: 'shipping-express',
    label: 'Express Shipping',
    price: 15,
    duration: 'Delivery in 3 - 5 working days'
  },
  {
    id: 'shipping-local',
    label: 'Local Pickup',
    price: 0,
    duration: 'Delivery in 1 - 2 working days'
  }
]

const paymentMethods = [
  {
    id: 'credit-card',
    label: 'Credit Card',
    value: 'card',
    description: 'Mastercard, Maestro, American Express, Visa are accepted'
  },
  {
    id: 'cash',
    label: 'Cash on Delivery',
    value: 'cash',
    description: 'Pay with cash upon the delivery'
  }
]

const routes = [
  {
    label: 'Home',
    to: 'index',
  },
  {
    label: 'Shop',
    to: 'index'
  },
  {
    label: 'Checkout',
    to: 'index'
  }
]

const countries = computed(() => {
  return listCountries('name code')
})

const cities = computed(() => {
  const cauntry = form.value.country
  const selection = countries.value.find((c: any) => c.name === cauntry)
  if (!selection) return []

  const cities = listCities(selection.code)

  return cities.map((c: string) => ({ name: c }))
})

function checkform() {
  const data = form.value
  if(!data.firstName || !data.lastName || !data.email || !data.phone || !data.country || !data.city || !data.zip || !data.addressLine1) {
    const el = document.getElementById('checkout-label')
    el?.scrollIntoView()
  }
}

async function placeOrder(){
  const id = toast.loading('Completing purchase...', {
      "type": "info",
  })

  await $fetch('/api/cart/submit', {
    method: 'POST',
    body: {
      ...form.value,
      products: cartStore.products,
    },
  }).then(() => {
    toast.update(id, {
        render: 'Order completed successfully! Redirecting...',
        "type": "success",
        isLoading: false,
        autoClose: true,
    })
    // fake redirect
    setTimeout(() => {
      navigateTo({ name: 'success' }, { replace: true })
    }, 1000)
  }).catch((err) => {
    toast.update(id, {
        render: 'An error occurred while processing your order. Please try again later.',
        "type": "error",
        isLoading: false,
        autoClose: true,
    })
    console.error(err)
  })
}
</script>

<template>
  <Breadcrumbs :routes class="block lg:hidden pb-5"/>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 xl:gap-32">
    <!-- checkout form -->
    <section class="w-full space-y-9 order-2 lg:order-1">
      <Breadcrumbs :routes class="hidden lg:block"/>
      <h1 class="text-3xl font-semibold" id="checkout-label">Checkout</h1>

      <form class="cart-form" @submit.prevent="placeOrder()">
        <div class="space-y-5 pb-10">
          <p class="text-brand-light-gray">1. <span class="uppercase underline">Shipping details</span></p>
  
          <div class="grid-row">
            <CartInput v-model:value="form.firstName" :max="70" required label="First name" placeholder="Your first name" type="text" id="first-name"/>
            <CartInput v-model:value="form.lastName" :max="70" required label="Last name" placeholder="Your last name" type="text" id="last-name"/>
          </div>
  
          <div class="grid-row">
            <CartInput v-model:value="form.email" :max="50" required label="Email" placeholder="Email address" :icon="{ name: 'iconamoon:email-light', position: 'left' }" type="email" id="email"/>
            <CartInput v-model:value="form.phone" :max="15" required label="Phone" placeholder="+1__ __ _" :icon="{ name: 'material-symbols:call-outline', position: 'left' }" type="tel" id="phone"/>
          </div>
  
          <CartInput v-model:value="form.country" v-model:options="countries" required label="Country" placeholder="Select a country" type="select" id="country"/>
  
          <div class="grid-row">
            <CartInput v-model:value="form.city" v-model:options="cities" required label="City" placeholder="Select a city" type="select" id="city"/>
            <CartInput v-model:value="form.zip" :max="8" required label="Zip code" placeholder="XXX-XXXX" type="text" id="zip"/>
          </div>
  
          <CartInput v-model:value="form.addressLine1" required label="Address line" type="text" id="address-line-one"/>
  
          <CartInput v-model:value="form.notes" label="Notes" type="textarea" id="notes"/>
  
          <InputCheck v-model:model="form.billing.sameAsShipping" id="billing-check-box">
            <template #default>
              <p>Billing address same as delivery</p>
            </template>
          </InputCheck>
        </div>
  
        <fieldset class="space-y-8 pb-10">
          <p class="text-brand-light-gray">2. <span class="uppercase underline">Shipping method</span></p>
  
          <InputRadio v-for="option in shippingMethods" :key="option.id" name="shipping" v-model="cartStore.shipping" :id="option.id" :label="option.label" :value="option.price" :feature="option.price" :description="option.duration" required/>
        </fieldset>
  
        <fieldset class="space-y-5 pb-10">
          <p class="text-brand-light-gray">3. <span class="uppercase underline">Payment method</span></p>
  
          <InputRadio v-for="option in paymentMethods" :key="option.id" name="payment" v-model="form.payment" :id="option.id" :label="option.label" :value="option.value" :description="option.description" required/>
        </fieldset>
        
        <div class="space-y-5 pb-5 md:pb-20">
          <InputCheck v-model:model="form.acceptTerms" id="terms-check-box" :center="false" required>
            <template #default>
              <p class="text-brand-light-gray">Your personal information will be used to process your order, to support your experience on this site and for other purposes described in the <NuxtLink :to="{ name: 'fake-link'}" class="text-brand-primary underline">privacy policy</NuxtLink>.</p>
            </template>
          </InputCheck>
  
          <button class="btn bg-brand-primary text-white" @click="checkform()">
            Place an order
          </button>
        </div>
      </form>
    </section>

    <!-- cart -->
    <section class="w-full space-y-8 order-1 lg:order-2">
      <!-- could be: sticky top-20 -->
      <div class="space-y-8 cart">
        <h2 class="text-3xl font-semibold">Order summary <span class="text-brand-light-gray font-normal text-base">({{ cartStore.numberOfProducts }} items)</span></h2>
        <hr>

        <CartProduct v-for="product in products" v-model:quantity="product.quantity" :key="product.uuid" :thumbnail="product.thumbnail" :title="product.title" :price="product.price" :discount="product.discount" :stock="product.stock" :features="product.features" @remove="cartStore.remove(product)"/>

        <div v-if="!products || products.length === 0" class="space-y-8">
          <p>Your cart is empty!</p>
          <hr>
        </div>

        <div class="p-2 border-2 border-dashed rounded-2xl center gap-5 sm:w-max">
          <input type="text" class="text-center border-transparent !outline-none uppercase font-medium md:px-5 w-full bg-transparent" maxlength="15" placeholder="YOUR COUPON CODE">
          <button class="btn text-sm sm:text-base bg-[#edf1f5] dark:bg-[#363636] min-w-max !duration-200">
            Apply coupon
          </button>
        </div>

        <div class="space-y-2 ">
          <div class="total-container ">
            <p>Subtotal:</p>
            <p>{{ priceToCurrency(cartStore.cartTotals.subtotal) }}</p>
          </div>
          <div class="total-container">
            <p>Taxes:</p>
            <p>{{ priceToCurrency(cartStore.cartTotals.taxes) }}</p>
          </div>
          <div v-if="cartStore.shipping" class="total-container">
            <p>Shipping cost:</p>
            <p>{{ priceToCurrency(cartStore.cartTotals.shipping) }}</p>
          </div>
        </div>

        <hr>

        <div class="total-container text-lg">
          <p class="!text-black dark:!text-white">Total:</p>
          <p class="text-2xl">{{ priceToCurrency(cartStore.cartTotals.total) }}</p>
        </div>
        
      </div>
    </section>
  </div>
</template>
