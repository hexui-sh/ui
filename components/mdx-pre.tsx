"use client";

import { isValidElement, type ReactNode } from "react";
import {
  CodeSnippet,
  CodeSnippetBody,
  CodeSnippetContent,
  CodeSnippetCopyButton,
  CodeSnippetItem,
  type BundledLanguage,
} from "@/components/ui/snippet";

function getTextContent(children: ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(getTextContent).join("");
  if (isValidElement(children)) {
    return getTextContent(
      (children.props as { children?: ReactNode }).children,
    );
  }
  return "";
}

function getLanguage(className?: string): string | undefined {
  if (!className) return undefined;
  const match = /language-(\w+)/.exec(className);
  return match?.[1];
}

type MdxPreProps = {
  children?: ReactNode;
};

export function MdxPre({ children }: MdxPreProps) {
  if (!isValidElement(children)) {
    return (
      <pre className="max-h-80 w-full max-w-full min-w-0 overflow-auto rounded-md border bg-foreground/2 p-3 font-mono">
        {children}
      </pre>
    );
  }

  const codeProps = children.props as {
    className?: string;
    children?: ReactNode;
  };
  const language = getLanguage(codeProps.className) ?? "text";
  const code = getTextContent(codeProps.children).replace(/\n$/, "");
  const snippetData = [{ language, filename: "", code }];

  return (
    <CodeSnippet
      className="group relative my-6 w-full max-w-full min-w-0 bg-transparent"
      data-code-container="true"
      data={snippetData}
      defaultValue={language}
    >
      <div className="absolute top-2.5 right-2.5 z-10 opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-within:opacity-100">
        <CodeSnippetCopyButton />
      </div>
      <div className="max-h-80 w-full max-w-full min-w-0 overflow-x-auto overflow-y-auto rounded-md border bg-foreground/2">
        <CodeSnippetBody className="w-full max-w-full min-w-0">
          {(item) => (
            <CodeSnippetItem
              key={item.language}
              className="w-full max-w-full min-w-0 bg-transparent! [&_pre]:w-max [&_pre]:min-w-full [&_pre]:max-w-none [&_code]:overflow-x-visible"
              lineNumbers={false}
              value={item.language}
            >
              <CodeSnippetContent
                className="w-full max-w-full min-w-0"
                language={item.language as BundledLanguage}
              >
                {item.code}
              </CodeSnippetContent>
            </CodeSnippetItem>
          )}
        </CodeSnippetBody>
      </div>
    </CodeSnippet>
  );
}
