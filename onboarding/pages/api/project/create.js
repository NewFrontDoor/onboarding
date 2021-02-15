import auth0 from '../../../lib/auth0.js';
import client from '../../../lib/sanity.js';
import slugify from '@sindresorhus/slugify';

export default async function project(request, response) {
  const session = await auth0.getSession(request);

  const doc = {
    _type: 'project',
    ministry: request.body.name,
    slug: slugify(request.body.name),
    owner: session.user.email
  };

  client.create(doc).then((result) => {
    console.log(`Project was created, document ID is ${result._id}`);
    response.status(200).json({
      outcome: `Initiated new project: ${request.body.name}`,
      slug: result._slug,
      result
    });
  });
}
