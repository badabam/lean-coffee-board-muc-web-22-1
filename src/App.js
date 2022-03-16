import styled from 'styled-components';
import useSWR from 'swr';
import Entry from './components/Entry';
import EntryForm from './components/EntryForm';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function App() {
  const {
    data: entries,
    error: entriesError,
    mutate: mutateEntries,
  } = useSWR('/api/entries', fetcher, {
    refreshInterval: 1000,
  });

  if (entriesError) return <h1>Sorry, could not fetch.</h1>;

  return (
    <Grid>
      <h1>Lean Coffee Board</h1>
      <EntryList role="list">
        {entries
          ? entries.map(({ text, author, _id, tempId }) => (
              <li key={_id ?? tempId}>
                <Entry text={text} author={author} />
              </li>
            ))
          : '... loading! ...'}
      </EntryList>
      <EntryForm onSubmit={handleNewEntry} />
    </Grid>
  );

  async function handleNewEntry(text) {
    const newEntry = {
      text,
      author: 'Anonymous',
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
}

const Grid = styled.div`
  display: grid;
  height: 100vh;
  padding: 0 20px 12px;
  grid-template-rows: auto 1fr auto;
`;

const EntryList = styled.ul`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-rows: 100px;
  list-style: none;
  padding: 0;
`;
