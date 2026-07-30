---
title: API-Disruptor
---

## Overview

API-Disruptor is a lightweight developer tool that lets engineers inject latency, errors, and jitter into local REST API calls to observe how clients behave under failure.

## Scenario

Testing distributed failure modes locally usually requires heavy infrastructure. Small teams need a fast, configurable way to simulate bad network behavior without deploying a chaos platform.

## Solution

Created a local proxy server with a declarative rule engine. Rules define match conditions, disruption types, and probability curves. A small React dashboard visualizes live request outcomes.

## Architecture

Tool Stack

- **Proxy**: Node.js HTTP interceptor
- **Engine**: Rule matcher + disruption scheduler
- **Dashboard**: React + real-time event stream
- **Config**: YAML/JSON rule files

Flow: Capture Request → Match Rules → Apply Disruption → Forward → Log Outcome

## Challenges

- Keeping latency injection deterministic enough for reproducible tests.
- Designing a rule syntax that is expressive but not overwhelming.
- Avoiding side effects on non-target requests.

## Outcome

Functional prototype capable of injecting latency, HTTP errors, and timeout failures. Used internally to harden client retry logic.
