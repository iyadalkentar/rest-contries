// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createTheme, ThemeProvider } from '@mui/material';
import { CountryList } from '@rest-countries/country';
import { FilterBar, Header } from '@rest-countries/layout';
import { Country, getAllCountries } from '@rest-countries/service';
import { useMemo } from 'react';
import { useEffect, useState } from 'react';
import styles from './app.module.scss';
import CssBaseline from '@mui/material/CssBaseline';

export function App() {
  const [isDarkMode, setTheme] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const loadCountries = useEffect(() => {
    getAllCountries().then((c) => setCountries(c));
  });
  const theme = useMemo(
    () => createTheme({ palette: { mode: isDarkMode ? 'dark' : 'light' } }),
    [isDarkMode]
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header
        isDarkMode={isDarkMode}
        onChangeTheme={() => setTheme(!isDarkMode)}
      />
      <FilterBar
        onFilterChange={(e) => console.log(e)}
        regions={['ab', 'cd']}
      />
      <CountryList countries={countries} />
    </ThemeProvider>
  );
}

export default App;
