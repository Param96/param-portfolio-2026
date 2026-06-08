import React from 'react';

import HeroModule from './modules/HeroModule';
import EditorialModule from './modules/EditorialModule';
import ProjectsGridModule from './modules/ProjectsGridModule';
import BlogFeedModule from './modules/BlogFeedModule';
import LabNotesFeedModule from './modules/LabNotesFeedModule';
import ResearchModule from './modules/ResearchModule';
import ExperienceModule from './modules/ExperienceModule';
import SkillsModule from './modules/SkillsModule';
import CertificationsModule from './modules/CertificationsModule';
import LeadershipModule from './modules/LeadershipModule';
import ContactCTAModule from './modules/ContactCTAModule';
import FloatingConceptsModule from './modules/FloatingConceptsModule';
import QuoteModule from './modules/QuoteModule';
import MediaGalleryModule from './modules/MediaGalleryModule';
import SpacerModule from './modules/SpacerModule';

const moduleComponents: Record<string, React.FC<any>> = {
  heroSection: HeroModule,
  editorialBlock: EditorialModule,
  projectsGrid: ProjectsGridModule,
  blogFeed: BlogFeedModule,
  labNotesFeed: LabNotesFeedModule,
  researchShowcase: ResearchModule,
  experienceTimeline: ExperienceModule,
  skillsMatrix: SkillsModule,
  certificationsGrid: CertificationsModule,
  leadershipSection: LeadershipModule,
  contactCTA: ContactCTAModule,
  floatingConcepts: FloatingConceptsModule,
  cinematicQuote: QuoteModule,
  mediaGallery: MediaGalleryModule,
  spacer: SpacerModule,
};

interface ModuleRendererProps {
  modules: any[];
}

export default function ModuleRenderer({ modules }: ModuleRendererProps) {
  if (!modules || modules.length === 0) return null;

  return (
    <div className="w-full flex flex-col">
      {modules.map((module, index) => {
        const ModuleComponent = moduleComponents[module._type];

        if (!ModuleComponent) {
          if (process.env.NODE_ENV === 'development') {
            return (
              <div key={module._key || index} className="p-4 bg-red-100 border border-red-500 text-red-700 my-4 max-w-5xl mx-auto w-full">
                <p>Unknown module type: <strong>{module._type}</strong></p>
              </div>
            );
          }
          return null;
        }

        return <ModuleComponent key={module._key || index} data={module} />;
      })}
    </div>
  );
}
