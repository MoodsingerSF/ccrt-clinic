import React from "react";
import ExampleTheme from "./themes/ExampleTheme";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
import CodeHighLightPlugin from "./plugins/CodeHighLightPlugin";
import PlaygroundAutoLinkPlugin from "./plugins/PlaygroundAutoLinkPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import PropTypes from "prop-types";
import ClassNames from "classnames";
function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

export default function Editor({
  editorStateRef,
  readOnly = false,
  initialEditorState = null,
}) {
  const editorConfig = {
    ...(readOnly ? { readOnly } : {}),
    ...(initialEditorState !== null ? { editorState: initialEditorState } : {}),
    theme: ExampleTheme,
    onError(error) {
      throw error;
    },
    // Any custom nodes go here
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode,
    ],
  };
  return (
    <LexicalComposer initialConfig={editorConfig}>
      {/* console.log(initialConfig); */}

      <div
        className={ClassNames({
          "editor-container": true,
          "editor-container-editable": !readOnly,
        })}
      >
        {!readOnly && <ToolbarPlugin />}
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
          />
          {!readOnly && (
            <OnChangePlugin
              onChange={(editorState) => (editorStateRef.current = editorState)}
            />
          )}

          {/* <LexicalOnChangePlugin
            onChange={(editorState) => (editorStateRef.current = editorState)}
          />
          <Button
            label="Save"
            onPress={() => {
              if (editorStateRef.current) {
                saveContent(JSON.stringify(editorStateRef.current));
              }
            }}
          /> */}

          <HistoryPlugin />
          <CheckListPlugin />
          <AutoFocusPlugin />
          <CodeHighLightPlugin />
          <ListPlugin />
          <LinkPlugin />
          <PlaygroundAutoLinkPlugin />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        </div>
      </div>
    </LexicalComposer>
  );
}

Editor.propTypes = {
  editorStateRef: PropTypes.object,
  readOnly: PropTypes.bool,
  initialEditorState: PropTypes.string,
};
