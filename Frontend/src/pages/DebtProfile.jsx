import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api, { errMsg } from "../api";

// Number 0 se target tak ginta hai
function useCountUp(target, duration = 800) {
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

export default function DebtProfile() {
  const { userId } = useParams();
  const me = JSON.parse(localStorage.getItem("user") || "{}");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/debts/profile/${userId}`)
      .then((res) => setData(res.data))
      .catch((err) => setError(errMsg(err)));
  }, [userId]);

  const loading = !data && !error;

  const pending = data ? data.debts.filter((d) => d.status === "pending") : [];
  const theyOweMe = pending
    .filter((d) => d.lender === me._id)
    .reduce((sum, d) => sum + d.amount, 0);
  const iOweThem = pending
    .filter((d) => d.lender !== me._id)
    .reduce((sum, d) => sum + d.amount, 0);

  const initials = data
    ? data.profile.name
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "";

  return (
    <div className="space-y-6">
      {/* Page-load animation: har cheez thori delay se upar aati hai */}
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

      <Link
        to="/debts"
        className="group inline-flex items-center gap-1 text-sm font-medium text-teal-700 hover:text-teal-900"
      >
        <svg
          viewBox="0 0 20 20"
          className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M13 4l-6 6 6 6" />
        </svg>
        Back to debts
      </Link>

      {error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-red-700">{error}</p>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div className="space-y-4">
          <div className="h-36 animate-pulse rounded-lg bg-stone-200" />
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="h-24 animate-pulse rounded-lg bg-stone-200" />
            <div className="h-24 animate-pulse rounded-lg bg-stone-200" />
          </div>
          <div className="h-20 animate-pulse rounded-lg bg-stone-200" />
        </div>
      )}

      {data && (
        <>
          {/* Profile card */}
          <div className="dash-rise rounded-lg border border-stone-200 bg-white p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-teal-700 text-lg font-semibold text-white">
                {initials}
              </div>
              <div className="min-w-0">
                <h1 className="truncate text-2xl font-bold tracking-tight text-stone-900">
                  {data.profile.name}
                </h1>
                <p className="truncate text-sm text-stone-500">
                  {data.profile.email}
                </p>
              </div>
            </div>

            <dl className="mt-4 grid gap-3 border-t border-stone-100 pt-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-stone-500">Phone</dt>
                <dd className="font-medium text-stone-800">
                  {data.profile.phone || "-"}
                </dd>
              </div>
              <div>
                <dt className="text-stone-500">Address</dt>
                <dd className="font-medium text-stone-800">
                  {data.profile.address || "-"}
                </dd>
              </div>
            </dl>
          </div>

          {/* Pending summary */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div
              className="dash-rise rounded-lg border border-stone-200 bg-white p-4"
              style={{ "--d": "80ms" }}
            >
              <p className="text-3xl font-bold tabular-nums text-teal-700">
                <Money amount={theyOweMe} />
              </p>
              <p className="mt-1 text-sm text-stone-600">
                {data.profile.name.split(" ")[0]} owes you
              </p>
            </div>
            <div
              className="dash-rise rounded-lg border border-stone-200 bg-white p-4"
              style={{ "--d": "150ms" }}
            >
              <p className="text-3xl font-bold tabular-nums text-red-700">
                <Money amount={iOweThem} />
              </p>
              <p className="mt-1 text-sm text-stone-600">You owe them</p>
            </div>
          </div>

          {/* Debts list */}
          <section>
            <h2 className="mb-3 font-semibold text-stone-800">
              Debts between you two
            </h2>

            {data.debts.length === 0 ? (
              <div
                className="dash-rise rounded-lg border border-dashed border-stone-300 bg-white px-4 py-6 text-center"
                style={{ "--d": "220ms" }}
              >
                <p className="font-medium text-stone-800">No debts yet</p>
                <p className="mt-1 text-sm text-stone-500">
                  Debts you add with {data.profile.name} will show up here.
                </p>
              </div>
            ) : (
              <ul className="space-y-2">
                {data.debts.map((d, i) => {
                  const lent = d.lender === me._id;
                  return (
                    <li
                      key={d._id}
                      className="dash-rise flex flex-wrap items-center justify-between gap-2 rounded-lg border border-stone-200 bg-white p-4"
                      style={{ "--d": `${220 + Math.min(i, 6) * 60}ms` }}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`h-8 w-1 rounded-full ${
                            lent ? "bg-teal-600" : "bg-red-500"
                          }`}
                        />
                        <div>
                          <p className="font-bold tabular-nums text-stone-900">
                            Rs {d.amount.toLocaleString()}
                          </p>
                          <p className="text-sm text-stone-600">
                            {lent ? "You lent" : "You borrowed"}
                            {d.note && ` - ${d.note}`}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                          d.status === "paid"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {d.status}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </>
      )}
    </div>
  );
}