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
};

const SectionsList: React.FC<Props> = ({ sections, portfolioId }) => {
  return (
    <div>
      {sections.map((section, index) => (
        <div key={section.item.id} className=''>
          <div className='flex justify-between'>
            <div className='mb-5 border-b ml-5 mr-5 w-full'>
              <RenderSection section={section} />
            </div>
            <MoveSectionsUpDownButton
              portfolioId={portfolioId}
              sectionId={section.item.id}
              isFirst={index === 0}
              isLast={index === sections.length - 1}
            />
          </div>
          {index !== sections.length - 1 && <ChooseSection portfolioId={portfolioId} order={index + 1} />}
        </div>
      ))}
    </div>
  );
};

export default SectionsList;
