import { Loader } from 'lucide-react';

const PageLoader = () => {
 return (
  <div className="flex items-center gap-2 flex-col justify-center h-screen w-full">
   <Loader className="animate-spin" size={24} />
   <p className="text-center text-sm text-muted-foreground">Loading...</p>
  </div>
 );
}

export default PageLoader;
