"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAlertDialogStore } from "@/store/useAlertDialog";

interface MDropdownMenuProps {
  postId: string;
  children: React.ReactNode;
  onEdit?: () => void;
}

export const MDropddownMenu: React.FC<MDropdownMenuProps> = ({
  postId,
  children,
  onEdit,
}) => {
  const { openPostId, setOpenPostId, setAlertPostId } = useAlertDialogStore();

  return (
    <DropdownMenu
      open={openPostId === postId}
      onOpenChange={(isOpen) => setOpenPostId(isOpen ? postId : null)}
    >
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setAlertPostId(postId)}
          className="text-red-500"
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
