# Auth Module

This document describes the **Authentication and Authorization** layer of the Parking Lot Allocation System.

The Auth module is responsible for:

* User login
* Role-based access control
* Protecting routes via guards
* Attaching authentication headers to HTTP requests

---

## Overview

Authentication is handled using **JWT tokens** issued by the backend and stored in `localStorage`. The frontend uses **Angular Signals**, **rxResource**, route guards, and an HTTP interceptor to manage authentication state in a clean and reactive way.

Both **Admins** and **Residents** authenticate through the same login flow but are redirected to different areas of the application based on their role.

---

## Pages

### Login Page

The Auth module contains a single UI page: the **Login Page**.

**Responsibilities**

* Collect user credentials (email and password)
* Validate form input using Reactive Forms
* Trigger authentication via `AuthService`
* Redirect users based on their role

**Key Characteristics**

* Built with Angular Reactive Forms
* Uses signals to manage UI state (`isRunning`, `hasError`)
* Provides immediate visual feedback for invalid credentials

**Role-based Redirection**

* `ADMIN` → `/admin`
* `RESIDENT` → `/resident`

This keeps routing logic centralized and predictable.

---

## AuthService

The `AuthService` is the single source of truth for authentication state.

### Responsibilities

* Perform login requests
* Store and manage JWT tokens
* Expose authenticated user data
* Determine user roles
* Restore authentication state on app reload

### State Management

Authentication state is managed using **Angular Signals**:

* `_user` → currently authenticated user
* `_token` → JWT token
* `_authStatus` → `checking | authenticated | not-authenticated`

Computed signals derive:

* `authStatus`
* `isAdmin`
* `isResident`

This approach avoids manual subscriptions and simplifies UI reactions.

---

## Session Restoration (`checkStatus`)

On application startup, authentication is restored using:

* A stored JWT token from `localStorage`
* A backend `/check-status` endpoint

The `rxResource` wrapper automatically triggers this check and updates the auth state reactively.

If the token is invalid or missing, the user is logged out safely.

---

## Guards

Three route guards are used to enforce access rules:

### 1. Admin Guard

* Allows access only if the user role is `ADMIN`
* Protects all admin routes

### 2. Resident Guard

* Allows access only if the user role is `RESIDENT`
* Protects resident-specific pages

### 3. NotAuthenticated Guard

* Prevents authenticated users from accessing the login page
* Ensures logged-in users are redirected appropriately

---

## HTTP Interceptor

An HTTP interceptor is used to:

* Automatically attach the `Authorization` header
* Include the JWT token in every outgoing request
---

## Security & Design Decisions

* JWT stored in `localStorage` for simplicity (assessment scope)
* Stateless backend authentication
* Role-based access handled on both frontend and backend
* Centralized auth logic via `AuthService`

---


* **Signals** provide a lightweight, reactive auth state
* **rxResource** simplifies session restoration
* **Guards** enforce navigation safety
* **Interceptor** ensures consistent request authentication

---

## Summary

The Auth module provides a robust and scalable authentication foundation using Angular 20 best practices:

* Standalone components
* Signal-driven state
* Clean role-based access control
* Minimal boilerplate

This design allows the application to scale while keeping authentication predictable and maintainable.
