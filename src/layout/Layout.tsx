
import type { ReactNode } from "react";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <div className="max-w-md mx-auto px-4 py-6">
        <Header />

        <main className="mt-6">
          {children}
        </main>
      </div>
    </div>
  );
}
