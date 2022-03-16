import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Entry from './components/Entry';
import EntryForm from './components/EntryForm';

export default function App() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    getEntries();

    async function getEntries() {
      const response = await fetch('/api/entries');
      const entries = await response.json();
      setEntries(entries);
    }
  }, []);

  return (
    <Grid>
      <h1>Lean Coffee Board</h1>
      <EntryList role="list">
        {entries.map(({ text, author }, index) => (
          <li key={index}>
            <Entry text={text} author={author} />
          </li>
        ))}
      </EntryList>
      <EntryForm onSubmit={handleNewEntry} />
    </Grid>
  );

  async function handleNewEntry(text) {
    const response = await fetch('/api/entries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        author: 'Anonymous',
      }),
    });

    const newEntry = await response.json();
    setEntries([...entries, newEntry]);
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
