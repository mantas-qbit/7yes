<script lang="ts" setup>

const props = defineProps({
  thumbnail: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    default: 0
  },
  stock: {
    type: Number,
    default: 5
  },
  features: {
    type: Object as PropType<Record<string, any>>,
    default: null
  },
})

const quantity = defineModel('quantity', {
  type: Number,
  default: 1
})

const features = computed(() => {
  if(!props.features) return undefined

  const keys = Object.keys(props.features)

  return keys.map(key => {
    return {
      key,
      value: props.features[key]
    }
  })
})

function changeQuanity(amount: number) {
  const newQuantity = quantity.value + amount
  if(newQuantity < 1 || newQuantity > props.stock) return

  quantity.value = newQuantity
}

const emit = defineEmits(['remove'])
</script>

<template>
  <div class="cart">
    <div class="product">
      <div class="w-full col-span-2">
        <NuxtImg format="webp" sizes="132" :src="`images/${thumbnail}`" class="aspect-square object-cover" :alt="`Thumbnail for ${title}`"/>
      </div>

      <div class="col-span-6 space-y-2">
        <p class="title">{{ title }}</p>

        <p v-if="features">
          <span v-for="feature in features" class="pr-4">
            <span class="text-brand-light-gray">{{ feature.key }}:</span>
            {{ feature.value }}
          </span>
        </p>

        <div class="w-min center gap-1">
          <button class="quantity-btn font-semibold" @click="changeQuanity(-1)">-</button>
          <input type="text" class="w-8 text-center !outline-none bg-transparent" disabled v-model="quantity" >
          <button class="quantity-btn font-medium" @click="changeQuanity(1)">+</button>
        </div>
      </div>

      <div class="col-span-1 flex flex-col justify-between items-end">
        <div class="space-y-2 text-end text-lg">
          <p>{{ priceToCurrency((price - discount) * quantity) }}</p>
          <p v-if="discount" class="text-sm text-brand-light-gray line-through">{{ priceToCurrency(price) }}</p>
        </div>

        <button @click="emit('remove')">
          <Icon icon="tabler:trash" class="text-xl text-brand-light-gray hover:text-red-500" />
        </button>
      </div>
    </div>
    <hr>
  </div>
</template>