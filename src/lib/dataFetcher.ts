import axios from 'axios';

/**
 * Simple wrapper around a financial data provider.
 * Uses Finnhub by default; if no API key is provided, returns mock data.
 */
export async function getCompanyProfile(company: string) {
  const apiKey = process.env.FINNHUB_API_KEY;
  if (!apiKey) {
    // Return a minimal mock profile.
    return {
      name: company,
      ticker: company.slice(0, 4).toUpperCase(),
      description: `Mock description for ${company}`,
      marketCap: 0,
      sector: 'Technology',
    };
  }
  try {
    const resp = await axios.get('https://finnhub.io/api/v1/stock/profile2', {
      params: { symbol: company, token: apiKey },
    });
    return resp.data;
  } catch (err) {
    console.error('Financial data fetch error:', err);
    throw err;
  }
}

export async function getRecentNews(company: string) {
  const apiKey = process.env.FINNHUB_API_KEY;
  if (!apiKey) {
    return [{ headline: `Mock news headline for ${company}`, source: 'MockSource', url: '' }];
  }
  try {
    const resp = await axios.get('https://finnhub.io/api/v1/company-news', {
      params: { symbol: company, from: '2024-01-01', to: '2024-12-31', token: apiKey },
    });
    return resp.data;
  } catch (err) {
    console.error('News fetch error:', err);
    throw err;
  }
}
