import type { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';

export const metadata: Metadata = {
  title: "Contact Us | Eden's Pharm",
  description:
    "Get in touch with the Eden's Pharm team for questions about products, orders or general inquiries.",
};

/**
 * Contact page.
 *
 * Presents a simple contact form alongside company contact information.
 * The form does not submit to any backend but illustrates how users
 * might reach out. Accessibility considerations include labels for
 * inputs and focus styling.
 */
export default function ContactPage() {
  return (
    <article className="space-y-12">
      {/* Hero */}
      <section className="relative h-64 w-full overflow-hidden rounded">
        <Image
          src="/images/sanctus.png"
          alt="White blossom on dark water"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-cursive text-sand drop-shadow-lg">
            Contact Us
          </h1>
        </div>
      </section>
      <section className="max-w-3xl mx-auto space-y-8">
        <header className="text-center space-y-4">
          <h2 className="text-3xl font-bold font-cursive text-accent">
            We’d Love to Hear From You
          </h2>
          <p className="leading-relaxed">
            Have a question about our products, your order, or just want to say
            hello? Fill out the form below or reach us using the information
            provided. Our team strives to respond within 1–2 business days.
          </p>
        </header>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact form */}
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="name" className="block mb-1 font-semibold">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full bg-earth border border-highlight p-2 rounded text-sand"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1 font-semibold">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full bg-earth border border-highlight p-2 rounded text-sand"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-1 font-semibold">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full bg-earth border border-highlight p-2 rounded text-sand"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-accent text-earth rounded hover:bg-highlight"
            >
              Send Message
            </button>
          </form>
          {/* Contact details */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Contact Information</h3>
            <p className="flex items-center space-x-2">
              <i className="fas fa-phone-alt" aria-hidden="true"></i>
              <span>Phone: (555) 123‑4567</span>
            </p>
            <p className="flex items-center space-x-2">
              <i className="fas fa-envelope" aria-hidden="true"></i>
              <span>Email: info@edenspharm.com</span>
            </p>
            <p className="flex items-center space-x-2">
              <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
              <span>Address: Olathe, Kansas, USA</span>
            </p>
            <p>Our hours of operation are Monday through Friday, 9 am – 5 pm Central Time.</p>
          </div>
        </div>
      </section>
    </article>
  );
}