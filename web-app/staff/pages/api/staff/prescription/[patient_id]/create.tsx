import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

export const createPrescription = async (
  patient_id: string,
  body: any,
  accessToken: string,
) => {
  const baseURL =
    process.env.NEXT_PUBLIC_API_URL +
    `staff/patient/${patient_id}/prescription/create`;
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
  const patient_id: string = (req.query.patient_id as string) || "";
  const token: string = accessToken || "";

  if (req.method === "POST") {
    const { request, data } = await createPrescription(
      patient_id,
      JSON.stringify(req.body),
      token,
    );
    res.status(request.status).json(data);
  }
});
