import {initialPortalState, portalActions, portalReducer} from './portal.slice';
describe('storePortal reducer', () => {
  it('should handle initial state', () => {
    const expected = initialPortalState;

    expect(portalReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle toggle mode', () => {
    let state = portalReducer(
      undefined,
      portalActions.toggleMode()
    );

    expect(state).toEqual(
      expect.objectContaining({
        isDarkMode: true
      })
    );

    state = portalReducer(
      state,
      portalActions.toggleMode()
    );

    expect(state).toEqual(
      expect.objectContaining({
        isDarkMode: false
      })
    );
  });
});
