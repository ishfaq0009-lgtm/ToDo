import { Link } from "react-router-dom";
import {
  Target, Brain, Zap, ArrowRight, Sparkles, Check,
  Star, TrendingUp, Clock, Shield, BarChart3, Users,
  Play, Quote
} from "lucide-react";

const Home = () => {
  // const dashboardImg = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=85&auto=format&fit=crop";
  const person1 = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80&auto=format&fit=crop&crop=face";
  const person2 = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80&auto=format&fit=crop&crop=face";
  const person3 = "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=120&q=80&auto=format&fit=crop&crop=face";

  const logos = ["Google", "Microsoft", "Stripe", "Notion", "Figma", "Vercel", "Linear", "Slack"];

  const stats = [
    { value: "10K+", label: "Active users" },
    { value: "99.9%", label: "Uptime" },
    { value: "2.5M", label: "Tasks completed" },
    { value: "4.9★", label: "User rating" },
  ];

  const features = [
    {
      icon: <Brain size={20} />,
      title: "Smart Task Lists",
      desc: "Organize tasks into lists. Drag, drop, done. Clean and fast.",
      span: "md:col-span-2",
      visual: "gradient",
    },
    {
      icon: <Clock size={20} />,
      title: "Due Dates",
      desc: "Never miss a deadline with smart reminders.",
      span: "md:col-span-1",
    },
    {
      icon: <Target size={20} />,
      title: "Priorities",
      desc: "Set priority levels and focus on what matters.",
      span: "md:col-span-1",
    },
    {
      icon: <BarChart3 size={20} />,
      title: "Analytics",
      desc: "Beautiful insights into your task completion trends.",
      span: "md:col-span-2",
      visual: "chart",
    },
  ];

  const testimonials = [
    { quote: "Focusly keeps my day organized. I never miss a deadline anymore.", name: "Ahmed Khan", role: "Product Designer @ Stripe", img: person1 },
    { quote: "The cleanest todo app I've ever used. No bloat, just works.", name: "Marcus Johnson", role: "Founder @ TechFlow", img: person2 },
    { quote: "Our whole team uses it. Tasks are always on track now.", name: "David Park", role: "Engineering Lead @ Notion", img: person3 },
  ];

  return (
    <div className="bg-white dark:bg-black">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]" />
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-zinc-900/10 dark:bg-white/5 blur-[120px] animate-glow" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 md:pt-24 md:pb-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* <Link
              to="/features"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors mb-8 animate-fade-up"
            >
              <span className="flex h-1.5 w-1.5 rounded-full bg-zinc-900 dark:bg-white" />
              Now live: Focusly 2.0
              <ArrowRight size={12} />
            </Link> */}

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[0.95] animate-fade-up delay-100">
              Plan tasks.
              <br />
              <span className="text-gradient">Get things done.</span>
            </h1>

            <p className="mt-8 max-w-2xl mx-auto text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed animate-fade-up delay-200">
              Focusly is the simplest way to manage your tasks. Create lists, set due dates, and never miss a deadline. Get more done, stress less.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-3 animate-fade-up delay-300">
              <Link
                to="/register"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-xl shadow-zinc-900/10 dark:shadow-white/5"
              >
                Start for free
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to="/features"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
              >
                <Play size={14} className="fill-current" />
                Watch features
              </Link>
            </div>

            {/* <p className="mt-6 text-sm text-zinc-500 dark:text-zinc-500 animate-fade-up delay-300">
              No credit card required · Free forever plan
            </p> */}
          </div>

          {/* <div className="relative mt-20 max-w-5xl mx-auto animate-fade-up delay-300">
            <div className="absolute -inset-4 bg-gradient-to-r from-zinc-900/10 via-zinc-500/10 to-zinc-900/10 dark:from-white/5 dark:via-white/10 dark:to-white/5 blur-3xl rounded-3xl" />
            <div className="relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl shadow-zinc-900/20 dark:shadow-black/60 bg-zinc-100 dark:bg-zinc-900">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                  <span className="w-3 h-3 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                  <span className="w-3 h-3 rounded-full bg-zinc-500 dark:bg-zinc-500" />
                </div>
                <div className="flex-1 mx-4 px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 text-xs text-zinc-500 text-center">
                  app.focusly.com/tasks
                </div>
              </div>
              <img src={dashboardImg} alt="Focusly task dashboard" className="w-full h-auto" loading="eager" />
            </div>
          </div> */}
        </div>
      </section>

      {/* LOGOS */}
      {/* <section className="border-y border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-500 mb-6">
            Trusted by teams at
          </p>
          <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex gap-12 animate-marquee">
              {[...logos, ...logos].map((l, i) => (
                <span key={i} className="text-xl md:text-2xl font-bold text-zinc-400 dark:text-zinc-600 whitespace-nowrap">
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* STATS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="text-center p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800">
              <p className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">{s.value}</p>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BENTO FEATURES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          {/* <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">Features</p> */}
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Everything you need.<br />Nothing you don't.
          </h2>
          <p className="mt-5 text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
            Built for people who get things done. Designed for clarity.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div
              key={i}
              className={`group relative p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all overflow-hidden ${f.span}`}
            >
              {f.visual === "gradient" && (
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-zinc-900/5 to-zinc-500/5 dark:from-white/5 dark:to-white/10 rounded-full blur-3xl pointer-events-none" />
              )}

              <div className="relative">
                <div className="w-11 h-11 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white flex items-center justify-center mb-5">
                  {f.icon}
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">{f.title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-sm">{f.desc}</p>

                {f.visual === "chart" && (
                  <div className="mt-6 flex items-end gap-1.5 h-20">
                    {[40, 65, 50, 80, 70, 95, 85, 100].map((h, j) => (
                      <div
                        key={j}
                        className="flex-1 rounded-t bg-gradient-to-t from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 opacity-80"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      {/* <section className="bg-zinc-50 dark:bg-zinc-950 border-y border-zinc-200 dark:border-zinc-800 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">Testimonials</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Loved by productive people
            </h2>
            <div className="mt-4 flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="fill-amber-500 text-yellow-500 dark:fill-amber-500 dark:text-yellow-500" />
              ))}
              <span className="ml-2 text-sm text-zinc-600 dark:text-zinc-400">4.9 from 2,000+ reviews</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="p-7 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 relative">
                <Quote size={28} className="text-zinc-300 dark:text-zinc-700 mb-3" />
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">{t.quote}</p>
                <div className="mt-6 flex items-center gap-3">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover object-center ring-2 ring-zinc-100 dark:ring-zinc-800"
                  />
                  <div>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-white">{t.name}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* PRICING */}
      {/* <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">Pricing</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">Start free. Upgrade when you're ready.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {[
            { name: "Free", price: "$0", desc: "For personal use", features: ["5 tasks per day", "Basic task lists", "1 device"], cta: "Start free", featured: false },
            { name: "Pro", price: "$12", desc: "For power users", features: ["Unlimited tasks", "Advanced analytics", "All devices", "Custom lists", "Priority support"], cta: "Start 14-day trial", featured: true },
            { name: "Team", price: "$29", desc: "For small teams", features: ["Everything in Pro", "Up to 10 members", "Team analytics", "Shared lists", "Admin controls"], cta: "Contact sales", featured: false },
          ].map((p, i) => (
            <div
              key={i}
              className={`relative p-8 rounded-2xl border transition-all ${
                p.featured
                  ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-zinc-900 dark:border-white shadow-2xl scale-105"
                  : "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-800"
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-xs font-semibold border border-zinc-200 dark:border-zinc-700">
                  Most popular
                </span>
              )}
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className={`text-sm mt-1 ${p.featured ? "text-white/70 dark:text-zinc-600" : "text-zinc-500 dark:text-zinc-400"}`}>{p.desc}</p>
              <p className="mt-4 mb-6">
                <span className="text-4xl font-bold tracking-tight">{p.price}</span>
                <span className={`text-sm ${p.featured ? "text-white/70 dark:text-zinc-600" : "text-zinc-500 dark:text-zinc-400"}`}>/month</span>
              </p>
              <ul className="space-y-3 mb-8">
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm">
                    <Check size={16} className={`mt-0.5 flex-shrink-0 ${p.featured ? "text-white dark:text-zinc-900" : "text-zinc-900 dark:text-white"}`} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/register"
                className={`block text-center px-4 py-3 rounded-lg font-semibold text-sm transition-colors ${
                  p.featured
                    ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    : "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100"
                }`}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </section> */}

      {/* FINAL CTA */}
      {/* <section className="relative overflow-hidden bg-zinc-900 dark:bg-zinc-950 border-t border-zinc-800">
        <div className="absolute inset-0 bg-dots opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 py-24 text-center">
          <Sparkles className="mx-auto text-white/60 dark:text-zinc-500 mb-6" size={32} />
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            Start organizing<br />today.
          </h2>
          <p className="mt-6 text-lg text-white/70 max-w-lg mx-auto">
            Join 10,000+ people getting things done. Free forever. No credit card.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              to="/register"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-zinc-900 font-semibold hover:bg-zinc-100 transition-colors shadow-xl"
            >
              Get started free
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
            >
              Talk to sales
            </Link>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Home;