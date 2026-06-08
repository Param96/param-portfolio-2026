<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into this Next.js App Router portfolio. The existing `PostHogProvider` was updated to include user identification via Clerk — authenticated admin users are now automatically identified with their Clerk user ID, email, and name. Four new `posthog.capture()` call sites were added to fill gaps in the funnel: `experiment_accessed` in `CurrentExperiments`, `blog_article_clicked` in `BlogList`, `lab_note_clicked` in `LabNotesList`, and `research_item_clicked` via a new `ResearchLink` client component used in the server-rendered research list page. Environment variables (`NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`) were confirmed and written to `.env.local`.

| Event | Description | File |
|---|---|---|
| `experiment_accessed` | Fired when a visitor clicks "Access System" on a current experiment card | `src/components/CurrentExperiments.tsx` |
| `blog_article_clicked` | Fired when a visitor clicks a blog article row in the blog listing | `src/components/BlogList.tsx` |
| `lab_note_clicked` | Fired when a visitor clicks a lab note title in the lab notes list | `src/components/LabNotesList.tsx` |
| `research_item_clicked` | Fired when a visitor clicks a research project title or "Read Full Research" link | `src/app/research/page.tsx` (via `src/components/research/ResearchLink.tsx`) |

> Previously instrumented events (untouched): `project_link_clicked`, `project_features_expanded`, `article_viewed` (server-side), `article_scroll_depth`, `article_reading_finished`, `article_shared`, `article_bookmarked`, `blog_category_filtered`, `social_link_clicked`, `nav_collaborate_clicked`, `contact_cta_clicked`, `resume_contact_clicked`, `cinematic_interaction_started/finished`, and `$pageview`.

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard** — [Analytics basics (wizard)](https://us.posthog.com/project/459268/dashboard/1682982)
- **Insight 1** — [Content Views & Clicks Over Time](https://us.posthog.com/project/459268/insights/VFznQxTF) — article_viewed, blog_article_clicked, lab_note_clicked, research_item_clicked trends
- **Insight 2** — [Blog Reading Funnel](https://us.posthog.com/project/459268/insights/Ql6muvkl) — blog_article_clicked → article_reading_finished conversion rate
- **Insight 3** — [Collaboration Conversion Funnel](https://us.posthog.com/project/459268/insights/vWOSsvr8) — page view → collaborate click funnel
- **Insight 4** — [Project & Experiment Engagement](https://us.posthog.com/project/459268/insights/J4WQc7u9) — project_link_clicked, experiment_accessed, project_features_expanded over time
- **Insight 5** — [Outreach Actions Over Time](https://us.posthog.com/project/459268/insights/Zut8Rc8e) — social_link_clicked, contact_cta_clicked, resume_contact_clicked trends

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
