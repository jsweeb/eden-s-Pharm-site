import React from 'react';
import Link from 'next/link';

/**
 * Home page.
 *
 * Presents a hero banner, introductory copy and a grid of product lines. Each
 * card links to the products page where full catalog data will be fetched
 * from the Vineyard API in phase B. Only approved images are used. All
 * headings and links are properly structured for accessibility.
 */
export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero Banner */}
      <section className="relative" aria-labelledby="hero-heading">
        <img
          src="/images/banner.png"
          alt="Eden's Pharm banner showing a tranquil floral scene"
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1
            id="hero-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-cursive text-accent drop-shadow-md text-center"
          >
            Nature Refined. Truth Revealed.
          </h1>
        </div>
      </section>
      {/* Introduction */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold">Welcome to Eden's Pharm</h2>
        <p>
          At Eden's Pharm, we restore the integrity of wellness through radical
          transparency, natural elegance and ethical innovation. We believe that food
          is medicine and that nature has already perfected what we need. Our
          products are crafted with purpose, grounded in truth and designed for
          healing from within.
        </p>
      </section>
      {/* Product Lines */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-center mb-6">Our Product Lines</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Hydrasal card */}
          <div className="border border-highlight rounded-lg overflow-hidden bg-earth flex flex-col">
            <img
              src="/images/hydrasal.png"
              alt="Glass of Hydrasal electrolyte drink with lemon and botanicals"
              className="h-40 w-full object-cover"
            />
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-lg font-bold mb-2">Hydrasal</h3>
              <p className="flex-1 text-sm">
                The world's only hydration system sweetened with our Healthy Sweetener
                System™. Every sip delivers functional electrolytes without blood
                sugar spikes, plus metabolic, dental and collagen support.
              </p>
              <Link
                href="/products"
                className="mt-4 inline-block px-4 py-2 bg-accent text-earth rounded hover:bg-highlight"
              >
                Shop Hydrasal
              </Link>
            </div>
          </div>
          {/* Elation card */}
          <div className="border border-highlight rounded-lg overflow-hidden bg-earth flex flex-col">
            <img
              src="/images/elation.png"
              alt="Swirling pink tonic representing Elation adaptogenic drink"
              className="h-40 w-full object-cover"
            />
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-lg font-bold mb-2">Elation</h3>
              <p className="flex-1 text-sm">
                Adaptogens reimagined as daily luxury tonics. Elation blends herbs like
                ashwagandha, holy basil and saffron with decadent flavors — powered by
                our Benedolce sweetener for functional balance.
              </p>
              <Link
                href="/products"
                className="mt-4 inline-block px-4 py-2 bg-highlight text-earth rounded hover:bg-accent"
              >
                Shop Elation
              </Link>
            </div>
          </div>
          {/* BeneDulce card */}
          <div className="border border-highlight rounded-lg overflow-hidden bg-earth flex flex-col">
            <img
              src="/images/benedulce.jpg"
              alt="Cup filled with BeneDulce crystalline sweetener"
              className="h-40 w-full object-cover"
            />
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-lg font-bold mb-2">BeneDulce</h3>
              <p className="flex-1 text-sm">
                The world’s first sweetener that is not only neutral but beneficial.
                Powered by allulose, erythritol, monk fruit, xylitol and collagen
                peptides, BeneDulce improves upon sugar with real health benefits.
              </p>
              <Link
                href="/products"
                className="mt-4 inline-block px-4 py-2 bg-accent text-earth rounded hover:bg-highlight"
              >
                Shop BeneDulce
              </Link>
            </div>
          </div>
          {/* Sanctus Una card */}
          <div className="border border-highlight rounded-lg overflow-hidden bg-earth flex flex-col">
            <img
              src="/images/sanctus.png"
              alt="White blossom floating on dark water representing Sanctus Una skincare"
              className="h-40 w-full object-cover"
            />
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-lg font-bold mb-2">Sanctus Una</h3>
              <p className="flex-1 text-sm">
                Rooted in grass‑fed tallow, Sanctus Una brings ancient wisdom into modern
                form. Each balm, salve and butter uses the earth’s simplest, most
                powerful ingredients for ancestral healing.
              </p>
              <Link
                href="/products"
                className="mt-4 inline-block px-4 py-2 bg-highlight text-earth rounded hover:bg-accent"
              >
                Shop Sanctus Una
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Difference section */}
      <section className="text-center max-w-4xl mx-auto space-y-4">
        <h2 className="text-xl md:text-2xl font-bold">The Eden’s Pharm Difference</h2>
        <p>
          Where others cut corners with fillers, we build with function. Where others
          aim for neutrality, we design for active benefit. Where others separate
          health and indulgence, we unite them. Eden’s Pharm is more than
          supplements, skincare or hydration — it’s a new standard of wellness:
          delicious, beautiful, ancestral and uncompromising.
        </p>
      </section>
    </div>
  );
}