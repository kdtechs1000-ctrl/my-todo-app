import { Link } from 'react-router-dom';
import { CheckSquare, User, Home, Mail } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b px-6 py-4 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-2 text-indigo-600 font-bold text-xl">
        <CheckSquare className="w-6 h-6" />
        <span>TaskMaster</span>
      </div>
      <nav className="flex gap-6 font-medium text-slate-600">
        <Link to="/" className="flex items-center gap-1 hover:text-indigo-600">
          <Home className="w-4 h-4" /> Home
        </Link>
        <Link to="/todos" className="flex items-center gap-1 hover:text-indigo-600">
          <CheckSquare className="w-4 h-4" /> Tasks
        </Link>
        <Link to="/profile" className="flex items-center gap-1 hover:text-indigo-600">
          <User className="w-4 h-4" /> Profile
        </Link>
        <Link to="/contact" className="flex items-center gap-1 hover:text-indigo-600">
          <Mail className="w-4 h-4" /> Contact
        </Link>
      </nav>
    </header>
  );
}