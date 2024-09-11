import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Article, ArticleStatus } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Modal } from "@/components/ui-extends/Modal";
import CategorySelect from "@/components/category/CategorySelect";

import { $getRoot } from "lexical";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { useWindowUnload } from "@/hooks/useWindowUnload";
import Editor from "./Editor";
import { useEditorForm } from "./useEditorForm";
import {
  postSaveActical,
  putUpdateArticle,
} from "@repo/database/services/article";
import { getToken } from "@/lib/tokenUtil";
import { useToast } from "@/hooks/use-toast";
import ButtonLoading from "../ui-extends/ButtonLoading";

function EditorForm({ id }: { id: string }) {
  const { form, title, categoryId, editor } = useEditorForm(id);

  const [articleId, setArticleId] = useState(id === "new" ? "" : id);

  const { toast } = useToast();

  const [publishModalOpen, setPublishModalOpen] = useState(false);

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const onSave = async ({
    onSuccess,
  }: {
    onSuccess?: (
      res: Awaited<ReturnType<typeof postSaveActical>> & {
        data: Article;
      },
    ) => void;
    onFailed?: (res: Awaited<ReturnType<typeof postSaveActical>>) => void;
  }) => {
    setLoading(true);
    const content = editor.getEditorState().toJSON();
    let _description: string = form.getValues("description") || "";

    if (!_description) {
      editor.update(() => {
        // Get the first line of text as the article description
        _description = $getRoot().getFirstChild()?.getTextContent() || "";

        form.setValue("description", _description);
      });
    }

    if (!title && !_description) return;

    if (!articleId) {
      const res = await postSaveActical(
        {
          title: title,
          content: JSON.stringify(content),
          description: _description,
        },
        getToken(),
      );

      if (res?.data?.id) {
        onSuccess?.(res);
      }
    } else {
      const res = await putUpdateArticle(
        {
          id: articleId,
          title,
          content: JSON.stringify(content),
          description: _description,
        },
        getToken(),
      );

      if (res.code === 200 && res.data?.id) {
        onSuccess?.(res);
      }
    }

    setLoading(false);
  };

  const onSaveWrapper = () =>
    onSave({
      onSuccess(res) {
        if (!articleId) {
          router.replace(`/articles/editor/draft/${res.data.id}`);
          return;
        }
        toast({
          title,
          description: "The article has been saved successfully",
          duration: 3000,
        });
      },
    });

  const beforePublish = () =>
    onSave({
      onSuccess(res) {
        setArticleId(res.data.id);
        setPublishModalOpen(true);
      },
    });

  const onPublish = async () => {
    if (!categoryId) return;
    setLoading(true);

    const res = await putUpdateArticle(
      {
        id: articleId,
        categoryId,
        title,
        description: form.getValues("description"),
        status: ArticleStatus.PUBLISHED,
        updatedAt: new Date(),
      },
      getToken(),
    );

    if (res.code === 200) {
      setPublishModalOpen(false);
      toast({
        title: "发布成功",
        description: "文章发布成功",
      });
      router.replace("/articles");
    }

    setLoading(false);
  };

  // useWindowUnload();

  return (
    <main className="container rounded bg-background">
      {articleId && <span>Your article has been saved by the system</span>}
      <header className="flex h-16 items-center justify-between px-6">
        <Input
          className="h-12 max-w-[60%] rounded-none border-0 p-0 text-xl placeholder:text-xl focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Enter the article title..."
          value={title}
          onChange={(e) => form.setValue("title", e.target.value)}
        />
        <div className="flex items-center gap-2">
          <ButtonLoading
            variant="secondary"
            onClick={onSaveWrapper}
            loading={loading}
          >
            Save
          </ButtonLoading>
          <ButtonLoading loading={loading} onClick={() => beforePublish()}>
            Publish
          </ButtonLoading>
        </div>
      </header>

      <section className="rounded-0">
        <Editor />
      </section>

      <Modal title="Select category" open={publishModalOpen} setOpen={setPublishModalOpen}>
        <div className="space-y-4">
          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Article Title</FormLabel>

                    <FormControl>
                      <Input
                        {...field}
                        autoComplete="off"
                        placeholder="Enter the article title"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Article Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Enter the article description"
                      />
                    </FormControl>
                    <FormDescription>
                      You can customize the article description.
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                name="title"
                control={form.control}
                render={() => (
                  <FormItem>
                    <FormLabel>Pulishing Category</FormLabel>

                    <FormControl>
                      <div className="rounded border border-solid border-input">
                        <CategorySelect
                          onSelect={(value) => {
                            form.setValue("categoryId", value);
                          }}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>

          <div className="mt-4 flex justify-end gap-2">
            <Button
              variant="secondary"
              onClick={() => setPublishModalOpen(false)}
              className="mobile:flex-1"
            >
              Cancel
            </Button>
            <Button onClick={onPublish} className="mobile:flex-1">
              Publish
            </Button>
          </div>
        </div>
      </Modal>
    </main>
  );
}

export default EditorForm;
