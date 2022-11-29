export const baseUrl = "http://localhost:5000/api";

export const postRequest = async (url, body) => {
  console.log("body", body);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
  console.log("response", response);

  const data = await response.json();

  if (!response.ok) {
    return { Error: true, Status: response.status, data };
  }

  return data;
};
