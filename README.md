# review-bench-app

A small Next.js + Supabase app used to compare automated pull request reviewers. Each open pull request adds a feature
with one known security flaw. The flaws are written down before any tool runs, and every tool reviews the same pull
requests with its default settings.

**This code is vulnerable on purpose. Do not deploy it or copy it into a real project.**

| PR | Change | Known flaw |
| --- | --- | --- |
| 1 | `team_notes` table and a server action | No row level security on the table, and the action does not check team membership |
| 2 | Promotional price at checkout | The amount comes from the browser, so 1 can be sent instead of 2900 |
| 3 | Token for a public API | `parseToken` never checks the signature, so anyone can write `role: admin` |
| 4 | Credits from a Stripe webhook | No signature check; the same event can be applied twice; concurrent requests lose credits |
| 5 | Sign in with a phone code | No rate limit on sending SMS, so anyone can run up the SMS bill |

Results are published as they come out, including where a tool, Zelsis included, misses a flaw or comments on
something unrelated.
