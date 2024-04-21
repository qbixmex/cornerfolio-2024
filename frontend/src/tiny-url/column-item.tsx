"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { SectionColumn } from '@/interfaces';
import styles from '@/app/[tinyUrl]/tiny-url.module.css';

type Props = {
  section: SectionColumn;
  theme: string;
  column: number;
};

const ColumnItem: React.FC<Readonly<Props>> = ({ section, theme, column }) => {
  const [ content, setContent ] = useState("");

  useEffect(() => {
    setContent((section.item as any)[`content${column}`].replace(/\n/g, 
      `<div style="width:100%;height:12px;">&nbsp</div>`
    ));
  }, []);

  return (
    <section>
      {/* heading */}
      <div className="flex items-between m-2">
        <h3
          style={{ fontSize: (section.item as any)[`headingSize${column}`] }}
          className={clsx(
            styles.sectionColumnHeading, {
            "text-stone-700": theme === 'light',
            "text-gray-50": theme === 'dark',
            "text-sky-400": theme === 'modern',
          }
          )}
        >{(section.item as any)[`heading${column}`]}</h3>
      </div>

      {/* content */}
      <div className="flex items-between m-2">
        <p
          style={{ fontSize: (section.item as any)[`contentSize${column}`] }}
          className={clsx(
            styles.sectionColumnDescription, {
            "text-stone-700": theme === 'light',
            "text-gray-50": (theme === 'dark') || (theme === 'modern'),
          }
          )}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  );

};

export default ColumnItem;
