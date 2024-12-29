<script lang="ts" setup>

defineProps({
    id: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    value: {
        type: [Number, String],
        required: false
    },
    description: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    feature: {
        type: Number,
        required: false,
    }
})

const model = defineModel<any>({
    required: true
})

</script>
<template>
    <div class="w-full flex items-start justify-between">
        <div class="inline-flex items-start">
          <label class="relative flex items-center cursor-pointer" :for="id">
            <input :name v-model="model" :id :value="value ?? label" type="radio" class="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-brand-primary checked:border-[5px] transition-all">
          </label>
          <div class="w-full flex flex-col ml-2">            
              <label :for="id" class="cursor-pointer w-full">{{ label }}</label>
              <label class="text-brand-light-gray">{{ description }}</label>
          </div>
        </div>
        <p v-if="(typeof feature !== 'undefined')">{{ feature ? priceToCurrency(feature) : 'Free' }}</p>
    </div>

</template>