# Product Marketplace

This repository contains a product marketplace web application featuring a responsive header, product listing, product details with reviews, and filtering capabilities. The design ensures a seamless user experience across both desktop and mobile platforms.

## Features

### Responsive Header

- Dynamic header with search functionality.
- Supports category and subcategory filtering.
- A mobile-friendly hamburger menu that slides in from the right and overlays content.

### Product Listing

- Displays a grid of products.
- Filtering by category and subcategory, with keyword search.

### Product Details

- Individual product detail pages include product information and reviews.
- Reviews are dynamically rendered from a separate data source.

### Mobile Responsiveness

- All screens and components are optimized for both desktop and mobile devices.

## Tech Stack

### Frontend

- **React**: Core UI library.
- **Next.js**: Framework for server-side rendering and routing.
- **Tailwind CSS**: For styling and responsiveness.
- **Lucide Icons**: Icon library for consistent and lightweight icons.

### State Management

- **useState**: Used for managing local state across components.

## Approach

### Header Component

Created a dynamic and responsive header that adapts to screen sizes.

#### Features:

- **Desktop**:
  - Includes search functionality and a dropdown for category selection.
  - Filter menu with categories and subcategories.
  - User actions like "Profile", "Cart", etc.
- **Mobile**:
  - Hamburger menu toggles a pane from the right, occupying 80% width without affecting desktop styles.
  - Search bar moves to the top for accessibility.

### Product Listing

- Used a products dataset to dynamically render products in a grid format.
- Filtered products based on:
  - Category.
  - Subcategory.
  - Keyword search.

### Product Details

- Rendered individual product data dynamically based on product ID.
- Fetched and displayed associated reviews from a separate reviews dataset.

### Reviews

- Reviews are modularized into a separate file for maintainability.
- Reviews dynamically render for each product with user details, rating, and comment.

## Best Coding Practices

### Componentization

- Components like Header, ProductList, and ProductDetails were modularized to ensure reusability.

### Dynamic Data

- Used arrays for products and reviews to simulate database behavior and ensure scalability.

### State Management

- Utilized useState for lightweight state management, ensuring minimal complexity.

### Responsiveness

- Tailwind CSS was used to handle responsiveness through utility classes for mobile and desktop views.

### Performance Optimization

- Conditional rendering for filters and mobile menus to minimize DOM manipulation.

### Clean Code

- Adhered to consistent naming conventions.
- Logical separation of concerns between UI, state management, and dynamic data rendering.

## Further Improvements

### Backend Integration

- Replace hardcoded product and review data with a backend service (e.g., REST API or GraphQL).
- Implement authentication for user actions like reviews and cart management.

### State Management

- Integrate a global state management solution like Redux or Zustand for complex interactions.

### Accessibility Enhancements

- Ensure ARIA roles and attributes are added for screen reader support.

### Testing

- Add unit tests for components using Jest and React Testing Library.
- Perform end-to-end testing with Cypress.

### Styling Enhancements

- Add animations for smoother transitions in the mobile menu and filters.

### Search Optimization

- Enhance keyword search with fuzzy matching or a search library like Fuse.js.

### Pagination

- Implement pagination or infinite scrolling for product listings.

### Dark/Light Mode

- Add a toggle for switching between dark and light themes.

## How to Run

Clone the repository:
