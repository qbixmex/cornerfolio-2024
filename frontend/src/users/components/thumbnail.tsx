'use client';

import { useState } from 'react';
import './thumbnail.css';

type Props = {
  name: string;
  imageUrl: string;
};

const Thumbnail: React.FC<Props> = ({ name, imageUrl }) => {
  const [isThumbnailHovered, setIsThumbnailHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsThumbnailHovered(true)}
      onMouseLeave={() => setIsThumbnailHovered(false)}
      className="cursor-pointer"
    >
      <img
        className="w-12 h-12 rounded-full object-cover object-center"
        src={imageUrl}
        alt={name}
      />
      {isThumbnailHovered && (
        <img
          className="absolute z-50 inset-0 m-auto w-[500px] h-auto rounded-lg shadow-lg p-4 bg-white apply-thumbnail-animation"
          src={imageUrl}
          alt={name}
        />
      )}
    </div>
  );
};

export default Thumbnail;
