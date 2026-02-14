interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner = ({ message = 'Loading...' }: LoadingSpinnerProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full animate-in fade-in duration-500">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-muted rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-foreground border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-muted-foreground font-medium animate-pulse">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
