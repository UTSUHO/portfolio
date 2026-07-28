---
title: Touhou-M1-comedy-series
---

## Overview

A multi-episode subtitle translation project for the Touhou M-1 Grand Prix comedy series, balancing faithful Japanese-to-Chinese translation with comedic timing.

## Problem

Comedy translation requires preserving punchlines across language boundaries. Literal translation often kills timing, while overly free adaptation loses character voice.

## Solution

Developed a translation workflow that separates dialogue translation, timing adjustment, and punchline review into distinct passes, allowing each to be optimized independently.

## Architecture

Workflow

- **Translate**: First-pass dialogue with notes\n- **Time**: Frame-accurate subtitle sync\n- **Review**: Punchline and cultural note pass\n- **Release**: Softsub distribution\n\nFlow: Raw → Translation → Timing → QC → Release\n\n## Challenges

- Maintaining comedic rhythm across sentence structures that differ between Japanese and Chinese.\n- Managing a multi-episode release schedule with a small team.\n- Handling cultural references that require translator notes without breaking immersion.\n\n## Outcome

Released complete subtitles for the target series, with positive community feedback on timing accuracy and joke preservation.\n\n\n