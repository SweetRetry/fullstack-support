/**
 * resolve by 2wheeh
 * issue https://github.com/facebook/lexical/issues/4960
 * Link to https://github.com/2wheeh/lexical-nextjs-ssr
 */

import { createHeadlessEditor as _createHeadlessEditor } from "@lexical/headless";

import { JSDOM } from "jsdom";
import { $generateHtmlFromNodes } from "@lexical/html";
import { theme } from "./lexicalTheme";

// import { htmlConfig } from "./htmlConfig";

const createHeadlessEditor = ({ namespace }: { namespace?: string }) => {
  return _createHeadlessEditor({
    namespace,
    theme: theme,
    onError: (e: Error) => {
      console.error(e);
    },
    // html: htmlConfig,
  });
};

function setupDom() {
  const dom = new JSDOM();

  const _window = global.window;
  const _document = global.document;

  // @ts-expect-error
  global.window = dom.window;
  global.document = dom.window.document;

  return () => {
    global.window = _window;
    global.document = _document;
  };
}

function setupWindow() {
  const _window = global.window;
  // need to setup window for CodeNode since facebook#5828
  // https://github.com/facebook/lexical/pull/5828
  // @ts-expect-error
  global.window = global;

  return () => {
    global.window = _window;
  };
}

export async function getHtml(serializedEditorState: string) {
  const html: string = await new Promise((resolve) => {
    const cleanup = setupWindow();

    const editor = createHeadlessEditor({
      namespace: "html-render",
    });

    editor.setEditorState(editor.parseEditorState(serializedEditorState));

    cleanup();

    editor.update(() => {
      try {
        const cleanup = setupDom();
        const _html = $generateHtmlFromNodes(editor, null);
        cleanup();

        resolve(_html);
      } catch (e) {
        console.log(e);
      }
    });
  });

  return html;
}
