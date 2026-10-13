import { Outlet } from "react-router-dom";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { SITE_NAME } from "../config";

export default function Layout() {
  return (
    <div className="mx-auto flex min-h-svh max-w-6xl flex-col px-5">
      <header className="flex items-center pt-4">
        <LanguageSwitcher />
      </header>
      <div className="flex-1">
        <Outlet />
      </div>
      <footer className="py-8 text-center text-sm opacity-60">© 2026 {SITE_NAME}</footer>
    </div>
  );
}
