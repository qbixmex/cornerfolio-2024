import { SectionGallery } from "@/interfaces";
import styles from '@/app/[tinyUrl]/tiny-url.module.css';
import clsx from "clsx";

type Props = {
  section: SectionGallery;
  theme: string;
  column: number;
};

const ColumnImage: React.FC<Readonly<Props>> = ({ section, theme, column }) => {
  return (
    <figure id={section.item.id} className={styles.sectionFigure}>
      <img
        className={styles.sectionGalleryImage}
        src={(section as any).item[`url${column}`]}
        alt={(section as any).item[`alt${column}`]}
      />
      <figcaption
        style={{ fontSize: (section.item as any)[`captionSize${column}`] }}
        className={clsx(styles.sectionGalleryCaption, {
          'modern.headerFieldInput': theme === 'modern',
          'text-white': theme !== 'light'
        })}
      >
        {(section.item as any)[`caption${column}`]}
      </figcaption>
    </figure>
  );

};

export default ColumnImage;
