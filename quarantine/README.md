# quarantine/

Files placed here are scanned by the **ClamAV Static File Scan** workflow
(`.github/workflows/clamav-scan.yml`). ClamAV **reads** the bytes and matches
them against virus signatures — it **never executes** the file.

## How a scan happens

| Method | What to do |
| --- | --- |
| Push | Commit a file here and push. The workflow runs automatically. |
| Manual | GitHub → **Actions** → **ClamAV Static File Scan** → **Run workflow**. |
| From the site / script | `npm run scan:ci -- <optional-file-url>` (uses `GITHUB_PAT`). |
| Scheduled | Runs daily at 03:00 UTC. |

## Safety rules

- **Never commit live malware to a public repo.** This repo is public, so
  payloads here are git-ignored by default (see `.gitignore`). Use a **private**
  repo for real samples, and force-add only when you know what you are doing:
  `git add -f quarantine/my-sample.bin`.
- Prefer scanning by **URL** (`file_url` input) so the payload is downloaded to
  the ephemeral runner and never committed.
- A harmless test file is the **EICAR** string — it should be detected as
  `Eicar-Test-Signature`.

## What the result means

- Job **passes** → no known malware signatures matched.
- Job **fails** (red) → ClamAV found a `FOUND` line, or the scan itself errored
  (exit code 2). Open the run, read the **job summary**, and download the
  `clamav-report` artifact for the full log.

## Limits

- One job is capped at 6 hours by GitHub; this workflow uses
  `timeout-minutes: 90` on purpose. Do **not** add long restart loops to bypass
  the cap — that is against GitHub's Acceptable Use Policy.
- Maximum downloaded/size: 1 GB (`--max-filesize`).
