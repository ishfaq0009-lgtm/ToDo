import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import api, { errMsg } from "../api";

const input =
  "w-full rounded-md border border-stone-300 px-3 py-2 outline-none transition-colors focus:border-teal-600 focus:ring-2 focus:ring-teal-100";
const button =
  "rounded-md bg-teal-700 px-4 py-2 font-medium text-white transition-colors hover:bg-teal-800 active:scale-[0.98] disabled:opacity-60";

// Message component bahar rakha taake har render par dobara mount na ho
function Msg({ m }) {
  if (!m.text) return null;
  return (
    <p
      role="status"
      className={`msg-pop rounded-md px-3 py-2 text-sm ${
        m.type === "ok" ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-700"
      }`}
    >
      {m.text}
    </p>
  );
}

// Password ki taqat: 0 se 4 tak
function strengthOf(p) {
  if (!p) return 0;
  let s = 0;
  if (p.length >= 6) s++;
  if (p.length >= 10) s++;
  if (/[a-z]/.test(p) && /[A-Z]/.test(p) && /\d/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  return Math.max(s, 1);
}

const strengthUi = [
  null,
  { label: "Weak", bar: "bg-red-500", text: "text-red-700" },
  { label: "Okay", bar: "bg-amber-500", text: "text-amber-700" },
  { label: "Good", bar: "bg-teal-500", text: "text-teal-700" },
  { label: "Strong", bar: "bg-emerald-500", text: "text-emerald-700" },
];

function PasswordInput({ show, onToggle, ...props }) {
  return (
    <div className="relative">
      <input className={`${input} pr-10`} type={show ? "text" : "password"} {...props} />
      <button
        type="button"
        onClick={onToggle}
        aria-label={show ? "Hide password" : "Show password"}
        className="absolute inset-y-0 right-0 flex items-center px-3 text-stone-400 hover:text-stone-700"
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}

export default function Profile() {
  const [profile, setProfile] = useState({ name: "", email: "", phone: "", address: "" });
  const [headerName, setHeaderName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileMsg, setProfileMsg] = useState({ type: "", text: "" });

  const [pw, setPw] = useState({ oldPassword: "", newPassword: "" });
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [changing, setChanging] = useState(false);
  const [pwMsg, setPwMsg] = useState({ type: "", text: "" });

  useEffect(() => {
    api
      .get("/users/me")
      .then(({ data }) => {
        setProfile({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
        });
        setHeaderName(data.name || "");
      })
      .catch((err) => setProfileMsg({ type: "error", text: errMsg(err) }))
      .finally(() => setLoading(false));
  }, []);

  // Success message 4 second baad apne aap hat jata hai
  useEffect(() => {
    if (profileMsg.type !== "ok") return;
    const t = setTimeout(() => setProfileMsg({ type: "", text: "" }), 4000);
    return () => clearTimeout(t);
  }, [profileMsg]);

  useEffect(() => {
    if (pwMsg.type !== "ok") return;
    const t = setTimeout(() => setPwMsg({ type: "", text: "" }), 4000);
    return () => clearTimeout(t);
  }, [pwMsg]);

  const saveProfile = async (e) => {
    e.preventDefault();
    setProfileMsg({ type: "", text: "" });
    setSaving(true);
    try {
      const { name, phone, address } = profile;
      const { data } = await api.put("/users/me", { name, phone, address });

      // sidebar/dashboard ke liye naam update
      const saved = JSON.parse(localStorage.getItem("user") || "{}");
      localStorage.setItem("user", JSON.stringify({ ...saved, name: data.name }));

      setHeaderName(data.name);
      setProfileMsg({ type: "ok", text: "Profile saved" });
    } catch (err) {
      setProfileMsg({ type: "error", text: errMsg(err) });
    } finally {
      setSaving(false);
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    setPwMsg({ type: "", text: "" });
    if (pw.newPassword.length < 6)
      return setPwMsg({ type: "error", text: "New password must be at least 6 characters" });

    setChanging(true);
    try {
      const { data } = await api.put("/users/change-password", pw);
      setPw({ oldPassword: "", newPassword: "" });
      setPwMsg({ type: "ok", text: data.message });
    } catch (err) {
      setPwMsg({ type: "error", text: errMsg(err) });
    } finally {
      setChanging(false);
    }
  };

  const initials = (headerName || "?")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const strength = strengthOf(pw.newPassword);
  const ui = strengthUi[strength];

  return (
    <div className="space-y-6">
      <style>{`
        @keyframes dash-rise {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes msg-pop {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .dash-rise {
          animation: dash-rise 520ms cubic-bezier(0.22, 1, 0.36, 1) both;
          animation-delay: var(--d, 0ms);
        }
        .msg-pop { animation: msg-pop 250ms ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .dash-rise, .msg-pop { animation: none; }
        }
      `}</style>

      {/* Header */}
      <header className="dash-rise flex items-center gap-4">
        {loading ? (
          <>
            <div className="h-16 w-16 animate-pulse rounded-full bg-stone-200" />
            <div className="space-y-2">
              <div className="h-6 w-40 animate-pulse rounded bg-stone-200" />
              <div className="h-4 w-52 animate-pulse rounded bg-stone-200" />
            </div>
          </>
        ) : (
          <>
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-teal-700 text-xl font-semibold text-white">
              {initials}
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-3xl font-bold tracking-tight text-stone-900">
                {headerName}
              </h1>
              <p className="truncate text-sm text-stone-500">{profile.email}</p>
            </div>
          </>
        )}
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile form */}
        <form
          onSubmit={saveProfile}
          className="dash-rise space-y-3 rounded-xl border border-stone-200 bg-white p-5"
          style={{ "--d": "80ms" }}
        >
          <h2 className="text-lg font-bold text-stone-900">Profile details</h2>
          <Msg m={profileMsg} />

          {loading ? (
            <div className="space-y-3">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-16 animate-pulse rounded-md bg-stone-100" />
              ))}
            </div>
          ) : (
            <>
              <label className="block text-sm text-stone-600">
                Name
                <input
                  className={input}
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  required
                />
              </label>
              <label className="block text-sm text-stone-600">
                Email (can't be changed)
                <input
                  className={`${input} cursor-not-allowed bg-stone-100 text-stone-500`}
                  value={profile.email}
                  readOnly
                />
              </label>
              <label className="block text-sm text-stone-600">
                Phone
                <input
                  className={input}
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                />
              </label>
              <label className="block text-sm text-stone-600">
                Address
                <input
                  className={input}
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                />
              </label>

              <button disabled={saving} className={button}>
                {saving ? "Saving..." : "Save profile"}
              </button>
            </>
          )}
        </form>

        {/* Password form */}
        <form
          onSubmit={changePassword}
          className="dash-rise space-y-3 self-start rounded-xl border border-stone-200 bg-white p-5"
          style={{ "--d": "160ms" }}
        >
          <h2 className="text-lg font-bold text-stone-900">Change password</h2>
          <Msg m={pwMsg} />

          <PasswordInput
            placeholder="Current password"
            value={pw.oldPassword}
            onChange={(e) => setPw({ ...pw, oldPassword: e.target.value })}
            show={showOld}
            onToggle={() => setShowOld((s) => !s)}
            required
          />

          <div>
            <PasswordInput
              placeholder="New password (min 6)"
              value={pw.newPassword}
              onChange={(e) => setPw({ ...pw, newPassword: e.target.value })}
              show={showNew}
              onToggle={() => setShowNew((s) => !s)}
              required
            />

            {/* Strength bar: width smoothly badalti hai */}
            {pw.newPassword && ui && (
              <div className="mt-2">
                <div className="h-1.5 overflow-hidden rounded-full bg-stone-100">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ease-out motion-reduce:transition-none ${ui.bar}`}
                    style={{ width: `${(strength / 4) * 100}%` }}
                  />
                </div>
                <p className={`mt-1 text-xs font-medium ${ui.text}`}>{ui.label}</p>
              </div>
            )}
          </div>

          <button disabled={changing} className={button}>
            {changing ? "Updating..." : "Change password"}
          </button>
        </form>
      </div>
    </div>
  );
}