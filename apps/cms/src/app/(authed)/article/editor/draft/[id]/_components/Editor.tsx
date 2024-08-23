import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Article } from "@prisma/client";

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";

import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Modal } from "@/components/ui-extends/Modal";
import CategorySelect from "@/components/category/CategorySelect";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { postSaveActical, putUpdateArticle } from "../actions";
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
import { useEditorForm } from "./useEditorForm";

import { useWindowUnload } from "@/hooks/useWindowUnload";

function Editor({ id }: { id: string }) {
  const { form, title, categoryId, editor } = useEditorForm(id);

  const [articleId, setArticleId] = useState(id === "new" ? "" : id);

  const { toast } = useToast();

  const [open, setOpen] = useState(false);

  const router = useRouter();

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
      const res = await postSaveActical({
        title: title,
        content: JSON.stringify(content),
        description: _description,
      });

      if (res.data?.id) {
        onSuccess?.(res);
      }
    } else {
      const res = await putUpdateArticle({
        id: articleId,
        title,
        content: JSON.stringify(content),
        description: _description,
      });

      if (res.code === 200) {
        onSuccess?.(res);
      }
    }
  };

  const onSaveWrapper = () =>
    onSave({
      onSuccess(res) {
        router.replace(`/article`);
        setArticleId(res.data.id);
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
        setOpen(true);
      },
    });

  const onPublish = async () => {
    if (!categoryId) return;

    const res = await putUpdateArticle({
      id: articleId,
      categoryId,
      title,
      description: form.getValues("description"),
      status: "published",
      updatedAt: new Date(),
    });

    if (res.code === 200) {
      setOpen(false);
      router.push(`/faq/article/${articleId}`);
    }
  };

  useWindowUnload();

  return (
    <main className="container rounded bg-background">
      <header className="flex h-16 items-center justify-between px-6">
        <Input
          className="h-12 max-w-[60%] rounded-none border-0 p-0 text-xl placeholder:text-xl focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Enter the article title..."
          value={title}
          onChange={(e) => form.setValue("title", e.target.value)}
        />
        <div className="flex items-center gap-2">
          {articleId && <span>Your article has been saved by the system</span>}
          <Button variant="secondary" onClick={onSaveWrapper}>
            Save
          </Button>
          <Button onClick={() => beforePublish()}>Publish</Button>
        </div>
      </header>

      <section className="rounded-0">
        <div className="flex w-full items-center justify-between border-y border-solid border-border">
          <ToolbarPlugin />
        </div>
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="editor-input"
                aria-placeholder="Enter some rich text..."
                placeholder={
                  <div className="editor-placeholder">
                    Enter some rich text...
                  </div>
                }
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
        </div>
      </section>

      <Modal title="Select category" open={open} setOpen={setOpen}>
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
              onClick={() => setOpen(false)}
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

export default Editor;
