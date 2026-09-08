# Plan: Update Projects and Add a Certifications Section

## 1. Projects section

Remove these three project cards:
- Next-Gen AI Chatbot
- Solar System Mission Planner
- Currency Converter Application

Add two new cards in the same card style (type badge, status pill, description, tech tags, hover code preview):

**ExchangeCore – High-Frequency Order Matching Engine**
- Type: Systems Engine (Server icon), status: Production
- Description: high-throughput matching engine processing 100K+ orders/second at sub-1ms latency using lock-free ring buffers and zero-allocation object pooling; fault-tolerant design rebuilding the order book in under 10 seconds via Write-Ahead Logging, snapshots, and async journal serialization.
- Tech: Java 21, LMAX Disruptor, Javalin, Gradle

**FinAgent – Agentic Financial Research & Portfolio Modeling System**
- Type: AI Agent (Bot icon), status: Deployed
- Description: 6-stage agentic pipeline on LangGraph routing tasks across Gemini and OpenRouter by complexity; full-stack research platform grounding model output in live Yahoo Finance pricing and fundamentals through a RAG-style ingestion layer; deterministic validation layer enforcing financial assertions across a custom DCF/CAPM/portfolio-backtesting engine to eliminate numeric hallucination.
- Tech: React 19, TypeScript, Express.js, LangGraph, OpenRouter, Google Gemini

Final order: ExchangeCore, FinAgent, Agentic HR AI, E-Commerce Platform. Existing staggered scroll animation and GitHub button stay unchanged.

## 2. New Certifications section

A new section placed after Achievements, reusing the same card grid, gradient heading (`> Certifications.verify()`), and staggered scroll-in animation:
- AWS Certified AI Practitioner (AIF-C01)
- AWS Certified Cloud Practitioner (CLF-C02)
- Microsoft Certified: Fabric Data Engineer Associate (DP-700)
- Oracle AI Vector Search Certified Professional

Each card shows a badge icon, title, and issuer line (AWS / Microsoft / Oracle).

## 3. Achievements cleanup

Achievements currently ends with two certification cards. Remove "Google Cybersecurity Professional" and "Oracle AI Vector Search" from there so certifications live in one place; Achievements keeps TCS CodeVita, NASA Citizen Scientist, and ISRO World Space Week.

## 4. Navigation

Add a "Certifications" entry to the right-hand sidebar (BadgeCheck icon) so scroll highlighting covers the new section.

## Technical notes

| File | Action |
|------|--------|
| `src/components/Projects.tsx` | Replace project data entries |
| `src/components/Certifications.tsx` | New component, mirrors Achievements structure |
| `src/components/Achievements.tsx` | Drop the two certification items |
| `src/components/Navigation.tsx` | Add `certifications` nav item |
| `src/pages/Index.tsx` | Render `<Certifications />` after `<Achievements />` |
