'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

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

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const phKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
      const phHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'

      if (phKey) {
        posthog.init(phKey, {
          api_host: phHost,
          capture_pageview: false, // Disable automatic pageview capture, as we capture manually
          capture_pageleave: true,
          autocapture: true, // Captures clicks, hovers implicitly, but we'll add custom events too
        })
      }
    }
  }, [])

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </PHProvider>
  )
}
