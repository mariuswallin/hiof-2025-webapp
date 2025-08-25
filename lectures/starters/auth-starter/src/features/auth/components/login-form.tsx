"use client";

import { setupAuthClient } from "@/features/auth/lib/auth-client";
import { link, profileRoutes } from "@/shared/links";
import { useState, useTransition } from "react";

const formContainerStyles = {
  background: "#fff",
  padding: "2rem",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  border: "1px solid #eaeaea",
};

const formGroupStyles = {
  marginBottom: "1.25rem",
};

const labelStyles = {
  display: "block",
  marginBottom: "0.5rem",
  fontSize: "0.875rem",
  fontWeight: "500",
  color: "#333",
};

const inputStyles = {
  display: "block",
  width: "100%",
  padding: "0.75rem",
  borderRadius: "6px",
  border: "1px solid #ddd",
  fontSize: "1rem",
  transition: "border-color 0.15s ease-in-out",
  boxSizing: "border-box" as const,
};

const buttonContainerStyles = {
  display: "flex",
  gap: "0.75rem",
  marginTop: "1.5rem",
};

const buttonStyles = {
  flex: "1",
  padding: "0.75rem 1rem",
  background: "#0070f3",
  color: "white",
  border: "none",
  borderRadius: "6px",
  fontSize: "1rem",
  fontWeight: "500",
  cursor: "pointer",
  transition: "background-color 0.15s ease-in-out",
};

const disabledButtonStyles = {
  ...buttonStyles,
  opacity: 0.6,
  cursor: "not-allowed",
  background: "#6c9fff",
};

const resultContainerStyles = (isError: boolean) => ({
  marginTop: "1.25rem",
  padding: "0.875rem",
  borderRadius: "6px",
  background: isError ? "#ffebee" : "#e8f5e9",
  color: isError ? "#c62828" : "#2e7d32",
  fontSize: "0.875rem",
  fontWeight: "500",
  border: `1px solid ${isError ? "#ffcdd2" : "#c8e6c9"}`,
});

export function LoginForm({ authUrl }: { authUrl: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [result, setResult] = useState("");
  const [isPending, startTransition] = useTransition();
  const [isSignUp, setIsSignUp] = useState(false);

  const authClient = setupAuthClient(authUrl);

  const handleSignUp = () => {
    if (!name || !email || !password) {
      setResult("Error: All fields are required for sign up");
      return;
    }

    startTransition(() => {
      authClient.signUp.email(
        {
          email,
          password,
          name,
        },
        {
          onRequest: () => setResult("Signing up..."),
          onSuccess: () => {
            setResult("Signup successful!");
            window.location.href = link(profileRoutes.view);
          },
          onError: (ctx) => {
            console.log("error", ctx.error);
            setResult(`Error: ${ctx.error.message}`);
          },
        }
      );
    });
  };

  const handleLogin = () => {
    if (!email || !password) {
      setResult("Error: Email and password are required");
      return;
    }

    startTransition(() => {
      authClient.signIn.email(
        {
          email,
          password,
        },
        {
          onRequest: () => setResult("Logging in..."),
          onSuccess: () => {
            setResult("Login successful!");
            window.location.href = link("/");
          },
          onError: (ctx) => setResult(`Error: ${ctx.error.message}`),
        }
      );
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    isSignUp ? handleSignUp() : handleLogin();
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "450px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "1.5rem", textAlign: "center" }}>
        {isSignUp ? "Create Account" : "Login"}
      </h1>

      <form style={formContainerStyles} onSubmit={handleSubmit}>
        {isSignUp && (
          <div style={formGroupStyles}>
            <label htmlFor="name" style={labelStyles}>
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyles}
              placeholder="Enter your name"
              autoComplete="name"
            />
          </div>
        )}

        <div style={formGroupStyles}>
          <label htmlFor="email" style={labelStyles}>
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyles}
            placeholder="Enter your email"
            autoComplete="email"
          />
        </div>

        <div style={formGroupStyles}>
          <label htmlFor="password" style={labelStyles}>
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyles}
            placeholder="Enter your password"
            autoComplete={isSignUp ? "new-password" : "current-password"}
          />
        </div>

        {result && (
          <div style={resultContainerStyles(result.includes("Error"))}>
            {result}
          </div>
        )}

        <div style={buttonContainerStyles}>
          <button
            type="submit"
            disabled={isPending}
            style={isPending ? disabledButtonStyles : buttonStyles}
          >
            {isPending
              ? isSignUp
                ? "Creating Account..."
                : "Logging In..."
              : isSignUp
              ? "Create Account"
              : "Log In"}
          </button>
        </div>
      </form>

      <p
        style={{
          marginTop: "1.5rem",
          fontSize: "0.875rem",
          textAlign: "center",
        }}
      >
        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          type="button"
          onClick={() => {
            setIsSignUp(!isSignUp);
            setResult("");
          }}
          style={{
            background: "none",
            border: "none",
            color: "#0070f3",
            fontWeight: "500",
            cursor: "pointer",
            padding: 0,
            fontSize: "0.875rem",
          }}
        >
          {isSignUp ? "Log In" : "Sign Up"}
        </button>
      </p>

      <p
        style={{
          marginTop: "1rem",
          fontSize: "0.875rem",
          color: "#666",
          textAlign: "center",
        }}
      >
        <a href="/" style={{ color: "#0070f3", textDecoration: "none" }}>
          Back to Landing Page
        </a>
      </p>
    </div>
  );
}
