import ImageSkeleton from "@/components/sections/imageSkeleton";
import InputSectionGallery from "@/components/sections/inputSectionGallery";
import UploadSectionGallery from "@/components/sections/uploadSectionGallery";
import { SectionGallery } from "@/interfaces";
import Image from "next/image";

type Props = {
  section: SectionGallery;
  portfolioId: string;
  imageId: string;
  column: number;
};

const ColumnGallery: React.FC<Readonly<Props>> = ({ section, imageId, portfolioId, column }) => {
  return (
    <div className="w-1/3 min-h-[500px]  max-sm:w-full m-1">
      {
        (imageId === `${section.item.id}-${column}`)
          ? <ImageSkeleton className="max-w-[400px] max-h-[400px] mx-auto" />
          : (
            <Image
              className="mx-auto rounded-md"
              src={(section as any).item[`url${column}`]}
              alt={(section as any).item[`alt${column}`]}
              width={500}
              height={500}
            />
          )
      }

      <div className='border-transparent border-2'>
        <UploadSectionGallery
          position={column as 1 | 2 | 3}
          portfolioId={portfolioId}
          section={section as SectionGallery}
        />
      </div>

      <div className='border-transparent border-2'>
        <InputSectionGallery
          position={column as 1 | 2 | 3}
          section={section as SectionGallery}
        />
      </div>
    </div>
  );

};

export default ColumnGallery;
