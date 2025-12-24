// main.jsx
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import A001 from './A001.jsx';
import './index.css';

function AppWithAuth() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // 是否已登录：从 localStorage 里读一次（刷新页面仍然保持）
  const [authed, setAuthed] = useState(
    () => window.localStorage.getItem('flirtify_authed') === '1'
  );

  // 这里定义账号密码（你可以改成自己想要的）
  const VALID_USER = 'mangguo';
  const VALID_PASS = '112200';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === VALID_USER && password === VALID_PASS) {
      setAuthed(true);
      setError('');
      window.localStorage.setItem('flirtify_authed', '1');
    } else {
      setError('Account or password is incorrect.');
    }
  };

  if (!authed) {
    // 登录页（覆盖整个屏幕）
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#02030a]">
        <div className="w-full max-w-sm rounded-2xl bg-[#0b1020] border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.85)] p-6">
          <h1 className="text-lg font-semibold text-white mb-1 text-center">
            Flirtify Admin Login
          </h1>
          <p className="text-[11px] text-slate-400 mb-5 text-center">
            Please enter your account and password to access the dashboard.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-slate-300 mb-1">
                Account
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg bg-[#181b2b] border border-slate-600/60 px-3 py-2 text-sm text-white outline-none focus:border-sky-500"
                placeholder="admin"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-300 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg bg-[#181b2b] border border-slate-600/60 px-3 py-2 text-sm text-white outline-none focus:border-sky-500"
                placeholder="123456"
              />
            </div>

            {error && <div className="text-[11px] text-red-400">{error}</div>}

            <button
              type="submit"
              className="w-full mt-2 py-2 rounded-full text-xs font-medium text-white
                         bg-gradient-to-r from-sky-500 to-blue-600
                         shadow-[0_0_16px_rgba(56,189,248,0.6)]
                         hover:brightness-110 transition"
            >
              Login
            </button>
          </form>

          <p className="text-[10px] text-slate-500 mt-4 text-center"></p>
        </div>
      </div>
    );
  }

  // 已通过登录验证 -> 显示你现在的整套 A001 系统
  return <A001 />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWithAuth />
  </React.StrictMode>
);
