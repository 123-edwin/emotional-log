import { Outlet } from "react-router-dom";
import Header from "./Header";


export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <div className="max-w-md mx-auto px-4 py-6">
        <Header />
        <main className="mt-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
