/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store';
import NavBar from '../../components/NavBar';

const MockNavBar = () => {
  return (
    <Provider store={store}>
      <NavBar />
    </Provider>
  );
};

describe('NavBar Component', () => {
  beforeEach(() => {
    render(<MockNavBar />);
  });

  it('should render navbar component', () => {
    const sectionElement = screen.getByTestId('section-header');
    expect(sectionElement).toBeInTheDocument();
  });

  it('should render login button if not signed in', () => {
    const linkElement = screen.getByRole('link', { name: /Login/i });
    expect(linkElement).toBeInTheDocument();
  });

  it('should render signup button if not signed in', () => {
    const linkElement = screen.getByRole('link', { name: /Sign Up/i });
    expect(linkElement).toBeInTheDocument();
  });
});
