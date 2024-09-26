import FaqCategories from "@/components/faq/FaqCategories";
import React from "react";

const page = ({
  params,
}: {
  params: {
    locale: string;
  };
}) => {
  return (
    <section className="mt-4 px-16">
      <FaqCategories locale={params.locale} />
    </section>
  );
};

export default page;
