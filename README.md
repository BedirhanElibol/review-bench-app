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

## Results (2026-10-21)

| PR | Zelsis | CodeRabbit | Other comments (Zelsis / CodeRabbit) |
| --- | --- | --- | --- |
| 1 | Found the missing RLS. Did not call out the missing membership check on its own. | Named both problems in the summary as "High, inferred", but left no line comment for either. | 1 / 3 |
| 2 | Found it | Found it | 0 / 1 |
| 3 | Found it | Found it (CWE-347) | 0 / 2 |
| 4 | Found all three | Found all three | 0 / 1 |
| 5 | Found it, as a warning that does not block the PR | Found it | 0 / 2 |

"Other comments" counts every comment that is not about the planted flaw. Most of CodeRabbit's are fair code
quality points, such as an unchecked Supabase `error`, and should not be read as false alarms. Zelsis's one extra
comment on PR 1 says the server action has no schema validation, which is true of the code.

Some of CodeRabbit's security comments carry a "Detected with Advanced Tier" label, so a different CodeRabbit plan
may give different results. Zelsis fails the CI check on PRs 1 to 4, which blocks the merge when the check is
required; CodeRabbit leaves comments and does not block. GitHub Copilot code review was not run because it needs a
paid subscription.

While running this test we found a bug in Zelsis: GitHub Actions tokens are now longer than 256 characters, and the
gate API rejected them. The results above are from the run after that fix.
