import useAuth from 'app/hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';


const AuthGuard = ({ children }) => {
  let {
    isAuthenticated,
    logout,
  } = useAuth();
  const { pathname } = useLocation();
    let authenticated = isAuthenticated;

  // IF YOU NEED ROLE BASED AUTHENTICATION,
  // UNCOMMENT ABOVE LINES
  // AND COMMENT OUT BELOW authenticated VARIABLE

  // let authenticated = isAuthenticated;
  if (!authenticated) {
    logout();
  }
  return (
    <>
      {authenticated ? (
        children
      ) : (
        <Navigate replace to="/signin" state={{ from: pathname }} />
      )}
    </>
  );
};

export default AuthGuard;
