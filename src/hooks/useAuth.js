import { useSelector, useDispatch } from "react-redux";
import { loginUser, registerUser, logout } from "../slices/authslice";

const useAuth = () => {
  const { user, token, isAuthenticated, loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const login = (email, password) => dispatch(loginUser({ email, password }));
  const register = (username, email, password) => dispatch(registerUser({ username, email, password }));
  const logoutUser = () => dispatch(logout());

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout: logoutUser,
  };
};

export default useAuth;