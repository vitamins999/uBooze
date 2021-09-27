/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import store from '../../store';
import Contact from '../../pages/company/contact';

const MockContactPage = () => {
  return (
    <Provider store={store}>
      <ToastContainer />
      <Contact />
    </Provider>
  );
};

const changeInputBoxValue = (testID, newValue) => {
  const inputElement = screen.getByTestId(testID);
  fireEvent.change(inputElement, {
    target: {
      value: newValue,
    },
  });

  return inputElement;
};

describe('Contact Page', () => {
  beforeEach(() => {
    render(<MockContactPage />);
  });

  it('should render contact page', () => {
    const sectionElement = screen.getByTestId('section-contact');
    expect(sectionElement).toBeInTheDocument();
  });

  it('should be able to type in name input on form', () => {
    const inputElement = changeInputBoxValue('input-name', 'Jim Morrison');
    expect(inputElement.value).toBe('Jim Morrison');
  });

  it('should be able to type in email input on form', () => {
    const inputElement = changeInputBoxValue(
      'input-email',
      'jmorrison@example.com'
    );
    expect(inputElement.value).toBe('jmorrison@example.com');
  });

  it('should be able to type in message input on form', () => {
    const inputElement = changeInputBoxValue(
      'input-message',
      'Come on baby, light my fire'
    );
    expect(inputElement.value).toBe('Come on baby, light my fire');
  });

  it('should render correct error message if name not entered on submit', async () => {
    changeInputBoxValue('input-email', 'jmorrison@example.com');
    changeInputBoxValue('input-message', 'Come on baby, light my fire');
    const buttonElement = screen.getByRole('button', { name: /Send Message/i });
    fireEvent.click(buttonElement);

    const alertElement = await screen.findByText('Name is required!');
    expect(alertElement).toBeInTheDocument();
  });

  it('should render correct error message if email not entered on submit', async () => {
    changeInputBoxValue('input-name', 'Jim Morrison');
    changeInputBoxValue('input-message', 'Come on baby, light my fire');
    const buttonElement = screen.getByRole('button', { name: /Send Message/i });
    fireEvent.click(buttonElement);

    const alertElement = await screen.findByText('Email is required!');
    expect(alertElement).toBeInTheDocument();
  });

  it('should render correct error message if message not entered on submit', async () => {
    changeInputBoxValue('input-name', 'Jim Morrison');
    changeInputBoxValue('input-email', 'jmorrison@example.com');
    const buttonElement = screen.getByRole('button', { name: /Send Message/i });
    fireEvent.click(buttonElement);

    const alertElement = await screen.findByText('Your message is required!');
    expect(alertElement).toBeInTheDocument();
  });
});
