---
order: 0
slug: leakscope
title: LeakScope
summary: Automated external security scanner for modern web applications.
role: Founder and Full-stack Engineer
timeline: MARCH 2026 - PRESENT
year: "2026"
outcome: Built a scanner pipeline that inspects live surfaces without credentials, validates authentication and access patterns, and reports exploitable findings with remediation context.
image: /projects/LeakScope1.png
challenge: Security issues in production apps are often exposed through public assets and configuration drift, but teams rarely have continuous external checks.
solution: Built a scanner pipeline that inspects live surfaces without credentials, validates authentication and access patterns, and reports exploitable findings with remediation context.
impact:
  - 1,800+ applications scanned
  - 12,000+ vulnerabilities identified
secondaryLink: https://www.producthunt.com/products/leakscope
secondaryLabel: Product Hunt
stack:
  - Express
  - React
  - Supabase
  - WebSocket
  - Node.js
  - Redis
  - Vite
  - Tailwind CSS
link: https://leakscope.tech
---

## Overview

LeakScope is an external security scanner built around a simple idea: many important security issues are already visible from the public internet if you know where to look and how to connect the signals.

## Problem

Security reviews are often periodic, manual, and limited by time. Public assets, client bundles, exposed configuration, weak access control flows, and token handling issues can stay live for long periods because nobody is checking them continuously.

## Research

I started by looking at recurring patterns in modern web applications:

- leaked secrets in bundled assets
- weak authorization around public endpoints
- JWT handling mistakes
- accidental exposure through configuration drift

The goal was not to simulate an internal pentest. It was to inspect only what an external attacker could already see.

## Architecture

The system is split into a few focused stages:

- collection of public assets and endpoints
- normalization and fingerprinting of findings
- rule-based analysis for auth and exposure issues
- report generation with remediation context

That separation made it easier to expand checks without turning the scanner into one large script.

## Implementation

I built the scanning pipeline, finding model, and reporting layer. The implementation focused on throughput, noise reduction, and clear evidence for each issue so the output stayed useful to engineering teams.

## Challenges

The hardest part was not finding signals. It was keeping the results trustworthy. External scanning can create noisy output quickly, so I spent a lot of time tuning detection logic, validating edge cases, and reducing false positives.

## Lessons Learned

Security tools only help when the output is readable and actionable. Good detection matters, but clear prioritization and remediation context matter just as much.
