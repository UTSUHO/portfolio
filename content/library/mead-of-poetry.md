---
title: Mead-of-Poetry 诗之蜜酒
---

## Overview

Mead-of-Poetry is a mid-weight strategy board game built around Norse and Chinese mythology. Players take on the role of poets seeking the mythical mead of poetry, trading verses, gathering divine favor, and navigating a world where language is power.

## Scenario

Most mythology-themed board games rely on combat or area control. I wanted to explore knowledge and language as core mechanical resources, while keeping the ruleset approachable for players new to the genre.

## Solution

Designed a card-drafting system where each verse card carries both resource value and narrative text. Combinations of verses trigger "rhetorical devices" that produce asymmetric effects, encouraging players to read the cards literally and strategically at the same time.

## Architecture

System Layers

- **Core Loop**: Draft verse cards → Build meter → Invoke device
- **Resource Model**: Inspiration, Memory, Favor as triangular economy
- **Win Condition**: First to compose three completed stanzas
- **Player Count**: 2–4, asymmetric poet roles

Flow: Setup → Draft Phase → Composition Phase → Invocation Phase → Scoring

## Challenges

- Balancing narrative flavor against rule clarity.
- Creating asymmetric roles that feel distinct without overwhelming new players.
- Testing remotely with board-game communities across time zones.

## Outcome

Completed a fully playable prototype with over 120 unique verse cards, conducted 30+ playtests, and received consistent feedback that the language-as-resource mechanic felt fresh.
