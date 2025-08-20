import { Loader } from 'lucide-react';
import Logo from '@/components/shared/Logo';

const PageLoader = () => {
 return (
  <div className="flex items-center gap-2 flex-col justify-center h-screen w-full">
   <Logo/>
   <Loader className="animate-spin" size={20} />
   <p className="text-center text-lg text-muted-foreground">Loading...</p>
  </div>
 );
}

export default PageLoader;
