---
order: 3
slug: stockmate
title: StockMate
summary: Offline-first stock management mobile app with practical analytics.
role: Mobile Developer
timeline: JANUARY 2026
year: "2026"
outcome: Implemented reliable CRUD, stock movement tracking, and low-stock alerts.
image: /Todone.webp
stack:
  - Flutter
  - SQLite
link: ""
---

## Overview

StockMate is a mobile stock management app built for straightforward day-to-day inventory tracking, especially in environments where internet access is not always reliable.

## Problem

Small operations still need dependable stock records, but lightweight inventory tools often trade reliability for convenience or assume constant connectivity.

## Research

The focus was on the basic jobs users repeat every day:

- create and update stock items
- record movement clearly
- catch low-stock situations early
- keep the app usable offline

## Architecture

The app used an offline-first structure with local persistence, clear domain boundaries, and straightforward data flows for inventory operations.

## Implementation

I handled the mobile implementation, CRUD flows, stock movement logic, and low-stock alert behavior.

## Challenges

Offline-first apps need careful handling of state and persistence. The work was less about visual complexity and more about reliability.

## Lessons Learned

In operational tools, dependable basics matter more than feature volume.
