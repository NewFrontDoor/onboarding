import auth0 from '../../lib/auth0';

export default async function login(request, res) {
  try {
    await auth0.handleLogin(request, res);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}
