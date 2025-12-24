import React, { useEffect, useState } from 'react';
import {
  Home,
  Users,
  CreditCard,
  BarChart3,
  Settings,
  Wallet,
  PieChart,
  Bell,
  Search,
  Camera,
  Info,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

// ★ 用 html-to-image 代替 html2canvas
import { toPng } from 'html-to-image';

function App() {
  const [now, setNow] = useState(new Date());
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
    2,
    '0'
  )}-${String(now.getDate()).padStart(2, '0')} ${String(
    now.getHours()
  ).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(
    now.getSeconds()
  ).padStart(2, '0')}`;

  // 截图主容器（html-to-image）
  const handleScreenshot = async () => {
    const target = document.getElementById('main-dashboard-container');
    if (!target) return;

    try {
      const dataUrl = await toPng(target, {
        cacheBust: true,
        pixelRatio: 2, // 相当于高清截图
      });

      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'Wink Me-credit-score.png';
      link.click();
    } catch (err) {
      console.error('screenshot error', err);
    }
  };

  return (
    // 整个页面：居中 + 不出现横向拖拽条
    <div className="min-h-screen bg-[#02030a] flex flex-col items-center justify-center overflow-x-hidden">
      {/* 截图按钮在主容器外 */}
      <button
        onClick={handleScreenshot}
        className="mb-4 px-4 py-1.5 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white text-xs font-medium shadow-[0_0_18px_rgba(56,189,248,0.6)] hover:brightness-110 transition flex items-center gap-2"
      >
        <Camera className="w-4 h-4" />
        一键截图
      </button>

      {/* 主容器：固定宽高 + 描边 + 阴影 */}
      <div
        id="main-dashboard-container"
        className="w-[1300px] h-[750px] bg-dash-bg text-dash-text border border-dash-border/80 shadow-[0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden relative"
      >
        {/* 左右区域整体 flex，并保持等高 */}
        <div className="flex h-full">
          {/* Sidebar */}
          <aside className="w-18 md:w-20 lg:w-20 h-full flex flex-col items-center py-4 border-r border-dash-border bg-[#1a0b24] shadow-[4px_0_20px_rgba(0,0,0,0.6)]">
            <div className="mb-6">
              {/* 这里预留图床地址，直接把 src 换成你的 logo 链接 */}
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center overflow-hidden">
                <img
                  src="https://telegraph-image-83p.pages.dev/file/BQACAgQAAyEGAATEik5HAANnaUtvX-ZNalnAKnONTQvHceXBTtcAAp8aAAJpI1hSuyDKXgR1xvo2BA.png"
                  alt="Logo"
                  className="w-[80px] h-full object-contain"
                />
              </div>
            </div>

            <nav className="flex-1 flex flex-col items-center gap-4 mt-2">
              <SidebarIcon icon={Home} />
              <SidebarIcon icon={Users} active />
              <SidebarIcon icon={CreditCard} />
              <SidebarIcon icon={BarChart3} />
              <SidebarIcon icon={Wallet} />
              <SidebarIcon icon={PieChart} />
              <SidebarIcon icon={Settings} />
            </nav>

            <div className="mt-6 text-[10px] text-dash-muted text-center px-1 leading-tight">
              <div>Current Version</div>
              <div>V2025.1.0</div>
            </div>
          </aside>

          {/* Main 区域 */}
          <div className="flex-1 flex flex-col min-w-0 h-full">
            {/* Top bar */}
            <header className="h-14 px-4 md:px-6 flex items-center justify-between bg-[#1a0b24] border-b border-dash-border">
              <div className="flex items-center gap-3">
                <span className="hidden md:inline text-sm font-semibold tracking-wide">
                  Wink Me
                </span>
                <div className="flex items-center gap-2 bg-[#2b0f3c] rounded-full px-3 py-1.5 text-xs text-dash-muted w-40 md:w-64">
                  <Search className="w-4 h-4 text-dash-muted" />
                  <input
                    className="bg-transparent outline-none w-full placeholder:text-dash-muted"
                    placeholder="Search function"
                  />
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2 text-xs text-dash-muted">
                <span>Current Time:</span>
                <span className="text-[11px] text-[var(--f-pink)] font-medium">
                  {timeStr}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden lg:inline text-xs text-dash-muted">
                  Welcome to log in Wink Me background management system
                </span>
                <button className="w-8 h-8 rounded-full bg-[#2b0f3c] flex items-center justify-center text-dash-muted hover:text-[var(--f-pink)] hover:bg-[#262b3a] transition">
                  <Bell className="w-4 h-4" />
                </button>
              </div>
            </header>

            {/* Second nav */}
            <div className="h-10 flex items-center px-4 md:px-6 bg-[#230d31] border-b border-dash-border text-xs text-dash-muted gap-4">
              <NavTag text="User Function" />
              <NavTag text="Info Report" />
              <NavTag text="Payment" />
              <NavTag text="Member" active />
              <NavTag text="Order" />
            </div>

            {/* Content 主体：上下结构 + 下半部分三个说明块 */}
            <main className="flex-1 flex flex-col px-4 md:px-6 py-4 gap-4 bg-[#050509] overflow-hidden">
              {/* 上半部分 */}
              <div className="flex flex-col gap-4">
                {/* Header row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="text-lg font-semibold">Credit Score</div>
                    <button className="text-xs text-sky-400 hover:text-[var(--f-pink)] flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[var(--f-magenta)]" />
                      Refresh
                    </button>
                    <button className="w-7 h-7 rounded-full bg-[#2b0f3c] flex items-center justify-center text-dash-muted hover:text-[var(--f-pink)]">
                      <Search className="w-3.5 h-3.5" />
                    </button>
                    <input
                      className="bg-[#2b0f3c] border border-dash-border/60 rounded-full px-3 py-1.5 text-[11px] text-dash-muted placeholder:text-dash-muted/70 min-w-[140px] md:min-w-[200px] outline-none"
                      placeholder="Search order or UID"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2 md:justify-end">
                    <button className="btn-secondary">Reset</button>
                    <Toggle label="Is Admin?" />
                    <Toggle label="Bind phone?" defaultChecked />
                    <Toggle label="Auto Refresh?" />
                    <Toggle label="On Tone?" />
                    <button
                      className="btn-primary"
                      onClick={() => setShowModal(true)}
                    >
                      Export Excel file
                    </button>
                  </div>
                </div>

                {/* Tabs row（防止按钮文字换行） */}
                <div className="flex flex-wrap gap-2 text-[11px]">
                  {[
                    'Member info',
                    'Withdraw Record',
                    'Deposit Record',
                    'Game Record',
                    'Bank Card Bind',
                    'User Violation',
                    'Credit Score',
                    'Login IP Info',
                    'Backpack Item',
                    'Nobility Record',
                  ].map((tab) => (
                    <button
                      key={tab}
                      className={
                        'px-3 py-1.5 rounded-full border border-dash-border/80 bg-[#1a0b24] text-dash-muted hover:text-dash-text hover:border-[var(--f-pink)] transition whitespace-nowrap ' +
                        (tab === 'Credit Score'
                          ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-glow-blue border-transparent'
                          : '')
                      }
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Top cards 区域暂时留空，占位不塌陷 */}
                <div className="mt-5 h-40 xl:h-44" />
              </div>

              {/* 下半部分：三个说明框，一行排布（带图标） */}
              <section className="card flex-1 flex flex-col mt-5">
                <div
                  className="grid gap-4 h-full px-4 py-4"
                  style={{ gridTemplateColumns: '4fr 2.2fr 2.5fr' }}
                >
                  {/* 左：Description of credit score */}
                  <div className="bg-[#1a0b24] rounded-2xl px-5 py-4 flex flex-col shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-full bg-[var(--f-magenta)]/15 border border-[var(--f-magenta)]/60 flex items-center justify-center">
                        <Info className="w-4 h-4 text-[var(--f-pink)]" />
                      </div>
                      <h3 className="text-sm font-semibold">
                        Description of credit score
                      </h3>
                    </div>
                    <p className="text-[11px] md:text-xs leading-relaxed text-[var(--f-text)]/80">
                      Credit score is a credit system designed based on all
                      aspects of data. Essentially, &quot;credit score&quot; is
                      a set of credit information system and a record of the
                      platform&apos;s behavior. The comprehensive processing and
                      evaluation of massive information data mainly includes
                      five dimensions: user credit history, behavior preference,
                      performance ability, identity characteristics and human
                      relations. It is based on Internet financial data and
                      establishes data cooperation with public institutions such
                      as public security network and partners, which is
                      different from traditional credit data. By analyzing a
                      large number of online transaction and behavior data,
                      &quot;Credit Score&quot; can help Internet financial
                      enterprises to provide users with fast credit and cash
                      installment services.
                    </p>
                  </div>

                  {/* 中：Advantages of credit score */}
                  <div className="bg-[#1a0b24] rounded-2xl px-5 py-4 flex flex-col shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-full bg-[var(--f-magenta)]/15 border border-[var(--f-magenta)]/60 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-[var(--f-pink)]" />
                      </div>
                      <h3 className="text-sm font-semibold">
                        Advantages of credit score
                      </h3>
                    </div>
                    <ul className="list-disc pl-5 space-y-1 text-[11px] md:text-xs leading-relaxed text-[var(--f-text)]/80">
                      <li>Wide range of real-name users</li>
                      <li>Unique Data Value</li>
                      <li>Powerful processing capability</li>
                      <li>Convenient scene application</li>
                    </ul>
                  </div>

                  {/* 右：The value of credit score */}
                  <div className="bg-[#1a0b24] rounded-2xl px-5 py-4 flex flex-col shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-full bg-[var(--f-magenta)]/15 border border-[var(--f-magenta)]/60 flex items-center justify-center">
                        <ShieldCheck className="w-4 h-4 text-[var(--f-pink)]" />
                      </div>
                      <h3 className="text-sm font-semibold">
                        The value of credit score
                      </h3>
                    </div>
                    <ul className="list-disc pl-5 space-y-1 text-[11px] md:text-xs leading-relaxed text-[var(--f-text)]/80">
                      <li>
                        The socialization of credit relationship will release
                        new consumption power
                      </li>
                      <li>Credit will escort the Internet + economy</li>
                      <li>
                        Internet + credit is also an inevitable choice for
                        ordinary finance
                      </li>
                      <li>
                        Contribute to the creation of a social atmosphere where
                        everyone can trust
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>

        {/* 弹窗：带渐变、发光、模糊 */}
        {showModal && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
            <div
              className="w-[90%] max-w-xl rounded-2xl overflow-hidden 
                         shadow-[0_0_50px_rgba(255,80,240,0.45)]
                         bg-gradient-to-b from-[#2a0b3d] to-[#15071f]
                         border border-[rgba(255,110,199,0.4)]"
            >
              {/* 顶部标题栏 */}
              <div
                className="px-5 py-3 bg-gradient-to-r from-[#ff4df0] via-[#ff2fe6] to-[#a020f0] 
                           text-white text-sm font-semibold 
                           shadow-[0_0_12px_rgba(255,79,240,0.9)]"
              >
                System Hint
              </div>

              {/* 内容区，可以保留可编辑 + 渐变文字 */}
              <div
                className="px-5 py-4 text-[13px] leading-relaxed text-[#f7d8ff] 
                           min-h-[160px] max-h-[340px] overflow-auto outline-none space-y-2"
                contentEditable
                suppressContentEditableWarning
              >
                <p>
                  Dear Wink Me user:
                  <strong
                    className="ml-1 bg-gradient-to-r from-fuchsia-400 via-pink-400 to-purple-500 
                               bg-clip-text text-transparent font-bold 
                               drop-shadow-[0_0_6px_rgba(255,80,240,0.8)]"
                  >
                    DQ199305
                  </strong>
                  , Hello!
                </p>

                <p className="text-[#e9c6ff]">
                  There are multiple replenishment orders in the account. It is
                  suspected this may be malicious arbitrage to increase the
                  principal and obtain benefits.
                </p>

                <p className="text-[#f0caff]">
                  <strong className="text-pink-400">2 points</strong> will be
                  deducted for each make up order. The original account has{' '}
                  <strong className="text-pink-400">10 points</strong>, now only{' '}
                  <strong className="text-pink-400">4 points</strong> remain.
                </p>

                <p className="text-[#eac4ff]">
                  The first recovery amount is
                  <strong className="ml-1 text-pink-400">4,000 rupees</strong>
                  (1 point = 1,000 rupees). You may withdraw the balance
                  together with the recovered amount.
                </p>
              </div>

              {/* 按钮区 */}
              <div className="px-5 py-3 flex justify-center border-t border-[rgba(255,110,199,0.3)]">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-8 py-1.5 rounded-full text-white text-sm font-medium
                             bg-gradient-to-r from-[#ff4df0] via-[#ff2fe6] to-[#a020f0]
                             shadow-[0_0_15px_rgba(255,79,240,0.7)]
                             hover:brightness-110 transition"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* === small components & data === */

function SidebarIcon({ icon: Icon, active }) {
  return (
    <button
      className={
        'w-11 h-11 flex items-center justify-center rounded-2xl text-dash-muted hover:text-[var(--f-pink)] hover:bg-[#2b0f3c] transition relative ' +
        (active
          ? 'bg-[#2b0f3c] text-[var(--f-pink)] shadow-[0_0_16px_rgba(255,79,240,0.45)]'
          : '')
      }
    >
      {active && (
        <span className="absolute -left-2 w-1.5 h-7 rounded-r-full bg-gradient-to-b from-sky-400 to-blue-500" />
      )}
      <Icon className="w-5 h-5 md:w-6 md:h-6" />
    </button>
  );
}

function NavTag({ text, active }) {
  return (
    <span
      className={
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-full ' +
        (active
          ? 'bg-[#2b0f3c] text-sky-400 border border-[var(--f-pink)]'
          : 'text-dash-muted')
      }
    >
      <span>{text}</span>
      <span className="text-xs">×</span>
    </span>
  );
}

function Toggle({ label, defaultChecked }) {
  const [checked, setChecked] = useState(!!defaultChecked);
  return (
    <label className="flex items-center gap-1.5 text-[11px] text-dash-muted cursor-pointer">
      <span>{label}</span>
      <button
        type="button"
        onClick={() => setChecked((v) => !v)}
        className={
          'relative w-9 h-5 rounded-full transition-colors ' +
          (checked
            ? 'bg-gradient-to-r from-sky-500 to-blue-600'
            : 'bg-[#2a2d38]')
        }
      >
        <span
          className={
            'absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform ' +
            (checked ? 'translate-x-4' : 'translate-x-0')
          }
        />
      </button>
    </label>
  );
}

// 这里 LineCard 虽然暂时没用到，可以保留，将来其他页面要用也方便
function LineCard({ title, total, last, variant }) {
  const gradientClass =
    variant === 'orange'
      ? 'from-amber-400/90 via-orange-500/70 to-transparent'
      : 'from-indigo-400/90 via-sky-500/70 to-transparent';

  const lineColor =
    variant === 'orange' ? 'bg-orange-400/90' : 'bg-[var(--f-magenta)]/90';

  return (
    <div className="card h-40 xl:h-44 flex flex-col justify-between w-[280px]">
      <div className="px-5 pt-4">
        <div className="text-xs text-dash-muted">{title}</div>
        <div className="text-sm md:text-base font-semibold mt-1">
          {total}
          <span className="ml-1 text-[11px] text-dash-muted">rupees</span>
        </div>
      </div>
      <div className="px-5 pb-4">
        <div className="text-[11px] text-dash-muted">The most recent</div>
        <div className="text-sm font-semibold mb-2">{last}</div>
        <div className="h-10 rounded-xl bg-gradient-to-t from-black/5 via-black/10 to-transparent overflow-hidden relative">
          <div
            className={
              'absolute inset-x-1 bottom-2 h-0.5 rounded-full ' + lineColor
            }
          />
          <div
            className={'absolute inset-0 bg-gradient-to-t ' + gradientClass}
          />
        </div>
      </div>
    </div>
  );
}

const rows = [
  {
    user: 'MZ136198',
    order: '200152965149404761448880dao',
    withdraw: '41,378.00',
    actual: '41,378.00',
    fee: '0.00',
    name: 'Vasistha',
    account: '4346 1234 5678 9123',
    time: '2025-11-14 20:10:32',
    op: 'KF006',
  },
  {
    user: 'FI100026',
    order: '200152965149404198094981dao',
    withdraw: '67,680.00',
    actual: '67,680.00',
    fee: '0.00',
    name: 'Apala',
    account: '5327 0010 0095 2450',
    time: '2025-11-14 19:52:16',
    op: 'KF003',
  },
  {
    user: 'WJ188328',
    order: '20015432783789741348880dao',
    withdraw: '92,484.00',
    actual: '92,484.00',
    fee: '0.00',
    name: 'Nayana',
    account: '4321 0123 4567 8901',
    time: '2025-11-14 19:10:44',
    op: 'KF006',
  },
  {
    user: 'ON133859',
    order: '200152435489749106547380dao',
    withdraw: '6,023.00',
    actual: '6,023.00',
    fee: '0.00',
    name: 'Kumara',
    account: '4000 1234 5678 9010',
    time: '2025-11-14 18:47:03',
    op: 'KF005',
  },
];

export default App;
