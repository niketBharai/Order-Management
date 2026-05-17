# Food Delivery Order Management System

A full-stack food delivery application built with the MERN stack (MongoDB, Express, React, Node.js) using TypeScript. This application allows users to browse a menu, add items to cart, place orders, and track order status in real-time.

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript, React, TailwindCSS
- **Backend**: Express.js with TypeScript
- **Testing**: Jest, React Testing Library, Supertest
- **Styling**: TailwindCSS

## Features

1. **Menu Display**
   - Browse food items with images, descriptions, and prices
   - Responsive grid layout

2. **Order Placement**
   - Add items to cart with quantity management
   - Update quantities or remove items
   - Checkout with delivery details (name, address, phone)
   - Form validation

3. **Order Status Tracking**
   - Real-time status updates (Order Received → Preparing → Out for Delivery → Delivered)
   - Visual progress indicator
   - Auto-refresh every 3 seconds

4. **Backend API**
   - RESTful API endpoints
   - Input validation
   - In-memory data storage
   - Simulated order status progression

## Project Structure

```
Order Management/
├── frontend/
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   ├── types/           # TypeScript type definitions
│   ├── package.json
│   └── tsconfig.json
└── backend/
    ├── src/
    │   ├── __tests__/    # Backend tests
    │   ├── data/         # In-memory data stores
    │   ├── middleware/   # Express middleware
    │   ├── routes/       # API routes
    │   ├── types/        # TypeScript types
    │   └── index.ts      # Server entry point
    ├── package.json
    └── tsconfig.json
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5001`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Running Tests

### Backend Tests

```bash
cd backend
npm test
```

### Frontend Tests

```bash
cd frontend
npm test
```

## API Endpoints

### Menu
- `GET /api/menu` - Get all menu items

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create new order
- `PATCH /api/orders/:id/status` - Update order status

## Usage

1. Start both the backend and frontend servers
2. Open `http://localhost:3000` in your browser
3. Browse the menu and add items to your cart
4. Proceed to checkout and enter delivery details
5. Place your order and track its status in real-time

## Order Status Simulation

The backend automatically simulates order progression:
- Order starts as "Order Received"
- After 10 seconds → "Preparing"
- After 20 seconds → "Out for Delivery"
- After 30 seconds → "Delivered"

## Development

### Backend Development
```bash
cd backend
npm run dev  # Runs with ts-node-dev for hot reload
```

### Frontend Development
```bash
cd frontend
npm run dev  # Next.js dev server with hot reload
```

## License

MIT
