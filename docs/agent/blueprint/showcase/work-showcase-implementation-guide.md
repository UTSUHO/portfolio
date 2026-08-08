# WORK_SHOWCASE Section Implementation Guide

## Overview

Implement the homepage `WORK_SHOWCASE` section based on the industrial
technical showcase design.

This section is not a normal project card list.

The design goal:

> Transform each featured project into a compact technical visualization
> artifact.

Each project should communicate: - what the system is - how it works
internally - what engineering capability it represents

The visual area is the primary content. The text area only provides
project identity.

------------------------------------------------------------------------

# Design Principles

## Do not build normal UI cards

Avoid: - dashboard layouts - generic screenshots - marketing cards -
excessive buttons - conventional portfolio grids

The component should feel like:

    engineering archive
    +
    system visualization
    +
    technical documentation

Not:

    product landing page

------------------------------------------------------------------------

# Overall Layout

    WORK_SHOWCASE

    ┌───────────────────────────────────────┐
    │ // WORK_SHOWCASE                      │
    ├────────────┬────────────┬─────────────┤
    │ Agent      │ CAD        │ AI Infra    │
    │ Visual     │ Visual     │ Visual      │
    ├────────────┼────────────┼─────────────┤
    │ Metadata   │ Metadata   │ Metadata    │
    ├────────────┼────────────┼─────────────┤
    │ Footer     │ Footer     │ Footer      │
    └────────────┴────────────┴─────────────┘

Three columns: 1. Agent Development Platform 2. CAD Annotation Tool 3.
AI Training Platform

------------------------------------------------------------------------

# Component Architecture

Recommended:

    components/
     └── showcase/

         WorkShowcase.vue

         ProjectVisual.vue

         visuals/

            AgentPlatformVisual.vue

            CadAnnotationVisual.vue

            AiTrainingVisual.vue

         ProjectMetadata.vue

------------------------------------------------------------------------

# Card Layout

Each card:

    ProjectCard

        Visual Area

            ProjectVisual


        Metadata Area

            index
            title
            description
            tech stack


        Footer

            index
            category

Visual area should dominate.

Recommended ratio:

    Visual      70%
    Metadata    25%
    Footer       5%

------------------------------------------------------------------------

# Global Visual Language

Background:

    #071018
    #0B141E

Borders:

    rgba(255,255,255,0.12)

Accent:

    #FF5938

Red only represents: - active node - selected object - running task -
important transition

------------------------------------------------------------------------

# Visual 01: Agent Development Platform

Theme:

    System Architecture

Main structure:

    Workspace
        |
    WebSocket Gateway
        |
    Runtime Container

Required elements:

-   workspace panel
-   gateway node
-   runtime container
-   handler slots

Active state:

    PAW = ACTIVE

Use red highlight.

------------------------------------------------------------------------

# Visual 02: CAD Annotation Tool

Theme:

    Engineering CAD Viewer

Main object:

-   isometric mechanical model
-   wireframe rendering
-   selected face

Required:

    FACE_024
    TYPE: PLANAR

Selected face:

    red highlight

Pipeline:

    STEP
     |
    OCCT
     |
    ANNOTATION

Avoid excessive tables or JSON in homepage visual.

------------------------------------------------------------------------

# Visual 03: AI Training Platform

Theme:

    Infrastructure Control Plane

Main flow:

    JOB QUEUE

        ↓

    SCHEDULER

        ↓

    GPU CLUSTER

Required blocks:

Job Queue: - RUNNING - PENDING

Scheduler: - FAIR SHARE - PRIORITY

GPU Pool: - GPU-01 - GPU-02 - GPU-03 - GPU-04

Performance indicator:

    180s → 20s

------------------------------------------------------------------------

# Interaction

Hover: - increase border brightness - show subtle red glow - increase
visual contrast

Avoid: - large card movement - scaling entire card

Scroll: - fade in - line drawing - subtle status activation

------------------------------------------------------------------------

# Implementation Strategy

Phase 1: - grid - borders - typography - spacing

Phase 2: - SVG - CSS technical illustrations - Canvas

Phase 3: Upgrade visuals:

Agent:

    SVG -> Three.js runtime visualization

CAD:

    SVG -> Three.js CAD viewer

AI:

    SVG -> animated infrastructure graph

------------------------------------------------------------------------

# Important Constraints

Do NOT: - convert into dashboard cards - use random 3D illustrations -
use stock images - put excessive text inside visual area

MUST: The user should understand project category without reading the
title.

Agent: \> This is an agent runtime system

CAD: \> This is a CAD geometry tool

AI: \> This is an AI compute platform

------------------------------------------------------------------------

# Final Acceptance Criteria

1.  Three columns visually match the reference.
2.  Upper visual occupies most of the card.
3.  Each project has unique visualization language.
4.  Red highlights meaningful states.
5.  Section feels like an engineering archive.
6.  Visuals can later be upgraded to WebGL without changing layout.
