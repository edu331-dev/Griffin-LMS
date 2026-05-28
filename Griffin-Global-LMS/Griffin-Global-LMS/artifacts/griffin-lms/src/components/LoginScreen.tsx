import { useState } from "react";

interface Props {
  onLogin: (firstName: string, surname: string, email: string) => void;
}

const ALLOWED_DOMAINS = ["@thejitu.com", "@griffinglobaltech.com"];

export default function LoginScreen({ onLogin }: Props) {
  const [form, setForm] = useState({ firstName: "", surname: "", email: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handle(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const { firstName, surname, email } = form;
    if (!firstName.trim() || !surname.trim() || !email.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    if (!ALLOWED_DOMAINS.some(d => email.toLowerCase().endsWith(d))) {
      setError("Access is restricted to @thejitu.com and @griffinglobaltech.com email addresses.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      onLogin(firstName.trim(), surname.trim(), email.trim().toLowerCase());
      setLoading(false);
    }, 800);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-griffin-900 via-griffin-800 to-griffin-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur mb-4">
            <i className="fas fa-graduation-cap text-white text-4xl"></i>
          </div>
          <h1 className="text-3xl font-bold text-white font-display">Griffin LMS</h1>
          <p className="text-griffin-300 text-sm font-semibold tracking-wide mt-0.5 uppercase">Professional Services</p>
          <p className="text-griffin-200 mt-1">Rising Stars Programme</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Welcome</h2>
          <p className="text-sm text-gray-500 mb-6">Enter your details to begin your onboarding journey.</p>

          <form onSubmit={handle} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                  placeholder="Jane"
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-griffin-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Surname</label>
                <input
                  type="text"
                  value={form.surname}
                  onChange={e => setForm(f => ({ ...f, surname: e.target.value }))}
                  placeholder="Kamau"
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-griffin-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Work Email</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="jane.kamau@thejitu.com"
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-griffin-500 transition"
              />
              <p className="text-xs text-gray-400 mt-1">Must be @thejitu.com or @griffinglobaltech.com</p>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3 flex items-start gap-2">
                <i className="fas fa-exclamation-circle text-red-500 mt-0.5 text-sm"></i>
                <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-griffin-600 hover:bg-griffin-700 disabled:opacity-60 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <i className="fas fa-circle-notch fa-spin"></i>
                  Signing in...
                </>
              ) : (
                <>
                  Begin Programme
                  <i className="fas fa-arrow-right"></i>
                </>
              )}
            </button>
          </form>

          <p className="text-xs text-center text-gray-400 mt-6">
            Griffin Global Technologies Professional Services<br />
            Rising Stars Onboarding Programme
          </p>
        </div>
      </div>
    </div>
  );
}
