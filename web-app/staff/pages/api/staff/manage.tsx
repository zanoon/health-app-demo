import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

export const createStaff = async (body: any, accessToken: string) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL + `staff/user`;
  const response = await fetch(baseURL, {
    method: "POST",
    body,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const request = await response;
  const data = await request.json();
  return { request, data };
};

export const getStaff = async (accessToken: string) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL + `staff/user`;
  const response = await fetch(baseURL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const request = await response;
  const data = await request.json();
  return { request, data };
};

export const updateStaff = async (body: any, accessToken: string) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL + `staff/user`;
  const response = await fetch(baseURL, {
    method: "PUT",
    body,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const request = await response;
  const data = await request.json();
  return { request, data };
};

export default withApiAuthRequired(async function products(req, res) {
  const { accessToken } = await getAccessToken(req, res);
  const id: string = (req.query.id as string) || "";
  const token: string = accessToken || "";
  if (req.method === "PUT") {
    const { request, data } = await updateStaff(
      JSON.stringify(req.body),
      token,
    );
    res.status(request.status).json(data);
  } else if (req.method === "GET") {
    const { request, data } = await getStaff(token);
    res.status(request.status).json(data);
  } else if (req.method === "POST") {
    const { request, data } = await createStaff(
      JSON.stringify(req.body),
      token,
    );
    res.status(request.status).json(data);
  }
});