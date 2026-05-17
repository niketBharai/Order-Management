# Food Delivery Backend

Express.js backend API for the food delivery application with TypeScript.

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Production

```bash
npm start
```

## Testing

```bash
npm test
```

## API Endpoints

- `GET /api/menu` - Get all menu items
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create new order
- `PATCH /api/orders/:id/status` - Update order status
- `GET /health` - Health check

## Features

- RESTful API with Express.js
- TypeScript for type safety
- Input validation middleware
- In-memory data storage
- Simulated order status progression
