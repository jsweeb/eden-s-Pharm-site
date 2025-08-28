import Link from 'next/link';
import React from 'react';

/**
 * Navigation bar component.
 *
 * Renders a responsive navigation bar with links to the primary site pages.
 * Tailwind utility classes are used for layout and styling. The navigation
 * follows basic accessibility practices, including a semantic <nav> element
 * and descriptive link texts. Dropdown functionality can be added later
 * using a disclosure component or similar pattern if needed.
 */
export default function NavBar() {
  return (
    <nav className="bg-earth border-b border-highlight text-accent">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-cursive text-3xl text-accent">
          Eden's Pharm
        </Link>
        <ul className="flex items-center space-x-6">
          <li>
            <Link href="/products" className="hover:text-sand">
              Products
            </Link>
          </li>
          <li className="relative group">
            <span className="cursor-default hover:text-sand">
              About
            </span>
            <ul className="absolute left-0 mt-2 hidden flex-col space-y-1 bg-earth border border-highlight p-2 group-hover:flex">
              <li>
                <Link href="/about-us" className="block px-3 py-1 hover:bg-highlight hover:text-earth">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/mission-values" className="block px-3 py-1 hover:bg-highlight hover:text-earth">
                  Mission &amp; Values
                </Link>
              </li>
              <li>
                <Link
                  href="/research-references"
                  className="block px-3 py-1 hover:bg-highlight hover:text-earth"
                >
                  Research References
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link href="/blog" className="hover:text-sand">
              Blog
            </Link>
          </li>
          <li>
            <Link href="/gallery" className="hover:text-sand">
              Gallery
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-sand">
              Contact
            </Link>
          </li>
          <li>
            <Link href="/checkout" className="hover:text-sand" aria-label="View cart">
              <i className="fas fa-shopping-cart" aria-hidden="true"></i>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}