"use client";
import { useEffect, useRef, useState } from "react";
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

function About() {
  return (
    <section className="about section-shell" id="about">
      <div className="about-copy">
        <p className="eyebrow dark-eyebrow">A LEGACY IN EVERY SLAB</p>
        <h2>About United Stones</h2><span className="short-rule" />
        <p>We have 10 years of experience helping clients choose marble,
          granite, tiles and other natural stones. We serve clients across
          Kerala, Tamil Nadu and Karnataka. With a commitment to excellence
          and timeless beauty, United Stones is your trusted partner in building
          elegant and durable spaces.</p>
        <ul className="about-services">
          {services.map(([Icon, title, text]) =>
            <li key={title}><Icon size={22} strokeWidth={1.5} aria-hidden="true" />
              <span><strong>{title}</strong> {text}</span></li>)}
        </ul>
        <a className="solid-btn" href="#contact">LEARN MORE <ArrowRight size={16} /></a></div>
      <div className="about-image" role="img" aria-label="Premium stone slab showroom" /></section>);
}
const stats = [
  { value: 1000, suffix: "+", label: "Happy Clients" },
  { value: 500, suffix: "+", label: "Completed Projects" },
  { value: "Premium", label: "Quality Stones" },
  { value: 100, suffix: "%", label: "Customer Commitment" },
];
const formatStat = new Intl.NumberFormat("en-IN");

function StatItem({ stat, entered }) {
  const item = useRef(null);
  const numeric = typeof stat.value === "number";
  const finalText = numeric ? formatStat.format(stat.value) + stat.suffix : stat.value;
  const [display, setDisplay] = useState(finalText);
  const [pendingFade, setPendingFade] = useState(false);

  useEffect(() => {
    if (!entered || !("IntersectionObserver" in window)) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;

    let frame;
    let startTime;
    const animate = time => {
      startTime ??= time;
      const progress = Math.min((time - startTime) / 1000, 1);
      const count = Math.floor(stat.value * (1 - (1 - progress) ** 3));
      setDisplay(formatStat.format(count) + stat.suffix);
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    if (numeric) setDisplay("0" + stat.suffix);
    else setPendingFade(true);

    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      if (numeric) frame = requestAnimationFrame(animate);
      else setPendingFade(false);
    }, { threshold: 0.25 });
    observer.observe(item.current);

    const finishImmediately = () => {
      if (!motion.matches) return;
      observer.disconnect();
      cancelAnimationFrame(frame);
      setDisplay(finalText);
      setPendingFade(false);
    };
    motion.addEventListener("change", finishImmediately);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      motion.removeEventListener("change", finishImmediately);
    };
  }, [entered, stat, numeric, finalText]);

  return (
    <div className="stat-item" ref={item}>
      <strong className="stat-value" aria-hidden="true" data-pending={pendingFade}>{display}</strong>
      <span className="stat-reader-value">{finalText} </span>
      <span>{stat.label}</span>
    </div>
  );
}

function StatsStrip({ entered }) {
  return (
    <section className="stats-strip" aria-label="United Stones at a glance">
      {stats.map(stat => <StatItem key={stat.label} stat={stat} entered={entered} />)}
    </section>
  );
}

function Categories() { return <section className="categories section-shell" id="categories"><div className="section-title"><span /><h2>Our Categories</h2><span /></div><div className="category-grid">{categories.map(c => <Link className="category-card" href={c.href} key={c.name} style={{ backgroundImage: `linear-gradient(0deg,rgba(0,0,0,.75),transparent 68%),url('${c.image}')` }}><span>{c.name}<ArrowRight size={17} /></span></Link>)}</div></section>; }
function Benefits() { return <section className="benefits">{benefits.map(([Icon, title, sub]) => <div className="benefit" key={title}><Icon size={31} strokeWidth={1.45} /><h3>{title}</h3><p>{sub}</p></div>)}</section>; }
const showrooms = [
  { town: "Kuttiady", locality: "Cheriya Kumbalam", phone: "+91 23423 45645" },
  { town: "Payyoli", locality: "Thikkodi", phone: "+91 43434 34354" },
];

function showroomMap({ town, locality }) {
  const query = `United Stones, ${locality}, ${town}, Kerala`;
  return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(query);
}



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
        <div className="footer-showrooms">
          {showrooms.map(showroom => (
            <section className="footer-showroom" key={showroom.town}>
              <h3>{showroom.town} showroom</h3>
              <address>
                <a href={showroomMap(showroom)} target="_blank" rel="noreferrer"
                  aria-label={`Find ${showroom.town} showroom in ${showroom.locality} on Google Maps`}>
                  <MapPin size={16} aria-hidden="true" /> {showroom.locality}
                </a>
                <a href={`tel:${showroom.phone.replace(/\s/g, "")}`}>
                  <Phone size={16} aria-hidden="true" /> {showroom.phone}
                </a>
              </address>
            </section>
          ))}
        </div>
        <div className="footer-contact">
          <a href="https://www.instagram.com/_united_stones?dlrf=aHYyemI4eng4MWVm" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={23} /></a>
          <a href="https://youtube.com/@unitedstones.calicut?si=9LYsGw9qDnpOb3kU" target="_blank" rel="noreferrer" aria-label="United Stones on YouTube">
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

  useEffect(() => { const targets = document.querySelectorAll("main > section:not(.hero):not(.stats-strip), .footer"); if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) { targets.forEach(el => el.classList.add("is-visible")); return } const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target) } }), { threshold: 0.01, rootMargin: "0px 0px -8% 0px" }); targets.forEach(el => { el.classList.add("scroll-reveal"); observer.observe(el) }); return () => observer.disconnect() }, []);

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
          <StatsStrip entered={entered} />
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