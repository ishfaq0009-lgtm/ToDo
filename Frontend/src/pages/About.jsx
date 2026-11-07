import { Target, Eye, Heart, Shield, Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const teamImg = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=85&auto=format&fit=crop";
  const officeImg = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=85&auto=format&fit=crop";

  const stats = [
    { value: "10K+", label: "Active users" },
    { value: "2.5M", label: "Tasks completed" },
    { value: "$5M", label: "Series A raised" },
    { value: "2022", label: "Founded" },
  ];

  const values = [
    { icon: <Heart size={20} />, title: "Simplicity", desc: "Less clutter. More clarity in everything we build.", span: "md:col-span-2" },
    { icon: <Shield size={20} />, title: "Privacy", desc: "Your task data belongs to you. Period.", span: "md:col-span-1" },
    { icon: <Zap size={20} />, title: "Speed", desc: "Every millisecond matters. We obsess over performance.", span: "md:col-span-1" },
    { icon: <Target size={20} />, title: "Impact", desc: "Real outcomes, not vanity metrics.", span: "md:col-span-2" },
  ];

  const milestones = [
    { year: "2022", title: "The idea", desc: "Started as a side project to solve our own task management problems." },
    { year: "2023", title: "First launch", desc: "Launched publicly. Reached 1,000 users in the first month." },
    { year: "2024", title: "Series A", desc: "Raised $5M to build the future of task management." },
    { year: "2025", title: "10K+ users", desc: "Now helping thousands of people get things done worldwide." },
  ];

  const team = [
    { name: "Ahmed Khan", role: "CEO & Co-founder", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=85&auto=format&fit=crop&crop=face" },
    { name: "Marcus Johnson", role: "CTO & Co-founder", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=85&auto=format&fit=crop&crop=face" },
    { name: "Bilal Ahmed", role: "Head of Design", img: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&q=85&auto=format&fit=crop&crop=face" },
    { name: "David Park", role: "Head of Engineering", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=85&auto=format&fit=crop&crop=face" },
  ];

  return (
    <div className="bg-white dark:bg-black">
      {/* ============ HERO — Image Left, Text Right ============ */}
      <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
        <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image with floating cards */}
            <div className="relative animate-fade-up order-2 lg:order-1">
              <div className="absolute -inset-4 bg-gradient-to-br from-zinc-900/20 to-zinc-500/10 dark:from-white/10 dark:to-white/5 blur-3xl rounded-3xl" />
              <div className="relative">
                <img
                  src={teamImg}
                  alt="Focusly team at work"
                  className="w-full h-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl shadow-zinc-900/10 dark:shadow-black/50 object-cover aspect-[4/3]"
                />

                {/* Floating stat card — top right */}
                <div className="absolute -top-4 -right-4 md:-right-6 px-4 py-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl">
                  <p className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white leading-none">10K+</p>
                  <p className="text-[10px] uppercase tracking-wider text-zinc-500 mt-1">Active users</p>
                </div>

                {/* Floating stat card — bottom left */}
                <div className="absolute -bottom-4 -left-4 md:-left-6 px-4 py-3 rounded-xl bg-zinc-900 dark:bg-white border border-zinc-800 dark:border-white shadow-xl">
                  <p className="text-xl md:text-2xl font-bold text-white dark:text-zinc-900 leading-none">2.5M</p>
                  <p className="text-[10px] uppercase tracking-wider text-white/70 dark:text-zinc-600 mt-1">Tasks done</p>
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="animate-fade-up delay-100 order-1 lg:order-2">
              {/* <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-medium border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-white" />
                About Focusly
              </span> */}

              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.05]">
                We help you <span className="text-gradient">take control of your tasks.</span>
              </h1>

              <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Focusly was born from a simple idea: everyone deserves a simple, beautiful way to manage their tasks and get things done.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/register"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-lg shadow-zinc-900/10 dark:shadow-white/5"
                >
                  Get started
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  to="/features"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                >
                  See features
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STATS BAND — Full Width Dark ============ */}
      <section className="bg-zinc-900 dark:bg-zinc-950 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <div key={i} className="text-center md:text-left">
                <p className="text-3xl md:text-4xl font-bold text-white tracking-tight">{s.value}</p>
                <p className="mt-1 text-sm text-zinc-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ OUR STORY ============ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-2">
            <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
              Our story
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
              From side project to 10K+ users.
            </h2>
          </div>

          <div className="lg:col-span-3 space-y-5 text-zinc-600 dark:text-zinc-400 leading-relaxed">
            <p>
              We started Focusly in 2022 because we were tired of bloated productivity apps. Every tool was trying to do everything — and in the process, doing nothing well. We wanted something simpler: a clean, fast way to manage tasks.
            </p>
            <p>
              So we built it for ourselves first. Then shared it with friends. Then with strangers online. Today, Focusly helps over <span className="font-semibold text-zinc-900 dark:text-white">10,000 people</span> around the world organize their day and get more done.
            </p>
            <p>
              We're still a small team. We still believe less is more. And we're still obsessed with helping people take control of their tasks — one list at a time.
            </p>
          </div>
        </div>
      </section>

      {/* ============ MISSION & VISION ============ */}
      <section className="bg-zinc-50 dark:bg-zinc-950 border-y border-zinc-200 dark:border-zinc-800 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-5">
            <div className="p-10 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white flex items-center justify-center mb-6">
                <Target size={22} />
              </div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">Our Mission</h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Help people organize their lives and get more done by providing simple, distraction-free task management tools that respect their time.
              </p>
            </div>
            <div className="p-10 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white flex items-center justify-center mb-6">
                <Eye size={22} />
              </div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">Our Vision</h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                A world where people control their to-do list — not the other way around. Where getting things done feels effortless, not stressful.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ VALUES — Bento Grid ============ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
            What we stand for
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Our Values
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {values.map((v, i) => (
            <div
              key={i}
              className={`group p-7 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors ${v.span}`}
            >
              <div className="w-11 h-11 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                {v.icon}
              </div>
              <h3 className="font-semibold text-zinc-900 dark:text-white mb-2 text-lg">{v.title}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ TIMELINE — Vertical ============ */}
      <section className="bg-zinc-50 dark:bg-zinc-950 border-y border-zinc-200 dark:border-zinc-800 py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
              Our journey
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
              How we got here
            </h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800 md:-translate-x-px" />

            <div className="space-y-10">
              {milestones.map((m, i) => (
                <div
                  key={i}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 top-2 w-3 h-3 rounded-full bg-zinc-900 dark:bg-white ring-4 ring-zinc-50 dark:ring-zinc-950 -translate-x-1/2 md:-translate-x-1/2 z-10" />

                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 inline-block text-left w-full">
                      <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 font-semibold">
                        {m.year}
                      </span>
                      <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mt-1 mb-1">
                        {m.title}
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">{m.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ TEAM ============ */}
      {/* <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
            Our team
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Meet the people
          </h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto">
            A small team building tools we wish we had earlier.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {team.map((t, i) => (
            <div
              key={i}
              className="group p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors text-center"
            >
              <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-zinc-100 dark:ring-zinc-800">
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-semibold text-zinc-900 dark:text-white">{t.name}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-1">{t.role}</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* ============ OFFICE IMAGE ============ */}
      <section className="bg-zinc-50 dark:bg-zinc-950 border-y border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="relative rounded-3xl overflow-hidden">
            <img
              src={officeImg}
              alt="Focusly office"
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-14">
              <p className="text-white/70 text-xs uppercase tracking-wider font-semibold mb-3">
                Our office
              </p>
              <h3 className="text-3xl md:text-4xl font-bold text-white max-w-lg leading-tight">
                Remote-first. Focused on making tasks feel effortless.
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="p-12 md:p-16 rounded-3xl bg-zinc-900 dark:bg-zinc-950 border border-zinc-800 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Ready to get things done?
          </h2>
          <p className="mt-4 text-zinc-400 max-w-lg mx-auto">
            Join thousands of people organizing their day with Focusly.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/register"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-zinc-900 font-semibold hover:bg-zinc-100 transition-colors"
            >
              Get started free
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;