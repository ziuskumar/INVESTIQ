import React, { createContext, useState, useEffect } from 'react';

/**
 * Demo seed data — pre-populated research entries so the dashboard
 * looks populated on first visit. Cleared when the user clicks "Clear".
 */
const DEMO_ENTRIES = [
  { company: 'Apple', decision: 'Invest', reasoning: 'Strong ecosystem, consistent revenue growth, and dominant market position in consumer electronics.', timestamp: '2026-06-28T10:15:00Z' },
  { company: 'Tesla', decision: 'Pass', reasoning: 'High valuation relative to peers, increasing competition in EV market, and regulatory risks.', timestamp: '2026-06-27T14:30:00Z' },
  { company: 'Microsoft', decision: 'Invest', reasoning: 'Cloud dominance with Azure, strong enterprise moat, and AI integration across product suite.', timestamp: '2026-06-26T09:45:00Z' },
  { company: 'Google', decision: 'Invest', reasoning: 'Advertising revenue resilience, YouTube growth, and leadership in AI/ML research.', timestamp: '2026-06-25T16:20:00Z' },
  { company: 'Amazon', decision: 'Invest', reasoning: 'AWS market leadership, expanding logistics network, and strong Prime membership base.', timestamp: '2026-06-24T11:00:00Z' },
  { company: 'Netflix', decision: 'Pass', reasoning: 'Subscriber growth slowing, increasing content costs, and rising competition from Disney+ and others.', timestamp: '2026-06-23T13:10:00Z' },
  { company: 'NVIDIA', decision: 'Invest', reasoning: 'AI chip dominance, data center revenue surge, and strong positioning for the AI infrastructure buildout.', timestamp: '2026-06-22T08:30:00Z' },
  { company: 'Meta', decision: 'Invest', reasoning: 'Advertising recovery, Reels monetization progress, and cost discipline improvements.', timestamp: '2026-06-21T15:45:00Z' },
  { company: 'Uber', decision: 'Pass', reasoning: 'Path to sustained profitability remains unclear despite revenue growth; regulatory headwinds persist.', timestamp: '2026-06-20T10:30:00Z' },
  { company: 'Salesforce', decision: 'Invest', reasoning: 'Enterprise CRM leader with strong recurring revenue, AI copilot integration, and margin expansion.', timestamp: '2026-06-19T09:00:00Z' },
  { company: 'Snap', decision: 'Pass', reasoning: 'User growth stagnation in key markets, ad revenue pressure, and lack of diversification.', timestamp: '2026-06-18T14:15:00Z' },
  { company: 'Adobe', decision: 'Invest', reasoning: 'Creative cloud dominance, Firefly AI integration driving upsell, and consistent cash flow generation.', timestamp: '2026-06-17T11:30:00Z' },
];

export const HistoryContext = createContext({
  entries: [],
  addEntry: () => {},
  clearHistory: () => {},
});

export const HistoryProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);

  // Load from localStorage on mount; seed with demo data if empty
  useEffect(() => {
    try {
      const stored = localStorage.getItem('researchHistory');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.length > 0) {
          setEntries(parsed);
          return;
        }
      }
      // No stored data — seed with demo entries
      setEntries(DEMO_ENTRIES);
      localStorage.setItem('researchHistory', JSON.stringify(DEMO_ENTRIES));
    } catch (err) {
      console.error('Failed to load history:', err);
      setEntries(DEMO_ENTRIES);
    }
  }, []);

  // Persist whenever entries change
  useEffect(() => {
    try {
      localStorage.setItem('researchHistory', JSON.stringify(entries));
    } catch (err) {
      console.error('Failed to save history:', err);
    }
  }, [entries]);

  const addEntry = (entry) => {
    setEntries((prev) => [entry, ...prev]);
  };

  const clearHistory = () => {
    setEntries([]);
    localStorage.removeItem('researchHistory');
  };

  return (
    <HistoryContext.Provider value={{ entries, addEntry, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};
