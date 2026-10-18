import { useState } from 'react'
import { asset, products } from '../data'
import type { Product } from '../data'
import { Icon, Modal } from './ui'

const navigation = ['Rackets', 'Mens', 'Womens', 'Kids', 'Balls', 'Equipment', 'Strings', 'Tennis Lifestyle', 'Pickleball', 'Sale']
const targets = ['rackets', 'shoes', 'clothing', 'rackets', 'other-departments', 'other-departments', 'other-departments', 'clothing', 'rackets', 'latest-rackets']
export function StoreHeader({ basketCount, savedCount, onBasket, onWishlist, onProduct }: { basketCount: number; savedCount: number; onBasket: () => void; onWishlist: () => void; onProduct: (product: Product) => void }) {
  const [menu, setMenu] = useState(false)
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [account, setAccount] = useState(false)
  const [country, setCountry] = useState(false)
  const results = products.filter((product) => product.name.toLowerCase().includes(query.trim().toLowerCase()))
  return <header id="top"><div className="announcement"><a href="#newsletter">Sign Up to our Newsletter</a><div><a href="#footer-help">Our Stores</a><a href="#locker-room">Tennis Blog</a></div></div>
    <nav className="sports-nav" aria-label="Sports">{['Football', 'Running', 'Lifestyle', 'Rugby', 'Basketball', 'Tennis', 'Padel', 'Cricket', 'Kids', 'Outlet'].map((sport) => <a href={sport === 'Tennis' ? '#top' : '#other-departments'} className={sport === 'Tennis' ? 'active' : ''} key={sport}>{sport}</a>)}</nav>
    <div className="main-header"><div className="header-brand"><button className="menu-button" aria-label="Open navigation" aria-expanded={menu} onClick={() => setMenu(!menu)}><Icon name="hamburger" /></button><a href="#top" aria-label="Pro:Direct Tennis home"><img className="tennis-logo" src={asset(3)} alt="Pro:Direct Tennis" /></a></div>
      <div className="search-container"><form className="search-form" role="search" onSubmit={(event) => { event.preventDefault(); setSearchOpen(true) }}><Icon name="search" /><input aria-label="Search tennis products" placeholder="Search" value={query} onFocus={() => setSearchOpen(true)} onChange={(event) => { setQuery(event.target.value); setSearchOpen(true) }} onKeyDown={(event) => { if (event.key === 'Escape') setSearchOpen(false) }} />{query ? <button type="button" aria-label="Clear search" onClick={() => { setQuery(''); setSearchOpen(false) }}><Icon name="inline-02" /></button> : null}</form>
        {searchOpen && query.trim() ? <div className="search-results"><div className="search-result-heading"><strong>Search results</strong><button aria-label="Close search results" onClick={() => setSearchOpen(false)}><Icon name="inline-02" /></button></div>{results.length ? results.map((product) => <button className="search-result" key={product.id} onClick={() => { setSearchOpen(false); onProduct(product) }}><img src={asset(product.image)} alt="" /><span>{product.name}<strong>${product.price.toFixed(2)}</strong></span></button>) : <p>No rackets found. Try Wilson, HEAD, Yonex or Babolat.</p>}</div> : null}
      </div><div className="header-actions"><button className="country-button" aria-label="Country and currency" onClick={() => setCountry(true)}><img src="/assets/icons/cambodia.svg" alt="Cambodia" /></button><button aria-label="My account" onClick={() => setAccount(true)}><Icon name="account" /></button><button className="wishlist-header" aria-label={`Wishlist, ${savedCount} saved items`} onClick={onWishlist}><Icon name="heart" />{savedCount ? <span className="header-count">{savedCount}</span> : null}</button><button aria-label={`Shopping bag, ${basketCount} items`} onClick={onBasket}><Icon name="cart" />{basketCount ? <span className="header-count">{basketCount}</span> : null}</button></div>
    </div><nav className="category-nav" aria-label="Tennis categories">{navigation.map((name, index) => <a className={name === 'Sale' ? 'sale-link' : ''} href={`#${targets[index]}`} key={name}>{name}</a>)}</nav>
    {menu ? <nav className="mobile-menu" aria-label="Mobile tennis navigation">{navigation.map((name, index) => <a href={`#${targets[index]}`} key={name} onClick={() => setMenu(false)}>{name}<Icon name="chevron-right" /></a>)}</nav> : null}
    {account ? <Modal title="My account" onClose={() => setAccount(false)}><p>Keep your favourites together and find your next match-day essentials.</p><button className="primary-button" onClick={() => { setAccount(false); onWishlist() }}>View your wishlist</button><button className="secondary-button" onClick={() => { setAccount(false); onBasket() }}>View your bag</button></Modal> : null}
    {country ? <Modal title="Country and currency" onClose={() => setCountry(false)}><p>Your store is set to Cambodia.</p><label htmlFor="currency">Currency</label><select id="currency" defaultValue="USD"><option value="USD">USD — US Dollar ($)</option></select><button className="primary-button" onClick={() => setCountry(false)}>Continue</button></Modal> : null}
  </header>
}


