"use client";

export default function Laundry3D() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none pointer-events-none overflow-hidden">
      {/* Aurora background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-indigo-950/30 to-purple-950/40 blur-3xl animate-aurora" />

      <div className="relative" style={{ transformStyle: "preserve-3d" }}>
        {/* Orbiting rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-80 h-80 rounded-full border border-blue-400/20 shadow-[0_0_40px_rgba(96,165,250,0.15)] animate-orb-rotate bg-gradient-to-br from-blue-500/5 to-transparent" />
          <div className="absolute w-64 h-64 rounded-full border border-indigo-400/20 shadow-[0_0_30px_rgba(99,102,241,0.12)] animate-orb-rotate-reverse bg-gradient-to-tr from-indigo-500/5 to-transparent" />
          <div className="absolute w-48 h-48 rounded-full border border-purple-400/15 shadow-[0_0_25px_rgba(168,85,247,0.1)] animate-spin-slower bg-gradient-to-bl from-purple-500/5 to-transparent" />
        </div>

        {/* Washing machine */}
        <div className="relative animate-isometric-float" style={{ transformStyle: "preserve-3d" }}>
          <div className="relative w-44 h-48 sm:w-52 sm:h-56">
            {/* Multi-layer glow behind machine */}
            <div className="absolute -inset-12 bg-gradient-to-br from-blue-500/25 via-indigo-500/15 to-purple-500/25 rounded-full blur-3xl animate-glow-pulse" />
            <div className="absolute -inset-8 bg-gradient-to-tr from-cyan-500/10 to-blue-600/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "1s" }} />

            <div
              className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-800 rounded-2xl shadow-2xl overflow-hidden animate-card-glow"
              style={{ transform: "perspective(800px) rotateX(8deg) rotateZ(-4deg)" }}
            >
              {/* Shimmer overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent animate-tilt-shake" />

              {/* Gradient shift background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/40 via-indigo-600/40 to-purple-700/40 rounded-2xl animate-gradient-shift" />

              {/* Top highlight */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

              {/* Door */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-blue-700 to-blue-950 border-4 border-blue-400/20 shadow-[inset_0_0_30px_rgba(0,0,0,0.5),0_0_20px_rgba(59,130,246,0.15)] overflow-hidden">
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-900 via-blue-950 to-indigo-950">
                  {/* Inner light reflections */}
                  <div className="absolute top-2 left-2 w-5 h-5 rounded-full bg-white/20 blur-sm" />
                  <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-white/30 blur-[1px]" />
                  <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-blue-800/50 blur-[1px]" />
                  <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-blue-500/20 blur-sm" />
                  {/* Rotating inner light */}
                  <div className="absolute inset-0 rounded-full border-2 border-blue-400/15 animate-spin-slow shadow-[0_0_10px_rgba(96,165,250,0.1)]" />
                  {/* Inner door ring */}
                  <div className="absolute inset-1 rounded-full border border-blue-500/10" />
                </div>
              </div>

              {/* Control panel lights */}
              <div className="absolute top-3 right-3 flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-green-400 shadow-lg shadow-green-400/60 animate-pulse" />
                <div className="w-2.5 h-2.5 rounded-full bg-blue-300 shadow-lg shadow-blue-300/30" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-lg shadow-amber-400/50 animate-pulse" style={{ animationDelay: "1s" }} />
                <div className="w-2 h-2 rounded-full bg-red-400/60 shadow-lg shadow-red-400/30" />
              </div>

              {/* Additional control detail */}
              <div className="absolute top-3 left-3 flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-white/15" />
                <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
              </div>

              {/* Brand text */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <p className="text-[8px] font-bold text-white/30 tracking-[0.25em] uppercase bg-gradient-to-r from-blue-300 via-white/40 to-blue-300 bg-clip-text text-transparent">Mauli</p>
              </div>

              {/* Bottom edge accent */}
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-800 via-blue-700 to-indigo-800 rounded-b-2xl" />
              {/* Bottom glow line */}
              <div className="absolute bottom-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
            </div>
          </div>
        </div>

        {/* Floating clothes */}
        <div className="absolute top-6 -left-16 animate-float-delayed" style={{ animationDelay: "0.3s" }}>
          <div className="w-16 h-20 bg-gradient-to-br from-blue-300 via-blue-400 to-blue-600 rounded-xl shadow-2xl shadow-blue-500/30 opacity-80 blur-[0.5px]" style={{ transform: "perspective(400px) rotateX(20deg) rotateZ(15deg)" }}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl" />
          </div>
        </div>

        <div className="absolute bottom-2 -right-14 animate-float-slow" style={{ animationDelay: "1.2s" }}>
          <div className="w-14 h-18 bg-gradient-to-br from-indigo-300 via-purple-400 to-purple-600 rounded-xl shadow-2xl shadow-purple-500/25 opacity-70" style={{ transform: "perspective(400px) rotateX(-15deg) rotateZ(-10deg)" }}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl" />
          </div>
        </div>

        <div className="absolute -top-4 right-2 animate-float" style={{ animationDelay: "2s" }}>
          <div className="w-12 h-14 bg-gradient-to-br from-cyan-300 via-blue-400 to-indigo-500 rounded-xl shadow-2xl shadow-cyan-500/20 opacity-60" style={{ transform: "perspective(400px) rotateX(25deg) rotateZ(-20deg)" }}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl" />
          </div>
        </div>

        <div className="absolute top-12 -right-20 animate-float-slow" style={{ animationDelay: "3s" }}>
          <div className="w-10 h-12 bg-gradient-to-br from-emerald-200 via-teal-300 to-teal-500 rounded-lg shadow-2xl shadow-teal-500/20 opacity-50" style={{ transform: "perspective(400px) rotateX(-10deg) rotateZ(25deg)" }}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-lg" />
          </div>
        </div>

        {/* New floating clothes - top right */}
        <div className="absolute -top-10 right-12 animate-float" style={{ animationDelay: "1.5s" }}>
          <div className="w-8 h-10 bg-gradient-to-br from-pink-200 via-rose-300 to-pink-500 rounded-lg shadow-2xl shadow-pink-500/20 opacity-45" style={{ transform: "perspective(400px) rotateX(30deg) rotateZ(-35deg)" }}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-lg" />
          </div>
        </div>

        {/* New floating clothes - bottom left */}
        <div className="absolute bottom-6 -left-12 animate-float-slow" style={{ animationDelay: "2.5s" }}>
          <div className="w-9 h-11 bg-gradient-to-br from-violet-200 via-violet-300 to-violet-500 rounded-lg shadow-2xl shadow-violet-500/20 opacity-40" style={{ transform: "perspective(400px) rotateX(-20deg) rotateZ(30deg)" }}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-lg" />
          </div>
        </div>

        {/* Bubbles */}
        <div className="absolute -top-6 left-0 w-7 h-7 rounded-full bg-white/20 border border-white/30 animate-float shadow-xl shadow-white/10 backdrop-blur-[1px]" style={{ animationDelay: "0.2s", animationDuration: "4s" }} />
        <div className="absolute bottom-6 -left-4 w-5 h-5 rounded-full bg-blue-300/20 border border-blue-400/30 animate-float shadow-xl shadow-blue-400/10 backdrop-blur-[1px]" style={{ animationDelay: "1.2s", animationDuration: "5s" }} />
        <div className="absolute top-16 -right-4 w-6 h-6 rounded-full bg-white/15 border border-white/30 animate-float shadow-xl shadow-white/10 backdrop-blur-[1px]" style={{ animationDelay: "2s", animationDuration: "4.5s" }} />
        <div className="absolute bottom-20 right-8 w-4 h-4 rounded-full bg-indigo-300/20 border border-indigo-400/30 animate-float-slow shadow-xl shadow-indigo-400/10 backdrop-blur-[1px]" style={{ animationDelay: "0.8s" }} />
        <div className="absolute top-8 left-12 w-3 h-3 rounded-full bg-white/20 border border-white/40 animate-float shadow-xl shadow-white/10" style={{ animationDelay: "3s", animationDuration: "3.5s" }} />
        <div className="absolute -bottom-2 -right-6 w-5 h-5 rounded-full bg-blue-200/15 border border-blue-300/30 animate-float-slow shadow-xl shadow-blue-300/10 backdrop-blur-[1px]" style={{ animationDelay: "1.5s" }} />

        {/* New bubbles */}
        <div className="absolute top-4 -left-8 w-3 h-3 rounded-full bg-white/25 border border-white/40 animate-float shadow-lg" style={{ animationDelay: "0.6s", animationDuration: "5.5s" }} />
        <div className="absolute -top-3 right-0 w-4 h-4 rounded-full bg-purple-200/15 border border-purple-300/30 animate-float-slow shadow-lg shadow-purple-300/10 backdrop-blur-[1px]" style={{ animationDelay: "2.2s" }} />
        <div className="absolute bottom-16 -right-8 w-6 h-6 rounded-full bg-white/10 border border-white/20 animate-morph shadow-lg shadow-white/5 backdrop-blur-[1px]" style={{ animationDelay: "1.8s", animationDuration: "6s" }} />
        <div className="absolute top-24 left-2 w-2.5 h-2.5 rounded-full bg-cyan-200/20 border border-cyan-300/30 animate-bounce-gentle shadow-lg" style={{ animationDelay: "0.4s" }} />

        {/* Sparkle effects */}
        <div className="absolute top-0 -left-6 w-2.5 h-2.5 bg-blue-400 rounded-full animate-pulse shadow-2xl shadow-blue-400/70" />
        <div className="absolute -bottom-4 right-10 w-2 h-2 bg-indigo-400 rounded-full animate-pulse shadow-2xl shadow-indigo-400/70" style={{ animationDelay: "1s" }} />
        <div className="absolute top-20 -right-8 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse shadow-2xl shadow-purple-400/70" style={{ animationDelay: "0.5s" }} />

        {/* New sparkles */}
        <div className="absolute top-14 -left-10 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-pulse shadow-2xl shadow-cyan-300/60" style={{ animationDelay: "0.7s" }} />
        <div className="absolute -bottom-6 left-16 w-2 h-2 bg-pink-400 rounded-full animate-pulse shadow-2xl shadow-pink-400/60" style={{ animationDelay: "1.3s" }} />
        <div className="absolute top-4 right-14 w-1 h-1 bg-amber-300 rounded-full animate-pulse shadow-2xl shadow-amber-300/60" style={{ animationDelay: "0.2s" }} />
        <div className="absolute bottom-24 -left-4 w-1 h-1 bg-white/60 rounded-full animate-pulse shadow-lg" style={{ animationDelay: "0.9s" }} />

        {/* Lens flare */}
        <div className="absolute -top-12 -left-12 w-32 h-32 rounded-full bg-gradient-to-br from-blue-400/10 via-indigo-400/5 to-transparent blur-xl animate-lens-flare" />
      </div>
    </div>
  );
}
