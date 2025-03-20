import home from '../../assets/loginbg.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useRegister } from '../hooks/Auth';
import useAuthStore from '../store/AuthStore'; // Zustand store for authentication

const Register = () => {
  const [first_name, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const { mutate: register, isLoading, error } = useRegister();
  const setUser = useAuthStore((state) => state.setUser);

  const handleRegister = (e) => {
    e.preventDefault();

    if (!first_name || !email || !password || !confirmPassword) {
      alert('All fields are required!');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    register(
      { first_name, email, password },
      {
        onSuccess: (data) => {
          // Store user data in Zustand after registration
          setUser({ email, first_name });
          navigate('/login');
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
          <form onSubmit={handleRegister} className="flex flex-col">
            <input
              type="text"
              placeholder="Enter your name"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2 mb-4 bg-white border-2 border-gray-300 rounded focus:outline-customblue focus:ring-customblue"
            />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mb-4 bg-white border-2 border-gray-300 rounded focus:outline-customblue focus:ring-customblue"
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mb-4 bg-white border-2 border-gray-300 rounded focus:outline-customblue focus:ring-customblue"
            />
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 mb-4 bg-white border-2 border-gray-300 rounded focus:outline-customblue focus:ring-customblue"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 font-bold text-white bg-gray-500 rounded hover:bg-customblue disabled:opacity-50"
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
            {error && <p className="mt-2 text-sm text-red-500">{error.message}</p>}
            <Link to="/login" className="self-end mt-4 text-sm text-customblue">
              Login Here
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
