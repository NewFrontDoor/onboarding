import isEmpty from 'lodash/isEmpty';
import client, {fetchQuery} from './sanity.js';
import {uuid} from '@sanity/uuid';

export async function findOrCreate(user) {
  let result = await fetchQuery(
    `*[_type == "user" && email == $email][0]{
      _id,
      name,
      email,
      "owner": *[ _type == "project" && $email == owner ],
      "contributor": *[ _type == "project" && $email in authorisedAccounts[].email ]
  }`,
    {email: user.email}
  );

  if (isEmpty(result)) {
    result = client.createIfNotExists({
      _id: uuid(),
      _type: 'user',
      name: {
        first: user.given_name,
        last: user.family_name
      },
      email: user.email
    });
  }

  return result;
}
