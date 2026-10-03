'use client';

import React from 'react';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          backgroundColor: '#F5F8FC',
          color: '#1B2A4A',
        }}
      >
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              maxWidth: '480px',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#0057FF',
              }}
            >
              Notice
            </span>
            <h1 style={{ fontSize: '2rem', margin: 0, color: '#0A1128' }}>
              Something went wrong.
            </h1>
            <p
              style={{
                color: '#4A5568',
                fontSize: '1rem',
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              An unexpected error occurred. Please refresh the page or contact us directly:
            </p>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '0.75rem',
                marginTop: '1rem',
              }}
            >
              <button
                onClick={() => reset()}
                type="button"
                style={{
                  padding: '0.625rem 1.25rem',
                  backgroundColor: '#0057FF',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '9999px',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                }}
              >
                Try again
              </button>
              <a
                href="https://wa.me/917780940317"
                style={{
                  padding: '0.625rem 1.25rem',
                  backgroundColor: '#ffffff',
                  color: '#1B2A4A',
                  border: '1px solid #D9E2EC',
                  borderRadius: '9999px',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                }}
              >
                WhatsApp
              </a>
              <a
                href="tel:+917780940317"
                style={{
                  padding: '0.625rem 1.25rem',
                  backgroundColor: '#ffffff',
                  color: '#1B2A4A',
                  border: '1px solid #D9E2EC',
                  borderRadius: '9999px',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                }}
              >
                Call +91 77809 40317
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
