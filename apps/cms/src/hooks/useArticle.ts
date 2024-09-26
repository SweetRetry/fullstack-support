import { ArticleStatus } from "@prisma/client";
import { useTranslations } from "next-intl";

export const useArticleTranslate = () => {
  const t = useTranslations();
  
  const ArticleStatusTranslate: Record<ArticleStatus, string> = {
    [ArticleStatus.DRAFT]: t("draft"),
    [ArticleStatus.DELETED]: t("deleted"),
    [ArticleStatus.PENDING]: t("pending"),
    [ArticleStatus.PUBLISHED]: t("published"),
    [ArticleStatus.UNDER_REVIEW]: t("under-review"),
    [ArticleStatus.UNPUBLISHED]: t("unpublished"),
  };

  return { ArticleStatusTranslate };
};
