import {countriesAdapter, countriesReducer, fetchCountries} from './countries.slice';
import country from '../../../../api-response/country.json';
describe('countries reducer', () => {
  it('should handle initial state', () => {
    const expected = countriesAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(countriesReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchStoreCountriess', () => {
    let state = countriesReducer(
      undefined,
      fetchCountries.pending('')
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = countriesReducer(
      state,
      fetchCountries.fulfilled([country], '')
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { "MNE": country },
      })
    );

    state = countriesReducer(
      state,
      fetchCountries.rejected(new Error('Uh oh'), '')
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { "MNE": country },
      })
    );
  });
});
