import SectionWrap from "@/components/SectionWrap";
import SearchContainer from "../../components/SearchContainer";

import FaqCategories from "@/components/faq/FaqCategories";

export default async function Home() {
  return (
    <main>
      <SectionWrap>
        <h1 className="mb-10 text-4xl font-bold">Support Center</h1>
        <h2 className="text-3xl font-semibold">Search our FAQ</h2>
        <SearchContainer />
      </SectionWrap>

      <SectionWrap>
        <h2 className="text-3xl font-semibold">FAQ Category</h2>

        <FaqCategories />
      </SectionWrap>
    </main>
  );
}
