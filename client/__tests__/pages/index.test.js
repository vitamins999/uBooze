/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store';
import Home from '../../pages/index';

const MockHomePage = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

describe('Home Page', () => {
  it('should render home page', () => {
    render(<MockHomePage />);
  });
});
