import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';

interface LoginForm {
  username: string;
  password: string;
}

const AdminLogin = () => {
  const [form, setForm] = useState<LoginForm>({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!form.username || !form.password) return alert('Please enter both fields');
    setLoading(true);
    try {
      await axios.post('/auth/login', form); // 🍪 Cookie set here
      navigate('/admin/dashboard');
    } catch (err) {
      alert('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0e0e0e] text-white px-4">
      <div className="p-6 bg-[#1f1f1f] rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full mb-4 px-4 py-2 rounded bg-[#2e2e2e] border border-gray-600 focus:outline-none"
          value={form.username}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 rounded bg-[#2e2e2e] border border-gray-600 focus:outline-none"
          value={form.password}
          onChange={handleChange}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 py-2 rounded text-white font-semibold transition disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
