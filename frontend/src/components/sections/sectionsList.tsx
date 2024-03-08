import React, { FC } from 'react';
import RenderSection from './renderSection';
import ChooseSection from './chooseSection';
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
  portfolioId: string;
};

const SectionsList: FC<Props> = ({ sections, portfolioId }) => {
  return (
    <div>
      {sections.map((section, index) => (
        <div key={section.item.id}>
          <div className='mb-5 border-b ml-5 mr-5' >
            {<RenderSection section={section} />}
          </div>
          <ChooseSection portfolioId={portfolioId} order={index + 1} />
          <hr />
        </div>
      ))}
    </div>
  );
};

export default SectionsList;
