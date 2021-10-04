/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import Rating from '../../components/Rating';

describe('Rating Component', () => {
  it('should render rating component', () => {
    render(<Rating />);
    const divElement = screen.getByTestId('divider-overall-rating');
    expect(divElement).toBeInTheDocument();
  });

  it('should render user rating if user prop is true', () => {
    render(<Rating user={true} />);
    const divElement = screen.getByTestId('divider-user-rating');
    expect(divElement).toBeInTheDocument();
  });

  it('should not render user rating if user prop is not passed to component', () => {
    render(<Rating />);
    const divElement = screen.queryByTestId('divider-user-rating');
    expect(divElement).not.toBeInTheDocument();
  });
});
