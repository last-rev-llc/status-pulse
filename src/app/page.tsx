import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-5xl font-bold tracking-tight">
        <span className="bg-gradient-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent">
          StatusPulse
        </span>
      </h1>
      <p className="mt-4 max-w-lg text-lg text-muted-foreground">
        Real-time uptime monitoring with beautiful status pages, incident
        tracking, and smart alerts.
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/register"
          className="rounded-xl bg-amber-500 px-6 py-3 font-semibold text-black transition-all hover:bg-amber-400 hover:-translate-y-0.5 hover:shadow-lg"
        >
          Get Started Free
        </Link>
        <Link
          href="/login"
          className="rounded-xl border border-white/15 bg-white/[0.08] px-6 py-3 font-semibold backdrop-blur-xl transition-all hover:bg-white/[0.12] hover:-translate-y-0.5"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
