import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import Header from './Header';

export default function Root() {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      <Toaster position="top-right" richColors />
      <Header />
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  );
}