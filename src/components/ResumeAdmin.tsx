import React, { useState } from 'react';
import { X, Lock, Upload } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
}

const FUNCTIONS_URL = `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co/functions/v1`;

const ResumeAdmin = ({ open, onClose }: Props) => {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null);
  const [busy, setBusy] = useState(false);

  if (!open) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim().length === 0) return;
    setAuthed(true);
    setStatus(null);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setStatus({ type: 'err', msg: 'Select a PDF file first.' });
      return;
    }
    setBusy(true);
    setStatus(null);
    try {
      const form = new FormData();
      form.append('password', password);
      form.append('file', file);
      const res = await fetch(`${FUNCTIONS_URL}/resume-upload`, { method: 'POST', body: form });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Upload failed');
      setStatus({ type: 'ok', msg: 'Resume updated successfully.' });
      setFile(null);
    } catch (err) {
      setStatus({ type: 'err', msg: (err as Error).message });
    } finally {
      setBusy(false);
    }
  };

  const close = () => {
    setPassword('');
    setAuthed(false);
    setFile(null);
    setStatus(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur px-4">
      <div className="relative w-full max-w-md bg-gray-900/90 border border-cyan-400/40 rounded-xl p-6 shadow-lg shadow-cyan-500/20">
        <button
          onClick={close}
          className="absolute top-3 right-3 text-gray-400 hover:text-cyan-400 transition-colors"
          aria-label="Close admin panel"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="font-mono text-xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          &gt; admin_console
        </h3>

        {!authed ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <label className="block font-mono text-sm text-gray-400">Access key</label>
            <div className="flex items-center gap-2 bg-black/50 border border-gray-700 rounded-lg px-3">
              <Lock className="w-4 h-4 text-cyan-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 bg-transparent py-3 font-mono text-cyan-300 outline-none"
                placeholder="••••••••"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg font-mono font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
            >
              Authenticate
            </button>
          </form>
        ) : (
          <form onSubmit={handleUpload} className="space-y-4">
            <label className="block font-mono text-sm text-gray-400">Upload new resume (PDF)</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="w-full font-mono text-sm text-gray-300 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:font-mono file:bg-cyan-500/20 file:text-cyan-300"
            />
            <button
              type="submit"
              disabled={busy}
              className="w-full py-3 rounded-lg font-mono font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <Upload className="w-4 h-4" />
              {busy ? 'Uploading...' : 'Upload resume'}
            </button>
          </form>
        )}

        {status && (
          <p className={`mt-4 font-mono text-sm ${status.type === 'ok' ? 'text-green-400' : 'text-red-400'}`}>
            {status.msg}
          </p>
        )}
      </div>
    </div>
  );
};

export default ResumeAdmin;
