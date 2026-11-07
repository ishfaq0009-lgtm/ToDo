import { useEffect, useRef, useState } from "react";
import { Plus, Pencil, Trash2, X, Check, Search } from "lucide-react";
import api, { errMsg } from "../api";

const input =
  "w-full rounded-md border border-stone-300 px-3 py-2 outline-none transition-colors focus:border-teal-600 focus:ring-2 focus:ring-teal-100";

const statusLabel = {
  pending: "Pending",
  "in-progress": "In progress",
  completed: "Completed",
};
const statusColor = {
  pending: "bg-amber-100 text-amber-800",
  "in-progress": "bg-sky-100 text-sky-800",
  completed: "bg-emerald-100 text-emerald-800",
};
const priorityBar = {
  low: "bg-stone-300",
  medium: "bg-amber-400",
  high: "bg-red-500",
};
const priorityText = {
  low: "text-stone-500",
  medium: "text-amber-700",
  high: "text-red-700",
};

const emptyForm = {
  title: "",
  description: "",
  status: "pending",
  priority: "medium",
  dueDate: "",
};

const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [filters, setFilters] = useState({ status: "", priority: "", search: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [intro, setIntro] = useState(true); // stagger sirf pehli baar

  const [confirmId, setConfirmId] = useState(null);
  const [removingId, setRemovingId] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  const reqId = useRef(0);
  const firstRun = useRef(true);

  const load = async () => {
    const id = ++reqId.current; // purane slow response naye ko overwrite na karein
    try {
      const params = {};
      Object.entries(filters).forEach(([k, v]) => v && (params[k] = v));
      const { data } = await api.get("/todos", { params });
      if (id !== reqId.current) return;
      setTodos(data);
      setError("");
    } catch (err) {
      if (id !== reqId.current) return;
      setError(errMsg(err));
    } finally {
      if (id === reqId.current) setLoading(false);
    }
  };

  // filters badlein to dobara load (search mein thora wait)
  useEffect(() => {
    const t = setTimeout(load, firstRun.current ? 0 : 300);
    firstRun.current = false;
    return () => clearTimeout(t);
  }, [filters]);

  useEffect(() => {
    if (loading) return;
    const t = setTimeout(() => setIntro(false), 900);
    return () => clearTimeout(t);
  }, [loading]);

  // Escape dabane par modal band
  useEffect(() => {
    if (!showForm) return;
    const onKey = (e) => e.key === "Escape" && setShowForm(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showForm]);

  const hasFilters = Object.values(filters).some(Boolean);

  const openAdd = () => {
    setEditId(null);
    setForm(emptyForm);
    setFormError("");
    setShowForm(true);
  };

  const openEdit = (todo) => {
    setEditId(todo._id);
    setForm({
      title: todo.title,
      description: todo.description || "",
      status: todo.status,
      priority: todo.priority,
      dueDate: todo.dueDate ? todo.dueDate.slice(0, 10) : "",
    });
    setFormError("");
    setShowForm(true);
  };

  const save = async (e) => {
    e.preventDefault();
    setFormError("");
    setSaving(true);
    const body = { ...form, dueDate: form.dueDate || null };
    try {
      if (editId) await api.put(`/todos/${editId}`, body);
      else await api.post("/todos", body);
      setShowForm(false);
      load();
    } catch (err) {
      setFormError(errMsg(err));
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    setConfirmId(null);
    setRemovingId(id);
    try {
      await api.delete(`/todos/${id}`);
      // fade-out khatam hone ke baad list se hatao
      setTimeout(() => {
        setTodos((prev) => prev.filter((t) => t._id !== id));
        setRemovingId(null);
      }, 250);
    } catch (err) {
      setRemovingId(null);
      setError(errMsg(err));
    }
  };

  // Optimistic: UI turant badalti hai, error aaye to wapas
  const changeStatus = async (id, status) => {
    const prev = todos;
    setTodos(todos.map((t) => (t._id === id ? { ...t, status } : t)));
    try {
      await api.put(`/todos/${id}`, { status });
      load();
    } catch (err) {
      setTodos(prev);
      setError(errMsg(err));
    }
  };

  const toggleDone = (t) =>
    changeStatus(t._id, t.status === "completed" ? "pending" : "completed");

  const isOverdue = (t) =>
    t.dueDate && t.status !== "completed" && new Date(t.dueDate) < new Date();

  const clearFilters = () => setFilters({ status: "", priority: "", search: "" });

  return (
    <div className="space-y-5">
      <style>{`
        @keyframes dash-rise {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes todo-out {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(16px); }
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
        .todo-out   { animation: todo-out 250ms ease-in both; }
        .modal-pop  { animation: modal-pop 220ms cubic-bezier(0.22, 1, 0.36, 1) both; }
        .modal-fade { animation: modal-fade 200ms ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .dash-rise, .todo-out, .modal-pop, .modal-fade { animation: none; }
        }
      `}</style>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-stone-900">Todos</h1>
          {!loading && (
            <p className="mt-1 text-sm text-stone-500">
              {todos.length} {todos.length === 1 ? "todo" : "todos"}
              {hasFilters && " match your filters"}
            </p>
          )}
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-1 rounded-md bg-teal-700 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-800 active:scale-95"
        >
          <Plus size={16} /> Add todo
        </button>
      </div>

      {/* Filters */}
      <div className="grid gap-2 sm:grid-cols-3">
        <div className="relative">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
          />
          <input
            className={`${input} pl-9`}
            placeholder="Search by title"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>
        <select
          className={input}
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All statuses</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In progress</option>
          <option value="completed">Completed</option>
        </select>
        <select
          className={input}
          value={filters.priority}
          onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
        >
          <option value="">All priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-red-700">{error}</p>
      )}

      {/* List */}
      {loading ? (
        <div className="space-y-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-20 animate-pulse rounded-lg bg-stone-200" />
          ))}
        </div>
      ) : todos.length === 0 ? (
        <div className="dash-rise rounded-lg border border-dashed border-stone-300 bg-white px-4 py-10 text-center">
          <p className="font-medium text-stone-800">
            {hasFilters ? "No todos match your filters" : "No todos yet"}
          </p>
          <p className="mt-1 text-sm text-stone-500">
            {hasFilters
              ? "Try a different search or clear the filters."
              : "Add your first todo to start tracking your work."}
          </p>
          <button
            onClick={hasFilters ? clearFilters : openAdd}
            className="mt-4 rounded-md bg-teal-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-800 active:scale-95"
          >
            {hasFilters ? "Clear filters" : "Add todo"}
          </button>
        </div>
      ) : (
        <ul className="space-y-2">
          {todos.map((t, i) => {
            const done = t.status === "completed";
            const overdue = isOverdue(t);
            return (
              <li
                key={t._id}
                className={`${
                  removingId === t._id ? "todo-out" : "dash-rise"
                } flex flex-wrap items-start justify-between gap-3 rounded-lg border border-stone-200 bg-white p-4`}
                style={{ "--d": `${intro ? Math.min(i, 6) * 60 : 0}ms` }}
              >
                <div className="flex min-w-0 flex-1 items-start gap-3">
                  {/* Priority bar */}
                  <span
                    title={`${t.priority} priority`}
                    className={`mt-0.5 h-10 w-1 shrink-0 rounded-full ${priorityBar[t.priority]}`}
                  />

                  {/* Quick complete toggle */}
                  <button
                    onClick={() => toggleDone(t)}
                    aria-pressed={done}
                    aria-label={done ? "Mark as pending" : "Mark as completed"}
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 active:scale-90 ${
                      done
                        ? "border-teal-700 bg-teal-700 text-white"
                        : "border-stone-300 text-transparent hover:border-teal-600"
                    }`}
                  >
                    <Check
                      size={12}
                      strokeWidth={3}
                      className={`transition-transform duration-200 motion-reduce:transition-none ${
                        done ? "scale-100" : "scale-0"
                      }`}
                    />
                  </button>

                  <div className="min-w-0 flex-1">
                    <p
                      className={`font-medium transition-colors duration-300 ${
                        done ? "text-stone-400 line-through" : "text-stone-900"
                      }`}
                    >
                      {t.title}
                    </p>
                    {t.description && (
                      <p className="text-sm text-stone-600">{t.description}</p>
                    )}
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                      <span
                        className={`rounded-full px-2.5 py-0.5 font-medium ${
                          overdue ? "bg-red-100 text-red-800" : statusColor[t.status]
                        }`}
                      >
                        {overdue ? "Overdue" : statusLabel[t.status]}
                      </span>
                      <span className={`font-medium capitalize ${priorityText[t.priority]}`}>
                        {t.priority} priority
                      </span>
                      {t.dueDate && (
                        <span className={overdue ? "font-medium text-red-700" : "text-stone-500"}>
                          Due {fmtDate(t.dueDate)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <select
                    className="rounded-md border border-stone-300 px-2 py-1 text-sm outline-none transition-colors focus:border-teal-600"
                    value={t.status}
                    onChange={(e) => changeStatus(t._id, e.target.value)}
                    aria-label="Change status"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  <button
                    onClick={() => openEdit(t)}
                    className="rounded-md p-2 text-stone-600 transition-colors hover:bg-stone-100"
                    aria-label="Edit"
                  >
                    <Pencil size={16} />
                  </button>

                  {/* Inline delete confirm (browser popup ki jagah) */}
                  {confirmId === t._id ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => remove(t._id)}
                        className="rounded-md bg-red-600 px-2.5 py-1 text-sm font-medium text-white transition-colors hover:bg-red-700 active:scale-95"
                      >
                        Delete
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
                      onClick={() => setConfirmId(t._id)}
                      className="rounded-md p-2 text-red-700 transition-colors hover:bg-red-50"
                      aria-label="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* Add / edit modal */}
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
              <h2 className="text-lg font-bold text-stone-900">
                {editId ? "Edit todo" : "New todo"}
              </h2>
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
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              autoFocus
            />
            <textarea
              className={input}
              rows={3}
              placeholder="Description (optional)"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-2">
              <label className="block text-sm text-stone-500">
                Status
                <select
                  className={input}
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In progress</option>
                  <option value="completed">Completed</option>
                </select>
              </label>
              <label className="block text-sm text-stone-500">
                Priority
                <select
                  className={input}
                  value={form.priority}
                  onChange={(e) => setForm({ ...form, priority: e.target.value })}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </label>
            </div>
            <label className="block text-sm text-stone-500">
              Due date (optional)
              <input
                className={input}
                type="date"
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              />
            </label>

            <button
              disabled={saving}
              className="w-full rounded-md bg-teal-700 py-2 font-medium text-white transition-colors hover:bg-teal-800 active:scale-[0.98] disabled:opacity-60"
            >
              {saving ? "Saving..." : editId ? "Save changes" : "Add todo"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}