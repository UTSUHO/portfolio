---
title: CODE:QUEEN 代号σ
---

## Overview

CODE:QUEEN is a single-player fantasy SRPG currently in development. The game combines grid-based tactical combat with a narrative system where player choices reshape the mythology of the world.

## Scenario

Traditional SRPGs often separate story and combat into distinct modes. I wanted every tactical decision to also carry narrative weight, so the battlefield becomes a stage for character drama.

## Solution

Built a "Fate Weave" system that links unit abilities to story threads. Using certain skills advances corresponding narrative arcs, unlocking alternate map states, reinforcements, and endings.

## Architecture

Engine Architecture

- **Core**: Unity ECS-lite turn scheduler
- **Combat**: Grid action pipeline with prediction
- **Narrative**: Fate Weave state graph
- **Data**: ScriptableObject-driven unit/ability database

Flow: Turn Input → Action Validation → Simulation → Resolution → State Update

## Challenges

- Designing a combat-narrative coupling that feels emergent rather than scripted.
- Maintaining deterministic simulation for save/load and replay debugging.
- Solo development pipeline across design, code, and UI.

## Outcome

Core battle system and turn scheduler are functional; narrative state graph prototype is in active iteration. Targeting a vertical slice demo.
