import { delay } from "@/lib/delay";
import { useCallback, useRef, useState } from "react";
import { ResponseData } from "@repo/database/types";

export const useList = <T, P extends Record<string, any>>(
  queryParams: { pageID?: number; pageSize?: number } & P,
  service: (
    params: typeof queryParams & { pageID: number; pageSize: number },
  ) => Promise<
    ResponseData<{
      list: T[];
      totalPage: number;
      totalCount: number;
      pageId: number;
      pageSize: number;
    }>
  >,
  options?: {
    delay?: number;
  },
) => {
  const params = useRef(
    Object.assign({ pageID: 1, pageSize: 10 }, queryParams),
  );

  params.current = Object.assign(params.current, queryParams);

  const [pageID, setPageID] = useState(params.current.pageID);
  const [pageSize, setPageSize] = useState(params.current.pageSize);
  const [totalPage, setTotalPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T[]>();
  const [error, setError] = useState("");

  const canNextPage = pageID < totalPage;

  const canPreviousPage = pageID > 1;

  const fetch = useCallback(async () => {
    setLoading(true);
    const [{ code, data, message }, _] = await Promise.all([
      service(params.current),
      delay((options?.delay || 1) * 1000),
    ]);
    if (code === 200) {
      setData(data.list || []);
      setTotalPage(data?.totalPage);
      setTotalCount(data?.totalCount);
    } else {
      setError(message);
    }
    setLoading(false);
  }, [service, options]);

  const nextPage = () => {
    // 检查可否下一页
    if (totalPage && pageID < totalPage) {
      setPageID(pageID + 1);
      params.current = {
        ...params.current,
        pageID: pageID + 1,
      };
      fetch();
    }
  };

  const previousPage = () => {
    // 检查可否下一页
    if (pageID > 1) {
      setPageID(pageID - 1);
      params.current = {
        ...params.current,
        pageID: pageID - 1,
      };
      fetch();
    }
  };

  const onPageIdChange = (pageID: number) => {
    setPageID(pageID);
    fetch();
  };

  const onPageSizeChange = (pageSize: number) => {
    setPageSize(pageSize);
    fetch();
  };

  return {
    pageID,
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
