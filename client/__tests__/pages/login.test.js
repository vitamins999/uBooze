/**
 * @jest-environment jsdom
 */

import { screen, fireEvent } from '@testing-library/react';
import { getPage } from 'next-page-tester';

const changeInputBoxValue = (testID, newValue) => {
  const inputElement = screen.getByTestId(testID);
  fireEvent.change(inputElement, {
    target: {
      value: newValue,
    },
  });

  return inputElement;
};

describe('Login Page', () => {
  beforeEach(async () => {
    const { render } = await getPage({
      route: '/login',
    });
    render();
  });

  it('should render login page', () => {
    const sectionElement = screen.getByTestId('section-main');
    expect(sectionElement).toBeInTheDocument();
  });

  it('should type in email address field in form', () => {
    const inputElement = changeInputBoxValue(
      'input-email',
      'jmorrison@example.com'
    );
    expect(inputElement.value).toBe('jmorrison@example.com');
  });

  it('should type in password address field in form', () => {
    const inputElement = changeInputBoxValue(
      'input-password',
      'myverysecurepassword1'
    );
    expect(inputElement.value).toBe('myverysecurepassword1');
  });

  // Errors

  it('should render the correct error message if email not entered on submit', async () => {
    changeInputBoxValue('input-password', 'myverysecurepassword1');
    const buttonElement = screen.getByRole('button', { name: /Login/i });
    fireEvent.click(buttonElement);

    const alertElement = await screen.findByText('Email is required');
    expect(alertElement).toBeInTheDocument();
  });

  it('should render the correct error message if password not entered on submit', async () => {
    changeInputBoxValue('input-email', 'jmorrison@example.com');
    const buttonElement = screen.getByRole('button', { name: /Login/i });
    fireEvent.click(buttonElement);

    const alertElement = await screen.findByText('Password is required');
    expect(alertElement).toBeInTheDocument();
  });
});
