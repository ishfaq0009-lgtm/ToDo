import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-zinc-900 dark:bg-white flex items-center justify-center text-white dark:text-zinc-900 font-bold shadow-lg shadow-zinc-900/20 dark:shadow-white/10">
                F
              </div>
              <span className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
                Focusly
              </span>
            </Link>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Stay focused. Get more done. The productivity platform for people who value deep work.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-white mb-4">Product</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/features" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Features</Link></li>
              <li><Link to="/about" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-white mb-4">Account</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/login" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Sign in</Link></li>
              <li><Link to="/register" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Register</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
              <li>hello@focusly.com</li>
              <li>+92 300 1234567</li>
              <li>Bannu, Pakistan</li>
            </ul>
          </div>
        </div>

        {/* <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-zinc-500 dark:text-zinc-500">
            © {new Date().getFullYear()} Focusly. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs text-zinc-500 dark:text-zinc-500">
            <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Terms</a>
          </div>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;