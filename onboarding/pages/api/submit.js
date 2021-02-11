import client from '../../lib/sanity';

export default async (request, res) => {
  const doc = {
    _id: "42768617-329c-4a92-bf52-2d892ab955bd",
    _type: 'project',
    _updatedAt: new Date(),
    ...request.body
  };

  console.log(doc);

  client.createOrReplace(doc).then((result) => {
    res.status(200).json({outcome: 'Form was submitted/updated', result});
  });
};
