import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

function MarketDetailsSkeleton() {
    return (
        <div className="md:px-10 py-6 px-3 w-full space-y-6">
            <div>
               <Skeleton className={`w-14 h-5 bg-[#F9F9F9]`}/>
            </div>

                <div className="flex items-center justify-center w-full">
                    <Skeleton className="md:w-2/5 md:h-[70vh] md:max-h-none rounded-lg bg-[#F9F9F9]" />
                </div>
        </div>
    );
}

export default MarketDetailsSkeleton;
