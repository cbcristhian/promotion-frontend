# Resident Module

This document describes the **Resident area** of the Parking Lot Allocation System, its responsibilities, UI flow, and design decisions.

The Resident role focuses on **viewing parking assignments** and **participating in raffles**.

---

## Overview

The Resident module is a **lazy-loaded feature area** protected by the `residentGuard`. It provides residents with visibility into their parking history and a simple way to register or unregister for upcoming raffles.

The module emphasizes:

* Clear feedback
* Minimal actions
* Read-only access to raffle results

---

## Pages

### Resident History Page

This is the **only page** in the Resident module and serves as the resident dashboard.

---

## Responsibilities

The Resident History page allows a resident to:

* View their **current parking assignment** (if any)
* View **all previous raffle results** they participated in
* Register or unregister for the **next raffle**

All data is retrieved from the backend, which maintains in-memory state for raffle history and registration status.

---

## UI Structure

### 1. Raffle Registration Action

At the top of the page, a single action button is displayed:

* **Register for next raffle**
* **Unregister for next raffle**

The button:

* Dynamically changes **label** and **style** based on the current registration status
* Opens a DaisyUI modal for confirmation

This ensures the action is explicit and prevents accidental registration changes.

---

### 2. Current Parking Assignment

A dedicated card displays the **latest raffle result**:

* If a parking spot is assigned → badge shows the spot ID
* If not assigned → clear visual indication that no spot was assigned

This section uses a reusable card component and only shows the **most recent raffle entry**.

---

### 3. Full Assignment History

Below the current assignment, the page lists **all historical raffle entries** for the resident:

* Each raffle entry shows:

  * Assigned spot (or lack thereof)
  * Raffle execution date

* Implemented using a reusable card component (same used for Current Parking spot)

* Cards are rendered in chronological order

This provides transparency and traceability of past raffle outcomes.

---

## Reusable Components

### Resident Spot Card Component

A shared component used for both:

* Current assignment
* Historical assignments

**Behavior**

* Adjusts labels based on context (`isLatest` flag)
* Displays parking spot status clearly using DaisyUI badges

This avoids UI duplication and ensures consistent styling across the Resident module.

---

### Register Raffle Modal

A confirmation modal implemented using **DaisyUI `<dialog>`**:

* Confirms the resident’s intent to register or unregister
* Triggers a backend update to the `registeredForRaffle` flag
* Emits an event back to the parent component on completion

After confirmation:

* Modal closes
* Resident history is reloaded
* A success alert is displayed

---

## State Management

The Resident module uses:

* **Signals** for UI state (confirmation feedback, button labels)
* **Computed signals** to derive registration state
* **rxResource** to load and refresh resident history data

This results in:

* No manual subscriptions
* Predictable data flow
* Simple refresh logic after user actions

---

## Backend Interaction

The Resident page communicates with the backend to:

* Fetch resident raffle history
* Toggle raffle registration status

All updates modify the backend in-memory data and are immediately reflected in the UI.

---

## UX & Design Decisions

* Minimal UI with clear hierarchy
* One primary action at a time
* Immediate feedback via alerts
* Modal-based confirmation instead of page navigation

These choices reduce complexity while keeping the experience intuitive.

---


* **Single page** keeps resident experience simple
* **Reusable components** reduce duplication
* **Signals + rxResource** simplify state handling
* **Modal-based actions** avoid unnecessary routing

---

## Summary

The Resident module provides a focused, user-friendly experience that allows residents to:

* Understand their parking situation at a glance
* Track historical raffle outcomes
* Control their participation in future raffles

All while following Angular 20 best practices and maintaining clean separation of concerns.
