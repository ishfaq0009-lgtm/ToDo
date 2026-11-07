import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ListTodo,
  Wallet,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/todos", label: "Todos", icon: ListTodo },
  { to: "/debts", label: "Debts", icon: Wallet },
  { to: "/profile", label: "Profile", icon: User },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const me = JSON.parse(localStorage.getItem("user") || "{}");
  const initials = (me.name || "?")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Escape dabane par mobile menu band
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* Mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-30 flex h-14 items-center justify-between border-b border-stone-200 bg-white px-4 md:hidden">
        <span className="text-lg font-bold text-teal-700">Focusly</span>
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="rounded-md p-2 text-stone-600 hover:bg-stone-100"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-stone-900/40 transition-opacity duration-300 motion-reduce:transition-none md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-60 flex-col border-r border-stone-200 bg-white transition-transform duration-300 ease-out motion-reduce:transition-none md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-14 items-center justify-between px-5">
          <span className="text-lg font-bold text-teal-700">Focusly</span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="rounded-md p-1.5 text-stone-500 hover:bg-stone-100 md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-2" aria-label="Main">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-teal-50 text-teal-800"
                    : "text-stone-600 hover:bg-stone-100"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User + logout */}
        <div className="border-t border-stone-200 p-3">
          <div className="mb-2 flex items-center gap-3 px-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-700 text-sm font-semibold text-white">
              {initials}
            </div>
            <p className="truncate text-sm font-medium text-stone-800">
              {me.name}
            </p>
          </div>
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-red-50 hover:text-red-700"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}