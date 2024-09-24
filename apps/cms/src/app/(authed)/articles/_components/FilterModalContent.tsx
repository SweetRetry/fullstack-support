import { Modal } from "@/components/ui-extends/Modal";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArticleStatus, Category } from "@repo/database";
import { getCategoryList } from "@repo/database/services/category";
import React, { useEffect, useState } from "react";

const FilterModal = ({
  onConfirm,
  open,
  setOpen,
}: {
  onConfirm: (
    status: ArticleStatus | undefined,
    categoryId: string | undefined,
  ) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const [categoryId, setCategoryId] = useState<string>();
  const [status, setStatus] = useState<ArticleStatus | undefined>();

  const [categoryList, setCategoryList] = useState<Category[]>();

  async function fetchCategoryList() {
    const res = await getCategoryList();
    if (res.data && !categoryList?.length) {
      setCategoryList(res.data);
    }
  }

  const onReset = () => {
    setCategoryId(undefined);
    setStatus(undefined);
  };

  useEffect(() => {
    fetchCategoryList();
  }, []);

  return (
    <Modal open={open} setOpen={setOpen} title="Filter">
      <div className="space-y-3">
        <Select
          onValueChange={(value) => {
            setCategoryId(value as ArticleStatus);
          }}
          value={categoryId}
        >
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categoryList?.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={status}
          onValueChange={(value: string) => {
            setStatus(value as ArticleStatus);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(ArticleStatus).map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="space-x-2 text-right">
          <Button variant="secondary" onClick={onReset}>
            Reset
          </Button>
          <Button onClick={() => onConfirm(status, categoryId)}>Confirm</Button>
        </div>
      </div>
    </Modal>
  );
};

export default FilterModal;
