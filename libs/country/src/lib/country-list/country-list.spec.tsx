import { render } from '@testing-library/react';
import countries from '../../../../api-response/country-list.json';
import CountryList from './country-list';

describe('CountryList', () => {
  it('should render successfully', () => {
    const { baseElement, queryAllByText } = render(<CountryList countries={countries}/>);
    expect(baseElement).toBeTruthy();
    expect(queryAllByText(/Population/i).length).toBe(countries.length);
  });
});
