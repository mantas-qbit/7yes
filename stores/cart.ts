interface CartProduct {
  uuid: string
  thumbnail: string,
  title: string,
  price: number,
  discount: number,
  stock: number,
  quantity: number,
  features: Record<string, any>
}

export const useCartStore = defineStore('cart', () => {
  const shipping = ref(15)

  const { data: products, refresh: refreshProducts } = useAsyncData(async () => {
    const res: CartProduct[] = await $fetch('/api/cart/products', { method: 'GET' })

    return res
  }, { immediate: false })

  function getFinalProductPrice(product: CartProduct) {
    const discounted = product.price - (product.discount ?? 0)
    return discounted * (product.quantity ?? 1)
  }

  function remove(product: CartProduct) {
    if(!products.value) return

    products.value = products.value.filter(p => p.uuid !== product.uuid)
  }

  const cartTotals = computed(() => {
    if(!products.value) return { subtotal: 0, taxes: 0, shipping: 0, total: 0 }

    const subtotal = products.value.reduce((acc, product) => acc + getFinalProductPrice(product), 0)
    const taxes = subtotal * 0.2
    const total = subtotal + taxes + shipping.value

    return { subtotal, taxes, shipping: shipping.value, total }
  })

  const numberOfProducts = computed(() => {
    if(!products.value) return 0

    return products.value.reduce((acc, product) => acc + (product.quantity ?? 1), 0)
  })

  return {
    numberOfProducts,
    cartTotals,
    products,
    shipping,
    remove,
    refreshProducts
  }
})