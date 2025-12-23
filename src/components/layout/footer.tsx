import React from 'react';

export default function Footer() {
  // TODO: Thay # bằng link thật khi có
  const systemUrl = '#';
  const ibmeUrl = 'https://lab.ibme.edu.vn/';

  return (
    <footer className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4 text-[11px] text-[#5f5f5f]">
      <p>
        Copyright © 2025{' '}
        <a 
          href={systemUrl}
          className="transition-colors hover:text-[#1890ff] hover:underline"
        >
          Hệ thống quản lý tủ đông
        </a>
        {' '}All rights reserved.
      </p>
      
      <a 
        href={ibmeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-colors hover:text-[#1890ff]"
      >
        Design by iBME Hust
      </a>
    </footer>
  );
}
