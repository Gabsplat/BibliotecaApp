import { useRouter, useSegments } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useProtectedRoute(user);

  const login = (username, password) => {
    setError(null); // Reset error state
    fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/login/password`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log("Login Error:", data.error);
          setError(data.error);
          setUser(null);
        } else {
          setUser(data);
        }
      })
      .catch((err) => {
        console.error("Network Error:", err);
        setError("Failed to connect to server.");
      });
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, error }}>
      {children}
    </AuthContext.Provider>
  );
}

function useProtectedRoute(user) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    console.log("User?", user);

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace("/login");
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace("/");
    }
  }, [user, segments]);
}
