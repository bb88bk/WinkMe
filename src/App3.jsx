import React from 'react';
import { Camera } from 'lucide-react';
// ✅ 用 html-to-image 替代 html2canvas
import * as htmlToImage from 'html-to-image';

// 整页背景图（替换成你的图床地址）
const BACKGROUND_URL =
  'https://i.mji.rip/2025/12/24/ed9cd29ee82b7133730df08cbf93abea.jpeg';

function NoticePage() {
  // 截图逻辑：使用 html-to-image
  const handleScreenshot = async () => {
    const target = document.getElementById('main-dashboard-container');
    if (!target) return;

    try {
      const dataUrl = await htmlToImage.toPng(target, {
        cacheBust: true,
        pixelRatio: 2, // 相当于原来 scale: 2，提高清晰度
        // backgroundColor: 'white', // 如需强制白底可以打开这一行
      });

      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = '技术支持@jia960';
      link.click();
    } catch (err) {
      console.error('截图失败: ', err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center overflow-x-hidden">
      {/* 截图按钮 */}
      <button
        onClick={handleScreenshot}
        className="mb-4 px-4 py-1.5 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white text-xs font-medium  hover:brightness-110 transition flex items-center gap-2"
      >
        <Camera className="w-4 h-4" />
        一键截图（告知书）
      </button>

      {/* A4 页面（794 × 1123） */}
      <div
        id="main-dashboard-container"
        className="relative w-[794px] h-[1123px] text-[#111827] overflow-hidden "
      >
        {/* 背景图 */}
        <div className="absolute inset-0 -z-10">
          <img
            src={BACKGROUND_URL}
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 主文案 —— 完全无边框、无阴影 */}
        <div
          className="
            absolute 
            left-[50px] top-[235px] -translate-x-max
            px-10 py-6
            text-[15px] leading-relaxed
            max-w-[700px]
         shadow-none 
          "
          contentEditable
          suppressContentEditableWarning
        >
          <div
            className="mb-5 text-center text-[#92226B] font-bold text-[25px] leading-snug"
            style={{ fontFamily: 'Times New Roman' }}
          >
            <p>Wink Me Handling of Member Activity Issues</p>
            <p>Wink Me Dating Club</p>
          </div>

          <p className="mb-3">
            Dear Wink Me Member <strong>[TT951360]</strong>, Hello!
          </p>

          <p className="mb-3">
            Because the member did not complete certain actions according to the
            platform guidelines, this caused system errors and prevented access
            to some features, resulting in missed interactions and lost
            opportunities to connect. To help you recover from this, regain
            confidence in using the platform, and ensure a smooth experience
            within our community, the club has exceptionally approved a Green
            Channel Recovery.
          </p>

          <p className="mt-4 mb-2 font-semibold text-[#b91c1c]">Option one:</p>
          <p className="mb-3">
            Complete the required actions by paying{' '}
            <strong>12,888 rupees</strong>, redo the special verification steps,
            the approval bonus is <strong>30%-50%</strong>, go through the
            process flow, and after completion, both the principal and bonus
            will be restored. Withdrawals will not be processed during this
            period. The verification cannot be collected within 7 days after
            activation.
          </p>

          <p className="mt-4 mb-2 font-semibold text-[#b91c1c]">Option two:</p>
          <p>
            Complete the required actions by paying{' '}
            <strong>6,888 rupees</strong>, redo the step-by-step verification,
            the bonus for each step is <strong>30%-40%</strong>, the task is to
            merge 2–3 profile updates or connections together to complete the
            process. Withdraw the recovery amount and remaining balance together
            after completion, and partial withdrawals will not be allowed.
          </p>
        </div>
      </div>
    </div>
  );
}

export default NoticePage;
