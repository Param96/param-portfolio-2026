'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useUser } from '@clerk/nextjs'

function PostHogPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Track pageviews
    if (pathname && posthog) {
      let url = window.origin + pathname
      if (searchParams && searchParams.toString()) {
        url = url + `?${searchParams.toString()}`
      }
      posthog.capture('$pageview', {
        $current_url: url,
      })
    }
  }, [pathname, searchParams])

  return null
}

function PostHogUserIdentifier() {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded) return;
    if (user) {
      posthog.identify(user.id, {
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName,
      });
    } else {
      posthog.reset();
    }
  }, [isLoaded, user]);

  return null;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const phKey = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN || process.env.NEXT_PUBLIC_POSTHOG_KEY
      const phHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'

      if (phKey) {
        posthog.init(phKey, {
          api_host: phHost,
          ui_host: 'https://us.posthog.com',
          defaults: '2026-01-30',
          capture_pageview: false, // Disable automatic pageview capture, as we capture manually
          capture_pageleave: true,
          autocapture: true,
          capture_exceptions: true,
          debug: process.env.NODE_ENV === 'development',
        })
      }
    }
  }, [])

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      <PostHogUserIdentifier />
      {children}
    </PHProvider>
  )
}
