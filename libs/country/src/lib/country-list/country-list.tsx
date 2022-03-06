import { Box } from '@mui/material';
import { Country } from '@rest-countries/service';
import CountryCard from '../country-card/country-card';
import styles from './country-list.module.scss';

/* eslint-disable-next-line */
export interface CountryListProps {
  countries: Country[];
}

export function CountryList(props: CountryListProps) {
  return (
    <Box
      padding={2}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      }}
    >
      {props.countries.map((c) => (
        <CountryCard key={c.cca3} country={c} />
      ))}
    </Box>
  );
}

export default CountryList;
