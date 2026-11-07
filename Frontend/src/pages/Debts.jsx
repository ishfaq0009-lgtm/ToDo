import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, X, Check } from "lucide-react";
import api, { errMsg } from "../api";

const input =
  "w-full rounded-md border border-stone-300 px-3 py-2 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100";

const emptyForm = { borrowerEmail: "", amount: "", note: "", dueDate: "" };

// Number 0 se target tak ginta hai
function useCountUp(target, duration = 700) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (typeof target !== "number") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || target === 0) {
      setValue(target);
      return;
    }
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return value;
}

function Money({ amount }) {
  const v = useCountUp(amount);
  return <>Rs {v.toLocaleString()}</>;
}

export default function Debts() {
  const me = JSON.parse(localStorage.getItem("user") || "{}");
  const [debts, setDebts] = useState([]);
  const [tab, setTab] = useState("given"); // given = I lent, taken = I borrowed
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [confirmId, setConfirmId] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try {
      const { data } = await api.get("/debts");
      setDebts(data);
      setError("");
    } catch (err) {
      setError(errMsg(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // Escape dabane par modal band
  useEffect(() => {
    if (!showForm) return;
    const onKey = (e) => e.key === "Escape" && setShowForm(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showForm]);

  const given = debts.filter((d) => d.lender._id === me._id);
  const taken = debts.filter((d) => d.borrower._id === me._id);
  const list = tab === "given" ? given : taken;
  const pendingTotal = list
    .filter((d) => d.status === "pending")
    .reduce((sum, d) => sum + d.amount, 0);

  const save = async (e) => {
    e.preventDefault();
    setFormError("");
    setSaving(true);
    const body = { ...form, amount: Number(form.amount) };
    if (!body.dueDate) delete body.dueDate;
    try {
      await api.post("/debts", body);
      setShowForm(false);
      setForm(emptyForm);
      setTab("given");
      load();
    } catch (err) {
      setFormError(errMsg(err));
    } finally {
      setSaving(false);
    }
  };

  const markPaid = async (id) => {
    try {
      await api.put(`/debts/${id}/paid`);
      setConfirmId(null);
      load();
    } catch (err) {
      setConfirmId(null);
      setError(errMsg(err));
    }
  };

  const isOverdue = (d) =>
    d.status === "pending" && d.dueDate && new Date(d.dueDate) < new Date();

  const tabs = [
    { id: "given", label: `I lent (${given.length})` },
    { id: "taken", label: `I borrowed (${taken.length})` },
  ];

  return (
    <div className="space-y-5">
      <style>{`
        @keyframes dash-rise {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes modal-pop {
          from { opacity: 0; transform: translateY(10px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes modal-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .dash-rise {
          animation: dash-rise 520ms cubic-bezier(0.22, 1, 0.36, 1) both;
          animation-delay: var(--d, 0ms);
        }
        .modal-pop  { animation: modal-pop 220ms cubic-bezier(0.22, 1, 0.36, 1) both; }
        .modal-fade { animation: modal-fade 200ms ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .dash-rise, .modal-pop, .modal-fade { animation: none; }
        }
      `}</style>

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-stone-900">Debts</h1>
        <button
          onClick={() => {
            setFormError("");
            setShowForm(true);
          }}
          className="flex items-center gap-1 rounded-md bg-teal-700 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-800 active:scale-95"
        >
          <Plus size={16} /> New debt
        </button>
      </div>

      {/* Tabs: sliding indicator */}
      <div className="relative grid max-w-sm grid-cols-2 rounded-lg border border-stone-200 bg-stone-100 p-1">
        <span
          aria-hidden="true"
          className={`absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-md bg-teal-700 shadow-sm transition-transform duration-300 ease-out motion-reduce:transition-none ${
            tab === "given" ? "translate-x-0" : "translate-x-full"
          }`}
        />
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`relative z-10 rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-300 ${
              tab === t.id ? "text-white" : "text-stone-600 hover:text-stone-900"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {!loading && pendingTotal > 0 && (
        <p className="text-sm text-stone-600">
          Pending:{" "}
          <span
            className={`font-semibold tabular-nums ${
              tab === "given" ? "text-teal-700" : "text-red-700"
            }`}
          >
            <Money amount={pendingTotal} />
          </span>
        </p>
      )}

      {error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-red-700">{error}</p>
      )}

      {loading ? (
        <div className="space-y-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-20 animate-pulse rounded-lg bg-stone-200" />
          ))}
        </div>
      ) : list.length === 0 ? (
        <div className="dash-rise rounded-lg border border-dashed border-stone-300 bg-white px-4 py-10 text-center">
          <p className="font-medium text-stone-800">
            {tab === "given" ? "You haven't lent anything yet" : "You haven't borrowed anything"}
          </p>
          <p className="mt-1 text-sm text-stone-500">
            {tab === "given"
              ? "Add a debt to keep track of who owes you."
              : "Debts others add for you will show up here."}
          </p>
          {tab === "given" && (
            <button
              onClick={() => {
                setFormError("");
                setShowForm(true);
              }}
              className="mt-4 rounded-md bg-teal-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-800 active:scale-95"
            >
              Add first debt
            </button>
          )}
        </div>
      ) : (
        // key={tab}: tab badalne par list dobara animate hoti hai
        <ul key={tab} className="space-y-2">
          {list.map((d, i) => {
            const other = tab === "given" ? d.borrower : d.lender;
            const overdue = isOverdue(d);
            return (
              <li
                key={d._id}
                className="dash-rise flex flex-wrap items-center justify-between gap-3 rounded-lg border border-stone-200 bg-white p-4"
                style={{ "--d": `${Math.min(i, 6) * 60}ms` }}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 h-10 w-1 shrink-0 rounded-full ${
                      tab === "given" ? "bg-teal-600" : "bg-red-500"
                    }`}
                  />
                  <div>
                    <p className="text-lg font-bold tabular-nums text-stone-900">
                      Rs {d.amount.toLocaleString()}
                    </p>
                    <p className="text-sm text-stone-600">
                      {tab === "given" ? "Borrower: " : "Lender: "}
                      <Link
                        to={`/debts/profile/${other._id}`}
                        className="font-medium text-teal-700 hover:text-teal-900 hover:underline"
                      >
                        {other.name}
                      </Link>{" "}
                      <span className="text-stone-400">({other.email})</span>
                    </p>
                    {d.note && <p className="text-sm text-stone-600">{d.note}</p>}
                    {d.dueDate && (
                      <p
                        className={`text-xs ${
                          overdue ? "font-medium text-red-700" : "text-stone-500"
                        }`}
                      >
                        {overdue ? "Overdue since " : "Due "}
                        {new Date(d.dueDate).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                      d.status === "paid"
                        ? "bg-emerald-100 text-emerald-800"
                        : overdue
                        ? "bg-red-100 text-red-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {overdue ? "overdue" : d.status}
                  </span>

                  {/* paid button sirf lender ko, aur sirf pending par */}
                  {d.lender._id === me._id &&
                    d.status === "pending" &&
                    (confirmId === d._id ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => markPaid(d._id)}
                          className="rounded-md bg-teal-700 px-2.5 py-1 text-sm font-medium text-white transition-colors hover:bg-teal-800 active:scale-95"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setConfirmId(null)}
                          className="rounded-md px-2 py-1 text-sm font-medium text-stone-600 hover:bg-stone-100"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmId(d._id)}
                        className="flex items-center gap-1 rounded-md border border-teal-700 px-2.5 py-1 text-sm font-medium text-teal-700 transition-colors hover:bg-teal-50 active:scale-95"
                      >
                        <Check size={14} /> Mark paid
                      </button>
                    ))}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* new debt modal */}
      {showForm && (
        <div
          className="modal-fade fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4"
          onClick={() => setShowForm(false)}
        >
          <form
            onSubmit={save}
            onClick={(e) => e.stopPropagation()}
            className="modal-pop w-full max-w-md space-y-3 rounded-xl bg-white p-5 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-stone-900">New debt</h2>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                aria-label="Close"
                className="rounded-md p-1 text-stone-500 hover:bg-stone-100"
              >
                <X size={20} />
              </button>
            </div>

            {formError && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                {formError}
              </p>
            )}

            <input
              className={input}
              type="email"
              placeholder="Borrower's email"
              value={form.borrowerEmail}
              onChange={(e) => setForm({ ...form, borrowerEmail: e.target.value })}
              required
              autoFocus
            />
            <input
              className={input}
              type="number"
              min="1"
              placeholder="Amount"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              required
            />
            <input
              className={input}
              placeholder="Note (optional)"
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
            />
            <div>
              <label className="mb-1 block text-sm text-stone-500">
                Due date (optional)
              </label>
              <input
                className={input}
                type="date"
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              />
            </div>

            <button
              disabled={saving}
              className="w-full rounded-md bg-teal-700 py-2 font-medium text-white transition-colors hover:bg-teal-800 active:scale-[0.98] disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save debt"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}