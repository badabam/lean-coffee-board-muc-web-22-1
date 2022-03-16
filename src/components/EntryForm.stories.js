import EntryForm from './EntryForm.js';

export default {
  title: 'components/EntryForm',
  component: EntryForm,
  argTypes: {
    onSubmit: 'onSubmit',
  },
};

const Template = args => <EntryForm {...args} />;

export const Default = Template.bind({});
Default.args = {};
