import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useUpdateUser = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch, user } = useAuthContext();

  const updateUser = async (
    first_name,
    last_name,
    email,
    password,
    repeatPassword,
    birthdate
  ) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/v1/auth/update", {
      method: "PATCH",
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        password,
        repeatPassword,
        birthdate,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: "LOGIN", payload: json });

      // update loading state
      setIsLoading(false);
    }
  };

  return { updateUser, isLoading, error };
};
