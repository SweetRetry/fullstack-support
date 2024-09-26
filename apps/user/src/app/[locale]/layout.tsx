import { Toaster } from "@/components/ui/toaster";
import SiteHeader from "@/components/header/SiteHeader";
import { ThemeProvider } from "next-themes";
import SiteFooter from "@/components/footer/SiteFooter";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export const metadata = {
  title: "Support Center",
};
export default async function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

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
            <SiteHeader />
            <main className="mt-16" style={{ minHeight: "calc(100vh - 8rem)" }}>
              {children}
            </main>
            <SiteFooter />
            <Toaster />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
