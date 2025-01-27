'use client';

import React from 'react';
import {ShowMoreProps} from "@/types";
import {useRouter} from "next/navigation";
import {CustomButton} from "@/components/index";
import {updateSearchParams} from "@/utils";

const ShowMore = ({pageNumber, isNext}: ShowMoreProps) => {
    const router = useRouter();
    console.log(pageNumber)
    const handleNavigation = () => {
        const newLimit = (pageNumber + 1) * 10;
        const newPathName = updateSearchParams('limit', `${newLimit}`);
        // newPathName = updateSearchParams('scroll', String(false));
        router.push(newPathName);
    }
    return (
        <div className={'w-full flex-center gap-5 mt-10'}>
            {
                !isNext && (
                    <CustomButton
                        title={'Show More'}
                        btnType={'button'}
                        containerStyles={'bg-primary-blue rounded-full text-white'}
                        handleClick={handleNavigation}
                    />
                )
            }
        </div>
    );
};

export default ShowMore;