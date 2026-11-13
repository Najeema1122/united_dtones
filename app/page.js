"use client";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Gem, ShieldCheck, Headset, LayoutGrid, Truck, Hammer, MapPin, Phone, Instagram, Play, Menu, X, Search, MessageCircle } from "lucide-react";
import Link from "next/link";
import FeaturedVideos from "../components/FeaturedVideos";

const customerCarePhone = "+91 00000 00000";
const callCustomerCare = "tel:" + customerCarePhone.replace(/\s/g, "");

const slides = [
  { image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=90", title: <>Everything you need<br />for flooring,<br /><em>all in one place.</em></> },
  { image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2200&q=90", title: <>Spaces shaped<br />by stone,<br /><em>made timeless.</em></> },
  { image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=2200&q=90", title: <>Natural beauty<br />for the way<br /><em>you live.</em></> },
  { image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2200&q=90", title: <>Find your finish.<br />Discover your<br /><em>forever floor.</em></> },
];
const categories = [
  { name: "Marbles", href: "/gallery/marble", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85" },
  { name: "Granites", href: "/gallery/granite", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=85" },
  { name: "Tiles", href: "/gallery/tiles", image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=85" },
  { name: "Tandoor & Kadappa", href: "/gallery/natural-stones", image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85" },
];
const services = [
  [Truck, "Material Supply", "Marble, granite, tiles and natural stones delivered to your site."],
  [Headset, "Expert Guidance", "Honest advice on the right stone, finish and quantity."],
  [Hammer, "Floor Installation", "Skilled fitting of your chosen stone on your floor."],
];
const benefits = [[Gem, "Premium Quality", "Only the finest stones."], [ShieldCheck, "Durable & Timeless", "Built to last."], [Headset, "Expert Guidance", "Always here to help."], [LayoutGrid, "Elegant Designs", "For every space."]];

function AnimatedLogo() {
  const letters = Array.from({ length: 12 }, (_, index) => index + 1);
  const renderLetter = (letter) => (
    <img
      key={letter}
      className="logo-letter"
      src={`/united-stones-letter-${String(letter).padStart(2, "0")}.png`}
      alt=""
      aria-hidden="true"
      style={{ animationDelay: `${0.18 + (letter - 1) * 0.14}s` }}
    />
  );

  return (
    <span className="animated-logo" role="img" aria-label="United Stones - Marbles | Granites | Tiles">
      <span className="wordmark-letters" aria-hidden="true">
        {letters.slice(0, 6).map(renderLetter)}
        <span className="wordmark-space" />
        {letters.slice(6).map(renderLetter)}
      </span>
      <img className="animated-tagline" src="/united-stones-tagline.png" alt="" aria-hidden="true" />
    </span>
  );
}

function Brand({ large = false, animated = false, footer = false, onClick }) {
  return (
    <a className={`brand ${large ? "brand-large" : ""} ${animated ? "brand-animated" : ""} ${footer ? "brand-footer" : ""}`} href="#top" aria-label={onClick ? "Enter United Stones" : "United Stones home"} onClick={onClick ? (event) => { event.preventDefault(); onClick(); } : undefined}>
      {animated ? <AnimatedLogo /> : <img src="/united-stones-logo.png" alt="United Stones - Marbles | Granites | Tiles" />}
    </a>
  );
}

const introSessionKey = "united-stones:visit-entered";
let enteredDuringVisit;

// The intro plays only once per browser tab session.
// Going back to Home from any page, or reloading, skips it.
// (Use localStorage instead of sessionStorage here and in enter()
// if you want it to play only on a person's very first visit ever.)
function hasEnteredVisit() {
  if (enteredDuringVisit !== undefined) return enteredDuringVisit;

  enteredDuringVisit = false;
  try {
    enteredDuringVisit = sessionStorage.getItem(introSessionKey) === "1";
  } catch {
    // Storage unavailable: fall back to the in-memory flag only.
  }
  return enteredDuringVisit;
}

function IntroScreen({ leaving, onEnter }) {
  useEffect(() => {
    const bodyOverflow = document.body.style.overflow;
    const htmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = bodyOverflow;
      document.documentElement.style.overflow = htmlOverflow;
    };
  }, []);

  return (
    <div className={`intro ${leaving ? "intro-leaving" : ""}`} data-entry-hint="CLICK THE LOGO TO ENTER">
      <div className="intro-texture" />
      <Brand large animated onClick={onEnter} />
    </div>
  );
}

function Navbar() { const [open, setOpen] = useState(false); const links = [["Home", "#top"], ["About", "#about"], ["Gallery", "#categories"], ["Categories", "#categories"], ["Contact", "#contact"]]; return <header className="nav-wrap"><nav className="navbar"><Brand /><div className={`nav-links ${open ? "is-open" : ""}`}>{links.map(([label, href], i) => <a key={label} className={i === 0 ? "active" : ""} href={href} onClick={() => setOpen(false)}>{label}</a>)}</div><div className="nav-actions"><button aria-label="Search" onClick={() => document.querySelector('#categories')?.scrollIntoView({ behavior: 'smooth' })}><Search size={22} /></button><button className="menu-toggle" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>{open ? <X size={27} /> : <Menu size={29} />}</button></div></nav></header>; }
function HeroCarousel({ entered }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!entered || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => {
      setCurrent(index => (index + 1) % slides.length);
    }, 7000);
    return () => window.clearTimeout(timer);
  }, [entered, current]);

  const change = step => setCurrent(index => (index + step + slides.length) % slides.length);

  return (
    <section className="hero" id="top">
      <div className="hero-photo" aria-hidden="true">
        {slides.map((slide, index) => (
          <div
            key={slide.image}
            className={index === current ? "hero-image is-current" : "hero-image"}
            style={{ backgroundImage: "url('" + slide.image + "')" }}
          />
        ))}
      </div>
      <div className="hero-copy">
        <p className="eyebrow">STONE, REFINED</p>
        <h1 key={current}>{slides[current].title}</h1>
        <a className="outline-btn" href="#categories">EXPLORE OUR COLLECTION <ArrowRight size={17} /></a>
        <div className="slide-count">
          <b>{String(current + 1).padStart(2, "0")}</b><span /><i>{String(slides.length).padStart(2, "0")}</i>
        </div>
      </div>
      <div className="hero-controls">
        <button aria-label="Previous slide" onClick={() => change(-1)}><ArrowLeft /></button>
        <button aria-label="Next slide" onClick={() => change(1)}><ArrowRight /></button>
      </div>
    </section>
  );
}

function About() { return <section className="about section-shell" id="about"><div className="about-copy"><p className="eyebrow dark-eyebrow">A LEGACY IN EVERY SLAB</p><h2>About United Stones</h2><span className="short-rule" /><p>We bring you premium quality marble, granite, tiles and natural stones, crafted to enhance every space. With a commitment to excellence and timeless beauty, United Stones is your trusted partner in building elegant and durable spaces.</p><ul className="about-services">{services.map(([Icon, title, text]) => <li key={title}><Icon size={22} strokeWidth={1.5} aria-hidden="true" /><span><strong>{title}</strong> {text}</span></li>)}</ul><a className="solid-btn" href="#contact">LEARN MORE <ArrowRight size={16} /></a></div><div className="about-image" role="img" aria-label="Premium stone slab showroom" /></section>; }
function StatsStrip() { const stats = [["1000+", "Happy Clients"], ["500+", "Completed Projects"], ["Premium", "Quality Stones"], ["100%", "Customer Commitment"]]; return <section className="stats-strip" aria-label="United Stones at a glance">{stats.map(([value, label]) => <div className="stat-item" key={label}><strong>{value}</strong><span>{label}</span></div>)}</section>; }
function Categories() { return <section className="categories section-shell" id="categories"><div className="section-title"><span /><h2>Our Categories</h2><span /></div><div className="category-grid">{categories.map(c => <Link className="category-card" href={c.href} key={c.name} style={{ backgroundImage: `linear-gradient(0deg,rgba(0,0,0,.75),transparent 68%),url('${c.image}')` }}><span>{c.name}<ArrowRight size={17} /></span></Link>)}</div></section>; }
function Benefits() { return <section className="benefits">{benefits.map(([Icon, title, sub]) => <div className="benefit" key={title}><Icon size={31} strokeWidth={1.45} /><h3>{title}</h3><p>{sub}</p></div>)}</section>; }
const showrooms = ["Kuttiady", "Payyoli"];
const showroomMap = town =>
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("United Stones, " + town + ", Kerala");
const youtubeChannel = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_URL;

function CustomerCare() {
  return (
    <section className="care" id="contact" aria-labelledby="care-heading">
      <div className="care-icon" aria-hidden="true">
        <Headset size={58} strokeWidth={1.3} />
      </div>
      <div className="care-copy">
        <h2 id="care-heading">Connect with Our Customer Care</h2>
        <p>Need help choosing the perfect stone?</p>
      </div>
      <a className="light-btn" href={callCustomerCare} aria-label="Call United Stones customer care">
        CONTACT US <Phone size={17} aria-hidden="true" />
      </a>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <Brand footer />
        <div className="branches">
          <h3>Visit our showrooms</h3>
          <div className="footer-towns">
            {showrooms.map(town => (
              <a key={town} href={showroomMap(town)} target="_blank" rel="noreferrer" aria-label={`Find United Stones in ${town} on Google Maps`}>
                <MapPin size={15} aria-hidden="true" /> {town}
              </a>
            ))}
          </div>
        </div>
        <div className="footer-contact">
          <a href={callCustomerCare}><Phone size={20} /> {customerCarePhone}</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={23} /></a>
          <a href={youtubeChannel || "#videos"} aria-label={youtubeChannel ? "Our YouTube channel" : "Featured YouTube videos"}>
            <Play size={18} aria-hidden="true" /> YouTube
          </a>
        </div>
      </div>
      <div className="copyright">© 2025 United Stones. All Rights Reserved.</div>
    </footer>
  );
}

function WhatsAppButton() { return <a className="whatsapp" href="https://wa.me/910000000000" target="_blank" rel="noreferrer" aria-label="Chat with us on WhatsApp"><MessageCircle size={28} /></a>; }
export default function Home() {
  const [phase, setPhase] = useState("checking");
  const entered = phase === "leaving" || phase === "ready";

  useEffect(() => {
    setPhase(hasEnteredVisit() ? "ready" : "intro");
  }, []);

  const enter = () => {
    if (phase !== "intro") return;
    enteredDuringVisit = true;
    try {
      sessionStorage.setItem(introSessionKey, "1");
    } catch {
      // The in-memory flag still applies for this page lifetime.
    }
    setPhase("leaving");
  };

  useEffect(() => {
    if (phase !== "leaving") return;
    const timer = window.setTimeout(() => setPhase("ready"), 1150);
    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => { const targets = document.querySelectorAll("main > section:not(.hero), .footer"); if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) { targets.forEach(el => el.classList.add("is-visible")); return } const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target) } }), { threshold: 0.01, rootMargin: "0px 0px -8% 0px" }); targets.forEach(el => { el.classList.add("scroll-reveal"); observer.observe(el) }); return () => observer.disconnect() }, []);

  return (
    <>
      {(phase === "intro" || phase === "leaving") && (
        <IntroScreen leaving={phase === "leaving"} onEnter={enter} />
      )}
      <div className={`site ${entered ? "site-ready" : ""}`} inert={!entered} aria-hidden={!entered}>
        <Navbar />
        <main>
          <HeroCarousel entered={entered} />
          <About />
          <StatsStrip />
          <Categories />
          <FeaturedVideos />
          <Benefits />
          <CustomerCare />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
}