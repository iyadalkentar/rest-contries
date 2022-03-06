import { Country } from './models';
import axios from 'axios';
export const API_URL = 'https://restcountries.com/v3.1/';

export const getAllCountries = async () => {
  try {
    const countries = await axios.get<Country[]>(API_URL + 'all');
    return countries.data;
  } catch (e) {
    return [];
  }
};
export const getCountriesByRegion = async (region: string) => {
  try {
    const countries = await axios.get<Country[]>(API_URL + 'region/'+region);
    return countries.data;
  } catch (e) {
    return [];
  }
};