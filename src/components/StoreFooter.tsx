import { useState } from 'react'
import { asset } from '../data'
import { Icon } from './ui'

const footerGroups = [
  { title: 'Help & Info', links: ['Help & FAQs', 'Delivery', 'Returns', 'Orders', 'Our Stores'] },
  { title: 'My Account', links: ['My Orders', 'My Addresses', 'My Preferences', 'Terms and Conditions', 'Privacy Policy'] },
  { title: 'About Pro:Direct', links: ['Family owned and run since 1981', 'In the Company of Kings & Queens', 'Over 100,000 5 Star Reviews on Trustpilot'] },
]
export function StoreFooter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  return <footer>
    <div className="service-strip">{[
      { image: 60, text: 'Over 100,000 5 Star Reviews on Trustpilot' },
      { image: 61, text: 'Hassle Free Returns' },
      { image: 62, text: '100% Genuine Brands' },
      { image: 63, text: 'Fast Dispatch, Worldwide Delivery' },
      { image: 64, text: 'Partnered with the PFA' },
    ].map((service) => <a href="#footer-help" key={service.image}><img src={asset(service.image)} alt="" loading="eager" /><span>{service.text}<Icon name="chevron-right" /></span></a>)}</div>
    <div className="footer-main"><div className="footer-heading"><a href="#top"><img src={asset(65)} alt="Pro:Direct" /></a><a className="back-to-top" href="#top">Back to Top<Icon name="chevron-up" /></a></div>
      <div className="footer-columns"><div className="newsletter" id="newsletter"><h3>Join our newsletter for exclusive<br /> offers & deals</h3><label className="email-label" htmlFor="newsletter-email"><input type="radio" checked readOnly /> Email</label><form onSubmit={(event) => { event.preventDefault(); setSubscribed(true) }}><input id="newsletter-email" type="email" required placeholder="Email address" value={email} onChange={(event) => { setEmail(event.target.value); setSubscribed(false) }} aria-label="Email address" /><button type="submit">Submit</button></form>{subscribed ? <p role="status" className="newsletter-success">Thanks! You're on the list for this preview.</p> : null}<div className="app-links"><a href="#newsletter"><img src={asset(66)} alt="Pro:Direct app QR code" />Download the Pro:Direct App</a><a href="#other-departments"><img src={asset(67)} alt="" />Pro:Direct Gift Cards</a></div></div>
        {footerGroups.map((group, index) => <div className="footer-link-group" id={index === 0 ? 'footer-help' : undefined} key={group.title}><h3>{group.title}</h3><div>{group.links.map((link) => <a key={link} href="#about-tennis">{link}</a>)}</div></div>)}
        <div className="footer-social"><img src={asset(68)} alt="Pro:Direct football interview" loading="eager" /><h3>Boots. Players.<br />Culture.</h3><a href="https://www.instagram.com/prodirectsoccer/" target="_blank" rel="noreferrer"><Icon name="instagram" />Pro:Direct Soccer<Icon name="official" /></a></div>
      </div><div className="footer-bottom"><span className="footer-country"><img src="/assets/icons/cambodia.svg" alt="" />Cambodia (USD $)</span><span>© 2026, Pro:Direct Sport</span><div className="payment-logos">{Array.from({ length: 11 }, (_, index) => <img key={index} src={asset(69 + index)} alt={['Visa', 'Mastercard', 'Shop Pay', 'PayPal', 'Klarna', 'Apple Pay', 'Google Pay', 'Amex', 'Union Pay', 'Discover', 'Diners Club'][index]} loading="eager" />)}</div></div>
    </div>
  </footer>
}

