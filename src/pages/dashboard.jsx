import React, { useContext, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { HistoryContext } from '../context/HistoryContext';

export default function DashboardPage() {
  const { entries } = useContext(HistoryContext);
  const [hoveredCard, setHoveredCard] = useState(null);

  const investCount = entries.filter((e) => e.decision === 'Invest').length;
  const passCount = entries.filter((e) => e.decision !== 'Invest').length;
  const totalReports = entries.length;
  const investRate = totalReports > 0 ? Math.round((investCount / totalReports) * 100) : 0;

  const uniqueCompanies = [...new Set(entries.map((e) => e.company))];
  const recentEntries = entries.slice(0, 5);

  const sectors = [
    { name: 'Technology', pct: 42, color: '#f9a600' },
    { name: 'Healthcare', pct: 18, color: '#e89b01' },
    { name: 'Finance', pct: 15, color: '#f8da9d' },
    { name: 'Energy', pct: 13, color: '#d5befa' },
    { name: 'Other', pct: 12, color: '#e3dfd5' },
  ];

  const metrics = [
    {
      id: 'total',
      label: 'Total Reports',
      value: totalReports,
      delta: totalReports > 0 ? `+${totalReports}` : '—',
      deltaPositive: true,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      ),
    },
    {
      id: 'invest',
      label: 'Invest Signals',
      value: investCount,
      delta: investRate > 0 ? `${investRate}%` : '—',
      deltaPositive: true,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      ),
    },
    {
      id: 'pass',
      label: 'Pass Signals',
      value: passCount,
      delta: totalReports > 0 ? `${100 - investRate}%` : '—',
      deltaPositive: false,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
          <polyline points="17 18 23 18 23 12" />
        </svg>
      ),
    },
    {
      id: 'companies',
      label: 'Unique Companies',
      value: uniqueCompanies.length,
      delta: uniqueCompanies.length > 0 ? `${uniqueCompanies.length} analyzed` : '—',
      deltaPositive: true,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>Dashboard — InvestIQ</title>
        <meta name="description" content="Analytics dashboard for AI-powered investment research." />
      </Head>

      <div style={{ minHeight: '100vh', backgroundColor: '#f8f7f5', display: 'flex', flexDirection: 'column' }}>
        <div style={{ backgroundColor: '#261b07', color: '#fff', textAlign: 'center', padding: '8px 16px', fontSize: '14px', fontWeight: 400, letterSpacing: '-0.14px' }}>
          📊 Portfolio Analytics Dashboard
          <span style={{ display: 'inline-block', backgroundColor: '#f9a600', color: '#261b07', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 492, marginLeft: '8px', letterSpacing: '0.6px' }}>
            LIVE
          </span>
        </div>

        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 32px', borderBottom: '1px solid #e3dfd5', backgroundColor: '#ffffff', position: 'sticky', top: 0, zIndex: 50 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #f9a600 0%, #e89b01 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0px 2px 4px 0px rgba(255,255,255,0.56), 0px 4px 8px 0px rgba(38, 27, 7, 0.06), 0px 1px 2px 0px rgba(38, 27, 7, 0.36)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#261b07" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span style={{ fontSize: '20px', fontWeight: 584, color: '#261b07', letterSpacing: '-0.22px' }}>InvestIQ</span>
          </div>

          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Link href="/" style={{ fontSize: '14px', fontWeight: 400, color: '#8f897e', padding: '6px 12px', borderRadius: '8px', textDecoration: 'none', transition: 'all 0.2s ease', border: '1px solid transparent' }}
              onMouseOver={(e) => { e.currentTarget.style.color = '#261b07'; e.currentTarget.style.backgroundColor = '#f8f7f5'; }}
              onMouseOut={(e) => { e.currentTarget.style.color = '#8f897e'; e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              Research
            </Link>
            <span style={{ backgroundColor: '#f9a600', color: '#261b07', borderRadius: '8px', padding: '6px 12px', fontSize: '14px', fontWeight: 492, boxShadow: 'inset 0px 2px 4px 0px rgba(255,255,255,0.56), 0px 4px 8px 0px rgba(38, 27, 7, 0.06), 0px 1px 2px 0px rgba(38, 27, 7, 0.36)' }}>
              Dashboard
            </span>
          </nav>
        </header>

        <main style={{ flex: 1, maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '32px' }}>
          <div className="animate-fade-in-up" style={{ marginBottom: '32px' }}>
            <h1 style={{ fontSize: '36px', fontWeight: 492, color: '#261b07', letterSpacing: '-0.61px', lineHeight: 1.13, marginBottom: '8px' }}>
              Analytics Dashboard
            </h1>
            <p style={{ fontSize: '16px', fontWeight: 400, color: '#61594a', letterSpacing: '-0.16px' }}>
              Overview of your AI-powered investment research activity.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
            {metrics.map((m, idx) => (
              <div
                key={m.id}
                className="animate-fade-in-up"
                style={{
                  backgroundColor: '#ffffff',
                  border: `1px solid ${hoveredCard === m.id ? '#d5d2cd' : '#e3dfd5'}`,
                  borderRadius: '8px',
                  padding: '24px',
                  boxShadow: hoveredCard === m.id
                    ? '0px 8px 16px 0px rgba(38, 27, 7, 0.08)'
                    : '0px 4px 8px 0px rgba(38, 27, 7, 0.06)',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                  animationDelay: `${idx * 0.08}s`,
                  transform: hoveredCard === m.id ? 'translateY(-2px)' : 'translateY(0)',
                }}
                onMouseOver={() => setHoveredCard(m.id)}
                onMouseOut={() => setHoveredCard(null)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 400, color: '#8f897e', letterSpacing: '0.6px', textTransform: 'uppercase' }}>
                    {m.label}
                  </span>
                  <div style={{ color: '#aca89f' }}>{m.icon}</div>
                </div>
                <div style={{ fontSize: '36px', fontWeight: 584, color: '#261b07', letterSpacing: '-0.61px', lineHeight: 1, marginBottom: '8px' }}>
                  {m.value}
                </div>
                <span style={{
                  fontSize: '12px',
                  fontWeight: 492,
                  color: m.deltaPositive ? '#61594a' : '#f0624f',
                  letterSpacing: '0.6px',
                  backgroundColor: m.deltaPositive ? '#f8f7f5' : 'rgba(240, 98, 79, 0.08)',
                  padding: '2px 8px',
                  borderRadius: '4px',
                }}>
                  {m.delta}
                </span>

                <div style={{ marginTop: '16px', height: '32px', position: 'relative', overflow: 'hidden', borderRadius: '4px' }}>
                  <svg width="100%" height="32" viewBox="0 0 200 32" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id={`grad-${m.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={m.deltaPositive ? '#f9a600' : '#f0624f'} stopOpacity="0.2" />
                        <stop offset="100%" stopColor={m.deltaPositive ? '#f9a600' : '#f0624f'} stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d={m.deltaPositive
                        ? 'M0,28 Q25,24 50,20 T100,14 T150,8 T200,4'
                        : 'M0,4 Q25,8 50,12 T100,18 T150,24 T200,28'}
                      fill="none"
                      stroke={m.deltaPositive ? '#f9a600' : '#f0624f'}
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d={m.deltaPositive
                        ? 'M0,28 Q25,24 50,20 T100,14 T150,8 T200,4 V32 H0 Z'
                        : 'M0,4 Q25,8 50,12 T100,18 T150,24 T200,28 V32 H0 Z'}
                      fill={`url(#grad-${m.id})`}
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
            <div
              className="animate-fade-in-up"
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e3dfd5',
                borderRadius: '8px',
                padding: '24px',
                boxShadow: '0px 4px 8px 0px rgba(38, 27, 7, 0.06)',
                animationDelay: '0.3s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#261b07" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
                  <path d="M22 12A10 10 0 0 0 12 2v10z" />
                </svg>
                <h2 style={{ fontSize: '16px', fontWeight: 584, color: '#261b07', letterSpacing: '-0.16px' }}>
                  Sector Breakdown
                </h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {sectors.map((s) => (
                  <div key={s.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 400, color: '#261b07', letterSpacing: '-0.14px' }}>{s.name}</span>
                      <span style={{ fontSize: '12px', fontWeight: 492, color: '#8f897e', letterSpacing: '0.6px' }}>{s.pct}%</span>
                    </div>
                    <div style={{ height: '8px', backgroundColor: '#f8f7f5', borderRadius: '4px', overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          width: `${s.pct}%`,
                          backgroundColor: s.color,
                          borderRadius: '4px',
                          transition: 'width 1s ease-out',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="animate-fade-in-up"
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e3dfd5',
                borderRadius: '8px',
                padding: '24px',
                boxShadow: '0px 4px 8px 0px rgba(38, 27, 7, 0.06)',
                animationDelay: '0.35s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#261b07" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <h2 style={{ fontSize: '16px', fontWeight: 584, color: '#261b07', letterSpacing: '-0.16px' }}>
                    Recent Activity
                  </h2>
                </div>
                <Link href="/" style={{ fontSize: '12px', fontWeight: 492, color: '#e89b01', letterSpacing: '0.6px', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
                  View All →
                </Link>
              </div>

              {recentEntries.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '32px 16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#f8f7f5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', border: '1px solid #e3dfd5' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d5d2cd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <p style={{ fontSize: '14px', color: '#aca89f' }}>No research activity yet.</p>
                  <Link href="/" style={{ fontSize: '12px', fontWeight: 492, color: '#e89b01', marginTop: '8px', display: 'inline-block', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
                    Start your first analysis →
                  </Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                  {recentEntries.map((entry, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 0',
                        borderBottom: idx < recentEntries.length - 1 ? '1px solid #e3dfd5' : 'none',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '32px', height: '32px', borderRadius: '8px',
                          backgroundColor: entry.decision === 'Invest' ? '#f8da9d' : '#e3dfd5',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                        }}>
                          {entry.decision === 'Invest' ? (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#261b07" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          ) : (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#261b07" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <span style={{ fontSize: '14px', fontWeight: 492, color: '#261b07', letterSpacing: '-0.14px' }}>
                            {entry.company}
                          </span>
                          <p style={{ fontSize: '12px', color: '#8f897e', margin: 0, letterSpacing: '0.6px' }}>
                            {new Date(entry.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <span style={{
                        padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 492,
                        letterSpacing: '0.6px',
                        backgroundColor: entry.decision === 'Invest' ? '#f8da9d' : '#e3dfd5',
                        color: '#261b07',
                      }}>
                        {entry.decision}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div
            className="animate-fade-in-up"
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e3dfd5',
              borderRadius: '8px',
              padding: '24px',
              boxShadow: '0px 4px 8px 0px rgba(38, 27, 7, 0.06)',
              animationDelay: '0.4s',
              marginBottom: '32px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifycontent: 'space-between', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#261b07" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
                <h2 style={{ fontSize: '16px', fontWeight: 584, color: '#261b07', letterSpacing: '-0.16px' }}>
                  Research Accuracy Overview
                </h2>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f9a600' }} />
                  <span style={{ fontSize: '12px', color: '#8f897e', letterSpacing: '0.6px' }}>Invest</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#e3dfd5' }} />
                  <span style={{ fontSize: '12px', color: '#8f897e', letterSpacing: '0.6px' }}>Pass</span>
                </div>
              </div>
            </div>

            <div style={{ height: '200px', position: 'relative', overflow: 'hidden' }}>
              <svg width="100%" height="200" viewBox="0 0 800 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f9a600" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#f9a600" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[0, 1, 2, 3, 4].map((i) => (
                  <line key={i} x1="0" y1={i * 50} x2="800" y2={i * 50} stroke="#f8f7f5" strokeWidth="1" />
                ))}
                <path
                  d="M0,160 C50,140 100,120 150,100 S250,60 300,80 S400,120 450,90 S550,40 600,50 S700,70 750,30 L800,20"
                  fill="none"
                  stroke="#f9a600"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M0,160 C50,140 100,120 150,100 S250,60 300,80 S400,120 450,90 S550,40 600,50 S700,70 750,30 L800,20 V200 H0 Z"
                  fill="url(#chart-grad)"
                />
                {[
                  [0, 160], [150, 100], [300, 80], [450, 90], [600, 50], [750, 30], [800, 20]
                ].map(([cx, cy], i) => (
                  <circle key={i} cx={cx} cy={cy} r="4" fill="#ffffff" stroke="#f9a600" strokeWidth="2" />
                ))}
              </svg>

              <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '0 8px' }}>
                {['100%', '75%', '50%', '25%', '0%'].map((l) => (
                  <span key={l} style={{ fontSize: '11px', color: '#aca89f', letterSpacing: '0.6px' }}>{l}</span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', paddingLeft: '40px' }}>
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map((m) => (
                <span key={m} style={{ fontSize: '11px', color: '#aca89f', letterSpacing: '0.6px' }}>{m}</span>
              ))}
            </div>
          </div>

          <div
            className="animate-fade-in-up"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
              animationDelay: '0.45s',
            }}
          >
            <Link href="/" style={{ textDecoration: 'none' }}>
              <div style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e3dfd5',
                borderRadius: '8px',
                padding: '24px',
                boxShadow: '0px 4px 8px 0px rgba(38, 27, 7, 0.06)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0px 8px 16px 0px rgba(38, 27, 7, 0.08)'; e.currentTarget.style.borderColor = '#f9a600'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0px 4px 8px 0px rgba(38, 27, 7, 0.06)'; e.currentTarget.style.borderColor = '#e3dfd5'; }}
              >
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#f8da9d', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#261b07" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 584, color: '#261b07', letterSpacing: '-0.16px', marginBottom: '4px' }}>New Research</h3>
                <p style={{ fontSize: '14px', color: '#61594a', letterSpacing: '-0.14px' }}>Analyze a new company with AI</p>
              </div>
            </Link>

            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e3dfd5',
              borderRadius: '8px',
              padding: '24px',
              boxShadow: '0px 4px 8px 0px rgba(38, 27, 7, 0.06)',
              transition: 'all 0.3s ease',
              cursor: 'default',
            }}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0px 8px 16px 0px rgba(38, 27, 7, 0.08)'; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0px 4px 8px 0px rgba(38, 27, 7, 0.06)'; }}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#d5befa', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#261b07" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 584, color: '#261b07', letterSpacing: '-0.16px', marginBottom: '4px' }}>API Settings</h3>
              <p style={{ fontSize: '14px', color: '#61594a', letterSpacing: '-0.14px' }}>Configure OpenAI & Finnhub keys</p>
            </div>

            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e3dfd5',
              borderRadius: '8px',
              padding: '24px',
              boxShadow: '0px 4px 8px 0px rgba(38, 27, 7, 0.06)',
              transition: 'all 0.3s ease',
              cursor: 'default',
            }}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0px 8px 16px 0px rgba(38, 27, 7, 0.08)'; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0px 4px 8px 0px rgba(38, 27, 7, 0.06)'; }}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#f8f7f5', border: '1px solid #e3dfd5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#261b07" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 584, color: '#261b07', letterSpacing: '-0.16px', marginBottom: '4px' }}>Export Reports</h3>
              <p style={{ fontSize: '14px', color: '#61594a', letterSpacing: '-0.14px' }}>Download research as PDF/CSV</p>
            </div>
          </div>
        </main>

        <footer style={{ borderTop: '1px solid #e3dfd5', padding: '24px 32px', textAlign: 'center' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#8f897e', letterSpacing: '0.6px' }}>InvestIQ — AI Investment Research Dashboard</span>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: '#aca89f', letterSpacing: '0.6px' }}>Powered by LangChain & Finnhub</span>
              <span style={{ backgroundColor: '#f8da9d', color: '#261b07', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 492, letterSpacing: '0.6px' }}>v0.1.0</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
