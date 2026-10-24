import { shortEntrance } from "../../lib/discovery";
export function GET() {
  return new Response(shortEntrance(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
