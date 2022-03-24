const dbConnect = require('../../lib/dbConnect.js');
const Entry = require('../../models/Entry.js');

module.exports = async function handler(req, res) {
  await dbConnect();

  if (req.method !== 'PATCH') {
    return res.status(405).json('Method not allowed');
  }

  const { _id } = req.body;
  const entry = await Entry.findById(_id);

  if (!entry) return res.status(404).json('Entry not found');

  const changedEntry = await Entry.findByIdAndUpdate(
    _id,
    {
      $set: { isChecked: !entry.isChecked },
    },
    { new: true }
  );
  res.status(206).json({ isChecked: changedEntry.isChecked });
};
