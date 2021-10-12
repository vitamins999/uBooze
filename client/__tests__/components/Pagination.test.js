/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../../components/Pagination';

describe('Pagination Component', () => {
  it('should render pagination component', () => {
    render(<Pagination totalItems={20} currentPage={1} totalPages={2} />);
    const navElement = screen.getByTestId('nav-pagination');
    expect(navElement).toBeInTheDocument();
  });

  it('should render correct amount of page buttons if no siblings are needed', () => {
    render(<Pagination totalItems={20} currentPage={1} totalPages={2} />);
    const buttonElement = screen.getAllByTestId('button-pagenumber');
    expect(buttonElement.length).toBe(2);
  });

  it('should render six page buttons if one sibling (right) is needed', () => {
    render(<Pagination totalItems={200} currentPage={1} totalPages={20} />);
    const buttonElement = screen.getAllByTestId('button-pagenumber');
    expect(buttonElement.length).toBe(6);
  });

  it('should render six page buttons if one sibling (left) is needed', () => {
    render(<Pagination totalItems={200} currentPage={20} totalPages={20} />);
    const buttonElement = screen.getAllByTestId('button-pagenumber');
    expect(buttonElement.length).toBe(6);
  });

  it('should render five page buttons if both siblings are needed', () => {
    render(<Pagination totalItems={200} currentPage={10} totalPages={20} />);
    const buttonElement = screen.getAllByTestId('button-pagenumber');
    expect(buttonElement.length).toBe(5);
  });

  it('should render no siblings if none are needed', () => {
    render(<Pagination totalItems={20} currentPage={1} totalPages={2} />);
    const paragraphElement = screen.queryAllByTestId('paragraph-elipses');
    expect(paragraphElement.length).toBe(0);
  });

  it('should render one (right) sibling if total pages is 7 or more and current page would not create left sibling', () => {
    render(<Pagination totalItems={200} currentPage={1} totalPages={20} />);
    const paragraphElement = screen.queryAllByTestId('paragraph-elipses');
    expect(paragraphElement.length).toBe(1);
  });

  it('should render one (left) sibling if current page high enough to not create right sibling', () => {
    render(<Pagination totalItems={200} currentPage={20} totalPages={20} />);
    const paragraphElement = screen.queryAllByTestId('paragraph-elipses');
    expect(paragraphElement.length).toBe(1);
  });

  it('should render two siblings if current page within page boundaries to create them', () => {
    render(<Pagination totalItems={200} currentPage={10} totalPages={20} />);
    const paragraphElement = screen.queryAllByTestId('paragraph-elipses');
    expect(paragraphElement.length).toBe(2);
  });
});
