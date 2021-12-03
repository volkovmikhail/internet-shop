import { useState, useCallback, useEffect } from 'react';

const storageName = 'userData';

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);
  const [role, setRole] = useState(null);

  const login = useCallback((jwtToken, role) => {
    setToken(jwtToken);
    setRole(role);

    localStorage.setItem(
      storageName,
      JSON.stringify({
        token: jwtToken,
        role,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setRole(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data && data.token) {
      login(data.token, data.role);
    }
    setReady(true);
  }, [login]);

  return { login, logout, token, role, ready };
};
