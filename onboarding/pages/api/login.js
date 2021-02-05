import auth0 from '../../lib/auth0.js';

export default async function login(request, response) {
  try {
    await auth0.handleLogin(request, response);
  } catch (error) {
    console.error(error);
    response.status(error.status || 500).end(error.message);
  }
}
