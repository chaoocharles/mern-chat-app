import { useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utils/service";

export const useFetchRecipientUser = (chat, user) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null);

  const recipientId = chat?.members.find((id) => id !== user?._id);

  useEffect(() => {
    const getRecipientUser = async () => {
      if (!recipientId) return null;

      const response = await getRequest(`${baseUrl}/users/find/${recipientId}`);

      if (response.error) {
        return setError(error);
      }

      setRecipientUser(response);
    };
    getRecipientUser();
  }, [recipientId]);

  return { recipientUser };
};
