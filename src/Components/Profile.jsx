import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";
import { useAppContext } from "../Context/Appcontext";
import { Pencil, Zap, Star, Target, LogOut } from "lucide-react";

export default function Profile() {
  const { user, setUser, darkMode } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [successMsg, setSuccessMsg] = useState("");

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      let res;
      if (isSignUp) {
        res = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        res = await signInWithEmailAndPassword(auth, email, password);
      }
      setUser(res.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      setUser(res.user);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      });
      await auth.currentUser.reload();
      setUser({ ...auth.currentUser });
      setSuccessMsg("Profile updated!");
      setTimeout(() => {
        setSuccessMsg("");
        setEditing(false);
      }, 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  if (!user) {
    return (
      <div className="max-w-sm mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">{isSignUp ? "Sign Up" : "Login"}</h2>
        <form onSubmit={handleAuth} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded border bg-gray-100 dark:bg-gray-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded border bg-gray-100 dark:bg-gray-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            disabled={loading}
          >
            {loading ? "Please wait..." : isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 flex items-center justify-center gap-2 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <img src="/google-logo.png" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>

        <p className="mt-4 text-sm text-center">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            className="text-purple-600 hover:underline"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-10 space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <div className="flex items-center gap-4">
          <img
            src={user.photoURL || "/default-avatar.png"}
            alt="avatar"
            className="w-16 h-16 rounded-full"
          />
          <div className="flex-1">
            <h2 className="text-xl font-bold">{user.displayName || "User"}</h2>
            <p className="text-gray-500 text-sm">{user.email}</p>
          </div>
          <button
            onClick={() => setEditing(true)}
            className="text-purple-600 hover:underline"
          >
            <Pencil size={18} />
          </button>
        </div>

        <div className="flex items-center gap-4 mt-6">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Target className="text-orange-500" size={18} />
            {user.streak || 0} Day Streak
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Star className="text-yellow-500" size={18} />
            {user.xp || 0} XP
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 w-full py-2 text-sm text-red-500 border rounded hover:bg-red-50 dark:hover:bg-red-800 flex items-center justify-center gap-2"
        >
          <LogOut size={16} /> Log Out
        </button>
      </div>

      {editing && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <input
              type="text"
              placeholder="Display Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-4 py-2 rounded border bg-gray-100 dark:bg-gray-700"
            />
            <input
              type="text"
              placeholder="Photo URL"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="w-full px-4 py-2 rounded border bg-gray-100 dark:bg-gray-700"
            />
            {successMsg && (
              <p className="text-green-500 text-sm">{successMsg}</p>
            )}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="px-4 py-2 text-sm rounded border"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
