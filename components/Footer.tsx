import React from 'react';

/**
 * Site footer with social icons and copyright.
 *
 * Social links currently point to '#' placeholders. Update these when
 * real social profiles are available. Uses FontAwesome icons loaded
 * globally in the layout head. Accessible names are provided via
 * aria-label attributes.
 */
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-earth border-t border-highlight text-sand">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div className="flex space-x-4 order-2 md:order-1">
          <a href="#" aria-label="Facebook" className="text-accent hover:text-highlight">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" aria-label="Instagram" className="text-accent hover:text-highlight">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" aria-label="Twitter" className="text-accent hover:text-highlight">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" aria-label="WhatsApp" className="text-accent hover:text-highlight">
            <i className="fab fa-whatsapp"></i>
          </a>
          <a href="#" aria-label="Telegram" className="text-accent hover:text-highlight">
            <i className="fab fa-telegram-plane"></i>
          </a>
          <a href="#" aria-label="YouTube" className="text-accent hover:text-highlight">
            <i className="fab fa-youtube"></i>
          </a>
          <a href="#" aria-label="TikTok" className="text-accent hover:text-highlight">
            <i className="fab fa-tiktok"></i>
          </a>
        </div>
        <p className="order-1 md:order-2 text-center md:text-right">
          &copy; {year} Eden's Pharm. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}