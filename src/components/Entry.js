import styled from 'styled-components';

export default function Entry({ text, author }) {
  return (
    <Card>
      {text}
      <Author>{author}</Author>
    </Card>
  );
}

const Card = styled.section`
  display: grid;
  align-content: space-between;
  padding: 20px;
  max-width: 400px;
  border: 1px solid #ddd;
  height: 100%;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
`;

const Author = styled.p`
  margin: 0;
  text-transform: uppercase;
  font-size: 1rem;
  color: #999;
`;
