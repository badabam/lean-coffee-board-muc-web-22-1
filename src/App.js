import { useLocalStorage } from 'beautiful-react-hooks';
import styled from 'styled-components';
import useSWR from 'swr';
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList.js';
import LoginForm from './components/LoginForm.js';
const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function App() {
  const [user, setUser] = useLocalStorage('user', {});

  const {
    data: entries,
    error: entriesError,
    mutate: mutateEntries,
  } = useSWR('/api/entries', fetcher, {
    refreshInterval: 1000,
  });

  if (entriesError) return <h1>Sorry, could not fetch.</h1>;
  if (!entries && !entriesError) return <p>... loading ...</p>;

  const undoneEntries = entries.filter(e => !e.isChecked);
  const doneEntries = entries.filter(e => e.isChecked);

  const EmptyState = () =>
    entries.length === 0 && <p>Please add some cards via the input below.</p>;

  const isAllDone = undoneEntries.length === 0 && doneEntries.length > 0;
  const DoneState = () => isAllDone && <p>Everything is done. Yay!</p>;

  return (
    <>
      {user?.name ? (
        <>
          <LogoutButton onClick={() => setUser()} />
          <BoardGrid>
            <EmptyState />
            <DoneState />
            <EntryList
              entries={[...undoneEntries, ...doneEntries]}
              onDelete={handleDelete}
              onCheck={handleCheck}
            />

            <EntryForm onSubmit={handleNewEntry} />
          </BoardGrid>
        </>
      ) : (
        <LoginGrid>
          <LoginForm onLogin={setUser} />
        </LoginGrid>
      )}
    </>
  );

  async function handleNewEntry(text) {
    const newEntry = {
      text,
      author: user.name,
      color: user.color,
      tempId: Math.random(),
    };

    mutateEntries([...entries, newEntry], false);

    await fetch('/api/entries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEntry),
    });

    mutateEntries();
  }

  async function handleDelete(_id) {
    const filteredEntries = entries.filter(entry => entry._id !== _id);
    mutateEntries(filteredEntries, false);

    await fetch('/api/entries', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id }),
    });

    mutateEntries();
  }

  async function handleCheck(_id) {
    mutateEntries(
      entries.map(entry =>
        entry._id === _id ? { ...entry, isChecked: !entry.isChecked } : entry
      ),
      false
    );

    await fetch('/api/entries/mark-as-done', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id }),
    });
    mutateEntries();
  }
}

const LogoutButton = styled.button.attrs(() => ({ children: 'Logout' }))`
  border: none;
  background: transparent;
  text-decoration: underline;
  text-underline-position: below;
  position: absolute;
  right: 4px;
  top: 4px;
  color: #666;
`;

const LoginGrid = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
`;

const BoardGrid = styled.div`
  display: grid;
  padding: 0 20px 12px;
  grid-template-rows: 1fr auto;
  height: 100vh;
`;
