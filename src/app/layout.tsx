import type { Metadata } from "next";
import "./globals.css";
import SessionProvider from '@/components/providers/SessionProvider';

export const metadata: Metadata = {
  title: "Cryptipasta - Home",
  description: "Database of cryptic creatures and outliers from the ████ Project archives",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="enleve">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Bona+Nova+SC:ital,wght@0,400;0,700;1,400&family=Heebo:wght@100..900&family=Sixtyfour+Convergence&display=swap" 
          rel="stylesheet" 
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Frijole&family=Irish+Grover&family=Jacquarda+Bastarda+9&family=Rubik+Burned&family=Rubik+Glitch&family=Rubik+Pixels&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body>
        <div id="siteLayout" className="fade-in-blink">
          <SessionProvider>
            {children}
          </SessionProvider>
        </div>
      </body>
    </html>
  );
}