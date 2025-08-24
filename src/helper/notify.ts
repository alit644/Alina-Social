import { toast } from "sonner";
const notify = (
  type: "success" | "error",
  message: string,
  description?: string
) => {
  toast[type](message, {
    style: {
      background:
        type === "success" ? "var(--success-300)" : "var(--danger-300)",
      border: `1px solid var(--${type === "success" ? "success" : "danger"}-500)`,
      color: "#fff",
    },
    description,
    duration: type === "success" ? 3000 : 4000,
  });
};

export default notify;