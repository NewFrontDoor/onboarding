import auth0 from '../../lib/auth0';

export default async function signup(request, res) {
  try {
    await auth0.handleLogin(request, res, {
      authParams: {
        action: 'signup'
      }
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}
