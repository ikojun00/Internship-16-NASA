import React from "react";

interface WithLoadingProps {
  loading: boolean;
  error?: Error | null;
}

function withLoading<P extends object>(
  Component: React.ComponentType<P>
): React.FC<P & WithLoadingProps> {
  return ({ loading, error, ...props }: WithLoadingProps & P) => {
    if (loading) {
      return (
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg">Loading space data...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="text-5xl">🛑</div>
          <h3 className="text-xl font-bold">Houston, we have a problem!</h3>
          <p className="text-red-500">{error.message}</p>
          <p>There was an error loading the data. Please try again later.</p>
        </div>
      );
    }

    return <Component {...(props as P)} />;
  };
}

export default withLoading;
