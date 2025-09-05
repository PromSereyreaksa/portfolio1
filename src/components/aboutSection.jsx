import {
    Code,
    Database,
    ExternalLink,
    Figma,
    Heart,
    Palette,
    Server,
    Trophy
} from 'lucide-react';
import { memo } from 'react';
import LazyImage from './LazyImage';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';

const AboutSection = memo(() => {
  return (
    <section className="py-24 px-8 md:px-16 lg:px-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Experience & Achievements */}
        <ScrollAnimationWrapper animation="fadeInUp" delay={200}>
          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-thin tracking-[0.2em] md:tracking-[0.3em] text-black mb-8 text-center max-w-full">
              EXPERIENCE
            </h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              
              <div className="border-l-2 border-gray-200 pl-6">
                <h3 className="font-light tracking-wide text-black mb-2 flex items-center">
                  <Heart className="mr-2" size={16} />
                  Volunteer Leadership
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Extensive volunteer experience across multiple fields including leadership roles, 
                  community building, and project management.
                </p>
                <div className="space-y-1 text-xs text-gray-500">
                  <p>• Shadow Design Event Season 1 & 2 - Support Team & Graphic Design</p>
                  <p>• Air & Tech Show - ពិព័រណ៍យន្តហោះ & បច្ចេកវិទ្យា (Exhibition Team)</p>
                  <p>• Multiple community and educational initiatives</p>
                </div>
              </div>

              <div className="border-l-2 border-gray-200 pl-6">
                <h3 className="font-light tracking-wide text-black mb-2 flex items-center">
                  <Trophy className="mr-2" size={16} />
                  Hackathons & Competitions
                </h3>
                <div className="space-y-1 text-xs text-gray-500">
                  <p>• ActSmart Incubation Program</p>
                  <p>• Turing Hackathon Cycle 8</p>
                  <a href="https://startupcambodia.gov.kh/resource/category/blog/281" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                    <ExternalLink size={10} className="mr-1" /> Read Turing Cycle 8 Blog
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimationWrapper>

        {/* Current Work */}
        <ScrollAnimationWrapper animation="fadeInUp" delay={400}>
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-thin tracking-[0.2em] md:tracking-[0.3em] text-black mb-8 max-w-full">
              CURRENT WORK
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-gray-50 p-8 rounded-lg">
                <LazyImage src="/Luminyx.webp" alt="Luminyx Company Logo" className="w-16 h-16 mx-auto mb-4 object-cover rounded" />
                <h3 className="font-light tracking-wide text-black mb-2">Video Editor</h3>
                <p className="text-sm text-gray-600">at Luminyx</p>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg">
                <LazyImage src="/COPPSARY.webp" alt="COPPSARY Project Group Logo" className="w-16 h-16 mx-auto mb-4 object-cover rounded" />
                <h3 className="font-light tracking-wide text-black mb-2">Founding Leader</h3>
                <p className="text-sm text-gray-600">COPPSARY - Project Group</p>
                <a href="https://web.facebook.com/profile.php?id=61567582710788" target="_blank" rel="noopener noreferrer" className="inline-flex items-center mt-2 text-xs text-blue-600 hover:text-blue-800">
                  <ExternalLink size={12} className="mr-1" /> View Group
                </a>
              </div>
            </div>
          </div>
        </ScrollAnimationWrapper>



        {/* Skills */}
        <ScrollAnimationWrapper animation="fadeInUp" delay={600}>
          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-thin tracking-[0.2em] md:tracking-[0.3em] text-black mb-8 text-center max-w-full">
              SKILLS
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Primary Skills */}
              <div>
                <h3 className="text-lg font-light tracking-wide text-black mb-4">Primary Technologies</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: 'React JS', icon: Code },
                    { name: 'Tailwind CSS', icon: Palette },
                    { name: 'Express JS', icon: Server },
                    { name: 'Figma', icon: Figma },
                    { name: 'Photoshop', icon: Palette },
                    { name: 'Supabase', icon: Database },
                    { name: 'MongoDB', icon: Database }
                  ].map((skill) => (
                    <div key={skill.name} className="flex items-center space-x-2 text-sm text-gray-700">
                      <skill.icon size={16} />
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Secondary Skills */}
              <div>
                <h3 className="text-lg font-light tracking-wide text-black mb-4">Learning & Exploring</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: 'Python', icon: Code },
                    { name: 'Java', icon: Code },
                    { name: 'Django', icon: Server },
                    { name: 'Next.js', icon: Code }
                  ].map((skill) => (
                    <div key={skill.name} className="flex items-center space-x-2 text-sm text-gray-600">
                      <skill.icon size={16} />
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
});

AboutSection.displayName = 'AboutSection';

export default AboutSection;


