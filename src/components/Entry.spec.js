import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Entry from './Entry.js';

describe('Entry', () => {
  it('shows a text and the author', () => {
    render(<Entry text="Test" author="Jane" />);

    const text = screen.getByText('Test', { exact: false });
    expect(text).toBeInTheDocument();

    const author = screen.getByText('Jane', { exact: false });
    expect(author).toBeInTheDocument();
  });

  it('calls onDelete when clicking "Delete"', () => {
    const callback = jest.fn();
    render(<Entry onDelete={callback} text="Test" author="Jane" />);

    const deleteButton = screen.getByRole('button', { name: 'Delete' });
    userEvent.click(deleteButton);

    expect(callback).toHaveBeenCalled();
  });

  it('calls onCheck when clicking "Mark as done"', () => {
    const callback = jest.fn();
    render(<Entry onCheck={callback} text="Test" author="Jane" />);

    const checkbox = screen.getByRole('checkbox', { name: 'Mark as done' });
    userEvent.click(checkbox);

    expect(callback).toHaveBeenCalled();
  });
});
