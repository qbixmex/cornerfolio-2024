import RenderSection from './renderSection';
import ChooseSection from './chooseSection';
import {
  SectionText, SectionImage, SectionEmbeddedMedia, SectionImageText, SectionDivider
} from '@/interfaces';
import MoveSectionsUpDownButton from './moveSectionButton';

type Section =
  | SectionText
  | SectionImage
  | SectionEmbeddedMedia
  | SectionImageText
  | SectionDivider;

type Props = {
  sections: Section[];
  portfolioId: string;
  theme: string;
};

const SectionsList: React.FC<Props> = ({ sections, portfolioId, theme }) => {
  return (
    <div>
      {sections.map((section, index) => (
        <div key={section.item.id} className=''>
          <div className='flex justify-between'>
            <div className='mb-5 border-b ml-5 mr-5 w-full'>
              <RenderSection portfolioId={portfolioId} section={section} />
            </div>
            <MoveSectionsUpDownButton
              portfolioId={portfolioId}
              sectionId={section.item.id}
              isFirst={index === 0}
              isLast={index === sections.length - 1}
            />
          </div>
          {index !== sections.length - 1 && (
            <ChooseSection
              portfolioId={portfolioId}
              order={index + 1}
            />
          )}
        </div>
      ))}
      <ChooseSection
        portfolioId={portfolioId}
        order={sections.length}
      />
    </div>
  );
};

export default SectionsList;
