import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm.js';

describe('LoginForm', () => {
  it('calls onLogin with a name', () => {
    const callback = jest.fn();
    render(<LoginForm onLogin={callback} />);

    const form = screen.getByRole('form', { name: 'What is your name?' });
    const input = screen.getByLabelText('What is your name?', {
      selector: 'input',
    });

    expect(form).toContainElement(input);

    userEvent.type(input, 'Jane Doe');

    const button = screen.getByRole('button', { name: 'Remember me' });
    userEvent.click(button);

    expect(callback).toHaveBeenCalledWith({
      name: 'Jane Doe',
      color: '#cccccc',
    });
  });

  it('does not call onLogin without name filled in', () => {
    const callback = jest.fn();
    render(<LoginForm onLogin={callback} />);

    const button = screen.getByRole('button', { name: 'Remember me' });
    userEvent.click(button);
    expect(callback).not.toHaveBeenCalled();
  });

  it('takes an optional color that has a default value', () => {
    const callback = jest.fn();
    render(<LoginForm onLogin={callback} />);

    const nameInput = screen.getByLabelText('What is your name?', {
      selector: 'input',
    });
    userEvent.type(nameInput, 'Jane Doe');

    const colorInput = screen.getByLabelText('Please select a color', {
      selector: 'input',
    });
    fireEvent.input(colorInput, { target: { value: '#ff0033' } });

    const button = screen.getByRole('button', { name: 'Remember me' });
    userEvent.click(button);

    expect(callback).toHaveBeenCalledWith({
      name: 'Jane Doe',
      color: '#ff0033',
    });
  });
});
