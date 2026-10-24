import { invitation } from "../../lib/discovery";
export function GET() {
  return new Response(invitation, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
