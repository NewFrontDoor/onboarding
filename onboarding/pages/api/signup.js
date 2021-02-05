import auth0 from '../../lib/auth0.js';

export default async function signup(request, response) {
  try {
    await auth0.handleLogin(request, response, {
      authParams: {
        action: 'signup'
      }
    });
  } catch (error) {
    console.error(error);
    response.status(error.status || 500).end(error.message);
  }
}
