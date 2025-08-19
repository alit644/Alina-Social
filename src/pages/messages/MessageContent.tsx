import MAvatar from "@/components/shared/MAvatar";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

const MessageContent = () => {
  return (
    <article className="w-full">
      <section className="flex flex-row items-center gap-4 ">
        <MAvatar src="https://github.com/shadcn.png" name="salman" />
        <div className="flex-1 relative">
          <Input placeholder="Type your message" className="w-full h-10" />
          <Send className="w-6 h-6 text-gray-500 absolute right-2 bottom-2" />
        </div>
      </section>
    </article>
  );
};

export default MessageContent;
