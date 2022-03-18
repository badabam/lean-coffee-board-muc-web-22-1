import LoginForm from './LoginForm.js';

export default {
  title: 'components/LoginForm',
  component: LoginForm,
  argTypes: {
    onLogin: 'onLogin',
  },
};

const Template = args => <LoginForm {...args} />;

export const Default = Template.bind({});
Default.args = {};
