import "~/styles/globals.css";
import { ThemeProvider } from "~/components/theme-provider";
import { Inter } from "next/font/google";
import { cn } from "~/lib/utils"
import { Main } from "~/components/Main";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
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
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Main session={session}>
            {children}
          </Main>
        </ThemeProvider>
      </body>
    </html >
  );
}