export function AboutTennis() {
  return <section className="about-tennis" id="about-tennis"><h2>Pro:Direct Tennis</h2>
    <p>Welcome to Pro:Direct Tennis, your destination for tennis equipment, tennis clothing, tennis shoes, tennis rackets, tennis balls and accessories from the biggest names in the game. Whether you are starting out, playing every week, coaching, competing or replacing worn-out match-day essentials, this is where you can build a setup that suits the way you play.</p>
    <p>Tennis is a game of small margins. A cleaner strike, a sharper first step, a better choice under pressure. Your kit will not win the point for you, but the right racket, shoes, balls and clothing can help you move with more confidence and play with fewer distractions. At Pro:Direct Tennis, you can shop performance tennis gear from trusted brands including Nike, adidas, ASICS, Wilson, Babolat, Dunlop, Yonex, Tecnifibre and HEAD.</p>
    <h3>Tennis Shoes Built for Real Court Movement</h3><p>Footwork shapes every point. The split step before the return, the push into a wide forehand, the slide, plant and recovery after a long rally. Good tennis shoes need to support those movements without feeling heavy, unstable or disconnected from the court.</p>
    <p>Shop men's tennis shoes and women's tennis shoes built for grip, comfort, stability and speed across different court surfaces. Hard court players often need cushioning and durability for repeated impact. Clay court players need traction that bites without clogging. All-court players need a balanced feel that can handle different sessions, surfaces and playing styles. Whether you prefer lightweight tennis shoes for quick changes of direction or more stable shoes for long baseline rallies, Pro:Direct Tennis gives you choice across Nike tennis shoes, adidas tennis shoes, ASICS tennis shoes and more.</p>
    <h3>Tennis Rackets for Power, Control, Spin and Feel</h3><p>Every player connects with a racket differently. Some want easy power and depth from the back of the court. Some want control on flatter strikes. Others look for spin, touch or comfort on a more connected feel on serve and return. The right tennis racket should suit your swing rather than make you work around it.</p>
    <p>At Pro:Direct Tennis, you can shop tennis rackets from Babolat, Wilson, Yonex, Tecnifibre and HEAD, with options for beginners, improving players and advanced competitors. From powerful frames like the Babolat Pure Drive to control-focused rackets, spin-friendly designs and player-led ranges such as the Wilson RF line, the range gives players a clear way to choose by playing style, weight, head size, string pattern and feel.</p>
    <h3>Tennis Balls for Training, Coaching and Match Play</h3><p>A good tennis ball keeps the rally honest. Bounce, feel, visibility and durability all affect the rhythm of a session, whether you are working through basket drills, playing a club match or getting a few sets in after work. If the ball dies too quickly or feels inconsistent off the strings, the whole session suffers.</p>
    <p>Pro:Direct Tennis stocks tennis balls from Wilson, Babolat and Dunlop, with options for practice, match play and all-court use. Choose pressure balls for a lively, match-ready response, or durable training balls that can handle repeated sessions, coaching drills and regular club play. Whether you are topping up for the weekend or buying for a full training block, the right tennis balls help keep every session consistent.</p>
    <h3>Tennis Clothing, Bags and Accessories</h3><p>A strong tennis setup goes beyond racket and shoes. Tennis clothing needs to move cleanly, manage heat and stay comfortable through long rallies, quick changes of direction and stop-start match play. Tennis bags need to carry rackets, shoes, clothing, balls and smaller essentials without turning every trip to court into a packing problem.</p>
    <p>Shop tennis clothing, tennis bags and accessories at Pro:Direct Tennis, with performance pieces for training, match days and travel to court. From lightweight tops, shorts, skirts and dresses to socks, grips, dampeners and racket bags, the range covers details that keep players ready before the first serve.</p>
    <h3>Why Shop Tennis at Pro:Direct?</h3><p>Pro:Direct Tennis brings together trusted brands, strong category depth and the kit players search for most. You can compare tennis rackets, shop tennis shoes by surface, stock up on tennis balls, refresh your clothing and complete your setup in one place.</p>
    <p>Whether you are finding your first racket, upgrading your shoes, buying balls for the weekend or building a full tennis setup for the season, Pro:Direct Tennis gives you a clear route to gear that suits your level, surface and style of play.</p><p>Explore the latest tennis equipment, tennis shoes, tennis rackets, tennis balls, clothing and accessories at Pro:Direct Tennis.</p>
  </section>
}


