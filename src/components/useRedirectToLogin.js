// useRedirectToLogin.js

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useRedirectToLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Store current URL in session storage before redirecting to login page
    sessionStorage.setItem('redirectUrl', window.location.pathname);
  }, []);

  const redirectToLogin = () => {
    // Redirect user to login page
    navigate('/login');
  };

  return redirectToLogin;
};

export default useRedirectToLogin;
