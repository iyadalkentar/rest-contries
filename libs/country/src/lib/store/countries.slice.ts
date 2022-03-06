import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { Country, getAllCountries, getCountriesByRegion } from '@rest-countries/service';

export const STORE_COUNTRIES_FEATURE_KEY = 'countries';


export interface CountriesState extends EntityState<Country> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string|null;
}

export const countriesAdapter =
  createEntityAdapter<Country>({
    selectId: e => e.cca3
  });

export const fetchCountries = createAsyncThunk(
  'countries/fetchAll',
  async (_, thunkAPI) => {
    return getAllCountries();
  }
);
export const fetchCountriesByRegion = createAsyncThunk(
  'countries/fetchByRegion',
  async (region: string, thunkAPI) => {
    return getCountriesByRegion(region);
  }
);

export const initialCountriesState: CountriesState =
  countriesAdapter.getInitialState({
    loadingStatus: 'not loaded',
    error: null,
  });

export const countriesSlice = createSlice({
  name: STORE_COUNTRIES_FEATURE_KEY,
  initialState: initialCountriesState,
  reducers: {
    add: countriesAdapter.addOne,
    remove: countriesAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state: CountriesState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchCountries.fulfilled,
        (
          state: CountriesState,
          action: PayloadAction<Country[]>
        ) => {
          countriesAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(
        fetchCountries.rejected,
        (state: CountriesState, action) => {
          state.loadingStatus = 'error';
          state.error = action.error.message??'';
        }
      )
      .addCase(fetchCountriesByRegion.pending, (state: CountriesState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchCountriesByRegion.fulfilled,
        (
          state: CountriesState,
          action: PayloadAction<Country[]>
        ) => {
          countriesAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(
        fetchCountriesByRegion.rejected,
        (state: CountriesState, action) => {
          state.loadingStatus = 'error';
          state.error = action.error.message??'';
        }
      );
  },
});

export const countriesReducer = countriesSlice.reducer;
export const countriesActions = countriesSlice.actions;

const { selectAll, selectEntities } = countriesAdapter.getSelectors();

export const getCountriesState = (
  rootState: any
): CountriesState => rootState[STORE_COUNTRIES_FEATURE_KEY];

export const selectAllCountries = createSelector(
  getCountriesState,
  selectAll
);

export const selectCountriesEntities = createSelector(
  getCountriesState,
  selectEntities
);

export const selectLoadingStatus = createSelector(
  getCountriesState,
  s => s.loadingStatus
);

export const selectLoadingError = createSelector(
  getCountriesState,
  s => s.error
);

