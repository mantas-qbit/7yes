export default defineEventHandler((_event) => {

  // authenticate user 

  // get user cart

  // return
  return [
    {
      uuid: '202dcdd6-3fb6-4f48-b709-4658f1a2ef7e',
      thumbnail: 'candle.webp',
      title: 'Candle in concrete bowl',
      price: 7.5,
      discount: 2, // per each item
      stock: 10,
      quantity: 2,
      features: { color: 'Gray night', weight: '140g' }
    },
    {
      uuid: '671a7bc0-d86f-4646-a32d-163f7c21c112',
      thumbnail: 'glass-vase.webp',
      title: 'Exquisite glass vase',
      price: 23,
      quantity: 1,
      stock: 5,
    },
    {
      uuid: 'b3b3e0a7-0e7b-4e6b-9e5e-3f7a4f4d8b1b',
      thumbnail: 'party-dinner-set.webp',
      title: 'Set for a dinner party of 7 items',
      price: 47,
      quantity: 1,
      stock: 6,
    }
  ]
})