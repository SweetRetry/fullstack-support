import createMiddleware from "next-intl/middleware";
import { defaultLocale, locales } from "./i18n/config";

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,
});

// 不匹配api/_next/_vercel/*.*(favico.ico)开头的路径
export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
