# Order Management System

A full-stack order management application for food delivery, built with Next.js. Users can browse a menu, manage a cart, place orders with authentication, and track order status in real time.

## Features

- **Authentication** — Sign up, log in, and session management with JWT-based auth.
- **Menu Display** — Browse a curated list of food items with descriptions and prices.
- **Cart Management** — Add items to cart, adjust quantities, and view a running total.
- **Checkout** — Complete orders with delivery details and form validation (Zod).
- **Order Tracking** — Real-time (simulated) status updates for placed orders.
- **Order History** — View previously placed orders.
- **User Profile** — Manage account details.
- **Testing** — Unit and component tests with Jest & React Testing Library.

## Tech Stack

| Layer               | Technology                      |
| ------------------- | ------------------------------- |
| **Framework**       | Next.js (App Router)            |
| **Language**        | TypeScript                      |
| **Styling**         | Tailwind CSS                    |
| **State**           | React Context API               |
| **Auth**            | JWT (jose) + bcryptjs           |
| **Validation**      | Zod                             |
| **Icons**           | Lucide React                    |
| **Testing**         | Jest & React Testing Library    |
| **Package Manager** | Yarn                            |

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn

### Installation

```bash
yarn install
```

### Running the App

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running Tests

```bash
yarn test
```

To run tests in watch mode:

```bash
yarn test:watch
```

### Linting

```bash
yarn lint
```

## Project Structure

```
├── app/                  # Next.js pages & API routes
│   ├── api/              # REST API endpoints (auth, menu, orders)
│   ├── auth/             # Authentication pages
│   ├── cart/             # Cart page
│   ├── order-status/     # Live order tracking page
│   ├── previous-orders/  # Order history page
│   ├── profile/          # User profile page
│   └── about/            # About page
├── components/           # Reusable React components
│   ├── Cart.tsx
│   ├── CheckoutForm.tsx
│   ├── Menu.tsx
│   ├── MenuItemCard.tsx
│   ├── Navbar.tsx
│   ├── OrderHistoryItem.tsx
│   └── OrderStatus.tsx
├── context/              # React Context providers
│   ├── AuthContext.tsx
│   └── CartContext.tsx
├── data/                 # Seed / static data (users.json)
├── lib/                  # Utilities & business logic
│   ├── auth.ts           # JWT helpers
│   ├── data.ts           # Menu data
│   ├── store.ts          # In-memory order store
│   ├── users.ts          # User management
│   └── validations.ts    # Zod schemas
├── types/                # Shared TypeScript type definitions
└── __tests__/            # Unit & component tests
```

## Simulated Order Status

After an order is placed, its status transitions automatically:

| Time Since Placement | Status           |
| -------------------- | ---------------- |
| 0 – 30 s             | Order Received   |
| 30 – 60 s            | Preparing        |
| 60 – 120 s           | Out for Delivery |
| > 120 s              | Delivered        |

The order tracking page polls the API every 10 seconds to reflect these changes.
