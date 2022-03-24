import Entry from './Entry.js';
import styled from 'styled-components';

export default function EntryList({ entries, onDelete, onCheck }) {
  return (
    <StyledList role="list" aria-label="Entries">
      {entries
        ? entries.map(
            ({ text, author, color, createdAt, isChecked, _id, tempId }) => (
              <li key={_id ?? tempId}>
                <Entry
                  _id={_id}
                  text={text}
                  author={author}
                  color={color}
                  createdAt={createdAt}
                  onDelete={() => onDelete(_id)}
                  isChecked={isChecked}
                  onCheck={() => onCheck(_id)}
                />
              </li>
            )
          )
        : '... loading! ...'}
    </StyledList>
  );
}

const StyledList = styled.ul`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: 100px;
  list-style: none;
  padding: 0;
  overflow-y: auto;
`;
