import styled from 'styled-components';

export default function LoginForm({ onLogin }) {
  return (
    <Form
      autoComplete="off"
      onSubmit={handleLogin}
      aria-labelledby="name-label"
    >
      <label id="name-label" htmlFor="name">
        What is your name?
      </label>
      <input required placeholder="Write here ..." id="name" name="name" />
      <label htmlFor="color">Please select a color</label>
      <input id="color" name="color" type="color" defaultValue="#cccccc" />
      <button>Remember me</button>
    </Form>
  );

  function handleLogin(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const color = event.target.elements.color.value;

    if (name) {
      onLogin({ name, color });
    }
  }
}

const Form = styled.form`
  display: grid;
  gap: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;

  button {
    height: 2rem;
    background: #333;
    color: white;
    border: none;
    border-radius: 3px;
  }
`;
