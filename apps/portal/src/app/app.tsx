// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createTheme, ThemeProvider } from '@mui/material';
import {
  countriesActions,
  CountryList,
  fetchCountries,
  fetchCountriesByRegion,
  selectAllCountries,
  selectLoadingError,
  selectLoadingStatus,
} from '@rest-countries/country';
import { FilterBar, Header } from '@rest-countries/layout';
import { useMemo } from 'react';
import { useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { useDispatch, useSelector } from 'react-redux';
import { portalActions, selectIsDarkMode } from './store/portal.slice';
import CircularProgress from '@mui/material/CircularProgress';

export function App() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(selectIsDarkMode);
  const countries = useSelector(selectAllCountries);
  const loadingStatus = useSelector(selectLoadingStatus);
  const error = useSelector(selectLoadingError);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);
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
        onFilterChange={(e) => {
          dispatch(
            e.region === 'Any'
              ? fetchCountries()
              : fetchCountriesByRegion(e.region)
          );
        }}
      />
      {loadingStatus === 'loading' ? (
        <CircularProgress />
      ) : (
        <CountryList countries={countries} />
      )}
    </ThemeProvider>
  );
}

export default App;
