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

describe('Signup Page', () => {
  beforeEach(async () => {
    const { render } = await getPage({
      route: '/signup',
    });
    render();
  });

  it('should render signup page', () => {
    const sectionElement = screen.getByTestId('section-main');
    expect(sectionElement).toBeInTheDocument();
  });

  it('should type in first name field in form', () => {
    const inputElement = changeInputBoxValue('input-firstname', 'Jim');
    expect(inputElement.value).toBe('Jim');
  });

  it('should type in last name field in form', () => {
    const inputElement = changeInputBoxValue('input-lastname', 'Morrison');
    expect(inputElement.value).toBe('Morrison');
  });

  it('should type in email address field in form', () => {
    const inputElement = changeInputBoxValue(
      'input-email',
      'jmorrison@example.com'
    );
    expect(inputElement.value).toBe('jmorrison@example.com');
  });

  it('should type in username field in form', () => {
    const inputElement = changeInputBoxValue('input-username', 'jmorrison');
    expect(inputElement.value).toBe('jmorrison');
  });

  it('should type in password address field in form', () => {
    const inputElement = changeInputBoxValue(
      'input-password',
      'myverysecurepassword1'
    );
    expect(inputElement.value).toBe('myverysecurepassword1');
  });

  // Errors

  it('should render the correct error message if first name not entered on submit', async () => {
    changeInputBoxValue('input-lastname', 'Morrison');
    changeInputBoxValue('input-email', 'jmorrison@example.com');
    changeInputBoxValue('input-username', 'jmorrison');
    changeInputBoxValue('input-password', 'myverysecurepassword1');
    const buttonElement = screen.getByRole('button', {
      name: /Create Account/i,
    });
    fireEvent.click(buttonElement);

    const alertElement = await screen.findByText('First name is required');
    expect(alertElement).toBeInTheDocument();
  });

  it('should render the correct error message if last name not entered on submit', async () => {
    changeInputBoxValue('input-firstname', 'Jim');
    changeInputBoxValue('input-email', 'jmorrison@example.com');
    changeInputBoxValue('input-username', 'jmorrison');
    changeInputBoxValue('input-password', 'myverysecurepassword1');
    const buttonElement = screen.getByRole('button', {
      name: /Create Account/i,
    });
    fireEvent.click(buttonElement);

    const alertElement = await screen.findByText('Last name is required');
    expect(alertElement).toBeInTheDocument();
  });

  it('should render the correct error message if email not entered on submit', async () => {
    changeInputBoxValue('input-firstname', 'Jim');
    changeInputBoxValue('input-lastname', 'Morrison');
    changeInputBoxValue('input-username', 'jmorrison');
    changeInputBoxValue('input-password', 'myverysecurepassword1');
    const buttonElement = screen.getByRole('button', {
      name: /Create Account/i,
    });
    fireEvent.click(buttonElement);

    const alertElement = await screen.findByText('Email address is required');
    expect(alertElement).toBeInTheDocument();
  });

  it('should render the correct error message if username not entered on submit', async () => {
    changeInputBoxValue('input-firstname', 'Jim');
    changeInputBoxValue('input-lastname', 'Morrison');
    changeInputBoxValue('input-email', 'jmorrison@example.com');
    changeInputBoxValue('input-password', 'myverysecurepassword1');
    const buttonElement = screen.getByRole('button', {
      name: /Create Account/i,
    });
    fireEvent.click(buttonElement);

    const alertElement = await screen.findByText('Username is required');
    expect(alertElement).toBeInTheDocument();
  });

  it('should render the correct error message if password not entered on submit', async () => {
    changeInputBoxValue('input-firstname', 'Jim');
    changeInputBoxValue('input-lastname', 'Morrison');
    changeInputBoxValue('input-email', 'jmorrison@example.com');
    changeInputBoxValue('input-username', 'jmorrison');
    const buttonElement = screen.getByRole('button', {
      name: /Create Account/i,
    });
    fireEvent.click(buttonElement);

    const alertElement = await screen.findByText('Password is required');
    expect(alertElement).toBeInTheDocument();
  });

  it('should render the correct error message on submit if password is less than 6 characters', async () => {
    changeInputBoxValue('input-firstname', 'Jim');
    changeInputBoxValue('input-lastname', 'Morrison');
    changeInputBoxValue('input-email', 'jmorrison@example.com');
    changeInputBoxValue('input-username', 'jmorrison');
    changeInputBoxValue('input-password', '12345');
    const buttonElement = screen.getByRole('button', {
      name: /Create Account/i,
    });
    fireEvent.click(buttonElement);

    const alertElement = await screen.findByText(
      'Password must be at least 6 characters'
    );
    expect(alertElement).toBeInTheDocument();
  });

  it('should render the correct error message on submit if password is more than 20 characters', async () => {
    changeInputBoxValue('input-firstname', 'Jim');
    changeInputBoxValue('input-lastname', 'Morrison');
    changeInputBoxValue('input-email', 'jmorrison@example.com');
    changeInputBoxValue('input-username', 'jmorrison');
    changeInputBoxValue('input-password', '123456789012345678901234567890');
    const buttonElement = screen.getByRole('button', {
      name: /Create Account/i,
    });
    fireEvent.click(buttonElement);

    const alertElement = await screen.findByText(
      'Password cannot exceed 20 characters'
    );
    expect(alertElement).toBeInTheDocument();
  });
});
