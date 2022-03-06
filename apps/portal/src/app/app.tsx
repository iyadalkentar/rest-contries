// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createTheme, ThemeProvider } from '@mui/material';
import { CountryList } from '@rest-countries/country';
import { FilterBar, Header } from '@rest-countries/layout';
import { Country, getAllCountries } from '@rest-countries/service';
import { useMemo } from 'react';
import { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { useDispatch, useSelector } from 'react-redux';
import { portalActions, selectIsDarkMode } from './store/portal.slice';

export function App() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(selectIsDarkMode);
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
        onChangeTheme={() => dispatch(portalActions.toggleMode())}
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
