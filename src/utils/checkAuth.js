import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "./authService";

export const useAuth = () => {
  const router = useRouter();
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const userLoggedIn = await isLoggedIn();
      if (!userLoggedIn) {
        router.push("/auth/login");
      }
      setIsUserLoading(false);
    };

    checkAuth();
  }, [router]);

  return isUserLoading;
};
