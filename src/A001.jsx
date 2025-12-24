import React, { useState } from 'react';

// App1.jsx = 提现 / 现金系统
import CashSystemPage from './App1.jsx';

// App2.jsx = 信用分 / Credit Score
import CreditScorePage from './App2.jsx';

// App3.jsx = 告知书页面
import NoticePage from './App3.jsx';

export default function A001() {
  // 当前显示哪个大板块：cash / credit / notice
  const [page, setPage] = useState('cash');

  return (
    <div className="relative">
      {/* 右上角切换按钮（不影响你原来的 UI 布局） */}
      <div className="fixed right-4 top-4 z-[9999] flex gap-2 text-xs">
        {/* 大额系统 */}
        <button
          onClick={() => setPage('cash')}
          className={
            'px-3 py-1.5 rounded-full border text-[11px] transition ' +
            (page === 'cash'
              ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white border-transparent shadow-[0_0_14px_rgba(56,189,248,0.6)]'
              : 'bg-black/40 text-slate-200 border-white/15 hover:border-sky-500/60')
          }
        >
          大额系统
        </button>

        {/* 信誉积分 */}
        <button
          onClick={() => setPage('credit')}
          className={
            'px-3 py-1.5 rounded-full border text-[11px] transition ' +
            (page === 'credit'
              ? 'bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white border-transparent shadow-[0_0_14px_rgba(236,72,153,0.7)]'
              : 'bg-black/40 text-slate-200 border-white/15 hover:border-fuchsia-500/60')
          }
        >
          信誉积分
        </button>

        {/* 告知书（App3.jsx） */}
        <button
          onClick={() => setPage('notice')}
          className={
            'px-3 py-1.5 rounded-full border text-[11px] transition ' +
            (page === 'notice'
              ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-transparent shadow-[0_0_14px_rgba(129,140,248,0.7)]'
              : 'bg-black/40 text-slate-200 border-white/15 hover:border-indigo-400/60')
          }
        >
          告知书
        </button>
      </div>

      {/* 根据状态切换三个大页面 */}
      {page === 'cash' && <CashSystemPage />}
      {page === 'credit' && <CreditScorePage />}
      {page === 'notice' && <NoticePage />}
    </div>
  );
}
