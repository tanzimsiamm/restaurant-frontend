const Loading: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  return (
    <div className="flex items-center justify-center p-8">
      <div
        className={cn(
          'animate-spin rounded-full border-4 border-gray-200 border-t-primary-600',
          sizes[size]
        )}
      ></div>
    </div>
  );
};

export default Loading;

function cn(arg0: string, arg1: string): string | undefined {
  return `${arg0} ${arg1}`;
}