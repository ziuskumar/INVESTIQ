import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

/**
 * Navigation Header — Runway style
 * Left-aligned wordmark, right-aligned nav with Research/Dashboard links.
 * 1px Linen bottom border, full-width, sticky.
 */
const NavigationHeader = () => {
  return (
    <>
      <Head>
        <title>AI Investment Research Dashboard</title>
        <meta name="description" content="AI-powered investment research dashboard using LangChain and Finnhub for real-time company analysis and investment decisions." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header
        id="main-header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 32px',
          borderBottom: '1px solid #e3dfd5',
          backgroundColor: '#ffffff',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        {/* Wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #f9a600 0%, #e89b01 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'inset 0px 2px 4px 0px rgba(255,255,255,0.56), 0px 4px 8px 0px rgba(38,27,7,0.06), 0px 1px 2px 0px rgba(38,27,7,0.36)',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#261b07" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span
            style={{
              fontSize: '20px',
              fontWeight: 584,
              color: '#261b07',
              letterSpacing: '-0.22px',
              lineHeight: 1.25,
            }}
          >
            InvestIQ
          </span>
        </div>

        {/* Right side nav items */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Active: Research */}
          <span
            style={{
              backgroundColor: '#f9a600',
              color: '#261b07',
              borderRadius: '8px',
              padding: '6px 12px',
              fontSize: '14px',
              fontWeight: 492,
              boxShadow: 'inset 0px 2px 4px 0px rgba(255,255,255,0.56), 0px 4px 8px 0px rgba(38,27,7,0.06), 0px 1px 2px 0px rgba(38,27,7,0.36)',
            }}
          >
            Research
          </span>

          {/* Dashboard link */}
          <Link
            href="/dashboard"
            style={{
              fontSize: '14px',
              fontWeight: 400,
              color: '#8f897e',
              padding: '6px 12px',
              borderRadius: '8px',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              border: '1px solid transparent',
            }}
            onMouseOver={(e) => { e.currentTarget.style.color = '#261b07'; e.currentTarget.style.backgroundColor = '#f8f7f5'; }}
            onMouseOut={(e) => { e.currentTarget.style.color = '#8f897e'; e.currentTarget.style.backgroundColor = 'transparent'; }}
          >
            Dashboard
          </Link>
        </nav>
      </header>
    </>
  );
};

export default NavigationHeader;
