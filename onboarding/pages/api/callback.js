import auth0 from '../../lib/auth0.js';

export default async function callback(request, response) {
  try {
    await auth0.handleCallback(request, response, {redirectTo: '/account'});
  } catch (error) {
    console.error(error);
    response.status(error.status || 500).end(error.message);
  }
}
