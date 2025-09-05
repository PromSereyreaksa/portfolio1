import {
    Github,
    Linkedin,
    Mail, Send
} from 'lucide-react';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';

export default function ContactSection() {
  return (
    <section className="py-24 px-8 md:px-16 lg:px-24 bg-white border-t border-gray-200 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        
        {/* Contact Header */}
        <ScrollAnimationWrapper animation="fadeInUp" delay={200}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-thin tracking-[0.2em] md:tracking-[0.3em] text-black mb-6 max-w-full">
              CONTACT
            </h2>
            <div className="w-24 h-px bg-black mx-auto mb-6"></div>
            <p className="text-sm md:text-base font-light text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Let's collaborate and create something extraordinary together.
            </p>
          </div>
        </ScrollAnimationWrapper>

        {/* Contact Links */}
        <ScrollAnimationWrapper animation="fadeInUp" delay={400}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
            
            <a href="mailto:prumsereyreaksa@gmail.com" className="group flex flex-col items-center p-4 md:p-6 bg-gray-50 hover:bg-gray-100 transition-colors duration-300 rounded-lg">
              <Mail className="w-6 h-6 md:w-8 md:h-8 mb-2 md:mb-3 text-gray-700 group-hover:text-black transition-colors" />
              <span className="text-xs md:text-sm font-light tracking-wide text-gray-700 group-hover:text-black transition-colors">Email</span>
            </a>

            <a href="https://t.me/souuJ" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center p-4 md:p-6 bg-gray-50 hover:bg-gray-100 transition-colors duration-300 rounded-lg">
              <Send className="w-6 h-6 md:w-8 md:h-8 mb-2 md:mb-3 text-gray-700 group-hover:text-black transition-colors" />
              <span className="text-xs md:text-sm font-light tracking-wide text-gray-700 group-hover:text-black transition-colors">Telegram</span>
            </a>

            <a href="https://www.linkedin.com/in/prom-sereyreaksa-2a2298364/" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center p-4 md:p-6 bg-gray-50 hover:bg-gray-100 transition-colors duration-300 rounded-lg">
              <Linkedin className="w-6 h-6 md:w-8 md:h-8 mb-2 md:mb-3 text-gray-700 group-hover:text-black transition-colors" />
              <span className="text-xs md:text-sm font-light tracking-wide text-gray-700 group-hover:text-black transition-colors">LinkedIn</span>
            </a>

            <a href="https://github.com/PromSereyreaksa" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center p-4 md:p-6 bg-gray-50 hover:bg-gray-100 transition-colors duration-300 rounded-lg">
              <Github className="w-6 h-6 md:w-8 md:h-8 mb-2 md:mb-3 text-gray-700 group-hover:text-black transition-colors" />
              <span className="text-xs md:text-sm font-light tracking-wide text-gray-700 group-hover:text-black transition-colors">GitHub</span>
            </a>
          </div>
        </ScrollAnimationWrapper>

        {/* Primary CTA */}
        <ScrollAnimationWrapper animation="fadeInUp" delay={600}>
          <div className="text-center">
            <a href="mailto:prumsereyreaksa@gmail.com" className="inline-block px-12 py-4 border border-black text-black hover:bg-black hover:text-white transition-colors duration-300">
              <span className="font-light tracking-widest text-sm">MESSAGE ME</span>
            </a>
            
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-xs text-gray-500 font-light tracking-wide">
                © 2025 Prom Sereyreaksa. All rights reserved.
              </p>
            </div>
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
}
