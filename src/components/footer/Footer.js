import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
        icon: _jsx(Linkedin, { size: 20 })
    },
    {
        name: 'Instagram',
        href: 'https://www.instagram.com/entelverse/',
        icon: _jsx(Instagram, { size: 20 })
    },
    {
        name: 'Twitter',
        href: 'https://x.com/EntelVerse',
        icon: _jsx(Twitter, { size: 20 })
    },
    {
        name: 'GitHub',
        href: 'https://github.com/EntelVerse',
        icon: _jsx(Github, { size: 20 })
    },
    {
        name: 'Email',
        href: 'mailto:contact@entelverse.com',
        icon: _jsx(Mail, { size: 20 })
    }
];
export function Footer() {
    const { t } = useLanguage();
    const currentYear = new Date().getFullYear();
    return (_jsx("footer", { className: "bg-base dark:bg-base border-t border-border dark:border-border-secondary py-12", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center space-x-2 mb-4", children: [_jsx("div", { className: "flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg", children: _jsx(Brain, { size: 20, className: "text-white" }) }), _jsx("h3", { className: "text-lg font-semibold text-content dark:text-content", children: "EntelVerse" })] }), _jsx("p", { className: "text-content-secondary dark:text-content-secondary", children: t('common.footer.description') })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-content dark:text-content mb-4", children: t('common.footer.quickLinks') }), _jsx("ul", { className: "space-y-2", children: footerLinks.map((link) => (_jsx("li", { children: _jsx("a", { href: link.href, className: "text-content-secondary dark:text-content-secondary hover:text-interactive dark:hover:text-interactive transition-colors", children: link.name }) }, link.name))) })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-content dark:text-content mb-4", children: t('common.footer.followUs') }), _jsx("div", { className: "flex flex-wrap gap-4", children: socialLinks.map((link) => (_jsx("a", { href: link.href, target: "_blank", rel: "noopener noreferrer", className: "text-content-secondary dark:text-content-secondary hover:text-interactive dark:hover:text-interactive transition-colors", "aria-label": link.name, children: link.icon }, link.name))) })] })] }), _jsx("div", { className: "mt-8 pt-8 border-t border-border dark:border-border-secondary text-center text-content-secondary dark:text-content-secondary", children: _jsxs("p", { children: ["\u00A9 ", currentYear, " EntelVerse. ", t('common.footer.rights')] }) })] }) }));
}
