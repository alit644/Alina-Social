import NotificationsCard from "@/components/NotificationsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Notifications = () => {
 return (
  <Card className="shadow-none rounded-md gap-0 p-0">
   <CardHeader className="py-4">
    <CardTitle >Notifications</CardTitle>
   </CardHeader>
   <Separator />
   <CardContent className="p-0 my-4">
    <NotificationsCard/>
    <NotificationsCard/>
    <NotificationsCard/>
   </CardContent>
  </Card>
 );
}

export default Notifications;
