import React from 'react';

export function PhoneFrame({ children }: {children: React.ReactNode;}) {
  return (
    <div className="relative flex h-[calc(100dvh-112px)] w-full flex-col overflow-hidden bg-canvas md:h-[780px] md:max-h-[calc(100vh-150px)] md:min-h-[640px] md:w-[390px] md:rounded-[44px] md:border-[10px] md:border-ink md:shadow-[0_30px_60px_-20px_rgba(21,33,28,0.35)]">
      {children}
      <div id="phone-overlay" className="pointer-events-none absolute inset-0 z-40 [&>*]:pointer-events-auto" />
    </div>);

}