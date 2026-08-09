# CAD B-REP Annotation Workflow Showcase

## Overview

This document defines the interactive workflow visualization for the CAD B-REP semantic annotation pipeline.

The visualization explains:

```
STEP CAD Model
        |
        v
OCCT Processing
        |
        v
Web-based Semantic Annotation
        |
        v
B-REP Annotation Dataset
        |
        v
ML Training / External Integration
```

## Workflow Graph

```
STEP File
    |
    v
OCCT Conversion
    |
    +----------------+
    |                |
    v                v
GLB Model       Face Mapping
    \              /
     \            /
      v          v
    Web Viewer
        |
        v
Human Annotation
        |
        v
STEP Face Reconstruction
        |
        +----------------+
        |                |
        v                v
ML Training Adapter   External Conversion
```

## Three Stage Layout

### Stage 1: CAD Processing Layer

Nodes:

- STEP File
- OCCT Conversion

Purpose:

Convert CAD B-REP data into a web-compatible representation while preserving semantic identity.

---

### Stage 2: Interactive Annotation Layer

Nodes:

- GLB Model
- Face Mapping
- Web Viewer
- Human Annotation

Purpose:

Enable human operators to annotate CAD faces through WebGL visualization.

---

### Stage 3: Dataset Production Layer

Nodes:

- STEP Face Reconstruction
- ML Training Adapter
- External Conversion

Purpose:

Generate machine-learning-ready CAD datasets and external annotation formats.

---

# Node Definition

## STEP File

Original CAD input containing B-REP geometry and topology.

---

## OCCT Conversion

Open CASCADE based processing layer.

Responsibilities:

- STEP parsing
- B-REP extraction
- Tessellation
- Face identity preservation

---

## GLB Model

Lightweight browser rendering asset.

Contains:

- Mesh geometry
- Normals
- Face references

---

## Face Mapping

Maintains the relationship:

```
STEP Face UUID

        <->

GLB Triangle Groups
```

Purpose:

Preserve CAD semantic identity during visualization.

---

## Web Viewer

Interactive CAD annotation interface.

Capabilities:

- Face selection
- Highlighting
- Group management
- Annotation binding

---

## Human Annotation

Human-in-the-loop semantic labeling.

Produces:

- Face labels
- Feature groups
- Semantic attributes

---

## STEP Face Reconstruction

Combines original CAD topology with annotation results.

Output:

```
STEP Geometry
+
Face Semantic Labels
```

---

## ML Training Adapter

Converts annotated CAD data into training-ready formats.

Possible outputs:

- B-REP graph
- Face features
- Training dataset

---

## External Conversion

Exports annotations to external systems and formats.

---

# Animation Direction

## Edge Animation

Use:

- flowing wave lines
- particles
- glowing paths

Flow direction:

```
STEP
 |
OCCT
 |
Viewer
 |
Annotation
 |
Dataset
```

## Node Activation

When a node receives data:

1. Highlight node
2. Display metadata
3. Animate outgoing connection

---

# Avoid Adding

Do not create independent main nodes for:

- Face UUID
- Validation
- Annotation schema
- Dataset versioning
- Graph neural network

These belong to:

- tooltips
- node details
- hover panels

---

# Final Summary

```
STEP File
      |
      v
OCCT Conversion
      |
 +----+----+
 |         |
 v         v
GLB     Face Mapping
 |         |
 +----+----+
      |
      v
Web Viewer
      |
      v
Human Annotation
      |
      v
STEP Face Reconstruction
      |
 +----+----+
 |         |
 v         v
ML      External
Training Conversion
```
