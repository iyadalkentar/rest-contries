import SearchIcon from '@mui/icons-material/Search';
import {
  Select,
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
} from '@mui/material';
import { useState } from 'react';

/* eslint-disable-next-line */
export interface FilterBarProps {
  regions: string[];
  onFilterChange: (value: { name: string; region: string }) => void;
}

export function FilterBar(props: FilterBarProps) {
  const [region, setRegion] = useState('');
  const [name, setName] = useState('');
  const { regions, onFilterChange } = props;
  return (
    <Box
      sx={{ display: 'flex', flexFlow: 'row', justifyContent: 'space-between' }}
    >
      <TextField
        sx={{ m: 1 }}
        id="outlined-basic"
        variant="outlined"
        InputProps={{
          startAdornment: <SearchIcon />,
        }}
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyPress={(e) => {
          if (e.code === 'Enter') {
            onFilterChange({ name: name, region: region });
          }
        }}
        fullWidth
      />
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel>Region</InputLabel>
        <Select
          id="region"
          label="Region"
          value={region}
          onChange={(e) => {
            setRegion('' + e.target.value);
            onFilterChange({ name: name, region: e.target.value });
          }}
        >
          {regions.map((r) => (
            <MenuItem key={r} value={r}>
              {r}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default FilterBar;
