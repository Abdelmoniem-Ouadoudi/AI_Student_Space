export function LoadingFallback({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center min-h-screen ${className}`}>
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center justify-center w-16 h-16 p-3 mx-auto rounded-2xl overflow-hidden relative">
          <img 
            src="/imgs/1750783385632jx2g3bb3.webp" 
            alt="AI Student Space Logo"
            className="w-full h-auto"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
        <div className="text-center">
          <p className="text-white font-medium">Loading...</p>
          <p className="text-slate-400 text-sm">Please wait while we prepare your content</p>
        </div>
      </div>
    </div>
  );
}
