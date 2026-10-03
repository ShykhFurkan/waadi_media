// TODO: Delete this temporary design-system review page before launch.
import React from 'react';
import type { Metadata } from 'next';
import { DesignSystemClient } from './DesignSystemClient';

export const metadata: Metadata = {
  title: 'Design System Review - Waadi Media',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DesignSystemPage() {
  return <DesignSystemClient />;
}
