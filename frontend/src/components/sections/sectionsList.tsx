import React from 'react';
import renderSection from './renderSection';
import { ISections } from '@/interfaces';

type Section = 
    | ISections.ISectionText
    | ISections.ISectionImage
    | ISections.ISectionEmbeddedMedia
    | ISections.ISectionImageText
    | ISections.ISectionDivider;

type Props = {
    sections: Section[];
};

const SectionsList: React.FC<Props> = ({ sections }) => {
    return (    
        <div>
            {sections.map((section, index) => (
                <div className='mb-5 border-b ml-5 mr-5' key={section.id || index}>
                    {renderSection(section)}
                </div>
            ))}
        </div>
    );
};

export default SectionsList;
