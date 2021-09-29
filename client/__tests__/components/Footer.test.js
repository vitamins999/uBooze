/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import Footer from '../../components/Footer';

describe('Footer Component', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it('should render footer component correctly', () => {
    const sectionElement = screen.getByTestId('section-footer');
    expect(sectionElement).toBeInTheDocument();
  });

  it('should have current year in copyright of footer', () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    const copyrightTextToTest = `© ${currentYear.toString()} ubooze. All rights reserved`;
    const paragraphElement = screen.getByTestId('paragraph-copyright');

    expect(paragraphElement.textContent).toBe(copyrightTextToTest);
  });
});
