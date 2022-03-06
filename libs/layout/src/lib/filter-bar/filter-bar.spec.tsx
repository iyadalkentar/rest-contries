import { fireEvent, render, screen } from '@testing-library/react';

import FilterBar from './filter-bar';

describe('FilterBar', () => {
  it('should render successfully', () => {
    const countries = ['Syria', 'USA'];
    const filterChange = jest.fn();

    const { baseElement } = render(
      <FilterBar regions={countries} onFilterChange={filterChange} />
    );
    expect(baseElement).toBeTruthy();
  });
});
