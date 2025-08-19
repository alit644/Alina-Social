import MAvatar from "./shared/MAvatar";

const NotificationsCard = () => {
  return (
    <div className="flex items-center justify-between p-4 not-last:border-b">
      <div className="flex items-center gap-2">
        <MAvatar
          src="https://github.com/shadcn.png"
          name="John Doe"
          className="size-[45px]"
        />
        <div>
          <h3 className="text-lg font-semibold">John Doe</h3>
          <p className="text-sm text-[var(--neutral-600)]">start following you.</p>
        </div>
      </div>
      {/* time */}
      <span className="text-[var(--neutral-500)]">
        2 h ago
      </span>
    </div>
  );
};

export default NotificationsCard;
