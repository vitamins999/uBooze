/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import SearchBox from '../../components/SearchBox';

describe('Search Box Component', () => {
  beforeEach(() => {
    render(<SearchBox />);
  });

  it('should render search box component', () => {
    const formElement = screen.getByTestId('section-form');
    expect(formElement).toBeInTheDocument();
  });

  it('should be able to type in search input on form', () => {
    const inputElement = screen.getByTestId('input-searchbox');
    fireEvent.change(inputElement, { target: { value: 'Budweiser' } });
    expect(inputElement.value).toBe('Budweiser');
  });
});
