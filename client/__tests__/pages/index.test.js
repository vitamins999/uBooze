/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import store from '../../store';
import Home from '../../pages/index';

const MockHomePage = () => {
  return (
    <Provider store={store}>
      <ToastContainer />
      <Home />
    </Provider>
  );
};

describe('Home Page', () => {
  beforeEach(() => {
    render(<MockHomePage />);
  });

  it('should render home page', () => {
    const sectionElement = screen.getByTestId('section-hero');
    expect(sectionElement).toBeInTheDocument();
  });

  it('should be able to select radius in form', () => {
    const selectElement = screen.getByRole('combobox');
    userEvent.selectOptions(selectElement, '3218');

    const optionElementOne = screen.getByRole('option', { name: '1 Mile' });
    const optionElementTwo = screen.getByRole('option', { name: '2 Miles' });
    const optionElementThree = screen.getByRole('option', { name: '3 Miles' });

    expect(optionElementOne.selected).toBe(false);
    expect(optionElementTwo.selected).toBe(true);
    expect(optionElementThree.selected).toBe(false);
  });

  it('should be able to type in postcode field in form', () => {
    const inputElement = screen.getByPlaceholderText('Enter postcode...');
    fireEvent.change(inputElement, { target: { value: 'SS9 1BC' } });

    expect(inputElement.value).toBe('SS9 1BC');
  });

  it('should render error if postcode not entered on submit', async () => {
    const selectElement = screen.getByRole('combobox');
    userEvent.selectOptions(selectElement, '3218');

    const buttonElement = screen.getByTestId('button-submit');
    fireEvent.submit(buttonElement);

    const alertElement = await screen.findByText('Postcode is required!');
    expect(alertElement).toBeInTheDocument();
  });
});
