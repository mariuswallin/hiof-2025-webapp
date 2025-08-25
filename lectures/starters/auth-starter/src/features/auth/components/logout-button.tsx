"use client";

import { useTransition } from "react";
import { setupAuthClient } from "../lib";
import { authRoutes } from "@/shared/links";

type LogoutButtonProps = {
  className?: string;
  authUrl: string;
};

const buttonStyles = {
  display: "inline-block",
  padding: "0.5rem 1rem",
  background: "#0070f3",
  color: "white",
  border: "none",
  borderRadius: "4px",
  fontSize: "1rem",
  fontWeight: "500",
  cursor: "pointer",
};

const disabledButtonStyles = {
  ...buttonStyles,
  opacity: 0.7,
  cursor: "not-allowed",
};

export function LogoutButton({ className, authUrl }: LogoutButtonProps) {
  const [isPending, startTransition] = useTransition();
  const authClient = setupAuthClient(authUrl);

  const handleSignOut = () => {
    startTransition(() => {
      authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            window.location.href = authRoutes.login;
          },
        },
      });
    });
  };

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={isPending}
      style={isPending ? disabledButtonStyles : buttonStyles}
      className={className}
    >
      {isPending ? "Logging out..." : "Log Out"}
    </button>
  );
}
