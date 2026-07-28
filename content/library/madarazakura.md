---
title: 东方斑樱汉化 Madarazakura
---

## Overview

A fan localization project for a Touhou shooting-game title. Scope included in-game UI, story dialogue, spell card names, and the instruction manual.

## Problem

STG games combine fast-paced UI text with dense mythological references. Localization must be accurate under pressure and consistent across multiple file formats.

## Solution

Built a small Python pipeline to extract, diff, and re-inject text assets. Established a shared glossary for spell names and character terminology to keep translations consistent.

## Architecture

Pipeline

- **Extract**: Python script parses game assets\n- **Translate**: Shared glossary + translator notes\n- **Inject**: Script rebuilds game text files\n- **Test**: In-game screenshot diff\n\nFlow: Asset Dump → Text Extraction → Translation → Injection → In-Game QC\n\n## Challenges

- Working with undocumented proprietary file formats.\n- Keeping UI text concise enough to fit original layout bounds.\n- Coordinating translators across different time zones.\n\n## Outcome

Released a complete Chinese localization patch. The glossary and pipeline were reused for later fan translation projects.\n\n\n