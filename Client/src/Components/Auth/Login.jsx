import home from '../../assets/loginbg.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useLogin } from '../hooks/Auth'; // Named import
import useAuthStore from '../store/AuthStore'; // Zustand store for authentication

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { mutate: login, isLoading, error } = useLogin();
  const setUser = useAuthStore((state) => state.setUser);

  const handleLogin = (e) => {
    e.preventDefault();
    login(
      { email, password },
      {
        onSuccess: (data) => {
          setUser({ email }); // Store minimal user data (email) in Zustand
          navigate('/dashboard'); // Redirect to dashboard after login
        },
      }
    );
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-sky-300"
      style={{
        backgroundImage: `url(${home})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="relative flex w-4/6 overflow-hidden bg-white rounded-lg shadow-lg h-11/12">
        <div
          className="relative flex flex-col items-center justify-center flex-1 p-8 bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/premium-photo/nature-high-quality-4k-hdr_889056-32969.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-blue-950 bg-opacity-70"></div>
          <h1 className="relative text-3xl font-bold text-center text-white">
            TRAVEL IS THE ONLY THING YOU BUY THAT MAKES YOU RICHER
          </h1>
        </div>

        <div className="flex flex-col justify-center p-8 bg-white w-96">
          <h2 className="mb-6 text-2xl font-bold text-gray-400">TRAVEL BLOGGER</h2>
          <form onSubmit={handleLogin} className="flex flex-col">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mb-4 bg-white border-2 border-gray-300 rounded focus:outline-customblue focus:ring-customblue"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mb-4 bg-white border-2 border-gray-300 rounded focus:outline-customblue focus:ring-customblue"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 font-bold text-white bg-gray-500 rounded hover:bg-customblue disabled:opacity-50"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
            {error && <p className="mt-2 text-sm text-red-500">{error.message}</p>}
            <Link to="/register" className="self-end mt-4 text-sm text-customblue">
              Register Here
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
