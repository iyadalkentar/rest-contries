// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createTheme, ThemeProvider, Typography } from '@mui/material';
import {
  CountryList,
  fetchCountries,
  fetchCountriesByRegion,
  selectAllCountries,
  selectLoadingError,
  selectLoadingStatus,
} from '@rest-countries/country';
import { FilterBar, Header } from '@rest-countries/layout';
import { useMemo, useState } from 'react';
import { useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { useDispatch, useSelector } from 'react-redux';
import { portalActions, selectIsDarkMode } from './store/portal.slice';
import CircularProgress from '@mui/material/CircularProgress';

export function App() {
  const dispatch = useDispatch();
  const [tag, setTag] = useState('');
  const [region, setRegion] = useState('Any');
  const isDarkMode = useSelector(selectIsDarkMode);
  const allCountries = useSelector(selectAllCountries);
  const loadingStatus = useSelector(selectLoadingStatus);
  const error = useSelector(selectLoadingError);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);
  const theme = useMemo(
    () => createTheme({ palette: { mode: isDarkMode ? 'dark' : 'light' } }),
    [isDarkMode]
  );
  const countries = useMemo(() => {
    return tag && tag.trim() !== ''
      ? allCountries.filter((c) =>
          c.name.common.match(
            new RegExp(tag, 'i') || c.name.official.match(new RegExp(tag, 'i'))
          )
        )
      : allCountries;
  }, [allCountries, tag]);
  const renderList = () => {
    switch (loadingStatus) {
      case 'loading':
        return <CircularProgress />;
      case 'error':
        return (
          <Typography gutterBottom variant="h5" component="div">
            {error}
          </Typography>
        );
      default:
        return <CountryList countries={countries} />;
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header
        isDarkMode={isDarkMode}
        onChangeTheme={() => dispatch(portalActions.toggleMode())}
      />
      <FilterBar
        onFilterChange={(e) => {
          if (tag !== e.name) setTag(e.name);
          if (region !== e.region) {
            setRegion(e.region);
            dispatch(
              e.region === 'Any'
                ? fetchCountries()
                : fetchCountriesByRegion(e.region)
            );
          }
        }}
        onNameChange={(e) => {
          if (tag !== e) setTag(e);
        }}
      />
      {renderList()}
    </ThemeProvider>
  );
}

export default App;
