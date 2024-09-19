import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ConfigProvider } from "antd";

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
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "hsl(262.1 83.3% 57.8%)",
              },
            }}
          >
            <main className="h-screen">{children}</main>
          </ConfigProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
};

export default layout;
