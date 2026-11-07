import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ArrowRight, Quote, User, Shield, Check } from "lucide-react";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", role: "user" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password, form.role);
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 outline-none focus:ring-2 focus:ring-zinc-900/20 dark:focus:ring-white/20 focus:border-zinc-900 dark:focus:border-white transition-all";

  return (
    <div className="min-h-[calc(100vh-4rem)] grid lg:grid-cols-2">
      {/* Brand panel — black gradient */}
      <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-black p-12 flex-col justify-between">
        <div className="absolute inset-0 bg-dots opacity-20" />
        <div className="relative">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-white font-bold">F</div>
            <span className="text-lg font-bold text-white">Focusly</span>
          </Link>
        </div>
        <div className="relative">
          <Quote size={36} className="text-white/40 mb-6" />
          <p className="text-2xl font-medium text-white leading-relaxed max-w-md">
            "Focusly completely changed how I work. I get 2x more done in half the time."
          </p>
          <div className="mt-8 flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80&auto=format&fit=crop&crop=face"
              alt="Sarah Chen"
              className="w-11 h-11 rounded-full object-cover ring-2 ring-white/20"
            />
            <div>
              <p className="text-sm font-semibold text-white">Sarah Chen</p>
              <p className="text-xs text-white/70">Product Designer @ Stripe</p>
            </div>
          </div>
        </div>
        <p className="relative text-xs text-white/60">© {new Date().getFullYear()} Focusly. All rights reserved.</p>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center px-4 py-12 bg-white dark:bg-black">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center font-bold">F</div>
              <span className="text-lg font-bold text-zinc-900 dark:text-white">Focusly</span>
            </Link>
          </div>

          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Welcome back</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1 mb-8">Enter your details to continue.</p>

          {error && (
            <div className="mb-5 p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white text-sm border border-zinc-300 dark:border-zinc-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Role Selector */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Sign in as</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "user", label: "User", icon: <User size={16} />, desc: "Personal account" },
                  { value: "admin", label: "Admin", icon: <Shield size={16} />, desc: "Admin access" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setForm({ ...form, role: opt.value })}
                    className={`relative p-3.5 rounded-xl border-2 text-left transition-all ${
                      form.role === opt.value
                        ? "border-zinc-900 dark:border-white bg-zinc-100 dark:bg-zinc-800"
                        : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600"
                    }`}
                  >
                    {form.role === opt.value && (
                      <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center">
                        <Check size={10} />
                      </span>
                    )}
                    <div className={`flex items-center gap-2 mb-0.5 ${
                      form.role === opt.value
                        ? "text-zinc-900 dark:text-white"
                        : "text-zinc-600 dark:text-zinc-400"
                    }`}>
                      {opt.icon}
                      <span className="font-semibold text-sm">{opt.label}</span>
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-500">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required className={inputClass} placeholder="you@example.com" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Password</label>
                <a href="#" className="text-xs text-zinc-900 dark:text-white underline">Forgot?</a>
              </div>
              <input name="password" type="password" value={form.password} onChange={handleChange} required className={inputClass} placeholder="••••••••" />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors disabled:opacity-60"
            >
              {loading ? "Signing in..." : `Sign in as ${form.role === "admin" ? "Admin" : "User"}`}
              {!loading && <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
            Don't have an account?{" "}
            <Link to="/register" className="text-zinc-900 dark:text-white font-semibold hover:underline">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;