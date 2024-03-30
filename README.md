# E-Commerce Bookstore README

Welcome to the E-Commerce Bookstore project! This repository is built using Next.js and MongoDB, providing a fully functional online bookstore with features like a shopping cart and wishlist.
Follow the guide below to understand the project structure and navigate through the files.

### Table of Contents
1. Project Overview
1. Prerequisites
1. Getting Started
1. File Structure
1. Configuration
1. Running the Application
1. Contributing
   
### Project Overview
  This e-commerce bookstore is a web application developed using Next.js for the frontend and MongoDB for the backend. It provides users with the ability to browse, search, add books to their cart, and create wishlists.

### Prerequisites
Make sure you have the following installed on your machine:
Node.js
npm
MongoDB

### Getting Started
Clone the repository:
bash
Copy code

git clone [https://github.com/LordMashh/Bookstore-Next.git](https://github.com/LordMashh/Bookstore-Next.git)

Change into the project directory:
bash,
Copy code,
cd e-commerce-bookstore,

Install dependencies:
bash,
Copy code,
npm install,
File Structure,
This project follows a clear and organized file structure.

### File Structure
pages: Contains the main pages of the application, such as the home page and book details page.
components: Reusable React components used throughout the application.
styles: CSS files, including global styles and module-specific styles.
public: Static assets like images and favicon.
server: Backend files, including database configuration and API routes.

### Configuration
Configure the MongoDB connection in the server/db.js file. Update the connection URL with your MongoDB database credentials.

### Running the Application
Run the following command to start the development server:
bash,
Copy code,
npm run dev,
Visit http://localhost:3000 in your browser to view the application.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### Contributing
Feel free to contribute to the project by opening issues or submitting pull requests.
## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

---
