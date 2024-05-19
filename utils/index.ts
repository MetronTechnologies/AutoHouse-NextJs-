// const fetch = require('node-fetch');

import {CarProps, FilterProps} from "@/types";
import {router} from "next/client";

export async function fetchCars(filters: FilterProps) {
    const headers = {
        'X-RapidAPI-Key': 'ac478fcfd2msh47bc4946cc9fb43p1742b1jsn435d46f6f1f5',
        'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
    };
    const {manufacturer, model, year, fuel, limit} = filters;
    const response = await fetch(
        `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,{
            headers: headers
        }
    );
    return await response.json();
}

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
    const url = new URL("https://cdn.imagin.studio/getimage");
    const { make, model, year } = car;

    url.searchParams.append('customer', 'hrjavascript-mastery');
    url.searchParams.append('make', make);
    url.searchParams.append('modelFamily', model.split(" ")[0]);
    url.searchParams.append('zoomType', 'fullscreen');
    url.searchParams.append('modelYear', `${year}`);
    // url.searchParams.append('zoomLevel', zoomLevel);
    url.searchParams.append('angle', `${angle}`);
    // console.log(`${url}`)
    return `${url}`;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50;
    const mileageFactor = 0.1;
    const ageFactor = 0.05;
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
    return rentalRatePerDay.toFixed(0);
}

export const updateSearchParams = (type: string, value: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(type, value);
    searchParams.set('scroll', 'false');
    return `${window.location.pathname}?${searchParams.toString()}`;
}


