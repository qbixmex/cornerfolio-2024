import { useAppDispatch } from "@/store";

import { setReloading } from "@/store/slices/reload.slice";
import { moveSectionUpDown } from "@/portfolios/actions/portfolio.action";

type Props = {
    portfolioId: string;
    sectionId: string;
    isFirst: boolean;
    isLast: boolean;
};
const MoveSectionsUpDownButton: React.FC<Props & { isFirst: boolean; isLast: boolean }> = ({ portfolioId, sectionId, isFirst, isLast }) => {
        const dispatch = useAppDispatch();
    
        const handleUpdate = async (action: 'up' | 'down') => {
        try {
            dispatch(setReloading(true)); // reloading true
            await moveSectionUpDown(portfolioId, sectionId, action);
        } catch (error) {
            console.error('Error updating text:', error);
        } finally {
            dispatch(setReloading(false)); // reloading false
        }
    };

    return (
        <div className='flex flex-col justify-around w-10 border'>
            {!isFirst && <button className='h-15 w-15 text-xs border hover:bg-gray-100' onClick={() => handleUpdate('up')}>Up</button>}
            {!isLast && <button className='h-15 w-15 text-xs border hover:bg-gray-100' onClick={() => handleUpdate('down')}>Down</button>}
        </div>
    );
};

export default MoveSectionsUpDownButton