import React from 'react';
import { Music, Image, Video, Globe, Sparkles, Target, Users, Rocket } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const features = [
  {
    name: 'HarmonyGPT',
    description: 'Create music with AI-powered collaboration',
    icon: Music,
    color: 'blue'
  },
  {
    name: 'ChromaGPT',
    description: 'Transform ideas into stunning visuals',
    icon: Image,
    color: 'purple'
  },
  {
    name: 'StoryForge',
    description: 'Craft compelling videos with AI',
    icon: Video,
    color: 'pink'
  },
  {
    name: 'WebCrafter',
    description: 'Design beautiful websites effortlessly',
    icon: Globe,
    color: 'green'
  }
];

const team = [
  {
    name: 'Sarah Chen',
    role: 'CEO & Co-founder',
    bio: 'AI researcher turned entrepreneur with a passion for creative technology',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80'
  },
  {
    name: 'Alex Rodriguez',
    role: 'CTO & Co-founder',
    bio: 'Full-stack developer with expertise in AI and machine learning',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80'
  },
  {
    name: 'Emily Taylor',
    role: 'Head of Product',
    bio: 'Product visionary focused on creating intuitive AI experiences',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80'
  },
  {
    name: 'Marcus Johnson',
    role: 'Lead AI Engineer',
    bio: 'AI specialist with a background in computational creativity',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80'
  }
];

const testimonials = [
  {
    quote: "EntelVerse has revolutionized how I create content. The AI tools are incredibly intuitive and powerful.",
    author: "David Kim",
    role: "Digital Artist"
  },
  {
    quote: "As a musician, HarmonyGPT has become an invaluable part of my creative process. It's like having a collaborative partner available 24/7.",
    author: "Maria Garcia",
    role: "Music Producer"
  }
];

export function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-radial from-blue-500/20 via-transparent to-transparent opacity-30" />
          <div className="absolute inset-0 bg-gradient-radial from-purple-500/20 via-transparent to-transparent opacity-30 translate-x-full" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About EntelVerse
          </h1>
          <p className="text-xl md:text-2xl text-content-secondary max-w-3xl mx-auto">
            Empowering creativity through AI innovation
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="py-16 bg-base-secondary/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="inline-flex items-center justify-center p-3 bg-interactive/10 rounded-xl">
                <Target className="w-8 h-8 text-interactive" />
              </div>
              <h2 className="text-3xl font-bold">Our Mission</h2>
              <p className="text-lg text-content-secondary">
                To democratize AI technology and make it accessible to creators worldwide. We believe in empowering individuals to push the boundaries of their creativity through innovative AI tools.
              </p>
            </div>
            <div className="space-y-6">
              <div className="inline-flex items-center justify-center p-3 bg-interactive/10 rounded-xl">
                <Sparkles className="w-8 h-8 text-interactive" />
              </div>
              <h2 className="text-3xl font-bold">Our Vision</h2>
              <p className="text-lg text-content-secondary">
                A world where AI enhances human creativity rather than replacing it. We're building a future where anyone can bring their creative ideas to life with the help of intuitive AI tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Platform</h2>
            <p className="text-lg text-content-secondary max-w-2xl mx-auto">
              Discover our suite of AI-powered tools designed to enhance your creative process
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="backdrop-blur-sm bg-base-secondary/50 rounded-2xl p-6 border border-border dark:border-border-secondary hover:scale-105 transition-transform duration-300"
              >
                <div className={`inline-flex items-center justify-center p-3 bg-${feature.color}-500/10 rounded-xl mb-4`}>
                  <feature.icon className={`w-6 h-6 text-${feature.color}-500`} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.name}</h3>
                <p className="text-content-secondary">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-base-secondary/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-interactive/10 rounded-xl mb-4">
              <Users className="w-8 h-8 text-interactive" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-content-secondary max-w-2xl mx-auto">
              The passionate individuals behind EntelVerse's innovation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="backdrop-blur-sm bg-base/50 rounded-2xl overflow-hidden border border-border dark:border-border-secondary hover:scale-105 transition-transform duration-300"
              >
                <div className="aspect-square relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-interactive mb-2">{member.role}</p>
                  <p className="text-content-secondary text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-interactive/10 rounded-xl mb-4">
              <Sparkles className="w-8 h-8 text-interactive" />
            </div>
            <h2 className="text-3xl font-bold mb-4">What People Say</h2>
            <p className="text-lg text-content-secondary max-w-2xl mx-auto">
              Hear from our community of creators
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="backdrop-blur-sm bg-base-secondary/50 rounded-2xl p-8 border border-border dark:border-border-secondary"
              >
                <p className="text-lg mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-content-secondary">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-base-secondary/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-interactive/10 rounded-xl mb-4">
            <Rocket className="w-8 h-8 text-interactive" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Ready to Start Creating?</h2>
          <p className="text-lg text-content-secondary max-w-2xl mx-auto mb-8">
            Join our community of creators and experience the power of AI-enhanced creativity
          </p>
          <a
            href="/signup"
            className="inline-flex items-center justify-center px-8 py-4 bg-interactive hover:bg-interactive-hover text-base rounded-xl transition-colors"
          >
            Get Started Today
          </a>
        </div>
      </section>
    </div>
  );
}