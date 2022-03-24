import EntryList from './EntryList.js';

export default {
  title: 'components/EntryList',
  component: EntryList,
  argTypes: {
    onDelete: 'onDelete',
    onCheck: 'onCheck',
  },
};

const Template = args => <EntryList {...args} />;

export const Default = Template.bind({});
Default.args = {
  entries: [
    {
      _id: 'id_123',
      text: 'This is some text',
      author: 'Jane Doe',
      color: 'hotpink',
      createdAt: '2022-03-24T11:11:11',
    },
  ],
};
