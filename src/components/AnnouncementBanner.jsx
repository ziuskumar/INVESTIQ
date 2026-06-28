import React from 'react';

const AnnouncementBanner = () => {
  return (
    <div
      id="announcement-banner"
      style={{
        backgroundColor: '#261b07',
        color: '#ffffff',
        textAlign: 'center',
        padding: '8px 16px',
        fontSize: '14px',
        fontWeight: 400,
        letterSpacing: '-0.14px',
        lineHeight: 1.25,
      }}
    >
      <span style={{ opacity: 0.9 }}>🔬</span>
      {' '}AI Investment Research — Powered by LangChain & Finnhub{' '}
      <span
        style={{
          display: 'inline-block',
          backgroundColor: '#f9a600',
          color: '#261b07',
          padding: '2px 8px',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: 492,
          marginLeft: '8px',
          letterSpacing: '0.6px',
        }}
      >
        BETA
      </span>
    </div>
  );
};

export default AnnouncementBanner;
