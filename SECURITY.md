# Security Policy

## Supported versions

CoreUI-Kit is a copy-and-paste component registry, not an installed runtime dependency — there is no version of the library running in your app to patch. Security fixes apply to the latest version of a component's source in this repository; if you copied a component before a fix landed, re-copy the updated source from the current `main` branch.

The showcase site itself (this repository's Vite app) is only supported at the latest commit on `main`.

## Reporting a vulnerability

Please do not open a public GitHub issue for security vulnerabilities.

Instead, report it privately via [GitHub Security Advisories](https://github.com/HSF237/CoreUI-Kit-v2.3/security/advisories/new) for this repository. Include:

- A description of the vulnerability and its potential impact.
- Steps to reproduce, or a minimal proof of concept.
- The affected component(s) or file(s), if applicable.

You should expect an initial response within 5 business days. Confirmed vulnerabilities will be fixed and disclosed via a GitHub Security Advisory and noted in `CHANGELOG.md`.

## Scope

In scope: the registry components in `src/components/registry/`, the showcase site's own code, and the build/validation scripts in `scripts/`.

Out of scope: vulnerabilities in third-party dependencies (`react`, `react-dom`, `react-router-dom`, `lucide-react`, `tailwindcss`, `vite`) — please report those to the respective upstream projects.
