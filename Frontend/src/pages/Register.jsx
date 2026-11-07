import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { ArrowRight, User, Shield, Check, Lock } from "lucide-react";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", address: "", role: "user" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [adminExists, setAdminExists] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/user/admin-exists");
        setAdminExists(res.data.exists);
      } catch {
        setAdminExists(false);
      } finally {
        setCheckingAdmin(false);
      }
    })();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(form);
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 outline-none focus:ring-2 focus:ring-zinc-900/20 dark:focus:ring-white/20 focus:border-zinc-900 dark:focus:border-white transition-all";

  return (
    <div className="min-h-[calc(100vh-4rem)] grid lg:grid-cols-2">
      <div className="flex items-center justify-center px-4 py-12 bg-white dark:bg-black order-1 lg:order-2">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center font-bold">F</div>
              <span className="text-lg font-bold text-zinc-900 dark:text-white">Focusly</span>
            </Link>
          </div>

          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Create your account</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1 mb-8">Start your focus journey. Free forever.</p>

          {error && (
            <div className="mb-5 p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white text-sm border border-zinc-300 dark:border-zinc-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Full name</label>
              <input name="name" value={form.name} onChange={handleChange} required className={inputClass} placeholder="Ali Khan" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required className={inputClass} placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} required className={inputClass} placeholder="+92 300 1234567" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Password</label>
              <input name="password" type="password" value={form.password} onChange={handleChange} required minLength={6} className={inputClass} placeholder="At least 6 characters" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Address</label>
              <input name="address" value={form.address} onChange={handleChange} required className={inputClass} placeholder="Karachi, Pakistan" />
            </div>

            {/* Role Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Account type</label>
                {adminExists && !checkingAdmin && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-zinc-600 dark:text-zinc-400 font-medium">
                    <Lock size={10} />
                    Admin already taken
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, role: "user" })}
                  className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                    form.role === "user"
                      ? "border-zinc-900 dark:border-white bg-zinc-100 dark:bg-zinc-800"
                      : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600"
                  }`}
                >
                  {form.role === "user" && (
                    <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center">
                      <Check size={12} />
                    </span>
                  )}
                  <div className={`flex items-center gap-2 mb-1 ${
                    form.role === "user" ? "text-zinc-900 dark:text-white" : "text-zinc-600 dark:text-zinc-400"
                  }`}>
                    <User size={16} />
                    <span className="font-semibold text-sm">User</span>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-500">Personal account</p>
                </button>

                <button
                  type="button"
                  disabled={adminExists || checkingAdmin}
                  onClick={() => !adminExists && setForm({ ...form, role: "admin" })}
                  className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                    adminExists || checkingAdmin
                      ? "border-zinc-200 dark:border-zinc-800 opacity-50 cursor-not-allowed bg-zinc-50 dark:bg-zinc-900/50"
                      : form.role === "admin"
                      ? "border-zinc-900 dark:border-white bg-zinc-100 dark:bg-zinc-800"
                      : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600"
                  }`}
                >
                  {form.role === "admin" && !adminExists && (
                    <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center">
                      <Check size={12} />
                    </span>
                  )}
                  {(adminExists || checkingAdmin) && (
                    <span className="absolute top-2 right-2">
                      <Lock size={12} className="text-zinc-400" />
                    </span>
                  )}
                  <div className={`flex items-center gap-2 mb-1 ${
                    form.role === "admin" && !adminExists ? "text-zinc-900 dark:text-white" : "text-zinc-600 dark:text-zinc-400"
                  }`}>
                    <Shield size={16} />
                    <span className="font-semibold text-sm">Admin</span>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-500">
                    {adminExists ? "Not available" : checkingAdmin ? "Checking..." : "One only"}
                  </p>
                </button>
              </div>
              <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">
                {adminExists
                  ? "An admin already exists in the system. You can only register as a user."
                  : "Only one admin account can exist. First to register as admin gets it."}
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors disabled:opacity-60"
            >
              {loading ? "Creating account..." : `Create ${form.role === "admin" ? "Admin" : "User"} account`}
              {!loading && <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
            Already have an account?{" "}
            <Link to="/login" className="text-zinc-900 dark:text-white font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>

      {/* Brand panel — black gradient overlay */}
      <div className="hidden lg:flex relative overflow-hidden order-2 lg:order-1">
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=85&auto=format&fit=crop"
          alt="Focused professional"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-zinc-900/85 to-black/85" />
        <div className="relative p-12 flex flex-col justify-between w-full">
          <div>
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-white font-bold">F</div>
              <span className="text-lg font-bold text-white">Focusly</span>
            </Link>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white leading-tight max-w-md">
              Join 10,000+ deep workers reclaiming their attention.
            </h2>
            <ul className="mt-6 space-y-3">
              {["Free forever plan", "No credit card required", "Cancel anytime"].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-white/90 text-sm">
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <Check size={12} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-xs text-white/60">© {new Date().getFullYear()} Focusly. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Register;