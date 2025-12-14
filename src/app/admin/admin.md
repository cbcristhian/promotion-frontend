# Admin Module

This document describes the **Admin area** of the Parking Lot Allocation System, its responsibilities, pages, and design decisions.

The Admin role is responsible for managing residents and executing the parking raffle process.

---

## Overview

The Admin module is implemented as a **lazy-loaded feature area** protected by an `adminGuard`. All admin-related pages, services, and interfaces live under the `admin/` folder to keep responsibilities clearly separated from resident and auth concerns.

Core Admin responsibilities:

* Manage residents (create, edit, delete)
* Manually trigger the parking raffle
* View the latest raffle assignment

---

## Pages

### 1. Resident List Page

**Purpose**
Displays all registered residents in the system.

**Responsibilities**

* Retrieve the resident list from the backend (in-memory data)
* Display resident information (name, email, apartment number)
* Allow admins to:

  * **Edit** a resident
  * **Delete** a resident

**Key Design Decisions**

* Data is loaded via an HTTP call and managed reactively
* When clicking **Edit**, the selected resident object is passed via `router.navigate` state to avoid an extra backend call
* Deleting a resident updates the in-memory backend data and refreshes the list

---

### 2. Resident Form Page (Create / Edit)

This page handles **both creation and editing** of residents using a single component.

**Modes**

* **Create mode**: No `id` in the route
* **Edit mode**: `id` present in the route

**Form Behavior**

* Uses **Angular Reactive Forms**
* Uses **Signals** and `computed()` to derive `isEdit`
* Password field:

  * Required only when creating a resident
  * Disabled when editing an existing resident

**Data Flow**

* When editing, the resident object is passed through router navigation state
* On page reload, a fallback redirect is triggered to avoid inconsistent state

**Submission Logic**

* Create → `adminService.createResident()`
* Edit → `adminService.patchResident()`
* On success, the admin is redirected back to the resident list

**Implementation Highlights**

* `signal()` is used for local UI state (`isSubmitting`, `id`)
* `effect()` initializes the form based on create/edit mode
* `getRawValue()` is used to safely extract form values

---

### 3. Raffle Page

**Purpose**
Allows the admin to manually trigger the parking raffle process.

**Responsibilities**

* Trigger the raffle execution
* Display the latest raffle result
* Show assigned and unassigned residents

**Raffle Logic (Backend)**

* Residents registered for the raffle are randomly shuffled
* Available parking spots are assigned fairly
* If residents > spots, some residents remain unassigned
* Each raffle execution is stored in raffle history

**Frontend Design**

* Uses `rxResource` to fetch the latest raffle automatically on page load
* Uses signals to track raffle execution state (`isRunning`)
* DaisyUI cards and badges visually differentiate:

  * Assigned spots
  * Unassigned residents

---

## UX & UI Decisions

* TailwindCSS + DaisyUI used for consistency and speed
* Clear visual hierarchy using cards
* Disabled states and loading indicators prevent duplicate actions
* Success and error feedback provided via SweetAlert

---

## Summary

The Admin module provides full control over residents and raffle execution while following Angular 20 best practices:

* Standalone components
* Signal-driven state
* Clean separation of concerns

