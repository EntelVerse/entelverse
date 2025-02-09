import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Github, Linkedin, Instagram, Twitter, Mail, Brain } from 'lucide-react';

const footerLinks = [
  { name: 'Contact Us', href: '/contact' },
  { name: 'About Us', href: '/about' },
  { name: 'Help Center', href: '/help' },
  { name: 'Terms of Service', href: '/terms' },
  { name: 'Privacy Policy', href: '/privacy' }
];

const socialLinks = [
  { 
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/entelverse/',
    icon: <Linkedin size={20} />
  },
  { 
    name: 'Instagram',
    href: 'https://www.instagram.com/entelverse/',
    icon: <Instagram size={20} />
  },
  { 
    name: 'Twitter',
    href: 'https://x.com/EntelVerse',
    icon: <Twitter size={20} />
  },
  { 
    name: 'GitHub',
    href: 'https://github.com/EntelVerse',
    icon: <Github size={20} />
  },
  { 
    name: 'Email',
    href: 'mailto:contact@entelverse.com',
    icon: <Mail size={20} />
  }
];

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base dark:bg-base border-t border-border dark:border-border-secondary py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg">
                <Brain size={20} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-content dark:text-content">EntelVerse</h3>
            </div>
            <p className="text-content-secondary dark:text-content-secondary">
              {t('common.footer.description')}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-content dark:text-content mb-4">
              {t('common.footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-content-secondary dark:text-content-secondary hover:text-interactive dark:hover:text-interactive transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-content dark:text-content mb-4">
              {t('common.footer.followUs')}
            </h3>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-content-secondary dark:text-content-secondary hover:text-interactive dark:hover:text-interactive transition-colors"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border dark:border-border-secondary text-center text-content-secondary dark:text-content-secondary">
          <p>© {currentYear} EntelVerse. {t('common.footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}