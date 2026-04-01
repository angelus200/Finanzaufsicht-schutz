import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-gray-800 mt-5 mb-2">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-1">{children}</ol>
    ),
    li: ({ children }) => <li className="ml-2">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-400 pl-4 italic text-gray-600 my-4">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="bg-gray-100 text-blue-800 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),
    a: ({ href, children }) => (
      <a href={href} className="text-blue-700 hover:text-blue-900 underline underline-offset-2">
        {children}
      </a>
    ),
    ...components,
  };
}
