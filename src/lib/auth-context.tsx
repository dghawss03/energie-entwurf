import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
  createElement,
} from "react";
import {
  DEMO_CHANGED,
  DEMO_STORAGE_KEY,
  DEMO_SESSION_KEY,
  getDemoProfile,
  demoSignIn,
  demoSignOut,
} from "./demo-store";
import { useQueryClient } from "@tanstack/react-query";

import { mapRole, getInitials } from "./api-types";
import type { Role } from "./mock-leads";

export interface AppUser {
  id: string;
  profileId: string;
  name: string;
  initials: string;
  email: string;
  role: Role;
}

interface AuthCtx {
  user: AppUser | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  hasRole: (...r: Role[]) => boolean;
}

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();
  useEffect(() => {
    let previousUserId: string | null = null;
    const sync = () => {
      try {
        const profile = getDemoProfile();
        const nextId = profile?.authUserId ?? null;
        if (previousUserId !== nextId) queryClient.clear();
        else void queryClient.invalidateQueries();
        previousUserId = nextId;
        setUser(
          profile
            ? {
                id: profile.authUserId,
                profileId: profile.profileId,
                name: profile.full_name,
                initials: getInitials(profile.full_name),
                email: profile.email,
                role: mapRole(profile.role),
              }
            : null,
        );
      } catch (error) {
        console.error(error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    const storageChanged = (event: StorageEvent) => {
      if (!event.key || [DEMO_STORAGE_KEY, DEMO_SESSION_KEY].includes(event.key)) sync();
    };
    sync();
    window.addEventListener(DEMO_CHANGED, sync);
    window.addEventListener("storage", storageChanged);
    return () => {
      window.removeEventListener(DEMO_CHANGED, sync);
      window.removeEventListener("storage", storageChanged);
    };
  }, [queryClient]);
  const signIn = async (email: string, password: string) => {
    try {
      demoSignIn(email, password);
      return { error: null };
    } catch (error) {
      return { error: error instanceof Error ? error.message : "Lokaler Speicher nicht verfügbar" };
    }
  };
  const signOut = async () => {
    demoSignOut();
    setUser(null);
    queryClient.clear();
  };
  const hasRole = (...roles: Role[]) => user !== null && roles.includes(user.role);
  return createElement(
    Ctx.Provider,
    { value: { user, isLoading, signIn, signOut, hasRole } },
    children,
  );
}

export function useAuth(): AuthCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth muss innerhalb von AuthProvider verwendet werden");
  return ctx;
}

export function useRequireUser(): AppUser {
  const { user, isLoading } = useAuth();
  if (isLoading) throw new Promise<void>(() => {});
  if (!user) throw new Error("Nicht eingeloggt");
  return user;
}

// Anzeigenamen für die Rollen im Mitarbeiterbereich.
export const roleBadgeLabel: Record<Role, string> = {
  admin: "Admin",
  manager: "Manager",
  mitarbeiter: "Mitarbeiter",
};
