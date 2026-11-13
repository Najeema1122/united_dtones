"use client";
import { useState } from "react";
import { X, ArrowLeft } from "lucide-react";
import Link from "next/link";

const photoIds = [
  "photo-1600607687939-ce8a6c25118c", "photo-1618221195710-dd6b41faaea6", "photo-1600566753086-00f18fb6b3ea",
  "photo-1600607687920-4e2a09cf159d", "photo-1600210492486-724fe5c67fb0", "photo-1600607687644-c7171b42498f",
  "photo-1600607688969-a5bfcd646154", "photo-1600566753190-17f0baa2a6c3", "photo-1600607687920-4e2a09cf159d",
];
export default function GalleryPage({ title }) {
 const [selected,setSelected]=useState(null);
 const images=photoIds.map((id,i)=>`https://images.unsplash.com/${id}?auto=format&fit=crop&w=1300&q=85&sig=${i}`);
 return <main className="gallery-page"><section className="gallery-hero" style={{backgroundImage:`url('${images[0]}')`}}><Link className="gallery-back" href="/#categories"><ArrowLeft size={15}/> Back to categories</Link><h1>{title}</h1></section><section className="gallery-grid" aria-label={`${title} images`}>{images.map((src,i)=><button className="gallery-item" key={src} onClick={()=>setSelected(src)} aria-label={`View ${title} image ${i+1}`}><img src={src} alt={`${title} stone design ${i+1}`} loading="lazy"/></button>)}</section><footer className="gallery-footer"><Link href="/">United Stones</Link> · MARBLES | GRANITES | TILES</footer>{selected&&<div className="lightbox" role="dialog" aria-modal="true" onClick={()=>setSelected(null)}><button aria-label="Close image" onClick={()=>setSelected(null)}><X size={30}/></button><img src={selected} alt={`${title} enlarged preview`}/></div>}</main>
}
