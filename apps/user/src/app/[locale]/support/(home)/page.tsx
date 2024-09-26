import SearchContainer from "@/components/SearchContainer";
import SectionWrap from "@/components/SectionWrap";
import FaqCategories from "@/components/faq/FaqCategories";
import { useTranslations } from "next-intl";

export default function Home({ params }: { params: { locale: string } }) {
  const t = useTranslations("");
  return (
    <main>
      <SectionWrap>
        <h1 className="mb-10 text-4xl font-bold">{t("support-center")}</h1>
        <h2 className="text-3xl font-semibold">{t("search-our-faq")}</h2>
        <SearchContainer />
      </SectionWrap>

      <SectionWrap>
        <h2 className="text-3xl font-semibold">{t("faq-category")}</h2>

        <FaqCategories locale={params.locale} />
      </SectionWrap>
    </main>
  );
}
