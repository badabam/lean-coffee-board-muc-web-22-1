import { render, screen } from '@testing-library/react';
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

    userEvent.type(input, 'Jane Doe{enter}');
    expect(callback).toHaveBeenCalledWith('Jane Doe');
  });
});
