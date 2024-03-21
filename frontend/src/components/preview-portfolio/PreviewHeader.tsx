'use client';
import { IPortfolio } from '@/interfaces';
import { useTheme } from 'next-themes';
import modern from '../../app/admin/portfolios/templates/modern-template.module.css';
import { useEffect } from 'react';

type Props = {
    portfolio: IPortfolio
};


export const PreviewHeader: React.FC<Props> = ({ portfolio }) => {
    const { theme } = useTheme();

    useEffect(()=>{
        console.log('useTheme in Header',theme)
    },[theme])

    return (
        <div className={`py-[30px] px-[80px] border-b-gray-300 border-2 
        ${
            theme === 'modern' ? modern.headerBackGroundColor : ''
        }`}>
            <div className="w-full outline-none text-5xl">
                <div className={`w-full outline-none text-5xl
                ${
                    theme === 'modern' ? `${modern.headerFieldInput}` : ''
                }
                `}>{portfolio.header.title}
                </div>
            </div>
            <div className="w-full outline-none ">
                <div className={`w-full outline-none
                ${
                    theme === 'modern' ? `${modern.subHeaderInputField} ` : ''
                }
                `}>{portfolio.header.subHeading}</div>
            </div>
        </div>
    );
};
