# Gilded Glamour

# 💅 Nail & Beauty Bar Website

A luxurious, elegant frontend for a nail & beauty bar with gold accents, dark tones, serif fonts, and modern animations.

---

## 🎨 Design Direction

- **Color palette**: Soft feminine colors

- **Typography**: Serif font (e.g., Playfair Display) for headings, clean sans-serif for body text

- **Aesthetic**: Luxurious & elegant — think high-end boutique salon feel

- **Animations**: Typewriter effect on hero headline, fade-in on scroll, smooth hover transitions on cards and buttons

---

## 📄 Pages

### 1. Home

- Full-width hero section with a striking salon image, typewriter-animated tagline, and CTA button ("Book Now")

- Featured services preview (3-4 cards with icons/images)

- Testimonials carousel from happy clients

- "Why Choose Us" highlights section

### 2. About

- Salon story / brand narrative with an elegant layout

- Meet the team section with photos and short bios

- Core values or philosophy highlights

### 3. Services

- Service categories (Nails, Lashes, Brows, Skincare, etc.)

- Each service with image, description, duration, and price

- Filterable or tabbed by category

- All data pulled from `data.json`

### 4. Booking

- Visual multi-step booking form:

  - **Step 1**: Select a service category & specific service

  - **Step 2**: Pick a date and time slot

  - **Step 3**: Enter client details (name, phone, email, notes)

  - **Step 4**: Confirmation summary

- No real backend — just a success toast on submit

### 5. Contact

- Contact form (name, email, message) with validation

- Salon address, phone, email, and hours displayed

- Embedded map placeholder

- Social media links

### 6.Login/Singup/Profile pages 

Authentication: Simple, hardcoded, mock-data auth system strictly for prototype/demo.

Login: Email + password checked against a static user list in data.json.

Signup: Creates a mock user object (stored in local storage only).

Profile:

Displays basic user info (name, email, phone).

Editable fields update local storage only.

Mock booking history pulled from data.json.

Session Handling: Local storage flag to simulate logged-in / logged-out state.

Security: None beyond basic form validation. No hashing, no backend, no claims.

Assessment: Viable for UI/UX demo, navigation flow testing, and stakeholder presentation. Not production-ready. 

---

## 🧭 Navigation & Layout

- Sticky top navigation bar with logo and page links

- Smooth scroll and page transitions

- Responsive design (mobile-friendly)

- Footer with quick links, social icons, and copyright

## 📁 Data

- A `data.json` file containing: services list (with categories, prices, durations), team members, testimonials, salon info, and time slots

- Images sourced from Unsplash URLs for salon/beauty imagery

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://beauty-haven-frontend.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0b46bc2c-a580-4c89-930d-151c232f8540).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
