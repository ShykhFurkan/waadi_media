import React from 'react';

export function JsonLd({
  data,
}: {
  data?: Record<string, unknown> | Record<string, unknown>[] | null;
}) {
  if (!data) return null;
  const jsonString = JSON.stringify(data);
  if (!jsonString) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  );
}
