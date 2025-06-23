import React from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAppContext } from '../Context/Appcontext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const { darkMode, setUser } = useAppContext();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      setUser(res.user);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className={`${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} min-h-screen flex justify-center items-center`}>
      <div className="w-full max-w-md">
        <form
          onSubmit={handleLogin}
          className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg shadow-md`}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Login to SkillUp</h2>

          {error && <p className="text-red-500 mb-4 text-sm text-center">{error}</p>}

          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded transition mb-4"
          >
            Login
          </button>

          <div className="text-center">
            <p className="text-sm">
              Don't have an account?{' '}
              <Link 
                to="/register" 
                className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium"
              >
                Register here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}