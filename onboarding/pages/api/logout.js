import auth0 from '../../lib/auth0.js';

export default async function logout(request, response) {
  try {
    await auth0.handleLogout(request, response);
  } catch (error) {
    console.error(error);
    response.status(error.status || 500).end(error.message);
  }
}
