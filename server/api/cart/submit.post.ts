import { firestore } from '../../utils/firebase'

// example object
interface OrderTemplate {
    firstName: string
    lastName: string
    email: string
    phone: string
    country: string
    city: string
    zip: string
    addressLine1: string
    notes: string
    products: {
      uuid: string,
      thumbnail: string,
      title: string,
      price: number,
      discount: number, 
      quantity: number,
      features: any
    }[]
}

export default defineEventHandler(async (event) => {
    const data: OrderTemplate = await readBody(event)

    if (!data.firstName || !data.lastName || !data.email || !data.phone || !data.country || !data.city || !data.zip || !data.addressLine1 || !data.products) {
        console.error('Missing required fields')
        throw createError({ statusMessage: 'Failed to complete order', status: 400 })
    }

    try {
        firestore.collection('orders').add({
            ...data,
            createdAt: new Date()
        })
    }
    catch (error) {
        console.error(error)
        throw createError({ statusMessage: 'Failed to complete order', status: 500 })
    }
})