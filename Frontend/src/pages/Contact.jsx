import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, Clock } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 outline-none focus:ring-2 focus:ring-zinc-900/20 dark:focus:ring-white/20 focus:border-zinc-900 dark:focus:border-white transition-all";

  return (
    <div className="bg-white dark:bg-black">
      <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
        <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          {/* <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">Contact</p> */}
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white">Let's talk.</h1>
          <p className="mt-5 text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
            Have a question or just want to say hi? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {[
              { icon: <Mail size={20} />, label: "Email", value: "hello@focusly.com", desc: "We reply within 24 hours" },
              { icon: <Phone size={20} />, label: "Phone", value: "+92 300 1234567", desc: "Mon-Fri, 9am-6pm PKT" },
              { icon: <MapPin size={20} />, label: "Address", value: "Bannu, Pakistan", desc: "Remote-first team" },
            ].map((c, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white flex items-center justify-center flex-shrink-0">
                    {c.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-white">{c.label}</p>
                    <p className="text-base text-zinc-700 dark:text-zinc-300 mt-0.5">{c.value}</p>
                    <p className="text-xs text-zinc-500 mt-1">{c.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 p-8 md:p-10 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-5"
          >
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Send us a message</h2>

            {sent && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white text-sm border border-zinc-300 dark:border-zinc-700">
                <CheckCircle size={16} /> Message sent! We'll reply soon.
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Name</label>
              <input name="name" value={form.name} onChange={handleChange} required className={inputClass} placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required className={inputClass} placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Message</label>
              <textarea name="message" rows={5} value={form.message} onChange={handleChange} required className={`${inputClass} resize-none`} placeholder="Tell us what's on your mind..." />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
            >
              <Send size={16} /> Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;