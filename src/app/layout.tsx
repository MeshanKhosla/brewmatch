import "~/styles/globals.css";
import { Itim } from "next/font/google";
import { cn } from "~/lib/utils";
import { Main } from "~/components/Main";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { Toaster } from "~/components/ui/sonner";

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });
const itim = Itim({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-serif",
});
export const metadata = {
  title: "BrewMatch",
  description: "Find your perfect drink",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "font-sans min-h-screen bg-background antialiased",
          itim.variable,
        )}
      >
        <Main session={session}>{children}</Main>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
