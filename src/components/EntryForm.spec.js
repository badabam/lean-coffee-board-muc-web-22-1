import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EntryForm from './EntryForm.js';

describe('EntryForm', () => {
  it('shows a text and the author', () => {
    const callback = jest.fn();
    render(<EntryForm onSubmit={callback} />);

    const form = screen.getByRole('form', { name: 'Create new entry' });
    expect(form).toBeInTheDocument();

    const input = screen.getByLabelText('Entry text');
    userEvent.type(input, 'Lorem ipsum dolor sit.{enter}');

    expect(form).toContainElement(input);

    expect(callback).toHaveBeenCalledWith('Lorem ipsum dolor sit.');
  });

  it('has a minLength of 3 for text', () => {
    const neverCalled = jest.fn();
    render(<EntryForm onSubmit={neverCalled} />);

    const input = screen.getByLabelText('Entry text');
    userEvent.type(input, 'AB{enter}'); // only 2 characters, but 3 are required

    expect(neverCalled).not.toHaveBeenCalled();
  });
});
