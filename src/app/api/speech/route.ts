import { speechResponse } from "@/lib/microsoftSpeechServer";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Credentials remain on the server. Existing recorded clips still play directly. */
export async function POST(request: Request) {
  return speechResponse(request, {
    AZURE_SPEECH_KEY: process.env.AZURE_SPEECH_KEY,
    AZURE_SPEECH_REGION: process.env.AZURE_SPEECH_REGION,
  });
}
