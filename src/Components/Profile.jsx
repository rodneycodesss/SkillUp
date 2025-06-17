import React, { useState } from 'react';
import { useAppContext } from '/context/AppContext';
import { User, Mail, Award, Flame, Edit, LogOut } from 'lucide-react';
import { auth } from '../firebase'; // Adjust if your firebase export is different
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';

export default function Profile() {
  const { user, xp, streak, darkMode, setUser } = useAppContext();

  // Auth form state
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Edit profile state
  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [editError, setEditError] = useState('');
  const [editSuccess, setEditSuccess] = useState('');

  // Handle login/signup
  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthError('');
    try {
      if (authMode === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        // Set default display name
        await updateProfile(cred.user, { displayName: email.split('@')[0] });
      }
      setEmail('');
      setPassword('');
    } catch (err) {
      setAuthError(err.message);
    }
  };

  // Handle sign out
  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
  };

  // Handle profile edit
  const handleEdit = async (e) => {
    e.preventDefault();
    setEditError('');
    setEditSuccess('');
    try {
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      });
      setEditSuccess('Profile updated!');
      setEditing(false);
      setUser({ ...user, displayName, photoURL });
    } catch (err) {
      setEditError(err.message);
    }
  };

  // If not logged in, show login/signup form
  if (!user) {
    return (
      <div className="max-w-sm mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow space-y-6">
        <h2 className="text-2xl font-bold text-center mb-4">
          {authMode === 'login' ? 'Login' : 'Sign Up'}
        </h2>
        <form className="space-y-4" onSubmit={handleAuth}>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded border border-gray-300 dark:bg-gray-900 dark:text-white"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded border border-gray-300 dark:bg-gray-900 dark:text-white"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {authError && <div className="text-red-500 text-sm">{authError}</div>}
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600"
          >
            {authMode === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <div className="text-center text-sm">
          {authMode === 'login' ? (
            <>
              Don't have an account?{' '}
              <button
                className="text-purple-600 hover:underline"
                onClick={() => setAuthMode('signup')}
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                className="text-purple-600 hover:underline"
                onClick={() => setAuthMode('login')}
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  // Profile view
  return (
    <div className="max-w-xl mx-auto p-6 space-y-8">
      <div className="flex flex-col items-center space-y-3">
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt="User avatar"
            className="w-24 h-24 rounded-full object-cover border-4 border-purple-500"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center">
            <User size={48} className="text-purple-400" />
          </div>
        )}
        <h2 className="text-2xl font-bold">{user.displayName || 'User'}</h2>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <Mail size={18} />
          <span>{user.email}</span>
        </div>
        <button
          className="flex items-center gap-2 mt-2 px-4 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 text-sm"
          onClick={() => setEditing(true)}
        >
          <Edit size={16} /> Edit Profile
        </button>
        <button
          className="flex items-center gap-2 mt-2 px-4 py-1 bg-red-100 dark:bg-red-900 rounded hover:bg-red-200 dark:hover:bg-red-800 text-sm text-red-700 dark:text-red-300"
          onClick={handleSignOut}
        >
          <LogOut size={16} /> Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div className="flex flex-col items-center bg-purple-100 dark:bg-purple-900 rounded-lg p-4">
          <Award size={28} className="text-purple-500" />
          <span className="font-semibold text-purple-700 dark:text-purple-200">{xp}</span>
          <span className="text-xs text-gray-600 dark:text-gray-400">XP Points</span>
        </div>
        <div className="flex flex-col items-center bg-orange-100 dark:bg-orange-900 rounded-lg p-4">
          <Flame size={28} className="text-orange-500" />
          <span className="font-semibold text-orange-700 dark:text-orange-200">{streak}</span>
          <span className="text-xs text-gray-600 dark:text-gray-400">Day Streak</span>
        </div>
        <div className="flex flex-col items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
          <User size={28} className="text-gray-500" />
          <span className="font-semibold text-gray-700 dark:text-gray-200">{user.displayName || 'User'}</span>
          <span className="text-xs text-gray-600 dark:text-gray-400">Profile</span>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form
            className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow space-y-4 w-full max-w-sm"
            onSubmit={handleEdit}
          >
            <h3 className="text-lg font-bold mb-2">Edit Profile</h3>
            <input
              type="text"
              placeholder="Display Name"
              className="w-full px-4 py-2 rounded border border-gray-300 dark:bg-gray-800 dark:text-white"
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Photo URL"
              className="w-full px-4 py-2 rounded border border-gray-300 dark:bg-gray-800 dark:text-white"
              value={photoURL}
              onChange={e => setPhotoURL(e.target.value)}
            />
            {editError && <div className="text-red-500 text-sm">{editError}</div>}
            {editSuccess && <div className="text-green-500 text-sm">{editSuccess}</div>}
            <div className="flex gap-2 mt-2">
              <button
                type="submit"
                className="flex-1 bg-purple-500 text-white py-2 rounded hover:bg-purple-600"
              >
                Save
              </button>
              <button
                type="button"
                className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}