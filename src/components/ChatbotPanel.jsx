import React, { useState, useContext, useRef, useEffect } from 'react';
import { HistoryContext } from '../context/HistoryContext';
import LoadingSpinner from './LoadingSpinner';
import ReactMarkdown from 'react-markdown';

const ChatbotPanel = () => {
  const [company, setCompany] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('summary');
  const { addEntry } = useContext(HistoryContext);
  const resultRef = useRef(null);

  useEffect(() => {
    if (response && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [response]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!company.trim()) return;
    setLoading(true);
    setError(null);
    setResponse(null);
    setActiveTab('summary');
    try {
      const res = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company: company.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Server error');
      
      setResponse(data);
      addEntry({
        company: company.trim(),
        decision: data.decision,
        reasoning: data.detailedReasoning || data.reasoning,
        timestamp: new Date().toISOString(),
        confidenceScore: data.confidenceScore,
        summary: data.summary,
        strengths: data.strengths,
        risks: data.risks,
        newsSentiment: data.newsSentiment
      });
    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
      setCompany('');
    }
  };

  const isInteractiveReport = response && (response.summary || response.strengths);

  return (
    <div
      id="chatbot-panel"
      className="animate-slide-in-right"
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e3dfd5',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px 0px rgba(38, 27, 7, 0.06)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '20px 24px',
          borderBottom: '1px solid #e3dfd5',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #f9a600 0%, #e89b01 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'inset 0px 2px 4px 0px rgba(255,255,255,0.56), 0px 2px 4px 0px rgba(38,27,7,0.1)',
            flexShrink: 0,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#261b07" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
            <path d="M16 14H8a4 4 0 0 0-4 4v2h16v-2a4 4 0 0 0-4-4z" />
          </svg>
        </div>
        <div>
          <h2
            style={{
              fontSize: '16px',
              fontWeight: 584,
              color: '#261b07',
              letterSpacing: '-0.16px',
              lineHeight: 1.25,
              margin: 0,
            }}
          >
            Investment Analyst
          </h2>
          <p
            style={{
              fontSize: '12px',
              fontWeight: 400,
              color: '#8f897e',
              letterSpacing: '0.6px',
              margin: 0,
              marginTop: '2px',
            }}
          >
            {loading ? 'Analyzing...' : 'Ready to analyze'}
          </p>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          overflow: 'auto',
          padding: '24px',
        }}
      >
        {!response && !loading && !error && (
          <div
            className="animate-fade-in"
            style={{
              textAlign: 'center',
              padding: '48px 24px',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                backgroundColor: '#f8f7f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                border: '1px solid #e3dfd5',
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f9a600" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="7.5 4.21 12 6.81 16.5 4.21" />
                <polyline points="7.5 19.79 7.5 14.6 3 12" />
                <polyline points="21 12 16.5 14.6 16.5 19.79" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            </div>
            <h3
              style={{
                fontSize: '20px',
                fontWeight: 584,
                color: '#261b07',
                letterSpacing: '-0.22px',
                lineHeight: 1.25,
                marginBottom: '8px',
              }}
            >
              AI Investment Research
            </h3>
            <p
              style={{
                fontSize: '14px',
                fontWeight: 400,
                color: '#61594a',
                letterSpacing: '-0.14px',
                lineHeight: 1.5,
                maxWidth: '400px',
                margin: '0 auto 24px',
              }}
            >
              Enter a company name below. Our AI will analyze real-time data, news sentiment, and fundamentals to generate an interactive, detailed investment report.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
              {['Apple', 'Tesla', 'Microsoft', 'Google'].map((name) => (
                <button
                  key={name}
                  onClick={() => setCompany(name)}
                  style={{
                    backgroundColor: '#f8f7f5',
                    border: '1px solid #e3dfd5',
                    borderRadius: '4px',
                    padding: '4px 12px',
                    fontSize: '12px',
                    fontWeight: 492,
                    color: '#61594a',
                    cursor: 'pointer',
                    letterSpacing: '0.6px',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#f8da9d';
                    e.currentTarget.style.borderColor = '#e89b01';
                    e.currentTarget.style.color = '#261b07';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#f8f7f5';
                    e.currentTarget.style.borderColor = '#e3dfd5';
                    e.currentTarget.style.color = '#61594a';
                  }}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div
            className="animate-fade-in"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '64px 24px',
              gap: '20px',
            }}
          >
            <LoadingSpinner size={32} />
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '14px', fontWeight: 492, color: '#261b07', letterSpacing: '-0.14px' }}>
                Analyzing {company}...
              </p>
              <p style={{ fontSize: '12px', color: '#8f897e', marginTop: '4px', letterSpacing: '0.6px' }}>
                Fetching market data & compiling report
              </p>
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#f9a600',
                    animation: `typing-dot 1.4s ease-in-out ${i * 0.2}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {error && (
          <div
            className="animate-fade-in-up"
            style={{
              padding: '20px 24px',
              backgroundColor: '#f8f7f5',
              borderRadius: '8px',
              border: '1px solid #e3dfd5',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f0624f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span style={{ fontSize: '14px', fontWeight: 492, color: '#f0624f', letterSpacing: '-0.14px' }}>
                Analysis Error
              </span>
            </div>
            <p style={{ fontSize: '14px', color: '#61594a', lineHeight: 1.5 }}>{error}</p>
          </div>
        )}

        {response && !loading && (
          <div ref={resultRef} className="animate-fade-in-up">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px',
                padding: '16px 20px',
                backgroundColor: '#f8f7f5',
                borderRadius: '8px',
                border: '1px solid #e3dfd5',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    backgroundColor: response.decision === 'Invest' ? '#f8da9d' : '#e3dfd5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {response.decision === 'Invest' ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#261b07" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#261b07" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  )}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        fontSize: '20px',
                        fontWeight: 584,
                        color: '#261b07',
                        letterSpacing: '-0.22px',
                        lineHeight: 1.25,
                      }}
                    >
                      {response.decision}
                    </span>
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: 492,
                        letterSpacing: '0.6px',
                        backgroundColor: response.decision === 'Invest' ? '#f8da9d' : '#e3dfd5',
                        color: '#261b07',
                      }}
                    >
                      {response.decision === 'Invest' ? 'RECOMMENDED' : 'NOT RECOMMENDED'}
                    </span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#8f897e', marginTop: '4px', letterSpacing: '0.6px' }}>
                    AI-generated analysis
                  </p>
                </div>
              </div>

              {isInteractiveReport && (
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '20px', fontWeight: 584, color: '#261b07', letterSpacing: '-0.22px' }}>
                    {response.confidenceScore}%
                  </div>
                  <div style={{ fontSize: '11px', color: '#8f897e', letterSpacing: '0.6px', textTransform: 'uppercase' }}>
                    Confidence
                  </div>
                </div>
              )}
            </div>

            {isInteractiveReport && (
              <div
                style={{
                  display: 'flex',
                  borderBottom: '1px solid #e3dfd5',
                  marginBottom: '20px',
                  gap: '16px',
                }}
              >
                {['summary', 'details'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      padding: '8px 16px',
                      background: 'none',
                      border: 'none',
                      borderBottom: activeTab === tab ? '2.5px solid #f9a600' : '2.5px solid transparent',
                      color: activeTab === tab ? '#261b07' : '#8f897e',
                      fontWeight: activeTab === tab ? 584 : 400,
                      cursor: 'pointer',
                      fontSize: '14px',
                      letterSpacing: '-0.14px',
                      transition: 'all 0.2s ease',
                      paddingBottom: '6px',
                    }}
                  >
                    {tab === 'summary' ? 'Executive Summary' : 'Detailed Analysis'}
                  </button>
                ))}
              </div>
            )}

            {(!isInteractiveReport || activeTab === 'summary') && (
              <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {response.summary && (
                  <div
                    style={{
                      padding: '20px',
                      backgroundColor: '#f8f7f5',
                      borderRadius: '8px',
                      borderLeft: '4px solid #f9a600',
                    }}
                  >
                    <h3 style={{ fontSize: '14px', fontWeight: 584, color: '#261b07', letterSpacing: '-0.14px', marginBottom: '6px' }}>
                      Executive Summary
                    </h3>
                    <p style={{ fontSize: '14px', color: '#61594a', lineHeight: 1.5, margin: 0 }}>
                      {response.summary}
                    </p>
                  </div>
                )}

                {isInteractiveReport && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={{ padding: '16px', border: '1px solid #e3dfd5', borderRadius: '8px' }}>
                      <span style={{ fontSize: '11px', color: '#8f897e', letterSpacing: '0.6px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                        News Sentiment
                      </span>
                      <span
                        style={{
                          padding: '4px 10px',
                          borderRadius: '4px',
                          fontSize: '14px',
                          fontWeight: 584,
                          letterSpacing: '0.6px',
                          backgroundColor: response.newsSentiment === 'Bullish' ? '#f8da9d' : response.newsSentiment === 'Bearish' ? 'rgba(240, 98, 79, 0.1)' : '#f8f7f5',
                          color: response.newsSentiment === 'Bearish' ? '#f0624f' : '#261b07',
                        }}
                      >
                        {response.newsSentiment}
                      </span>
                    </div>

                    <div style={{ padding: '16px', border: '1px solid #e3dfd5', borderRadius: '8px' }}>
                      <span style={{ fontSize: '11px', color: '#8f897e', letterSpacing: '0.6px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                        Recommendation Strength
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ flex: 1, height: '6px', backgroundColor: '#f8f7f5', borderRadius: '3px', overflow: 'hidden' }}>
                          <div
                            style={{
                              width: `${response.confidenceScore}%`,
                              height: '100%',
                              backgroundColor: '#f9a600',
                            }}
                          />
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: 584, color: '#261b07' }}>
                          {response.confidenceScore}%
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {isInteractiveReport && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div
                      style={{
                        padding: '20px',
                        border: '1px solid #e3dfd5',
                        borderRadius: '8px',
                        backgroundColor: '#ffffff',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#f8da9d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#261b07" strokeWidth="2.5">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <h4 style={{ fontSize: '14px', fontWeight: 584, color: '#261b07', letterSpacing: '-0.14px', margin: 0 }}>
                          Key Strengths
                        </h4>
                      </div>
                      <ul style={{ paddingLeft: '16px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {response.strengths.map((s, idx) => (
                          <li key={idx} style={{ fontSize: '13px', color: '#61594a', lineHeight: 1.4 }}>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div
                      style={{
                        padding: '20px',
                        border: '1px solid #e3dfd5',
                        borderRadius: '8px',
                        backgroundColor: '#ffffff',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'rgba(240, 98, 79, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f0624f" strokeWidth="2.5">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </div>
                        <h4 style={{ fontSize: '14px', fontWeight: 584, color: '#261b07', letterSpacing: '-0.14px', margin: 0 }}>
                          Potential Risks
                        </h4>
                      </div>
                      <ul style={{ paddingLeft: '16px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {response.risks.map((r, idx) => (
                          <li key={idx} style={{ fontSize: '13px', color: '#61594a', lineHeight: 1.4 }}>
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {!isInteractiveReport && (
                  <div
                    className="prose-runway"
                    style={{
                      padding: '20px 24px',
                      backgroundColor: '#ffffff',
                      borderRadius: '8px',
                      border: '1px solid #e3dfd5',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8f897e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      <span style={{ fontSize: '12px', fontWeight: 492, color: '#8f897e', letterSpacing: '0.6px', textTransform: 'uppercase' }}>
                        Analysis Report
                      </span>
                    </div>
                    <ReactMarkdown>{response.detailedReasoning || response.reasoning}</ReactMarkdown>
                  </div>
                )}
              </div>
            )}

            {isInteractiveReport && activeTab === 'details' && (
              <div
                className="prose-runway animate-fade-in"
                style={{
                  padding: '24px',
                  backgroundColor: '#ffffff',
                  borderRadius: '8px',
                  border: '1px solid #e3dfd5',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8f897e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  <span style={{ fontSize: '12px', fontWeight: 492, color: '#8f897e', letterSpacing: '0.6px', textTransform: 'uppercase' }}>
                    Detailed Research Report
                  </span>
                </div>
                <ReactMarkdown>{response.detailedReasoning || response.reasoning}</ReactMarkdown>
              </div>
            )}
          </div>
        )}
      </div>

      <div
        style={{
          padding: '16px 24px',
          borderTop: '1px solid #e3dfd5',
          backgroundColor: '#ffffff',
        }}
      >
        <form
          id="research-form"
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
          }}
        >
          <input
            id="company-input"
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Enter company name (e.g. Apple, Tesla)"
            required
            style={{
              flex: 1,
              border: '1px solid #e3dfd5',
              borderRadius: '8px',
              padding: '10px 16px',
              fontSize: '14px',
              fontWeight: 400,
              color: '#261b07',
              backgroundColor: '#f8f7f5',
              outline: 'none',
              letterSpacing: '-0.14px',
              transition: 'all 0.2s ease',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#f9a600';
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.boxShadow = '0 0 0 3px rgba(249, 166, 0, 0.12)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e3dfd5';
              e.target.style.backgroundColor = '#f8f7f5';
              e.target.style.boxShadow = 'none';
            }}
          />
          <button
            id="research-button"
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: loading ? '#e3dfd5' : '#f9a600',
              color: '#261b07',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 20px',
              fontSize: '14px',
              fontWeight: 492,
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: loading
                ? 'none'
                : 'inset 0px 2px 4px 0px rgba(255,255,255,0.56), 0px 4px 8px 0px rgba(38,27,7,0.06), 0px 1px 2px 0px rgba(38,27,7,0.36)',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              letterSpacing: '-0.14px',
              whiteSpace: 'nowrap',
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = '#e89b01';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseOut={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = '#f9a600';
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
          >
            {loading ? (
              <LoadingSpinner size={16} />
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            )}
            {loading ? 'Analyzing...' : 'Research'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatbotPanel;
