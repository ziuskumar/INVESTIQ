import type { NextApiRequest, NextApiResponse } from 'next';
import { runDecisionChain } from '../../lib/decisionChain';

/**
 * POST /api/research
 * Body: { company: string }
 * Returns: { decision: string, reasoning: string }
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { company } = req.body as { company?: string };
  if (!company || typeof company !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid "company" parameter' });
  }

  try {
    const result = await runDecisionChain(company);
    return res.status(200).json(result);
  } catch (err) {
    console.error('Error in research endpoint:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
