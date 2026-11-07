import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api, { errMsg } from "../api";

const cards = [
  { key: "total", label: "Total todos", dot: "bg-stone-400" },
  { key: "pending", label: "Pending", dot: "bg-amber-500" },
  { key: "inProgress", label: "In progress", dot: "bg-sky-500" },
  { key: "completed", label: "Completed", dot: "bg-emerald-500" },
  { key: "overdue", label: "Overdue", dot: "bg-red-500" },
];

// Number 0 se target tak ginta hai
function useCountUp(target, duration = 900) {
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
      const eased = 1 - Math.pow(1 - p, 3); // ease-out
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return value;
}

function Count({ to, prefix = "" }) {
  const v = useCountUp(to);
  return (
    <>
      {prefix}
      {v.toLocaleString()}
    </>
  );
}

function ViewAll({ to }) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center gap-1 text-sm font-medium text-teal-700 hover:text-teal-900"
    >
      View all
      <svg
        viewBox="0 0 20 20"
        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M7 4l6 6-6 6" />
      </svg>
    </Link>
  );
}

export default function Dashboard() {
  const me = JSON.parse(localStorage.getItem("user") || "{}");
  const [stats, setStats] = useState(null);
  const [debts, setDebts] = useState([]);
  const [error, setError] = useState("");
  const [barReady, setBarReady] = useState(false);

  useEffect(() => {
    Promise.all([api.get("/todos/stats"), api.get("/debts")])
      .then(([s, d]) => {
        setStats(s.data);
        setDebts(d.data);
      })
      .catch((err) => setError(errMsg(err)));
  }, []);

  // Progress bar ko data aane ke baad thori der se chalao taake width animate ho
  useEffect(() => {
    if (!stats) return;
    const t = setTimeout(() => setBarReady(true), 150);
    return () => clearTimeout(t);
  }, [stats]);

  const pending = debts.filter((d) => d.status === "pending");
  const toReceive = pending
    .filter((d) => d.lender._id === me._id)
    .reduce((sum, d) => sum + d.amount, 0);
  const toPay = pending
    .filter((d) => d.borrower._id === me._id)
    .reduce((sum, d) => sum + d.amount, 0);
  const net = toReceive - toPay;

  const loading = !stats && !error;
  const isEmpty = stats && stats.total === 0;
  const percent =
    stats && stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="space-y-8">
      {/* Page-load animation: har card thori delay se upar aata hai */}
      <style>{`
        @keyframes dash-rise {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .dash-rise {
          animation: dash-rise 520ms cubic-bezier(0.22, 1, 0.36, 1) both;
          animation-delay: var(--d, 0ms);
        }
        @media (prefers-reduced-motion: reduce) {
          .dash-rise { animation: none; }
        }
      `}</style>

      <header>
        <h1 className="text-3xl font-bold tracking-tight text-stone-900">
          Hello, {me.name}
        </h1>
        <p className="mt-1 text-sm text-stone-500">{today}</p>
      </header>

      {error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-red-700">{error}</p>
      )}

      {/* TODOS */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-semibold text-stone-800">Your todos</h2>
          <ViewAll to="/todos" />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {cards.map((c, i) => (
            <div
              key={c.key}
              className="dash-rise rounded-lg border border-stone-200 bg-white p-4"
              style={{ "--d": `${i * 70}ms` }}
            >
              <div className="flex items-center gap-2 text-sm text-stone-600">
                <span className={`h-2 w-2 rounded-full ${c.dot}`} />
                {c.label}
              </div>
              {loading ? (
                <div className="mt-3 h-9 w-12 animate-pulse rounded bg-stone-200" />
              ) : (
                <p className="mt-2 text-3xl font-bold tabular-nums text-stone-900">
                  {stats ? <Count to={stats[c.key]} /> : "-"}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Progress bar ya empty state */}
        {stats && !isEmpty && (
          <div
            className="dash-rise mt-4 rounded-lg border border-stone-200 bg-white p-4"
            style={{ "--d": "420ms" }}
          >
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-stone-600">
                {stats.completed} of {stats.total} completed
              </span>
              <span className="font-semibold tabular-nums text-stone-900">
                {percent}%
              </span>
            </div>
            <div
              className="h-2 overflow-hidden rounded-full bg-stone-100"
              role="progressbar"
              aria-valuenow={percent}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full rounded-full bg-emerald-500 transition-[width] duration-1000 ease-out motion-reduce:transition-none"
                style={{ width: barReady ? `${percent}%` : "0%" }}
              />
            </div>
          </div>
        )}

        {isEmpty && (
          <div
            className="dash-rise mt-4 rounded-lg border border-dashed border-stone-300 bg-white px-4 py-6 text-center"
            style={{ "--d": "420ms" }}
          >
            <p className="font-medium text-stone-800">No todos yet</p>
            <p className="mt-1 text-sm text-stone-500">
              Add your first todo to start tracking your work.
            </p>
            <Link
              to="/todos"
              className="mt-3 inline-block rounded-md bg-teal-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-800 active:scale-95"
            >
              Add todo
            </Link>
          </div>
        )}
      </section>

      {/* DEBTS */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-semibold text-stone-800">Your debts (pending)</h2>
          <ViewAll to="/debts" />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div
            className="dash-rise rounded-lg border border-stone-200 bg-white p-4"
            style={{ "--d": "500ms" }}
          >
            {loading ? (
              <div className="h-9 w-28 animate-pulse rounded bg-stone-200" />
            ) : (
              <p className="text-3xl font-bold tabular-nums text-teal-700">
                <Count to={toReceive} prefix="Rs " />
              </p>
            )}
            <p className="mt-1 text-sm text-stone-600">To receive</p>
          </div>

          <div
            className="dash-rise rounded-lg border border-stone-200 bg-white p-4"
            style={{ "--d": "570ms" }}
          >
            {loading ? (
              <div className="h-9 w-28 animate-pulse rounded bg-stone-200" />
            ) : (
              <p className="text-3xl font-bold tabular-nums text-red-700">
                <Count to={toPay} prefix="Rs " />
              </p>
            )}
            <p className="mt-1 text-sm text-stone-600">To pay</p>
          </div>
        </div>

        {!loading && (toReceive > 0 || toPay > 0) && (
          <p
            className="dash-rise mt-3 text-sm text-stone-600"
            style={{ "--d": "640ms" }}
          >
            Net balance:{" "}
            <span
              className={`font-semibold tabular-nums ${
                net >= 0 ? "text-teal-700" : "text-red-700"
              }`}
            >
              {net >= 0 ? "+" : "-"}Rs {Math.abs(net).toLocaleString()}
            </span>
          </p>
        )}
      </section>
    </div>
  );
}