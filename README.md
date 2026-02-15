# twitter-cli

A modern command-line interface to interact with X (Twitter) directly from your terminal.

Post tweets, authenticate securely using OAuth 2.0 PKCE, and manage your account — all without exposing your credentials.

Works similar to GitHub CLI (`gh`), but for X.

---

# Features

* Secure OAuth 2.0 login (PKCE)
* Post tweets from terminal
* Logout support
* Local token storage
* No API keys exposed
* Cross-platform (Linux, macOS, WSL, Windows)

---

# Installation

## Install globally from npm

```bash
npm install -g twitter-cli
```

---

# Usage

## Login

```bash
twitter-cli login
```

This will:

* Open your browser
* Ask you to authorize
* Save access token locally

---

## Post a Tweet

```bash
twitter-cli tweet "Hello world"
```

---

## Check login status

```bash
twitter-cli whoami
```

---

## Logout

```bash
twitter-cli logout
```

---

# How it works

twitter-cli uses OAuth 2.0 Authorization Code Flow with PKCE.

Flow:

1. CLI opens browser
2. User authorizes
3. X returns access token
4. CLI stores token locally

Token location:

Linux / WSL:

```
~/.config/twitter-cli/config.json
```

---

# Security

Your credentials are never shared.

twitter-cli:

* Does NOT store passwords
* Does NOT expose API secrets
* Stores only OAuth access token locally

You can revoke access anytime from X settings.

---

# Requirements

* Node.js 18+
* X Developer Account

---

# Development

Clone repository:

```bash
git clone https://github.com/its-dude/twitter-cli
```

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm link
twitter login
```

---

# Project Structure

```
twitter-cli
│
├── src/
│   └── index.js
│
├── commands/
│   ├── login.js
│   ├── tweet.js
│   └── logout.js
│
├── package.json
└── README.md
```

---

# Tech Stack

* Node.js
* OAuth 2.0 PKCE
* Express
* Commander

---

# Inspiration

Inspired by:

* GitHub CLI (`gh`)
* Modern developer tooling

---

# License

MIT

---

# Author

Abhishek Mishra

---

# Contributing

Pull requests are welcome.

For major changes, open an issue first.

---

# Disclaimer

This project uses official X OAuth APIs.

Not affiliated with X Corp.
