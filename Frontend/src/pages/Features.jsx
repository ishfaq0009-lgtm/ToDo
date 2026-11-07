import { ListTodo, Flag, Calendar, Shield, BarChart3, Users, Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Features = () => {
  const workspaceImg = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&q=85&auto=format&fit=crop";

  const features = [
    { icon: <ListTodo size={20} />, title: "Task Lists", desc: "Break big projects into achievable daily tasks. Track progress with clarity." },
    { icon: <Flag size={20} />, title: "Priority Management", desc: "Set priorities and focus on what matters most, every day." },
    { icon: <Calendar size={20} />, title: "Due Dates & Reminders", desc: "Built-in reminders so you never miss a deadline." },
    { icon: <Shield size={20} />, title: "Privacy First", desc: "Your task data stays yours. End-to-end encrypted, always." },
    { icon: <BarChart3 size={20} />, title: "Progress Analytics", desc: "See your task completion trends over time with beautiful insights." },
    { icon: <Users size={20} />, title: "Shared Lists", desc: "Collaborate with your team on shared task lists in real time." },
  ];

  return (
    <div className="bg-white dark:bg-black">
      <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
        <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          {/* <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">Features</p> */}
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.05]">
            Built for <span className="text-gradient">getting things done.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Powerful tools designed to help you stay organized, focused, and productive — without the noise.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className="group p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-lg hover:shadow-zinc-900/5 dark:hover:shadow-black/40 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">{f.title}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-zinc-50 dark:bg-zinc-950 border-y border-zinc-200 dark:border-zinc-800 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-zinc-900/20 to-zinc-500/10 dark:from-white/10 dark:to-white/5 blur-3xl rounded-3xl" />
            <img
              src={workspaceImg}
              alt="Workspace"
              className="relative w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl shadow-zinc-900/10 dark:shadow-black/50"
            />
          </div>
          <div>
            <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">Everything included</p>
            <h2 className="text-4xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6">
              One plan. All features.
            </h2>
            <div className="space-y-3">
              {["Unlimited tasks", "Advanced analytics dashboard", "Custom task lists", "Due dates & reminders", "Cross-device sync", "Export your data anytime"].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                  <span className="w-5 h-5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white flex items-center justify-center flex-shrink-0">
                    <Check size={12} />
                  </span>
                  {item}
                </div>
              ))}
            </div>
            <Link
              to="/register"
              className="group inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
            >
              Get started
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;