import { Github, Linkedin, Mail, Send } from 'lucide-react';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';

const contactMethods = [
  {
    label: 'Email',
    value: 'prumsereyreaksa@gmail.com',
    href: 'mailto:prumsereyreaksa@gmail.com',
    icon: Mail
  },
  {
    label: 'Telegram',
    value: '@souuJ',
    href: 'https://t.me/souuJ',
    icon: Send
  },
  {
    label: 'LinkedIn',
    value: 'Professional profile',
    href: 'https://www.linkedin.com/in/prom-sereyreaksa-2a2298364/',
    icon: Linkedin
  },
  {
    label: 'GitHub',
    value: 'Code and experiments',
    href: 'https://github.com/PromSereyreaksa',
    icon: Github
  }
];

export default function ContactSection() {
  return (
    <section className="hero-surface section-shell px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <ScrollAnimationWrapper animation="fadeInUp" delay={80}>
          <div className="text-center mb-10 md:mb-12">
            <p className="text-xs tracking-[0.22em] text-zinc-500 mb-3">CONTACT</p>
            <h2 className="display-hero text-zinc-950 mb-4">LET'S BUILD SOMETHING STRONG</h2>
            <p className="max-w-2xl mx-auto text-sm md:text-base leading-relaxed text-zinc-700">
              Open to internships, freelance projects, collaborations, and product conversations.
              I usually respond within 24 hours.
            </p>
          </div>
        </ScrollAnimationWrapper>

        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-5 md:gap-6">
          <ScrollAnimationWrapper animation="fadeInUp" delay={140}>
            <article className="h-full bg-white rounded-2xl p-6 md:p-8">
              <p className="text-xs tracking-[0.18em] text-zinc-500 mb-3">HOW I CAN HELP</p>
              <h3 className="display-brutal text-zinc-950 mb-4">Product + Engineering Support</h3>
              <ul className="space-y-3 text-sm md:text-base text-zinc-700 leading-relaxed mb-7">
                <li className="flex gap-2">
                  <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-zinc-400" aria-hidden="true" />
                  <span>Frontend architecture with clear UX hierarchy</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-zinc-400" aria-hidden="true" />
                  <span>Supabase integration and API quality improvements</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-zinc-400" aria-hidden="true" />
                  <span>MVP delivery from concept to production</span>
                </li>
              </ul>

              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:prumsereyreaksa@gmail.com"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-zinc-950 text-white hover:bg-zinc-800 transition-colors text-sm tracking-[0.12em]"
                >
                  START A CONVERSATION
                </a>
                <a
                  href="https://t.me/souuJ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-zinc-700 hover:text-zinc-950 transition-colors text-sm tracking-[0.12em]"
                >
                  QUICK CHAT ON TELEGRAM
                </a>
              </div>
            </article>
          </ScrollAnimationWrapper>

          <ScrollAnimationWrapper animation="fadeInUp" delay={180}>
            <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
              {contactMethods.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    className="group bg-white rounded-xl p-5 md:p-6 transition-all"
                  >
                    <Icon className="w-5 h-5 text-zinc-700 group-hover:text-zinc-950 transition-colors mb-4" />
                    <p className="text-xs tracking-[0.16em] text-zinc-500 mb-2">{item.label}</p>
                    <p className="text-sm md:text-base text-zinc-800 leading-relaxed">{item.value}</p>
                  </a>
                );
              })}
            </div>
          </ScrollAnimationWrapper>
        </div>

        <ScrollAnimationWrapper animation="fadeInUp" delay={240}>
          <footer className="mt-10 md:mt-12 pt-6 text-center text-xs tracking-[0.12em] text-zinc-500">
            <p>© 2026 Prom Sereyreaksa.</p>
          </footer>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
}





