import { getAllCountries, API_URL } from './service';
import * as countries from '../../../api-response/country-list.json';

import axios from 'axios';
import { getCountriesByRegion } from '..';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getAllCountries', () => {
  it('Should return country list (success)', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: countries });
    const res = await getAllCountries();
    expect(mockedAxios.get).toHaveBeenCalledWith(API_URL + 'all');
    expect(res).toBeTruthy();
    expect(res.length).toBe(1);
    expect(res[0].name.common).toBe('Montenegro');
    expect(res[0].area).toBe(13812);
    expect(res[0].capital[0]).toBe('Podgorica');
    expect(res[0].cca3).toBe('MNE');
    expect(res[0].flags.png).toBe('https://flagcdn.com/w320/me.png');
    expect(res[0].population).toBe(621718);
    expect(res[0].region).toBe('Europe');
  });
  it('Should return empty list (fail)', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error());
    const res = await getAllCountries();
    expect(res).toBeTruthy();
    expect(res.length).toBe(0);
  });
  it('Should return countries based on region (success)', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: countries });
    const res = await getCountriesByRegion('Europe');
    expect(mockedAxios.get).toHaveBeenCalledWith(API_URL + 'region/Europe');
    expect(res).toBeTruthy();
    expect(res.length).toBe(1);
    expect(res[0].name.common).toBe('Montenegro');
    expect(res[0].area).toBe(13812);
    expect(res[0].capital[0]).toBe('Podgorica');
    expect(res[0].cca3).toBe('MNE');
    expect(res[0].flags.png).toBe('https://flagcdn.com/w320/me.png');
    expect(res[0].population).toBe(621718);
    expect(res[0].region).toBe('Europe');
  });
});
