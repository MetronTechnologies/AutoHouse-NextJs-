'use client';
import React, {useState} from 'react';
import SearchManufacturer from "@/components/SearchManufacturer";
import Image from "next/image";
import {useRouter} from "next/navigation";


const SearchButton = ({otherStyles}: { otherStyles: string }) => {
    return (
        <button type={'submit'} className={`-ml-3 z-10 ${otherStyles}`}>
            <Image
                src={'/magnifying-glass.svg'}
                alt={'magnifying glass'}
                width={40}
                height={40}
                className={'object-contain'}
            />
        </button>
    )
}

const SearchBar = () => {
    const router = useRouter();
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (manufacturer === '' && model === '') {
            return alert('Please fill in the search bar');
        }
        updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase())

    }
    const updateSearchParams = (model: string, manufacturer: string) => {
        const searchParams = new URLSearchParams(window.location.search);
        if (model) {
            searchParams.set('model', model);
        } else {
            searchParams.delete('model')
        }
        if (manufacturer) {
            searchParams.set('manufacturer', manufacturer);
        } else {
            searchParams.delete('manufacturer')
        }
        const newPathName = `${window.location.pathname}?${searchParams.toString()}`
        router.push(newPathName);
    }
    const [model, setModel] = useState("");

    const [manufacturer, setManufacturer] = useState("");

    return (
        <form className={'searchbar'} onSubmit={handleSearch}>
            <div className="searchbar__item">
                <SearchManufacturer
                    manufacturer={manufacturer}
                    setManufacturer={setManufacturer}
                />
                <SearchButton
                    otherStyles={'sm:hidden'}
                />
            </div>
            <div className="searchbar__item">
                <Image
                    src={'/model-icon.png'}
                    alt={'model-icon'}
                    width={25}
                    height={25}
                    className={'absolute w-[20px] h-[20px] ml-4'}
                />
                <input
                    type="text"
                    name={'model'}
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder={'Tiguan'}
                    className={'searchbar__input'}
                />
                <SearchButton otherStyles={'sm:hidden'}/>
            </div>
            <SearchButton otherStyles={'max-sm:hidden'}/>
        </form>
    );
};

export default SearchBar;