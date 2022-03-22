import dbConnect from '../../lib/dbConnect.mjs';
import Entry from '../../models/Entry.mjs';

await dbConnect();
console.log('Connected to DB');

export default async function handler(req, res) {
  if (req.method === 'PATCH') {
    const { _id } = req.body;
    const entry = await Entry.findById(_id);
    const result = await Entry.findByIdAndUpdate(
      _id,
      {
        $set: { isChecked: !entry.isChecked },
      },
      { new: true }
    );
    res.json(result);
  }
}
