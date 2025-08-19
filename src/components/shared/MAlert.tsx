import { Alert, AlertDescription , AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
interface IAlert {
 title: string;
 description: string;
 variant: "destructive" | "default" | "success";
}
const MAlert = ({title , description , variant = "default"}: IAlert) => {
 return (
  <Alert variant={variant} className="w-fit">
  <Terminal />
  <AlertTitle>{title}</AlertTitle>
  <AlertDescription>
    {description}
  </AlertDescription>
</Alert>
 );
}

export default MAlert;
