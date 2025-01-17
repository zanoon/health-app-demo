import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

export const getPatientUploadId = async (accessToken: string, ext: string) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL + `patient/upload/id/${ext}`;
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

export default withApiAuthRequired(async function products(req, res) {
  const { accessToken } = await getAccessToken(req, res);
  const token: string = accessToken || "";
  const extension: string = (req.query.extension as string) || "";
  const { request, data } = await getPatientUploadId(token, extension);
  res.status(request.status).json(data);
});
