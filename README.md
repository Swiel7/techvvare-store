# 🛒 Techvvare Store

![Techvvare Store](https://i.imgur.com/g5hcRbE.png)

Techvvare Store is a functional online store built with Next.js. It enables convenient online shopping with a clear interface, secure payments, and easy user account management. The application is responsive and optimized for performance.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Application Routes](#application-routes)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots of Features](#screenshots-of-features)
- [Contributing](#contributing)

## Demo

Check out the live version of the application at: [https://techvvare-store.vercel.app/](https://techvvare-store.vercel.app/).

## Features

- **Product Browsing**: Explore the product catalog with filtering and sorting options, and choose between grid or list view. Pagination makes navigation through numerous products easy.
- **Shopping Cart**: Add products and manage their quantities before checkout, thanks to a simple state management system powered by Zustand.
- **Order Checkout**: Place orders by selecting delivery methods and paying online through integration with Stripe.
- **User Account**: Create an account, log in, and manage your personal data and addresses with secure authentication via Auth.js.
- **Wishlist**: Save interesting products for later, storing them in a PostgreSQL database using Drizzle ORM.
- **Product Reviews**: Rate and comment on purchased items, sharing your feedback with other users.
- **Orders and Confirmations**: Review your purchase history and order status in a clear dashboard.

## Technologies

- [Next.js 15](https://nextjs.org/)
- [React 19](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [PostgreSQL (Neon)](https://neon.tech/)
- [Stripe](https://stripe.com/)
- [Auth.js](https://authjs.dev/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Zod](https://zod.dev/)
- [React Hook Form](https://react-hook-form.com/)
- [ImageKit](https://imagekit.io/)

## Project Structure

```
techvvare-store/
├── app/                # Pages and layouts of the application (Next.js routing)
│   ├── (auth)/         # Authentication pages (login, register)
│   └── (store)/        # Store pages (products, cart, orders)
├── components/         # UI components (cart, forms, products)
│   ├── home/           # Homepage components
│   ├── product/        # Product-related components
│   └── ui/             # UI components (Shadcn UI)
├── lib/                # Utility functions, API services, and validations
│   ├── actions/        # Backend actions
│   └── services/       # Services (e.g., cart, order handling)
├── public/             # Static assets (images, logo)
├── data/               # Static data
├── db/                 # Database schemas (Drizzle ORM)
└── hooks/              # Custom React hooks (e.g., cart management)
```

## Pages

| Path                               | Description                                               |
| ---------------------------------- | --------------------------------------------------------- |
| `/`                                | Homepage of the store with banners and featured products. |
| `/login` and `/register`           | Pages for logging in and creating an account.             |
| `/account`                         | User panel for managing profile information.              |
| `/addresses`                       | Managing delivery addresses.                              |
| `/cart`                            | Shopping cart with selected products.                     |
| `/checkout`                        | Order finalization with payment and delivery.             |
| `/contact`                         | Contact form for customer support.                        |
| `/order-confirmation`              | Confirmation of order placement.                          |
| `/orders` and `/orders/[id]`       | Order history and details of a specific order.            |
| `/products` and `/products/[slug]` | Product list and details of a selected product.           |
| `/wishlist`                        | List of saved products for the user.                      |

## Installation

To run the project locally, follow these steps:

1. **Requirements**: Ensure you have Node.js (recommended LTS version) and npm installed.
2. **Clone the Repository**: Clone this repository to your computer:
   ```
   git clone https://github.com/Swiel7/techvvare-store.git
   cd techvvare-store
   ```
3. **Install Dependencies**: Install all required packages:
   ```
   npm install
   ```
4. **Set Environment Variables**: Create a `.env.local` file in the root directory of the project and configure the environment variables necessary for the application to run. Below is a list of variables along with descriptions of their purpose and how to configure them:
   - **`NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY`**: Public API key for ImageKit to handle images. Copy the public key from your ImageKit account and paste it here.
   - **`IMAGEKIT_PRIVATE_KEY`**: Private API key for ImageKit. Copy the private key from your ImageKit account and paste it here.
   - **`NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT`**: URL endpoint for ImageKit (e.g., `https://ik.imagekit.io/your-account`). Set it according to your ImageKit account configuration.
   - **`NEXT_PUBLIC_API_ENDPOINT`**: API endpoint for the application (default is `http://localhost:3000/` for local environment). No changes needed if running locally.
   - **`DATABASE_URL`**: URL for the PostgreSQL database (e.g., for Neon.tech).
   - **`AUTH_SECRET`**: Secret key for Auth.js authentication. Generate a random string (e.g., using `npx auth`).
   - **`STRIPE_SECRET_KEY`**: Private API key for Stripe to handle payments. Copy the key from your Stripe account (test or production mode).
   - **`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`**: Public API key for Stripe. Copy the public key from your Stripe account.
   - **`STRIPE_WEBHOOK_SECRET`**: Secret key for Stripe webhooks. Copy the key from your Stripe webhook configuration.

## Usage

After configuring the project, launch the application in development mode with Turbopack:

```
npm run dev
```

The application will be available at `http://localhost:3000`. You can browse products, create an account, add items to your cart, and place an order. Features like online payments require proper configuration of environment variables.

If you want to build and run the production version:

```
npm run build
npm run start
```

## Screenshots

Below are screenshots showcasing various features of the Techvvare Store application:

![Product Listing](https://i.imgur.com/R1hMPDG.png)  
_Product Listing_

![Product Details - Data](https://i.imgur.com/5Ei6ckj.png)  
_Product Details - Data_

![Product Details - Reviews](https://i.imgur.com/gFmLdAQ.png)  
_Product Details - Reviews_

![Shopping Cart](https://i.imgur.com/TRAv54l.png)  
_Shopping Cart_

![Checkout](https://i.imgur.com/6rjzhlm.png)  
_Checkout Process_

![Contact Page](https://i.imgur.com/CLCA73s.png)  
_Contact Page_

![Order List](https://i.imgur.com/7P5i6yh.png)  
_Order History List_

![Single Order Details](https://i.imgur.com/L1x1xtJ.png)  
_Single Order Details_

## Contributing

If you want to help with the development of Techvvare Store, you're welcome! You can report bugs, suggest improvements, or share your feedback through code review. Contact me via GitHub Issues to share your insights.
