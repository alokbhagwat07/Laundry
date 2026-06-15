"use client";

export default function Laundry3D() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none pointer-events-none">
      <div className="relative" style={{ transformStyle: "preserve-3d" }}>
        {/* Orbiting rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-72 h-72 rounded-full border border-blue-500/10 animate-orb-rotate" />
          <div className="absolute w-56 h-56 rounded-full border border-indigo-500/10 animate-orb-rotate-reverse" />
        </div>

        {/* Washing machine */}
        <div className="relative animate-isometric-float" style={{ transformStyle: "preserve-3d" }}>
          <div className="relative w-44 h-48 sm:w-52 sm:h-56">
            {/* Glow behind machine */}
            <div className="absolute -inset-10 bg-gradient-to-br from-blue-500/20 via-indigo-500/10 to-purple-500/20 rounded-full blur-3xl animate-glow-pulse" />

            <div
              className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 rounded-2xl shadow-2xl overflow-hidden"
              style={{ transform: "perspective(800px) rotateX(8deg) rotateZ(-4deg)" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent" />

              {/* Door */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-blue-700 to-blue-900 border-4 border-blue-400/20 shadow-inner overflow-hidden">
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-900 to-blue-950">
                  <div className="absolute top-2 left-2 w-4 h-4 rounded-full bg-white/20 blur-sm" />
                  <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-blue-800/50" />
                  {/* Rotating inner light */}
                  <div className="absolute inset-0 rounded-full border-2 border-blue-400/10 animate-spin-slow" />
                </div>
              </div>

              {/* Control panel lights */}
              <div className="absolute top-3 right-3 flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-green-400 shadow-lg shadow-green-400/50 animate-pulse" />
                <div className="w-2.5 h-2.5 rounded-full bg-blue-300" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" style={{ animationDelay: "1s" }} />
              </div>

              {/* Brand text */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <p className="text-[8px] font-bold text-white/30 tracking-[0.2em] uppercase">Mauli</p>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-2 bg-blue-900 rounded-b-2xl" />
            </div>
          </div>
        </div>

        {/* Floating clothes */}
        <div className="absolute top-6 -left-16 animate-float-delayed" style={{ animationDelay: "0.3s" }}>
          <div className="w-16 h-20 bg-gradient-to-br from-blue-300 to-blue-500 rounded-xl shadow-xl opacity-70 blur-[0.5px]" style={{ transform: "perspective(400px) rotateX(20deg) rotateZ(15deg)" }}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl" />
          </div>
        </div>

        <div className="absolute bottom-2 -right-14 animate-float-slow" style={{ animationDelay: "1.2s" }}>
          <div className="w-14 h-18 bg-gradient-to-br from-indigo-300 to-purple-500 rounded-xl shadow-xl opacity-60" style={{ transform: "perspective(400px) rotateX(-15deg) rotateZ(-10deg)" }}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl" />
          </div>
        </div>

        <div className="absolute -top-4 right-2 animate-float" style={{ animationDelay: "2s" }}>
          <div className="w-12 h-14 bg-gradient-to-br from-cyan-300 to-blue-400 rounded-xl shadow-xl opacity-50" style={{ transform: "perspective(400px) rotateX(25deg) rotateZ(-20deg)" }}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl" />
          </div>
        </div>

        <div className="absolute top-12 -right-20 animate-float-slow" style={{ animationDelay: "3s" }}>
          <div className="w-10 h-12 bg-gradient-to-br from-emerald-200 to-teal-400 rounded-lg shadow-xl opacity-40" style={{ transform: "perspective(400px) rotateX(-10deg) rotateZ(25deg)" }}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-lg" />
          </div>
        </div>

        {/* Bubbles */}
        <div className="absolute -top-6 left-0 w-7 h-7 rounded-full bg-white/20 border border-white/30 animate-float shadow-lg" style={{ animationDelay: "0.2s", animationDuration: "4s" }} />
        <div className="absolute bottom-6 -left-4 w-5 h-5 rounded-full bg-blue-300/20 border border-blue-400/30 animate-float shadow-lg" style={{ animationDelay: "1.2s", animationDuration: "5s" }} />
        <div className="absolute top-16 -right-4 w-6 h-6 rounded-full bg-white/15 border border-white/30 animate-float shadow-lg" style={{ animationDelay: "2s", animationDuration: "4.5s" }} />
        <div className="absolute bottom-20 right-8 w-4 h-4 rounded-full bg-indigo-300/20 border border-indigo-400/30 animate-float-slow shadow-lg" style={{ animationDelay: "0.8s" }} />
        <div className="absolute top-8 left-12 w-3 h-3 rounded-full bg-white/20 border border-white/40 animate-float" style={{ animationDelay: "3s", animationDuration: "3.5s" }} />
        <div className="absolute -bottom-2 -right-6 w-5 h-5 rounded-full bg-blue-200/15 border border-blue-300/30 animate-float-slow shadow-lg" style={{ animationDelay: "1.5s" }} />

        {/* Sparkle effects */}
        <div className="absolute top-0 -left-6 w-2.5 h-2.5 bg-blue-400 rounded-full animate-pulse shadow-lg shadow-blue-400/50" />
        <div className="absolute -bottom-4 right-10 w-2 h-2 bg-indigo-400 rounded-full animate-pulse shadow-lg shadow-indigo-400/50" style={{ animationDelay: "1s" }} />
        <div className="absolute top-20 -right-8 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse shadow-lg shadow-purple-400/50" style={{ animationDelay: "0.5s" }} />
      </div>
    </div>
  );
}
