import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

export const createPrescription = async (
  slug: string,
  body: any,
  accessToken: string,
) => {
  const baseURL =
    process.env.NEXT_PUBLIC_API_URL + `prescription/create/practice/` + slug;
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

export default withApiAuthRequired(async function products(req, res) {
  const { accessToken } = await getAccessToken(req, res);
  const slug: string = (req.query.slug as string) || "";
  const token: string = accessToken || "";
  if (req.method === "POST") {
    const { request, data } = await createPrescription(
      slug,
      JSON.stringify(req.body),
      token,
    );
    res.status(request.status).json(data);
  }
});
