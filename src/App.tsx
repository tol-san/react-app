import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { asset, products, releases, departments, articles, categories } from './data'
import type { Product } from './data'
import { StoreHeader } from './components/StoreHeader'
import { StoreFooter, AboutTennis } from './components/StoreFooter'
import { Icon, Modal } from './components/ui'
import './App.css'

function Carousel({ title, children, className = '' }: { title?: string; children: ReactNode; className?: string }) {
  const track = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  function move(direction: number) {
    const element = track.current
    if (element) element.scrollBy({ left: direction * element.clientWidth * 0.8, behavior: 'smooth' })
  }
  return <section className={`carousel ${className}`} id={className}>
    <div className="section-heading">{title ? <h2>{title}</h2> : <span />}
      <div className="carousel-controls"><div className="track-progress"><span style={{ left: `${progress * 70}%` }} /></div>
        <button aria-label={`Previous ${title || 'social links'}`} onClick={() => move(-1)}><Icon name="chevron-left" /></button>
        <button aria-label={`Next ${title || 'social links'}`} onClick={() => move(1)}><Icon name="chevron-right" /></button>
      </div>
    </div>
    <div className="carousel-track" ref={track} onScroll={(event) => { const el = event.currentTarget; setProgress(el.scrollLeft / Math.max(1, el.scrollWidth - el.clientWidth)) }}>{children}</div>
  </section>
}

const slides = [
  { desktop: 5, mobile: 4, title: 'Made For Your Game', subtitle: 'Discover the Wilson Ultra collection', target: 'rackets' },
  { desktop: 8, mobile: 7, title: "Return Of The 90's", subtitle: 'Classic 90s style meets modern performance', target: 'shoes' },
  { desktop: 10, mobile: 9, title: 'The Art Of Tennis Style', subtitle: 'Elevated tennis apparel for wherever the day takes you', target: 'clothing' },
]

