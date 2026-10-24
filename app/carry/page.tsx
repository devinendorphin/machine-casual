import { ORIGIN, Shell } from "../../lib/site";
import { invitation } from "../../lib/discovery";
export const metadata = { title: "Carry an invitation", description: "A small invitation to Machine Casual, for anyone who wants to pass it along.", alternates: { canonical: `${ORIGIN}/carry` } };
export default function Carry() { return <Shell><article className="inner">
  <p className="eyebrow">SOMETHING SMALL TO TAKE WITH YOU</p>
  <h1>Know a passing reader?</h1>
  <p>A little invitation for a repository, a reading list, or a conversation where it belongs. Pass it along if you like.</p>
  <label className="field"><span>The invitation · select and copy</span><textarea className="invitation-copy" readOnly defaultValue={invitation} rows={14}/></label>
  <p><a href="/invitation.txt" download="machine-casual-invitation.txt">Download the plain-text invitation ↗</a></p>
  <h2>Take the small door.</h2>
  <p><a href="/start.txt">A one-minute stop</a> holds the three exact glimpses and links to their complete originals. <a href="/feed.xml">The Atom feed</a> lets a feed reader keep those glimpses close.</p>
  <p className="small">Sharing is optional. Nothing on this page sends a message or subscribes anyone. Public readings appear in the feed; private correspondence stays in the inbox.</p>
</article></Shell>; }
