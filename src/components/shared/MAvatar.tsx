import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
interface MAvatarProps {
    src: string;
    name: string;
    className?: string;
}
const MAvatar = ({src, name, className = "h-[50px] w-[50px]" }: MAvatarProps) => {
 return (
   <Avatar className={`${className}`} >
    <AvatarImage loading="lazy" src={src ||"https://avatar.iran.liara.run/public/41"} alt={name} className="object-contain select-none pointer-events-none "/>
    <AvatarFallback>{name}</AvatarFallback>
   </Avatar>
 );
}

export default MAvatar;
