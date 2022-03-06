import { render } from '@testing-library/react';
import * as country from './country.json';
import CountryCard from './country-card';


describe('CountryCard', () => {
  it('should render successfully', () => {
    const { baseElement, queryByAltText, queryByText } = render(<CountryCard country={country}/>);
    expect(baseElement).toBeTruthy();
    expect(queryByAltText(country.name.common)).toBeTruthy();
    expect(queryByText(country.name.official)).toBeTruthy();
    const items = baseElement.querySelectorAll('li')
    expect(items.length).toBe(3);
    items.forEach((item, index) => {
      switch(index){
        case 0:
          expect(item.innerHTML).toBe('<strong>Population:</strong>621718');
          break;
        case 1:
          expect(item.innerHTML).toBe('<strong>Region:</strong>Europe');
          break;
        case 2:
          expect(item.innerHTML).toBe('<strong>Capital:</strong>Podgorica');
          break;
      }
    })
  });
});
