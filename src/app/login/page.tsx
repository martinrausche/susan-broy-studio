"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import BroyLogo from "@/components/BroyLogo";
import { ShieldAlert } from "lucide-react";

function LoginContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case "unauthorized_user":
        return "Zugriff verweigert: Diese Google-E-Mail-Adresse ist in den Server-Einstellungen (ALLOWED_EMAILS) nicht freigeschaltet.";
      case "no_code":
      case "token_exchange_failed":
        return "Der Anmeldevorgang mit Google wurde abgebrochen oder ist fehlgeschlagen.";
      case "server_configuration_error":
        return "Server-Konfigurationsfehler: Bitte überprüfen Sie die Google Client ID & Secrets in Vercel.";
      default:
        return `Authentifizierungs-Hinweis (${errorCode}). Bitte versuchen Sie es erneut.`;
    }
  };

  return (
    <main className="min-h-screen bg-[#0C0C0E] text-white flex items-center justify-center p-6 font-sans">
      
      {/* Central Login Card matching Websiteupdater Susan Broy 1:1 */}
      <div className="w-full max-w-[420px] bg-[#161618] p-10 rounded-2xl border border-[#26262A] shadow-2xl flex flex-col items-center gap-6 text-center">
        
        {/* BROY Official Logo */}
        <BroyLogo size={64} color="#FFFFFF" />

        {/* Title Block */}
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-extrabold tracking-[0.2em] text-white uppercase">
            SUSAN BROY
          </h1>
          <span className="text-xs text-gray-400 font-light mt-1 tracking-wider">
            Instagram Content Studio
          </span>
          <div className="w-10 h-[1.5px] bg-gray-600 mt-4" />
        </div>

        {/* Section Heading */}
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-lg font-bold text-white tracking-wide">
            Interner Zugang
          </h2>
          <p className="text-xs text-gray-400 leading-relaxed max-w-xs font-light">
            Melden Sie sich mit Ihrem Google-Konto an, um Posts zu erstellen, Vorschläge freizugeben und auf Instagram zu veröffentlichen.
          </p>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div className="w-full bg-red-500/10 border border-red-500/30 text-red-400 p-3.5 rounded-xl text-xs flex items-start gap-2.5 text-left">
            <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-400" />
            <span>{getErrorMessage(error)}</span>
          </div>
        )}

        {/* Google Login Button matching Websiteupdater 1:1 */}
        <a
          href="/api/auth/google"
          className="w-full bg-[#DCE1E7] hover:bg-[#E5E9EF] text-[#111827] py-3.5 px-6 rounded-xl font-bold flex items-center justify-center gap-3 text-xs tracking-wide transition-all shadow-md no-underline border-none mt-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span className="font-semibold text-sm">Mit Google anmelden</span>
        </a>

        {/* Footer */}
        <div className="text-[11px] text-gray-500 tracking-wider pt-4">
          © 2026 SUSAN BROY
        </div>

      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center text-xs text-gray-400 bg-[#0C0C0E]">
        Lade Studio Login...
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
