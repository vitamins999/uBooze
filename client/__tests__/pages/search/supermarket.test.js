/**
 * @jest-environment jsdom
 */

import { screen, fireEvent } from '@testing-library/react';
import { getPage } from 'next-page-tester';

describe('Supermarket Search Page', () => {
  beforeEach(async () => {
    const { render } = await getPage({
      route: '/search/supermarket',
    });
    render();
  });

  it('should render supermarket search page', () => {
    const sectionElement = screen.getByTestId('section-main');
    expect(sectionElement).toBeInTheDocument();
  });

  it('should render all 7 supermarkets for clicking', () => {
    const labelElements = screen.getAllByTestId('label-supermarket');
    expect(labelElements.length).toBe(7);
  });

  it('should render supermarket checkbox value correctly', () => {
    const checkboxElements = screen.getAllByTestId('checkbox-supermarket');
    expect(checkboxElements[0].value).toBe('Asda');
  });

  it('should render supermarket image correctly', () => {
    const imageElements = screen.getAllByTestId('image-supermarket');
    expect(imageElements[0]).toHaveAttribute('src', '/asda_logo.svg');
  });

  it('should allow supermarket checkbox to be checked and unchecked', () => {
    const checkboxElements = screen.getAllByTestId('checkbox-supermarket');
    fireEvent.click(checkboxElements[0]);
    expect(checkboxElements[0].checked).toEqual(true);
    expect(checkboxElements[1].checked).toEqual(false);

    fireEvent.click(checkboxElements[0]);
    expect(checkboxElements[0].checked).toEqual(false);
    expect(checkboxElements[1].checked).toEqual(false);
  });

  // Error

  it('should render correct error message if no checkboxes are selected', async () => {
    const buttonElement = screen.getByRole('button', { name: /Search/i });
    fireEvent.submit(buttonElement);

    const alertElement = await screen.findByText(
      'You need to select at least 1 supermarket before trying to search!'
    );
    expect(alertElement).toBeInTheDocument();
  });
});
