import isEmpty from 'lodash/isEmpty';
import md5Hex from 'md5-hex';
import client, {fetchQuery} from './sanity.js';

export async function findOrCreate(user) {
  let result = await fetchQuery(
    `*[_type == "user" && email == $email][0]{
      _id,
      name,
      email,
      "owner": *[ _type == "project" && $email == owner ],
      "contributor": *[ _type == "project" && $email in authorisedAccounts ]
  }`,
    {email: user.email}
  );

  if (isEmpty(result)) {
    result = client.createIfNotExists({
      _id: md5Hex(user.email),
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
