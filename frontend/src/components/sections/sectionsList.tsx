import React from 'react';
import RenderSection from './renderSection';
import {
	SectionText, SectionImage, SectionEmbeddedMedia, SectionImageText, SectionDivider
} from '@/interfaces';

type Section =
  | SectionText
  | SectionImage
  | SectionEmbeddedMedia
  | SectionImageText
  | SectionDivider;

type Props = {
  sections: Section[];
};

const SectionsList: React.FC<Props> = ({ sections }) => {
  return (
    <div>
      {sections.map((section) => (
        <div className='mb-5 border-b ml-5 mr-5' key={section.id}>
          {<RenderSection section={section} />}
        </div>
      ))}
    </div>
  );
};

export default SectionsList;
