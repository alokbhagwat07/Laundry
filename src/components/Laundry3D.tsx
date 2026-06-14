"use client";

export default function Laundry3D() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none pointer-events-none">
      {/* 3D Washing Machine */}
      <div className="relative animate-isometric-float" style={{ transformStyle: "preserve-3d" }}>
        <div className="relative w-40 h-44 sm:w-48 sm:h-52">
          {/* Machine shadow */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-4 bg-blue-900/20 rounded-full blur-lg" />

          {/* Machine body - isometric tilted */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-2xl shadow-2xl overflow-hidden"
            style={{ transform: "perspective(800px) rotateX(8deg) rotateZ(-4deg)" }}
          >
            {/* Body shine */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
            {/* Door */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-blue-700 to-blue-800 border-4 border-blue-300/30 shadow-inner overflow-hidden">
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-900 to-blue-950">
                {/* Inner shine */}
                <div className="absolute top-1 left-1 w-3 h-3 rounded-full bg-white/20 blur-sm" />
                <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-blue-800/50" />
              </div>
            </div>
            {/* Control panel */}
            <div className="absolute top-3 right-3 flex gap-1">
              <div className="w-2 h-2 rounded-full bg-green-400 shadow-lg shadow-green-400/50 animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-blue-200" />
            </div>
            {/* Base */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-blue-800 rounded-b-2xl" />
          </div>
        </div>
      </div>

      {/* Floating clothes - left */}
      <div
        className="absolute top-8 -left-8 sm:-left-12 animate-float-delayed"
        style={{ animationDelay: "0.5s" }}
      >
        <div
          className="w-14 h-16 sm:w-16 sm:h-20 bg-gradient-to-br from-blue-200 to-blue-300 rounded-lg shadow-lg opacity-80"
          style={{ transform: "perspective(400px) rotateX(20deg) rotateZ(15deg)" }}
        />
      </div>

      {/* Floating clothes - right */}
      <div
        className="absolute bottom-4 -right-6 sm:-right-10 animate-float-slow"
        style={{ animationDelay: "1.5s" }}
      >
        <div
          className="w-12 h-14 sm:w-14 sm:h-16 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-lg shadow-lg opacity-70"
          style={{ transform: "perspective(400px) rotateX(-15deg) rotateZ(-10deg)" }}
        />
      </div>

      {/* Floating clothes - top right */}
      <div
        className="absolute -top-2 right-4 animate-float"
        style={{ animationDelay: "2.5s" }}
      >
        <div
          className="w-10 h-12 sm:w-12 sm:h-14 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-lg shadow-lg opacity-60"
          style={{ transform: "perspective(400px) rotateX(25deg) rotateZ(-20deg)" }}
        />
      </div>

      {/* Bubbles */}
      <div className="absolute -top-4 left-2 w-6 h-6 rounded-full bg-white/30 border border-white/40 animate-float" style={{ animationDelay: "0.2s", animationDuration: "4s" }} />
      <div className="absolute bottom-8 -left-2 w-4 h-4 rounded-full bg-white/20 border border-white/30 animate-float" style={{ animationDelay: "1.2s", animationDuration: "5s" }} />
      <div className="absolute top-12 -right-2 w-5 h-5 rounded-full bg-white/25 border border-white/30 animate-float" style={{ animationDelay: "2s", animationDuration: "4.5s" }} />
      <div className="absolute bottom-16 right-6 w-3 h-3 rounded-full bg-white/20 border border-white/30 animate-float-slow" style={{ animationDelay: "0.8s" }} />

      {/* Sparkle effects */}
      <div className="absolute top-2 -left-4 w-2 h-2 bg-blue-300 rounded-full animate-pulse shadow-lg shadow-blue-300/50" />
      <div className="absolute -bottom-2 right-8 w-1.5 h-1.5 bg-indigo-300 rounded-full animate-pulse shadow-lg shadow-indigo-300/50" style={{ animationDelay: "1s" }} />
    </div>
  );
}
