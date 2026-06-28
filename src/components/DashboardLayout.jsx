import React from 'react';
import NavigationHeader from './NavigationHeader';
import AnnouncementBanner from './AnnouncementBanner';
import HistoryPanel from './HistoryPanel';
import ChatbotPanel from './ChatbotPanel';

const DashboardLayout = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f8f7f5',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <AnnouncementBanner />
      <NavigationHeader />

      <main
        style={{
          flex: 1,
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          padding: '32px',
          display: 'grid',
          gridTemplateColumns: '320px 1fr',
          gap: '24px',
          alignItems: 'start',
        }}
      >
        <aside style={{ position: 'sticky', top: '100px' }}>
          <HistoryPanel />
        </aside>

        <section style={{ minHeight: 'calc(100vh - 200px)' }}>
          <ChatbotPanel />
        </section>
      </main>

      <footer
        style={{
          borderTop: '1px solid #e3dfd5',
          padding: '24px 32px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: '12px', color: '#8f897e', letterSpacing: '0.6px' }}>
            InvestIQ — AI Investment Research Dashboard
          </span>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#aca89f', letterSpacing: '0.6px' }}>
              Powered by LangChain & Finnhub
            </span>
            <span
              style={{
                backgroundColor: '#f8da9d',
                color: '#261b07',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '11px',
                fontWeight: 492,
                letterSpacing: '0.6px',
              }}
            >
              v0.1.0
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;
