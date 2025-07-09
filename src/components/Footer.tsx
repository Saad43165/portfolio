import React from 'react';
import { Github, Linkedin, Instagram, ChevronUp } from 'lucide-react';
import { Link } from 'react-scroll';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
        {/* Left: Profile */}
        <div className="space-y-4">
          <h3 className="text-3xl font-extrabold tracking-tight">Saad Ikram</h3>
          <p className="text-gray-400 leading-relaxed">
            Passionate Flutter Developer, deeply focused on performance, UI/UX, and problem solving.
          </p>
        </div>

       {/* Middle: Quick Links */}
<div className="space-y-4">
  <h4 className="text-xl font-semibold">Quick Links</h4>
  <ul className="space-y-2 text-gray-400">
    {[
      { label: 'Home', to: 'home' },
      { label: 'About', to: 'about' },
      { label: 'Skills', to: 'skills' },
      { label: 'Experience', to: 'experience' },
      { label: 'Education', to: 'education' },
      { label: 'Projects', to: 'projects' },
      { label: 'Contact', to: 'contact' }
    ].map((link) => (
      <li key={link.to}>
        <a
          href={`#${link.to}`}
          className="hover:text-white transition-colors duration-200 cursor-pointer"
        >
          {link.label}
        </a>
      </li>
    ))}
  </ul>
</div>


        {/* Right: Social Icons */}
        <div className="space-y-4">
          <h4 className="text-xl font-semibold">Connect with Me</h4>
          <div className="flex justify-center md:justify-start gap-4">
            <a
              href="https://github.com/Saad43165"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:scale-110 text-gray-400 hover:text-white transition-transform duration-300"
            >
              <Github size={22} />
            </a>
            <a
              href="https://linkedin.com/in/saadikram"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:scale-110 text-gray-400 hover:text-white transition-transform duration-300"
            >
              <Linkedin size={22} />
            </a>
            <a
              href="https://www.instagram.com/the__bluesss"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:scale-110 text-gray-400 hover:text-white transition-transform duration-300"
            >
              <Instagram size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-gray-500 text-sm border-t border-gray-800 pt-6">
        <p>© {year} Saad Ikram. All rights reserved.</p>

        {/* Back to top button */}
        <Link
          to="hero"
          smooth={true}
          duration={500}
          className="flex items-center space-x-1 hover:text-white transition-colors cursor-pointer"
        >
          <ChevronUp size={18} />
          <span>Back to Top</span>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
