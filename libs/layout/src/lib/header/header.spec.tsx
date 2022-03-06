import { fireEvent, render } from '@testing-library/react';

import Header from './header';

describe('Header', () => {
  it('should render header with dark theme button', () => {
    const isDarkMode = false;
    const changeTheme = jest.fn();
    const { baseElement, queryByText, getByText } = render(<Header isDarkMode={isDarkMode} onChangeTheme={changeTheme}/>);
    expect(baseElement).toBeTruthy();
    expect(queryByText(/Where in the world/i)).toBeTruthy();
    expect(queryByText(/Dark Mode/i)).toBeTruthy();
    expect(queryByText(/Light Mode/i)).toBeFalsy();
    fireEvent.click(getByText(/Dark Mode/i));
    expect(changeTheme).toBeCalledTimes(1);
  });
  it('should render header with light theme button', () => {
    const isDarkMode = true;
    const changeTheme = jest.fn();
    const { baseElement, queryByText, getByText } = render(<Header isDarkMode={isDarkMode} onChangeTheme={changeTheme}/>);
    expect(baseElement).toBeTruthy();
    expect(queryByText(/Where in the world/i)).toBeTruthy();
    expect(queryByText(/Dark Mode/i)).toBeFalsy();
    expect(queryByText(/Light Mode/i)).toBeTruthy();
    fireEvent.click(getByText(/Light Mode/i));
    expect(changeTheme).toBeCalledTimes(1);
  });
});
