"use client"
import { useState, useEffect } from "react";
import { getPortfolio } from "@/portfolio/actions/portfolio.actions";
import { FC } from "react";
import TemplateFooter from "../components/templateFooter";
import TemplateHeader from "../components/templateHeader";
import SectionsList from "@/components/sections/sectionsList";
import ChooseSection from "@/components/sections/chooseSection";

type Props = {
    params: { id: string };
    searchParams: {};
};

const EditPortfolioPage: FC<Props> = ({ params }) => {
    // in the future, it sholud be in redux.
    const [loading, setLoading] = useState(true);
    const [portfolio,setPortfolio] =useState<any>({})
    const id=params.id
    useEffect(()=>{
        const fetchPortfolio = async () => {
            try {
                const fetchData = await getPortfolio(id);
                setPortfolio(fetchData)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching portfolio:', error);
            }
        };
        if (id){
            fetchPortfolio();
        }
        
    },[id])
    

    return (
        <main className="ml-[52px] mt-[55px] text-2xl font-bold">
            {!loading && (
                <>
                    <TemplateHeader header={portfolio.header} />
                    {portfolio.sections && portfolio.sections.length === 0 ? (
                        <section className="mx-[80px] mt-10 flex flex-col items-center gap-3">
                            <section className="bg-orange-500 rounded text-white w-fit p-5">
                                No section created yet
                            </section>
                        </section>
                    ) : null}
                    <SectionsList sections={portfolio.sections || []} />
                    <ChooseSection portfolioId={params.id}/>
                    <TemplateFooter footer={portfolio.footer} />
                </>
            )}
        </main>

    );
};

export default EditPortfolioPage;
