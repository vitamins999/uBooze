/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import CategoryBar from '../../components/CategoryBar';

const mockResolvedData = {
  firstItem: 1,
  lastItem: 10,
  total: 100,
};

const mockResolvedDataNoResults = {
  firstItem: 0,
  lastItem: 0,
  total: 0,
};

describe('Category Bar Component', () => {
  it('should render the component', () => {
    render(<CategoryBar resolvedData={mockResolvedData} primary='allDrinks' />);
    const sectionElement = screen.getByTestId('section-main');
    expect(sectionElement).toBeInTheDocument();
  });

  it('should render correct heading text for All Drinks', () => {
    render(<CategoryBar resolvedData={mockResolvedData} primary='allDrinks' />);
    const headingElement = screen.getByTestId('heading-main');
    expect(headingElement.textContent).toBe('All Drinks');
  });

  it('should render correct heading text for Beer', () => {
    render(<CategoryBar resolvedData={mockResolvedData} primary='beer' />);
    const headingElement = screen.getByTestId('heading-main');
    expect(headingElement.textContent).toBe('Beer & Cider / ');
  });

  it('should render correct heading text for Wine', () => {
    render(<CategoryBar resolvedData={mockResolvedData} primary='wine' />);
    const headingElement = screen.getByTestId('heading-main');
    expect(headingElement.textContent).toBe('Wine / ');
  });

  it('should render correct heading text for Spirits', () => {
    render(<CategoryBar resolvedData={mockResolvedData} primary='spirits' />);
    const headingElement = screen.getByTestId('heading-main');
    expect(headingElement.textContent).toBe('Spirits / ');
  });

  it('should render correct heading text for Search Results', () => {
    render(<CategoryBar resolvedData={mockResolvedData} primary='search' />);
    const headingElement = screen.getByTestId('heading-main');
    expect(headingElement.textContent).toBe('Search Results');
  });

  it('should render correct heading text for Favourites', () => {
    render(
      <CategoryBar resolvedData={mockResolvedData} primary='favourites' />
    );
    const headingElement = screen.getByTestId('heading-main');
    expect(headingElement.textContent).toBe('Favourites / ');
  });

  it('should render correct results text for no results', () => {
    render(
      <CategoryBar
        resolvedData={mockResolvedDataNoResults}
        primary='allDrinks'
      />
    );
    const spanElement = screen.getByTestId('span-results-false');
    expect(spanElement.textContent).toBe(' (No results found)');
  });

  it('should render correct results text for results', () => {
    render(<CategoryBar resolvedData={mockResolvedData} primary='allDrinks' />);
    const spanElement = screen.getByTestId('span-results-true');
    expect(spanElement.textContent).toBe(' (Showing 1-10 of 100 results)');
  });

  it('should render all drinks button as link if primary prop is not "alldrinks"', () => {
    render(<CategoryBar resolvedData={mockResolvedData} primary='beer' />);
    const linkElement = screen.getByTestId('link-alldrinks-true');
    expect(linkElement).toBeInTheDocument();
  });

  it('should render beer & cider button as link if primary prop is not "beer"', () => {
    render(<CategoryBar resolvedData={mockResolvedData} primary='allDrinks' />);
    const linkElement = screen.getByTestId('link-beer-true');
    expect(linkElement).toBeInTheDocument();
  });

  it('should render wine button as link if primary prop is not "wine"', () => {
    render(<CategoryBar resolvedData={mockResolvedData} primary='allDrinks' />);
    const linkElement = screen.getByTestId('link-wine-true');
    expect(linkElement).toBeInTheDocument();
  });

  it('should render spirts button as link if primary prop is not "spirits"', () => {
    render(<CategoryBar resolvedData={mockResolvedData} primary='allDrinks' />);
    const linkElement = screen.getByTestId('link-spirits-true');
    expect(linkElement).toBeInTheDocument();
  });

  it('should render all drinks button not as link if primary prop is "alldrinks"', () => {
    render(<CategoryBar resolvedData={mockResolvedData} primary='allDrinks' />);
    const linkElement = screen.getByTestId('link-alldrinks-false');
    expect(linkElement).toBeInTheDocument();
  });

  it('should render beer & cider button not as link if primary prop is "beer"', () => {
    render(<CategoryBar resolvedData={mockResolvedData} primary='beer' />);
    const linkElement = screen.getByTestId('link-beer-false');
    expect(linkElement).toBeInTheDocument();
  });

  it('should render wine button not as link if primary prop is "wine"', () => {
    render(<CategoryBar resolvedData={mockResolvedData} primary='wine' />);
    const linkElement = screen.getByTestId('link-wine-false');
    expect(linkElement).toBeInTheDocument();
  });

  it('should render spirts button not as link if primary prop is "spirits"', () => {
    render(<CategoryBar resolvedData={mockResolvedData} primary='spirits' />);
    const linkElement = screen.getByTestId('link-spirits-false');
    expect(linkElement).toBeInTheDocument();
  });
});
