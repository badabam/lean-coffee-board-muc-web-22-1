const dbConnect = require('../../lib/dbConnect.js');
const Entry = require('../../models/Entry.js');

module.exports = async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const entries = await Entry.find();
    return res.json(entries);
  }

  if (req.method === 'POST') {
    const result = await Entry.create(req.body);
    return res.status(201).json(result);
  }

  if (req.method === 'DELETE') {
    const { _id } = req.body;
    await Entry.findByIdAndDelete(_id);
    return res.status(204).send();
  }
};
