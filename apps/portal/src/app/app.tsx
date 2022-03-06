// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CountryCard, CountryList } from '@rest-countries/country';
import { Header } from '@rest-countries/layout';
import { Country, getAllCountries } from '@rest-countries/service';
import { useEffect, useState } from 'react';
import styles from './app.module.scss';

export function App() {
  const [isDarkMode, setTheme] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const loadCountries = useEffect(() => {
    getAllCountries().then((c) => setCountries(c));
  });
  return (
    <>
      <Header
        isDarkMode={isDarkMode}
        onChangeTheme={() => setTheme(!isDarkMode)}
      />
      <CountryList countries={countries} />
    </>
  );
}

export default App;