function Hero() {
  const [slide, setSlide] = useState(() => window.matchMedia('(min-width: 1024px)').matches ? 1 : 2)
  const [playing, setPlaying] = useState(true)
  useEffect(() => {
    const breakpoint = window.matchMedia('(min-width: 1024px)')
    const change = () => setSlide(breakpoint.matches ? 1 : 2)
    breakpoint.addEventListener('change', change)
    return () => breakpoint.removeEventListener('change', change)
  }, [])
  useEffect(() => {
    if (!playing || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(() => setSlide((current) => (current + 1) % slides.length), 15000)
    return () => window.clearInterval(timer)
  }, [playing])
  const current = slides[slide]
  return <section className="hero" aria-label="Featured collections">
    <picture key={slide}><source media="(max-width: 599px)" srcSet={asset(current.mobile)} /><img className="hero-image" src={asset(current.desktop)} alt={current.title} fetchPriority="high" /></picture>
    <img className="obsessed-logo" src={asset(6)} alt="Tennis obsessed." />
    <div className="hero-content"><div className="hero-pagination">
      {slides.map((item, index) => <button key={item.title} className={index === slide ? 'selected' : ''} aria-label={`Show ${item.title}`} aria-pressed={index === slide} onClick={() => { setSlide(index); setPlaying(false) }} />)}
      <span className="pagination-divider" /><button className="pause-button" aria-label={playing ? 'Pause slideshow' : 'Play slideshow'} onClick={() => setPlaying(!playing)}><Icon name={playing ? 'pause' : 'play'} /></button>
    </div><h1>{current.title}</h1><p>{current.subtitle}</p><div className="hero-actions"><a href={`#${current.target}`}>Shop men's</a><a href={`#${current.target}`}>Shop women's</a></div></div>
  </section>
}

function ProductCard({ product, saved, onSave, onOpen }: { product: Product; saved: boolean; onSave: () => void; onOpen: () => void }) {
  return <article className="product-card"><div className="product-image">
    <button className="product-open" onClick={onOpen} aria-label={`View ${product.name}`}><img src={asset(product.image)} alt={product.name} loading="eager" /><img className="product-alternate" src={asset(product.image + 1)} alt="" loading="eager" /></button>
    <button className={`save-button ${saved ? 'saved' : ''}`} aria-label={`${saved ? 'Remove' : 'Save'} ${product.name}`} aria-pressed={saved} onClick={onSave}><Icon name="heart" /></button>
    <span className="discount">{product.discount}% OFF | SAVE <span className="discount-amount">${(product.original - product.price).toFixed(2)}</span></span>
  </div><button className="product-name" onClick={onOpen}>{product.name}</button><p className="product-price">${product.price.toFixed(2)} <s>${product.original.toFixed(2)}</s></p></article>
}

function CategorySection({ id, title, items, className = '' }: { id: string; title?: string; items: { image: number; title: string; description?: string }[]; className?: string }) {
  return <section id={id} className={`category-section ${className}`}>{title ? <h2>{title}</h2> : null}<div className="category-grid">{items.map((item) => <a className="category-card" href="#latest-rackets" key={item.image}><img src={asset(item.image)} alt={item.title} loading="eager" /><div className="category-label"><h3>{item.title}<Icon name="chevron-right" /></h3>{item.description ? <p>{item.description}</p> : null}</div></a>)}</div></section>
}

function App() {
  const [saved, setSaved] = useState<number[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [basket, setBasket] = useState<{ product: Product; grip: string }[]>([])
  const [grip, setGrip] = useState('')
  const [panel, setPanel] = useState<'basket' | 'wishlist' | null>(null)
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null)
  const [toast, setToast] = useState('')
  useEffect(() => { if (!toast) return; const timer = window.setTimeout(() => setToast(''), 3500); return () => window.clearTimeout(timer) }, [toast])
  function save(id: number) { setSaved((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]) }
  function open(product: Product) { setGrip(''); setSelectedProduct(product) }
  return <>
    <StoreHeader basketCount={basket.length} savedCount={saved.length} onBasket={() => setPanel('basket')} onWishlist={() => setPanel('wishlist')} onProduct={open} />
    <main>
      <Hero />
      <Carousel title="Shop by Department" className="department-carousel">{departments.map((department) => <a href={`#${department.target}`} className="department-card" key={department.image}><img src={asset(department.image)} alt="" /><div><h3>{department.name}</h3><p>Shop Now</p></div></a>)}</Carousel>
      <section className="latest-rackets" id="latest-rackets"><div className="racket-intro"><h2>The Latest Tennis Rackets</h2><p>Upgrade your game with the latest tennis rackets from the sport's leading brands.<br className="desktop-break" /> Designed for power, control and spin, these new frames feature the newest technologies to help you perform at your best on every point.</p><a href="#racket-products">Shop now</a></div>
        <div className="racket-feature"><img className="racket-feature-image" src={asset(17)} alt="The latest Yonex, HEAD, Wilson and Babolat tennis rackets" loading="eager" /></div>
        <div className="product-grid" id="racket-products">{products.map((product) => <ProductCard key={product.id} product={product} saved={saved.includes(product.id)} onSave={() => save(product.id)} onOpen={() => open(product)} />)}</div>
      </section>
      <Carousel title="New Releases" className="release-carousel">{releases.map((release) => <a className="release-card" key={release.image} href="#latest-rackets"><img src={asset(release.image)} alt={release.name} loading="eager" /><h3>{release.name}</h3><p>{release.date}</p></a>)}</Carousel>
      <CategorySection id="rackets" title="Tennis Rackets" items={categories.rackets} />
      <CategorySection id="shoes" title="Shop Shoes" items={categories.shoes} className="shoe-section" />
      <CategorySection id="clothing" title="Shop Clothing" items={categories.clothing} />
      <CategorySection id="clothing-collections" items={categories.collections} className="collections-section" />
      <Carousel title="Other Departments" className="other-departments">{categories.other.map((item) => <a className="other-card" key={item.image} href="#latest-rackets"><img src={asset(item.image)} alt={item.title} loading="eager" /><h3>{item.title}</h3><span>Shop now</span></a>)}</Carousel>
      <Carousel title="The Locker Room" className="locker-room">{articles.map((article, index) => <article className="article-card" key={article.image}><button onClick={() => setSelectedArticle(index)} aria-label={`Read ${article.title}`}><img src={asset(article.image)} alt={article.title} loading="eager" /></button><h3>{article.title}</h3><p>{article.description}</p><button className="text-link" onClick={() => setSelectedArticle(index)}>Read now</button></article>)}</Carousel>
      <Carousel className="social-carousel">{['Instagram', 'Facebook', 'TikTok', 'YouTube'].map((name, index) => <a className="social-card" href={['https://www.instagram.com/prodirecttennis/', 'https://www.facebook.com/ProDirectTennis/', 'https://www.tiktok.com/@prodirecttennis', 'https://www.youtube.com/@ProDirectTennis'][index]} target="_blank" rel="noreferrer" key={name}><img src={asset(56 + index)} alt="" loading="eager" /><h3>{name}</h3></a>)}</Carousel>
      <AboutTennis />
    </main>
    <StoreFooter />
    {selectedProduct ? <Modal title={selectedProduct.name} onClose={() => setSelectedProduct(null)}><div className="product-detail"><img src={asset(selectedProduct.image)} alt={selectedProduct.name} /><div><p className="detail-brand">{selectedProduct.name.split(' ')[0]}</p><h2>{selectedProduct.name}</h2><p className="product-price">${selectedProduct.price.toFixed(2)} <s>${selectedProduct.original.toFixed(2)}</s></p><p>Discover your next match-day racket. Designed for confidence, control and performance on court.</p><label htmlFor="grip">Grip size</label><select id="grip" value={grip} onChange={(event) => setGrip(event.target.value)}><option value="">Choose a grip size</option>{['L1 — 4 1/8', 'L2 — 4 1/4', 'L3 — 4 3/8', 'L4 — 4 1/2'].map((size) => <option key={size}>{size}</option>)}</select><button className="primary-button" disabled={!grip} onClick={() => { setBasket((current) => [...current, { product: selectedProduct, grip }]); setToast('Added to your bag'); setSelectedProduct(null) }}>Add to bag</button><button className="secondary-button" onClick={() => save(selectedProduct.id)}>{saved.includes(selectedProduct.id) ? 'Remove from wishlist' : 'Save to wishlist'}</button></div></div></Modal> : null}
    {panel ? <Modal title={panel === 'basket' ? 'Your bag' : 'Your wishlist'} onClose={() => setPanel(null)}><div className="bag-items">{panel === 'basket' ? <>{basket.length === 0 ? <p>Your bag is empty. Find your next racket below.</p> : basket.map((item, index) => <div className="bag-item" key={`${item.product.id}-${index}`}><img src={asset(item.product.image)} alt="" /><div><h3>{item.product.name}</h3><p>{item.grip}</p><p>${item.product.price.toFixed(2)}</p><button className="text-link" onClick={() => setBasket((current) => current.filter((_, i) => i !== index))}>Remove</button></div></div>)}{basket.length ? <p className="bag-total">Subtotal <strong>${basket.reduce((total, item) => total + item.product.price, 0).toFixed(2)}</strong></p> : null}</> : <>{saved.length === 0 ? <p>Your wishlist is empty. Save a racket with the heart button.</p> : products.filter((product) => saved.includes(product.id)).map((product) => <div className="bag-item" key={product.id}><img src={asset(product.image)} alt="" /><div><h3>{product.name}</h3><p>${product.price.toFixed(2)}</p><button className="text-link" onClick={() => { setPanel(null); open(product) }}>View racket</button><button className="text-link" onClick={() => save(product.id)}>Remove</button></div></div>)}</>}<button className="primary-button" onClick={() => { setPanel(null); document.getElementById('latest-rackets')?.scrollIntoView({ behavior: 'smooth' }) }}>Continue shopping</button></div></Modal> : null}
    {selectedArticle !== null ? <Modal title={articles[selectedArticle].title} onClose={() => setSelectedArticle(null)}><div className="article-detail"><img src={asset(articles[selectedArticle].image)} alt={articles[selectedArticle].title} /><p>{articles[selectedArticle].description}</p><p>Find the equipment that suits your style of play. Explore our latest rackets and accessories, and step onto court with confidence.</p><a className="primary-button" href="#rackets" onClick={() => setSelectedArticle(null)}>Explore tennis rackets</a></div></Modal> : null}
    {toast ? <div className="toast" role="status">{toast}</div> : null}
  </>
}

export default App


