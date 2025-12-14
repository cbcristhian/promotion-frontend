# Parking Lot Allocation System  
**Angular I3 – Promotion Assessment**

This project is an Angular 20 standalone-components application that implements a **Parking Lot Allocation System** for a small residential building.

When the number of available parking spots is less than the number of residents requesting one, a **raffle system** is used to assign spots fairly.  
The raffle runs once every three months and can be manually triggered by an admin.

---

## Project Overview

### Core Concepts
- **Role-based access** (Admin / Resident)
- **Standalone Components**
- **Signals & RxResource**
- **Lazy-loaded feature routes**
- **In-memory backend (Node.js)**
- **TailwindCSS + DaisyUI**
- **Clean separation of concerns**

---

## Features

### Admin
- Register, edit, and delete residents
- Manually trigger the parking raffle
- View the latest raffle results

### Resident
- Register for the upcoming raffle
- View current parking assignment
- View full parking assignment history

---
## Architecture & Design Decisions

This project follows a **feature-based folder structure**, where each core module contains its own documentation.

- **Auth Module**  
  Handles authentication, authorization, guards, and session restoration.  
  → [Read auth.md](src/app/auth/auth.md)

- **Admin Module**  
  Resident management and raffle execution logic.  
  → [Read admin.md](src/app/admin/admin.md)

-  **Resident Module**  
  Raffle participation and parking history.  
  → [Read resident.md](src/app/resident/resident.md)
---

## 🛠 Tech Stack

### Frontend
- **Angular 20**
- **Standalone Components**
- **Signals**
- **RxResource**
- **TailwindCSS**
- **DaisyUI**
- **RxJS 7.8**

### Backend
- **Node.js (in-memory data)**
https://github.com/cbcristhian/promotion-backend
- **JWT authentication**
- No database
---


## Getting Started (Local Development)

### Prerequisites

Make sure you have the following installed:

- **Node.js:** `v22.17.1`
- **npm:** `v10.9.2`

You can verify with:

```bash
node -v
npm -v
```
Clone the repository
```
git clone <your-repository-url>
cd <repository-folder>
```
Install Dependencies and run
```
npm i
ng serve
```
## Test Credentials & Limitations

### Admin Test Account

For review purposes, the application currently includes **one predefined admin user** to test the full admin flow:

- **Email:** `cris@email.com`
- **Password:** `123`


---

### Parking Spot Limitations

- The number of available parking spots is **fixed and limited**
- There is **no UI flow** to create or manage parking spots
- Parking spots are defined directly in the **backend in-memory data**

To change the number of parking spots:

1. Update the backend in-memory configuration
2. Restart or redeploy the backend server

This limitation is **intentional** and aligned with the scope of the technical assessment.

---

### In-Memory Backend Note

- All data (**users, raffle history, parking spots**) is stored **in memory**
- Restarting the backend **resets all data**
- No database is used **by design**

This approach keeps the focus on:

- Frontend architecture
- State management
- Business logic clarity
