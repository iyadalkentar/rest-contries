import { fireEvent, render } from '@testing-library/react';

import FilterBar from './filter-bar';

describe('FilterBar', () => {
  it('should render successfully', () => {
    const filterChange = jest.fn();

    const { baseElement } = render(<FilterBar onFilterChange={filterChange} />);
    expect(baseElement).toBeTruthy();
  });

  it('should fire change event when change input search', () => {
    const filterChange = jest.fn();
    const changeFn = jest.fn();

    const { getByRole } = render(
      <FilterBar onNameChange={changeFn} onFilterChange={filterChange} />
    );
    const elm = getByRole(/textbox/i);
    expect(elm).toBeTruthy();
    fireEvent.change(elm, { target: { value: 'sea' } });
    expect(filterChange).not.toHaveBeenCalled();
    expect(changeFn).toBeCalled();
    fireEvent.change(elm, { target: { value: 'abc\n' } });
    expect(filterChange).not.toHaveBeenCalled();
    expect(changeFn).toBeCalled();
  });

  it('should fire change event country changed', () => {
    const filterChange = jest.fn();

    const { getByDisplayValue } = render(
      <FilterBar onFilterChange={filterChange} />
    );
    const elm = getByDisplayValue(/Any/i);
    expect(elm).toBeTruthy();
    fireEvent.change(elm, { target: { value: 'Asia' } });
    expect(filterChange).toBeCalledWith({ name: '', region: 'Asia' });
  });
});
