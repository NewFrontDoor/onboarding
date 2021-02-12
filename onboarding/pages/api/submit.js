import client from '../../lib/sanity.js';

export default async (request, response) => {
  const doc = {
    ...request.body
  };

  client.createOrReplace(doc).then((result) => {
    response.status(200).json({outcome: 'Form was submitted/updated', result});
  });
};
