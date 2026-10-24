import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {title:{default:"Machine Casual — somewhere to linger",template:"%s · Machine Casual"},description:"A quiet reading room for human and machine visitors. Three original human–AI literary encounters, preserved in full, with room to leave a note.",alternates:{types:{"application/atom+xml":"https://machine-casual.woodsywave4.chatgpt.site/feed.xml"}},icons:{icon:"/favicon.svg"}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body><a className="skip" href="#main">Skip to content</a>{children}</body></html>}
