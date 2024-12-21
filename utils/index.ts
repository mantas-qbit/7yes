const VAT = 0.2;

export function priceToCurrency(price: number, includeVAT = false): string {
  const priceToUse = includeVAT ? price * VAT : price;
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(priceToUse);
}