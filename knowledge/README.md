# ChatNP Nepali Language Knowledge Pack

This repository contains the production-ready knowledge pack for **ChatNP** (powered by **NP1 MONI**, developed by KarkTech). 

## Structure
- `nepali_dictionary.jsonl`: Extracted dictionary entries from Nepali Brihat Shabdakosh.
- `nepali_writing.jsonl`: Practical writing templates and structures (निवेदन, विज्ञापन, निमन्त्रणापत्र, सूचना, बधाईपत्र, श्रद्धाञ्जली).
- `nepali_language_rules.jsonl`: Standard Nepali grammar, spelling, and orthography rules.
- `manifest.json`: Metadata manifest for RAG ingestion.

## Retrieval Pipeline Design
User Query → Intent/Language Detection → Dictionary/Writing Retrieval → Context Assembly → LLM (NP1 MONI) → Answer
