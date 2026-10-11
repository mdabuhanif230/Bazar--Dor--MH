# BazarDor — Daily Market Prices

BazarDor is a Bengali market price application that I built to help users check the prices of everyday groceries in one place. Users can explore products by category, compare prices across markets, and see which products have increased or decreased in price.

## Project Overview

I developed this project using Next.js and the App Router. Product and category information comes from an external API. Better Auth handles authentication, and MongoDB stores user accounts and authentication data.

The application includes a responsive interface, protected product details pages, price sorting, and profile management.

## Technologies Used

- **Next.js:** Application framework, server rendering, and API route handling.
- **React:** Reusable UI components and interactive features.
- **JavaScript:** Data processing, validation, sorting, and application logic.
- **Tailwind CSS:** Styling and responsive layouts.
- **DaisyUI:** UI components and a custom color theme.
- **Better Auth:** Email/password authentication, social login, and session management.
- **MongoDB:** User account and authentication data storage.
- **React Hot Toast:** Success and error notifications.
- **React Icons:** Social login button icons.
- **Hind Siliguri:** Bengali typography.
- **ESLint:** Code quality checks.

## Features

### 1. Responsive Navigation

The navigation bar includes the project logo, date, category links, and authentication controls. The active category is highlighted. Logged-in users can access their profile and sign out from the user menu.

### 2. Scrolling Price Ticker

The ticker displays product icons, names, current prices, units, and percentage changes. It scrolls continuously and pauses when a user hovers over it.

### 3. Home Page Product Sections

The home page displays:

- The top six products with the largest percentage price increases.
- The top six products with the largest percentage price decreases.
- All products received from the API.

The hero button scrolls directly to the all-products section without changing the route.

### 4. API-Based Product Information

Product names, categories, icons, prices, price changes, and market information are loaded from an external API.

**API Base URL:**

https://openapi.programming-hero.com/api/bazardor

### 5. Category Filtering and Sorting

Users can browse products by category and sort them in default order, from lowest to highest price, or from highest to lowest price.

Bengali digits are converted into numeric values before prices are compared.

### 6. Protected Product Details

Product details pages require authentication. Each page displays the product name, category, unit, current price, and price change.

The page also includes minimum, maximum, and average prices, along with a table of prices from different markets.

### 7. Authentication

I integrated Better Auth to support:

- Registration with name, email, and password.
- Login with email and password.
- Google sign-in.
- GitHub sign-in.
- User sign-out.

The forms include validation, loading indicators, and password visibility controls. Successful registration redirects users to the sign-in page. Successful login redirects them to the home page.

### 8. User Profile and Information Update

Users can view their name, email, and available account photo. If a photo is unavailable, the application displays the first letter of their email.

Users can update their name through a separate profile update page.

### 9. Loading and Error States

Skeleton loaders appear while product information is being fetched. An error page provides a retry option, and a friendly 404 page handles unknown routes and unavailable products or categories.

### 10. Toast Notifications

Notifications provide feedback for login, registration, logout, profile updates, validation errors, and protected-page redirects.

## Development Work

During development, I worked on:

- Creating reusable navigation, product, form, and loading components.
- Integrating server-side API fetching.
- Building dynamic product and category routes.
- Formatting prices and numbers in Bengali.
- Calculating market price summaries.
- Implementing price sorting and top price movers.
- Connecting authentication to MongoDB.
- Protecting pages with session checks.
- Managing form validation and submission states.
- Designing responsive layouts for mobile, tablet, and desktop.
- Handling loading, error, and not-found states.

## Price Calculations

- **Minimum price:** The lowest minimum price across all listed markets.
- **Maximum price:** The highest maximum price across all listed markets.
- **Market midpoint:** The average of a market's minimum and maximum prices.
- **Average price:** The average of all listed market midpoints.

## Deployment on Vercel

I plan to deploy this application on Vercel using its Next.js integration.

The deployment setup includes:

- Connecting the GitHub repository to Vercel.
- Configuring the MongoDB connection and Better Auth environment variables.
- Adding Google and GitHub OAuth credentials.
- Setting the authentication base URL to the production website address.
- Configuring Google and GitHub callback URLs for the production domain.
- Checking product data loading, authentication, profile updates, and direct access to dynamic routes after deployment.

## Author

**Md Abu Hanif**

Diploma in Computer Science and Technology  
Sirajganj Polytechnic Institute  
Programming Hero — Batch 14

## Price Notice

Displayed prices are estimates and may change depending on market conditions.
