![](doc/landing.png)

This Digits application is a Next.js 14 project that manages **Contacts** and **timestamped Notes**. It’s basically a small personal contact manager where you can store people’s information and write notes about conversations you’ve had with them.

This app uses:
- Next.js (App Router)
- React Bootstrap for the UI
- React Hook Form for forms
- NextAuth for logging in and signing up
- Prisma + PostgreSQL for the database
- SweetAlert for pop-up messages
- ESLint for code style checks

The goal of this project is to help learn how full-stack web apps work.

---

## Installation

### 1. Install PostgreSQL
Download it from https://www.postgresql.org/download/ and create a database:

createdb digits

### 2. Clone your GitHub repo

git clone https://github.com/<your-username>/<your-digits-repo>.git
cd <your-digits-repo>

### 3. Install dependencies

npm install

### 4. Set up your `.env`
Copy `.env.sample` → `.env` and update:

DATABASE_URL="postgresql://localhost:5432/digits"

Also fill in the NEXTAUTH secrets.

### 5. Run Prisma migrations

npx prisma migrate dev

### 6. Seed the database

npx prisma db seed

This sets up default users and contacts from `config/settings.development.json`.

---

## Running the system

Start the app with:

npm run dev

Then open:

http://localhost:3000

You can log in using a seeded account or sign up and create your own.

---

## ESLint

To check your code style:

npm run lint

---

## Walkthrough

### Directory structure (simple explanation)

config/ — settings for seeding users/contacts
doc/ — screenshots
prisma/ — database schema + seed script
public/ — images
src/ — the actual app code
tests/ — (optional) Playwright tests

Inside `src/`:

app/
auth/ — login / logout / register pages
contacts/ — add, list, edit contacts
notes/ — notes for each contact
page.tsx — landing page
layout.tsx — main page layout

components/ — reusable UI parts
lib/ — Prisma client, helpers

---

## Application functionality

This app works like a small CRM:

- You create an account or log in  
- You can add contacts  
- Each contact can have multiple notes  
- Notes include a timestamp  
- You only see your own contacts and notes  

### Landing page

![](doc/landing.png)

### Sign In page

![](doc/signin.png)

### Sign Up page

![](doc/signup.png)

### Contacts list

![](doc/listcontacts.png)

You can view all your contacts here and edit them. 
This page also lets you write notes for each contact.

### Add Contact page

![](doc/addcontact.png)

You can add contacts, including fields like name, address, image, and description.

---

## Database tables (simple explanation)

The app uses three tables:

### User
- email  
- password  
- role  

### Contact
- first name  
- last name  
- address  
- image  
- description  
- owner (points to the user)

### Note
- content  
- timestamp  
- which contact it belongs to  
- owner  

---

## CSS

The UI mainly uses **React Bootstrap**, and any extra styles go into:

src/app/globals.css

---

## Routing

Next.js App Router creates pages automatically based on folders inside `src/app/`.

---

## Authentication

NextAuth handles logging in, logging out, and registering new users.

---

## Authorization

Only logged-in users can view contacts and notes. Users cannot see data that isn’t theirs.

---

## Configuration

Your seed data lives in:

config/settings.development.json

---

## Quality Assurance

Run:

npm run lint

to check code style and fix problems before submitting.

