import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cryptipasta - Home",
  description: "Database of cryptic creatures and survivors from the ████ Project archives",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="enleve">
      <body>
        <div id="siteLayout" className="fade-in-blink">
          {children}
        </div>
      </body>
    </html>
  );
}