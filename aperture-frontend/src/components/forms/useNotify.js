'use client';

import { useState } from 'react';

/**
 * useNotify — submits a lead form to /api/notify and tracks status.
 *
 * @param type 'strategy-call' | 'moments'
 * @returns { submit(fields, extra?), status, error, reset }
 *          status: 'idle' | 'sending' | 'success' | 'error'
 */
export function useNotify(type) {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  async function submit(fields, extra = {}) {
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, fields, ...extra }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }
      setStatus('success');
      return true;
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      setStatus('error');
      return false;
    }
  }

  function reset() {
    setStatus('idle');
    setError('');
  }

  return { submit, status, error, reset };
}
