const entries = [
  { text: 'First entry', author: 'Jane' },
  { text: 'Second entry', author: 'John' },
  { text: 'Third entry', author: 'Jerry' },
];

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.json(entries);
    return;
  }
}
