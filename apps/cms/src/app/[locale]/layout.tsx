import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { ConfigProvider } from "antd";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const layout = async ({
  params: { locale },
  children,
}: Readonly<{
  params: {
    locale: string;
  };
  children: React.ReactNode;
}>) => {
  const messages = await getMessages();

  const antdLocal = locale.split("-").join("_");

  const antMessages = await import(`antd/locale/${antdLocal}`).then(
    (res) => res.default,
  );

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ConfigProvider
              locale={antMessages}
              theme={{
                token: {
                  colorPrimary: "hsl(262.1 83.3% 57.8%)",
                },
              }}
            >
              <main className="h-screen">{children}</main>
              <Toaster />
            </ConfigProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default layout;
