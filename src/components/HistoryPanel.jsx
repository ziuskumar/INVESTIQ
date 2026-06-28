import React, { useContext } from 'react';
import { HistoryContext } from '../context/HistoryContext';

const HistoryPanel = () => {
  const { entries, clearHistory } = useContext(HistoryContext);

  return (
    <div
      id="history-panel"
      className="animate-slide-in-left"
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e3dfd5',
        borderRadius: '8px',
        padding: '24px',
        boxShadow: '0px 4px 8px 0px rgba(38, 27, 7, 0.06)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#261b07" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <h2
            style={{
              fontSize: '16px',
              fontWeight: 584,
              color: '#261b07',
              letterSpacing: '-0.16px',
              lineHeight: 1.25,
            }}
          >
            Research History
          </h2>
        </div>
        {entries.length > 0 && (
          <button
            onClick={clearHistory}
            style={{
              fontSize: '12px',
              fontWeight: 492,
              color: '#8f897e',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: '4px',
              transition: 'all 0.2s ease',
              letterSpacing: '0.6px',
              textTransform: 'uppercase',
            }}
            onMouseOver={(e) => { e.currentTarget.style.color = '#f0624f'; e.currentTarget.style.backgroundColor = '#f8f7f5'; }}
            onMouseOut={(e) => { e.currentTarget.style.color = '#8f897e'; e.currentTarget.style.backgroundColor = 'transparent'; }}
          >
            Clear
          </button>
        )}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', paddingRight: '4px' }}>
        {entries.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 16px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: '#f8f7f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d5d2cd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            </div>
            <p style={{ color: '#aca89f', fontSize: '14px', fontWeight: 400, letterSpacing: '-0.14px' }}>
              No research yet.
            </p>
            <p style={{ color: '#d5d2cd', fontSize: '12px', fontWeight: 400, marginTop: '4px', letterSpacing: '0.6px' }}>
              Enter a company name to get started
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {entries.map((entry, idx) => (
              <div
                key={idx}
                className="animate-fade-in-up"
                style={{
                  border: '1px solid #e3dfd5',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  animationDelay: `${idx * 0.05}s`,
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8f7f5';
                  e.currentTarget.style.borderColor = '#d5d2cd';
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = '#e3dfd5';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: 492,
                      color: '#261b07',
                      letterSpacing: '-0.14px',
                    }}
                  >
                    {entry.company}
                  </span>
                  <span
                    style={{
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 492,
                      letterSpacing: '0.6px',
                      backgroundColor: entry.decision === 'Invest' ? '#f8da9d' : '#e3dfd5',
                      color: '#261b07',
                    }}
                  >
                    {entry.decision}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: 400,
                    color: '#8f897e',
                    letterSpacing: '0.6px',
                  }}
                >
                  {new Date(entry.timestamp).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {entries.length > 0 && (
        <div
          style={{
            marginTop: '16px',
            paddingTop: '16px',
            borderTop: '1px solid #e3dfd5',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: '12px', color: '#8f897e', letterSpacing: '0.6px' }}>
            {entries.length} {entries.length === 1 ? 'report' : 'reports'}
          </span>
          <span style={{ fontSize: '12px', color: '#aca89f', letterSpacing: '0.6px' }}>
            {entries.filter((e) => e.decision === 'Invest').length} Invest · {entries.filter((e) => e.decision !== 'Invest').length} Pass
          </span>
        </div>
      )}
    </div>
  );
};

export default HistoryPanel;
