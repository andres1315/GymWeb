import logoFitWinner from "../assets/fitwinnerlogo.webp";
interface PageLoaderProps {
  loading: boolean;
}

export default function PageLoader({ loading }: PageLoaderProps) {
  
  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-pulse">
          <img
            src={logoFitWinner}
            alt="FitWinner Logo"
            width={200}
            height={120}
            className="object-contain"
          />
        </div>

        <div className="relative">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
        </div>

        <p className="text-white text-lg font-medium animate-pulse">
          Cargando...
        </p>
      </div>
    </div>
  );
}
