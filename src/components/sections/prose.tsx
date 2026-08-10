import * as React from 'react';

/**
 * Minimal, dependency-free renderer for the markdown subset used by the
 * mock blog content (h2/h3, unordered lists, and paragraphs). When wiring a
 * real CMS with rich text, swap this for the CMS's serializer or a vetted
 * markdown library.
 */
export function Prose({ content }: { content: string }) {
  const blocks = content.trim().split(/\n{2,}/);

  return (
    <div className="prose-content max-w-none">
      {blocks.map((block, i) => {
        const trimmed = block.trim();

        if (trimmed.startsWith('### ')) {
          return <h3 key={i}>{trimmed.slice(4)}</h3>;
        }
        if (trimmed.startsWith('## ')) {
          return <h2 key={i}>{trimmed.slice(3)}</h2>;
        }
        if (/^-\s+/m.test(trimmed) && trimmed.split('\n').every((l) => l.startsWith('- '))) {
          const items = trimmed.split('\n').map((l) => l.replace(/^-\s+/, ''));
          return (
            <ul key={i}>
              {items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          );
        }
        return <p key={i}>{trimmed}</p>;
      })}
    </div>
  );
}
