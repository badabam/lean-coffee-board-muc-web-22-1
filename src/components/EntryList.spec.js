import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EntryList from './EntryList.js';

describe('EntryList', () => {
  let entries;

  beforeEach(() => {
    entries = [
      {
        _id: 'id_123',
        text: 'This is some text',
        author: 'Jane Doe',
        color: 'hotpink',
        createdAt: '2022-03-24T11:11:11',
      },
      {
        _id: 'id_456',
        text: 'This is some other text, which is a bit longer',
        author: 'John Doe',
        color: 'skyblue',
        createdAt: '2022-03-24T12:12:12',
      },
    ].slice();
  });

  it('renders a list', () => {
    render(<EntryList entries={entries} />);

    expect(screen.getByRole('list', { name: /entries/i })).toBeInTheDocument();
    expect(screen.getByText('This is some text')).toBeInTheDocument();
    const name = screen.getByText('Jane Doe', { exact: false });
    expect(name).toBeInTheDocument();
    expect(name).toHaveStyle('color: hotpink');
    const date = screen.getByText('24.03.2022 11:11', { exact: false });
    expect(date).toBeInTheDocument();
  });

  it('calls onCheck', () => {
    const callback = jest.fn();
    render(<EntryList onCheck={callback} entries={entries} />);

    const checkbox = screen.getAllByLabelText('Mark as done')[0];
    userEvent.click(checkbox);
    expect(callback).toHaveBeenCalled();
  });

  it('calls onDelete', () => {
    const callback = jest.fn();
    render(<EntryList onDelete={callback} entries={entries} />);

    const checkbox = screen.getAllByRole('button', { name: 'Delete' })[0];
    userEvent.click(checkbox);
    expect(callback).toHaveBeenCalled();
  });
});
