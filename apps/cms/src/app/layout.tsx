import { ThemeProvider } from "next-themes";
import "@/styles/globals.css";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="h-screen">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default layout;
