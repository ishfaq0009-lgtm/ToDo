import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import api, { errMsg } from "../api";

const input =
  "w-full rounded-md border border-stone-300 px-3 py-2 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (localStorage.getItem("token")) return <Navigate to="/dashboard" replace />;

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", form);
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({ _id: data._id, name: data.name, email: data.email })
      );
      navigate("/dashboard");
    } catch (err) {
      setError(errMsg(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <form
        onSubmit={submit}
        className="w-full max-w-sm space-y-4 rounded-xl border border-stone-200 bg-white p-6"
      >
        <h1 className="text-2xl font-bold">Log in to Focusly</h1>

        {error && (
          <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
        )}

        <input
          className={input}
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={change}
          required
        />
        <input
          className={input}
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={change}
          required
        />

        <button
          disabled={loading}
          className="w-full rounded-md bg-teal-700 py-2 font-medium text-white hover:bg-teal-800 disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Log in"}
        </button>

        <p className="text-center text-sm text-stone-600">
          Account nahi hai?{" "}
          <Link to="/register" className="font-medium text-teal-700 underline">
            Register karo
          </Link>
        </p>
      </form>
    </div>
  );
}