import auth0 from '../../../lib/auth0.js';
import {fetchQuery} from '../../../lib/sanity.js';
import {formQuery} from '../../../lib/queries.js';

export default async function project(request, response) {
  const session = await auth0.getSession(request);

  const results = await fetchQuery(
    `{
        'mainData': ${formQuery(request.query.slug)}
    }`
  );

  if (!results.mainData) {
    return response.status(404).send();
  }

  if (
    results.mainData.owner !== session.user.email &&
    results.mainData?.authorisedAccounts
      .map((a) => a.email)
      .includes(session.user.email) !== true
  ) {
    return response.status(404).send();
  }

  const newMainData = {...results.mainData}; // (({owner, ...o}) => o)(results.mainData);
  newMainData.isOwner = results.mainData.owner === session.user.email;

  response.status(200).json({...newMainData});
}
