import {useState, useEffect} from 'react';
import isEmpty from 'lodash/isEmpty';
import md5Hex from 'md5-hex';
import client, {fetchQuery} from './sanity.js';

export async function fetchUser(cookie = '') {
  if (typeof window !== 'undefined' && window.__user) {
    return window.__user;
  }

  const res = await fetch(
    '/api/me',
    cookie
      ? {
          headers: {
            cookie
          }
        }
      : {}
  );

  if (!res.ok) {
    delete window.__user;
    return null;
  }

  const json = await res.json();
  if (typeof window !== 'undefined') {
    window.__user = json;
  }

  return json;
}

export function useFetchUser({required} = {}) {
  const [loading, setLoading] = useState(
    () => !(typeof window !== 'undefined' && window.__user)
  );
  const [user, setUser] = useState(() => {
    if (typeof window === 'undefined') {
      return null;
    }

    return window.__user || null;
  });

  useEffect(
    () => {
      if (!loading && user) {
        return;
      }

      setLoading(true);
      let isMounted = true;

      fetchUser().then((user) => {
        // Only set the user if the component is still mounted
        if (isMounted) {
          // When the user is not logged in but login is required
          if (required && !user) {
            window.location.href = '/api/login';
            return;
          }

          setUser(user);
          setLoading(false);
        }
      });

      return () => {
        isMounted = false;
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return {user, loading};
}

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
