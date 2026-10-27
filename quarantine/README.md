# quarantine/

Files here are scanned by the **ClamAV Static File Scan** workflow
(`.github/workflows/clamav-scan.yml`). ClamAV **reads** the bytes and matches
them against virus signatures — it **never executes** the file.

For the web app, files are uploaded to a **separate, PRIVATE quarantine repo**
created by:

```bash
npm run setup:quarantine
```

That repo receives uploads at `quarantine/incoming/<sha256>-<name>`, scans them,
writes the verdict to `scan-results/<sha256>.json`, and deletes the payload.

## How a scan happens

| Method | What to do |
| --- | --- |
| Web upload | Drop a file in the app → `POST /api/scan-file` → private repo → workflow. |
| Manual | GitHub → **Actions** → **ClamAV Static File Scan** → **Run workflow**. |
| CLI | `npm run scan:ci -- <optional-file-url>` (uses `GITHUB_PAT`). |
| Scheduled | Runs daily at 03:00 UTC. |

## Safety rules

- **Never commit live malware to a public repo.** The web flow refuses to use a
  public quarantine repo; `npm run setup:quarantine` creates a private one.
- Prefer scanning by **URL** (`file_url` input) so the payload is downloaded to
  the ephemeral runner and never committed.
- A harmless test file is the **EICAR** string — it should be detected as
  `Eicar-Test-Signature`.

## Limits

- Local heuristics: up to 1 GB in the browser.
- ClamAV queue (Contents API): up to 45 MB. Larger files need object storage +
  the workflow `file_url` input.
- One job is capped at 6 hours by GitHub; this workflow uses
  `timeout-minutes: 90` on purpose. Do **not** add long restart loops to bypass
  the cap — that is against GitHub's Acceptable Use Policy.
