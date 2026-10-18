import assetFiles from './assets.json'
export function asset(number: number) {
  return (assetFiles as Record<string, string>)[number] || ''
}

export type Product = { id: number; image: number; name: string; price: number; original: number; discount: number }
export const products: Product[] = [
  { id: 1, image: 18, name: 'Yonex Muse 100 Tennis Racket (Unstrung)', price: 220, original: 260, discount: 15 },
  { id: 2, image: 20, name: 'HEAD Extreme MP 2026 Tennis Racket', price: 178, original: 210, discount: 15 },
  { id: 3, image: 22, name: 'Wilson Defyer 98 Pro V1 Tennis Racket (Unstrung)', price: 225, original: 250, discount: 10 },
  { id: 4, image: 24, name: 'Babolat Pure Drive Team Spectra LTD Edition Tennis Racket', price: 182, original: 215, discount: 15 },
]
export const departments = [
  { image: 11, name: 'Wilson Rackets', target: 'rackets' }, { image: 12, name: 'Babolat Rackets', target: 'rackets' },
  { image: 13, name: "Men's Nike Shoes", target: 'shoes' }, { image: 14, name: "Men's ASICS Shoes", target: 'shoes' },
  { image: 15, name: 'Shorts', target: 'clothing' }, { image: 16, name: 'T-Shirts', target: 'clothing' },
]
export const releases = [
  { image: 26, name: 'Wilson Ultra UV Orange 103 SMU', date: '22nd September 2026' },
  { image: 27, name: 'Wilson Blade US Open 2026', date: '24th August 2026' },
  { image: 28, name: 'Yonex Espresso Collection', date: '21st August 2026' },
  { image: 29, name: 'Babolat Spectra Collection', date: '28th July 2026' },
  { image: 30, name: 'HEAD Extreme Collection', date: '16th July 2026' },
  { image: 31, name: 'Wilson Defyer Collection', date: '9th July 2026' },
  { image: 32, name: 'Tecnifibre T-Fight', date: 'Discover the collection' },
  { image: 33, name: 'HEAD Speed Collection', date: 'Discover the collection' },
]
export const categories = {
  rackets: [{ image: 38, title: 'Adults Rackets' }, { image: 39, title: 'Kids Rackets' }],
  shoes: [{ image: 40, title: "Men's Footwear" }, { image: 41, title: "Women's Footwear" }, { image: 42, title: 'Kids Footwear' }],
  clothing: [{ image: 43, title: "Men's Clothing" }, { image: 44, title: "Women's Clothing" }],
  collections: [{ image: 45, title: 'Tennis Clothing Essentials', description: 'Shop the core clothing collections from adidas, Nike and Lacoste' }, { image: 46, title: 'Kids Clothing', description: 'Shop the latest junior and kids clothing' }, { image: 47, title: 'Nike Tennis Apparel For Every Match', description: 'Engineered for movement, designed for performance' }],
  other: [{ image: 48, title: 'Bags' }, { image: 49, title: 'Balls' }, { image: 50, title: 'Grips' }, { image: 51, title: 'Accessories' }],
}
export const articles = [
  { image: 52, title: 'Wilson Defyer: First Look', description: "Spin is tennis' most annoying weapon. Wilson Defyer is built for players who want the ball to kick high, dip late and make the next shot awkward, with a fast-moving frame, stable feel and enough response to keep swinging with intent." },
  { image: 53, title: 'How To Choose The Right Tennis Racket Grip Size', description: 'The right grip size means control and comfort. Measure up, try it out, and find your fit to dominate the court.' },
  { image: 39, title: 'Kids Tennis Racket Size Guide', description: "Choose the right kids tennis racket size by age and height, use the one-inch rule to check fit, and learn smart tips for moving up size safely." },
  { image: 54, title: 'Tennis Ball Buying Guide', description: 'From red and orange starter balls to pressurised pro balls, this Pro:Direct Tennis guide explains what to buy, what lasts, and what suits your game.' },
  { image: 55, title: 'Babolat Racket Guide', description: 'Get the lowdown on the Babolat range. Strike, drive and spin your way to the right Babolat tennis racket for your game.' },
]
