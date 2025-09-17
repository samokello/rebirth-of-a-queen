import React, { useEffect, useMemo, useState } from 'react';

const AdminSubscribers = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [subject, setSubject] = useState('Rebirth of a Queen Newsletter');
  const [html, setHtml] = useState('<h2>Hello from Rebirth of a Queen</h2><p>Our latest updates...</p>');
  const [sending, setSending] = useState(false);
  const adminToken = useMemo(() => localStorage.getItem('adminToken'), []);

  const authHeaders = useMemo(() => ({
    'Content-Type': 'application/json',
    ...(adminToken ? { Authorization: `Bearer ${adminToken}` } : {})
  }), [adminToken]);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/newsletter', { headers: authHeaders });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Failed to load');
      setSubscribers(Array.isArray(data.data) ? data.data : []);
    } catch (e) {
      setError(e.message || 'Failed to load subscribers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const exportCsv = () => {
    const rows = [['Email', 'Status', 'Created At']].concat(
      subscribers.map(s => [s.email, s.status, new Date(s.createdAt).toISOString()])
    );
    const csv = rows.map(r => r.map(x => `"${String(x).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'subscribers.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const sendCampaign = async () => {
    if (!subject || !html) return;
    setSending(true);
    try {
      const res = await fetch('/api/newsletter/send', {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({ subject, html })
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Failed to send');
      alert(data.message || 'Sent');
    } catch (e) {
      alert(e.message || 'Failed to send');
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ marginBottom: 12 }}>Newsletter Subscribers</h2>
      <div style={{ marginBottom: 12, display: 'flex', gap: 8 }}>
        <button onClick={load} disabled={loading} style={{ padding: '8px 12px' }}>{loading ? 'Loading...' : 'Refresh'}</button>
        <button onClick={exportCsv} style={{ padding: '8px 12px' }}>Export CSV</button>
      </div>
      {error && (
        <div style={{ color: '#b91c1c', background: '#fee2e2', border: '1px solid #fecaca', padding: 8, borderRadius: 6, marginBottom: 12 }}>{error}</div>
      )}
      <div style={{ overflow: 'auto', border: '1px solid #eee', borderRadius: 8, marginBottom: 20 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              <th style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid #eee' }}>Email</th>
              <th style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid #eee' }}>Status</th>
              <th style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid #eee' }}>Created</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((s) => (
              <tr key={s._id}>
                <td style={{ padding: 10, borderBottom: '1px solid #f1f5f9' }}>{s.email}</td>
                <td style={{ padding: 10, borderBottom: '1px solid #f1f5f9' }}>{s.status}</td>
                <td style={{ padding: 10, borderBottom: '1px solid #f1f5f9' }}>{new Date(s.createdAt).toLocaleString()}</td>
              </tr>
            ))}
            {!loading && subscribers.length === 0 && (
              <tr><td colSpan={3} style={{ padding: 10, color: '#64748b' }}>No subscribers yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: 12 }}>
        <h3 style={{ margin: 0, marginBottom: 8 }}>Send Campaign</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Subject" style={{ padding: 8, border: '1px solid #cbd5e1', borderRadius: 6 }} />
          <textarea value={html} onChange={e => setHtml(e.target.value)} placeholder="HTML content" rows={8} style={{ padding: 8, border: '1px solid #cbd5e1', borderRadius: 6, fontFamily: 'monospace' }} />
          <button onClick={sendCampaign} disabled={sending} style={{ padding: '8px 12px', alignSelf: 'flex-start' }}>{sending ? 'Sending...' : 'Send Email to Subscribers'}</button>
        </div>
      </div>
    </div>
  );
};

export default AdminSubscribers;


