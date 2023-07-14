import { render, screen } from '@testing-library/react';
import LoginForm from '.';
import emailValidator from 'email-validator';
import { validateForm } from './LoginForm';

test('renders sign in page', () => {
  render(<LoginForm />);
  const signInText = screen.getByText("Sign in");
  expect(signInText).toBeInTheDocument();
});

describe('LoginForm validation', () => {
  beforeEach(() => {
    // Reset any necessary state variables before each test
  });

  it('should return error for invalid email', () => {
    const event = { preventDefault: jest.fn(), currentTarget: new FormData() };
    const email = 'invalid_email';
    const password = 'ValidPassword1!';

    event.currentTarget.set('email', email);
    event.currentTarget.set('password', password);

    validateForm(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(setValidationError).toHaveBeenCalledWith('Invalid email');
    expect(setValidationSuccess).toHaveBeenCalledWith(false);
    expect(setShowAlert).toHaveBeenCalledWith('Login Failed');
  });

  it('should return error for invalid password', () => {
    const event = { preventDefault: jest.fn(), currentTarget: new FormData() };
    const email = 'valid@example.com';
    const password = 'invalidpassword';

    event.currentTarget.set('email', email);
    event.currentTarget.set('password', password);

    validateForm(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(setValidationError).toHaveBeenCalledWith(
      'Invalid password. It should contain at least 8 characters, both uppercase and lowercase letters, a numerical digit, and a special character.'
    );
    expect(setValidationSuccess).toHaveBeenCalledWith(false);
    expect(setShowAlert).toHaveBeenCalledWith('Login Failed');
  });

  it('should return success for valid email and password', () => {
    const event = { preventDefault: jest.fn(), currentTarget: new FormData() };
    const email = 'valid@example.com';
    const password = 'ValidPassword1!';

    event.currentTarget.set('email', email);
    event.currentTarget.set('password', password);

    validateForm(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(setValidationError).toHaveBeenCalledWith('');
    expect(setValidationSuccess).toHaveBeenCalledWith(true);
    expect(setShowAlert).toHaveBeenCalledWith('Login Successful');
  });
});