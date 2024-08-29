import { delay } from "@/lib/delay";
import { useDebounceFn } from "ahooks";
import { useCallback, useRef, useState } from "react";
import { ResponseData } from "@repo/database/types/response";

export const useList = <T, P extends Record<string, any> = Record<string, any>>(
  queryParams: Omit<P, "pageId" | "pageSize"> & {
    pageId?: number;
    pageSize?: number;
  },
  service: (
    params: typeof queryParams & { pageId: number; pageSize: number },
  ) => Promise<
    ResponseData<{
      list: T[];
      totalPage: number;
      totalCount: number;
    } | null>
  >,
  options?: {
    delay?: number;
  },
) => {
  const params = useRef(
    Object.assign({ pageId: 1, pageSize: 10 }, queryParams),
  );

  params.current = Object.assign(params.current, queryParams);

  const [pageId, setPageID] = useState(params.current.pageId);
  const [pageSize, setPageSize] = useState(params.current.pageSize);
  const [totalPage, setTotalPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");

  const canNextPage = pageId < totalPage;

  const canPreviousPage = pageId > 1;

  const { run } = useDebounceFn(
    async () => {
      setLoading(true);
      const [{ code, data, message }, _] = await Promise.all([
        service(params.current),
        delay((options?.delay || 1) * 1000),
      ]);

      if (code === 200) {
        setData(data?.list || []);
        setTotalPage(data?.totalPage || 0);
        setTotalCount(data?.totalCount || 0);
      } else {
        setError(message);
      }
      setLoading(false);
    },
    { wait: 200 },
  );

  const fetch = useCallback<() => void>(run, [service, options]);

  const nextPage = () => {
    // 检查可否下一页
    if (totalPage && pageId < totalPage) {
      setPageID(pageId + 1);
      params.current = {
        ...params.current,
        pageId: pageId + 1,
      };
      fetch();
    }
  };

  const previousPage = () => {
    // 检查可否下一页
    if (pageId > 1) {
      setPageID(pageId - 1);
      params.current = {
        ...params.current,
        pageId: pageId - 1,
      };
      fetch();
    }
  };

  const onPageIdChange = (pageId: number) => {
    setPageID(pageId);
    fetch();
  };

  const onPageSizeChange = (pageSize: number) => {
    setPageSize(pageSize);
    fetch();
  };

  return {
    pageId,
    pageSize,
    totalPage,
    totalCount,
    loading,
    data,
    setData,
    error,
    fetch,
    nextPage,
    previousPage,
    onPageIdChange,
    onPageSizeChange,
    canNextPage,
    canPreviousPage,
  };
};
