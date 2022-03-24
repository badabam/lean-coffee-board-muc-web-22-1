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
      _id: 'id_1',
      text: 'This is some text',
      author: 'Jane Doe',
      color: 'hotpink',
      createdAt: '2022-03-24T11:11:11',
    },
    {
      _id: 'id_2',
      text: 'This is some other, slightly longer text',
      author: 'John Doe',
      color: 'skyblue',
      createdAt: '2022-03-24T11:11:12',
    },
    {
      _id: 'id_3',
      text: 'This is some text',
      author: 'Jane Doe',
      color: 'hotpink',
      createdAt: '2022-03-24T11:11:11',
    },
    {
      _id: 'id_4',
      text: 'This is some other, slightly longer text',
      author: 'John Doe',
      color: 'skyblue',
      createdAt: '2022-03-24T11:11:12',
    },
  ],
};
