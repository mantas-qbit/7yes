<script lang="ts" setup>

defineProps({
    label: {
        type: String,
        required: true
    },
    placeholder: {
        type: String,
        default: ''
    },
    type: {
        type: String as PropType<'text' | 'email' | 'tel' | 'number' | 'select' | 'textarea'>, 
        default: 'text'
    },
    icon: {
        type: Object as PropType<{ name: string, position: 'left' | 'right' }>,
        required: false
    },
    id: {
        type: String,
        required: true
    },
    max: {
        type: Number,
        required: false
    },
    required: {
        type: Boolean,
        default: false
    },
})

const value = defineModel<number | string>('value', {
    required: true
})

// for select
const options = defineModel<{name: string, code: string}[]>('options', {
    required: false
})

const triggers = ref({
    active: false,
    invalid: false
})

const formOutline = computed(() => {
    const active = []
    if (triggers.value.active) active.push('border-brand-primary') 
    if (triggers.value.invalid) active.push('border-red-500')
    return active.join(' ')
})

</script>
<template>
    <div class="w-full space-y-1">
        <label :for="id" class="">{{ label }} <span v-if="!required" class="text-brand-light-gray">(optional)</span></label>
        <div v-if="type === 'select'" class="input-outline" :class="formOutline">
            <select v-model="value" :id :required class="w-full !outline-none bg-transparent" :class="{'text-[#9da4b0]': value === ''}" @focusin="triggers.active = true" @focusout="triggers.active = false" @invalid="triggers.invalid = true" @change="triggers.invalid = false">
                <option value="" disabled selected>{{ placeholder }}</option>
                <option v-for="option in options" :key="option.name" :value="option.name">{{ option.name }}</option>
            </select>
        </div>

        <textarea v-else-if="type === 'textarea'"  v-model="value" :id :maxlength="max" class="w-full min-h-36 max-h-60 !outline-none input-outline bg-transparent" :class="formOutline" @focusin="triggers.active = true" @focusout="triggers.active = false" />

        <div v-else class="input-outline center gap-2" :class="formOutline">
            <Icon v-if="icon" :icon="icon.name" class="text-brand-light-gray h-5 w-5" :class="{ 'order-2': icon.position === 'right'}"/>
            <input v-model="value" :type :id :placeholder :max :maxlength="max" :required class="w-full !outline-none bg-transparent" @focusin="triggers.active = true" @focusout="triggers.active = false" @invalid="triggers.invalid = true" @keypress="triggers.invalid = false"/>
        </div>
    </div>
</template>