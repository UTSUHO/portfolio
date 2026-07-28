---
title: API-Disruptor
---

## Overview

API-Disruptor is a lightweight developer tool that lets engineers inject latency, errors, and jitter into local REST API calls to observe how clients behave under failure.

## Problem

Testing distributed failure modes locally usually requires heavy infrastructure. Small teams need a fast, configurable way to simulate bad network behavior without deploying a chaos platform.

## Solution

Created a local proxy server with a declarative rule engine. Rules define match conditions, disruption types, and probability curves. A small React dashboard visualizes live request outcomes.

## Architecture

Tool Stack

- **Proxy**: Node.js HTTP interceptor\n- **Engine**: Rule matcher + disruption scheduler\n- **Dashboard**: React + real-time event stream\n- **Config**: YAML/JSON rule files\n\nFlow: Capture Request → Match Rules → Apply Disruption → Forward → Log Outcome\n\n## Challenges

- Keeping latency injection deterministic enough for reproducible tests.\n- Designing a rule syntax that is expressive but not overwhelming.\n- Avoiding side effects on non-target requests.\n\n## Outcome

Functional prototype capable of injecting latency, HTTP errors, and timeout failures. Used internally to harden client retry logic.\n\n\n