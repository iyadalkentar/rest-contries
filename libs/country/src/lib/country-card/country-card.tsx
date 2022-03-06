import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { Country } from '@rest-countries/service';
import styles from './country-card.module.scss';

/* eslint-disable-next-line */
export interface CountryCardProps {
  country: Country;
}

export function CountryCard(props: CountryCardProps) {
  const { country } = props;
  return (
    <Card sx={{ width: 250 }}>
      <CardMedia
        component="img"
        height="140"
        image={country.flags.svg}
        alt={country.name.common}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {country.name.official}
        </Typography>
        <Typography variant="body2" component="div" color="text.secondary">
          <ul>
            <li>
              <strong>Population:</strong>
              {country.population}
            </li>
            <li>
              <strong>Region:</strong>
              {country.region}
            </li>
            <li>
              <strong>Capital:</strong>
              {country.capital}
            </li>
          </ul>
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CountryCard;
