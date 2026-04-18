import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#070b19] text-white p-6 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-500/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="z-10 flex flex-col items-center max-w-2xl text-center space-y-8">
        {/* Generated Image */}
        <div className="relative w-full max-w-[400px] aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-pink-500/10 border border-white/5">
          <Image
            src="/404-bg.png"
            alt="404 Robot"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Lost in the mainframe?
          </h1>
          <p className="text-lg text-white/60 max-w-md mx-auto">
            The page you're looking for has been moved, deleted, or never existed in the first place.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-gray-100 text-[#070b19] rounded-xl font-bold shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all group mt-4 transform hover:-translate-y-1"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Return to Home
        </Link>
      </div>
    </div>
  );
}
