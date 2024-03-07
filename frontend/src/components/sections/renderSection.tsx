import DeleteDivider from "./deleteDivider";
import DeleteText from "./deleteText";
import DeleteImage from "./deleteImage";
import DeleteImageText from "./deleteImageText";
import DeleteEmbeddedMedia from "./deleteEmbeddedMedia";

const renderSection = (section:any) => {
    switch (section.kind) {
        case 'SectionDivider':
            return (
                <>
                    <DeleteDivider sectionId={section.item.id} />
                    <div className="text-base border-b mb-3 pb-5" key={section.id} dangerouslySetInnerHTML={{ __html: section.item.title }}></div>
                </>
            )
        case 'SectionText':
            return (
                <>
                    <DeleteText sectionId={section.item.id}/>
                    <div className={`flex ${section.item.position === 'center' ? 'justify-center' : section.item.position === 'right' ? 'justify-end' : ''}`}>
                        <div className="w-3/4 " key={section.item.id} >
                            <div className="text-xl" dangerouslySetInnerHTML={{__html: section.item.heading}}></div> 
                            <div className="text-base" dangerouslySetInnerHTML={{__html: section.item.content}}></div>
                        </div>
                    </div>
                </>
            )
        case 'SectionImage':
            return(
                <>
                    <DeleteImage sectionId={section.item.id}/>
                    <div className={`flex  ${section.item.position === 'center' ? 'justify-center' : section.item.position === 'right' ? 'justify-end' : ''}`}>
                        <div className="w-1/2" key={section.item.id}>
                            <img src={section.item.url} alt={section.item.alt}></img>
                            <div className="text-base" dangerouslySetInnerHTML={{__html: section.item.caption}}></div>
                        </div>
                    </div>
                </>
            )
        case 'SectionImageText':
            return (
                <>
                    <DeleteImageText sectionId={section.item.id}/>
                    <div className={`flex justify-evenly ${section.item.position === 'text_img' ? 'flex-row-reverse' : ''}`}>
                        <div className="w-1/3" key={`img-${section.item.id}`}>
                            <img src={section.item.imgUrl} alt={section.item.imgAlt}></img>
                            <div className="text-base" dangerouslySetInnerHTML={{__html: section.item.imgCaption}}></div>
                        </div>

                        <div className="w-1/3" key={`text-${section.item.id}`}>
                            <div className="text-xl" dangerouslySetInnerHTML={{__html: section.item.txtHeading}}></div> 
                            <div className="text-base" dangerouslySetInnerHTML={{__html: section.item.txtContent}}></div>
                        </div>
                    </div>
                </>
            )
        case 'SectionEmbeddedMedia':
            return (
                <>
                    <DeleteEmbeddedMedia sectionId={section.item.id} />
                    <div key={section.item.id} dangerouslySetInnerHTML={{__html: section.item.code}}></div>
                </>
            )
        default:
            return null;
    }
};

export default renderSection