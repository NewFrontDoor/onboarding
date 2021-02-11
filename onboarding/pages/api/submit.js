import client from '../../lib/sanity.js';

export default async (request, response) => {
  console.log(request);
  const doc = {
    ...request.body
  };

  console.log(doc);

  client.createOrReplace(doc).then((result) => {
    response.status(200).json({outcome: 'Form was submitted/updated', result});
  });
};
