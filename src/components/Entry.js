import dayjs from 'dayjs';
import { AiOutlineClockCircle, AiOutlineDelete } from 'react-icons/ai';
import styled from 'styled-components';
import ScreenReaderOnly from './ScreenReaderOnly.js';

export default function Entry({
  _id,
  text,
  author,
  color,
  createdAt,
  onDelete,
  onCheck,
  isChecked,
}) {
  return (
    <Card>
      <FlexBetween>
        <small>
          <AiOutlineClockCircle style={{ verticalAlign: 'bottom' }} />{' '}
          {createdAt
            ? dayjs(createdAt).format('DD.MM.YYYY HH:mm')
            : 'just created'}
        </small>
        <label htmlFor={'mark-done-' + _id}>
          <ScreenReaderOnly>Mark as done</ScreenReaderOnly>
        </label>
        <input
          checked={isChecked}
          onChange={onCheck}
          id={'mark-done-' + _id}
          type="checkbox"
        />
      </FlexBetween>
      {text}
      <FlexBetween>
        <Author color={color}>— {author}</Author>
        <TrashButton onClick={onDelete} />
      </FlexBetween>
    </Card>
  );
}

const Card = styled.section`
  display: grid;
  align-content: space-between;
  padding: 12px;
  max-width: 400px;
  border: 1px solid #ddd;
  height: 100%;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
`;

const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TrashButton = styled.button.attrs(() => ({
  children: (
    <>
      <ScreenReaderOnly>Delete</ScreenReaderOnly>
      <AiOutlineDelete />
    </>
  ),
}))`
  border: none;
  background: transparent;
  width: min-content;
  padding-top: 2px;
  font-size: 1.2rem;
  &:hover {
    color: crimson;
  }

  &:focus:focus-visible {
    outline: 2px dashed;
  }
`;

const Author = styled.p`
  margin: 0;
  font-size: 1rem;
  color: ${p => p.color ?? '#555'};
`;
