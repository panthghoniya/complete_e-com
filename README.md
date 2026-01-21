# complet_e-com Project Documentation
1. Project Overview
This is a full-stack E-Commerce application ("Projact") designed to sell products online. It features a complete shopping experience for users (browsing, cart, checkout) and a robust admin panel for managing products, categories, orders, and users.

2. Technology Stack
Frontend
Framework: React (v19) with Vite
Styling: Tailwind CSS
State/Routing: React Router DOM (v7), Context API (likely for Auth/Cart)
HTTP Client: Axios
Icons: React Icons
Key Pages: Home, Product Details, Cart, Checkout, Profile, Admin Dashboard
Backend
Runtime: Node.js
Framework: Express.js
Database: MongoDB with Mongoose
Authentication: JSON Web Tokens (JWT) & bcryptjs
File Uploads: Cloudinary (via Multer)
Security: CORS, dotenv
3. Project Structure
Root Directory
frontend/: React client application
backend/: Express server application
README.md
: Basic setup instructions
Backend Structure (backend/src)
config/: Configuration files (db connection, etc.)
controllers/: Logic for handling requests (Product, User, Order, etc.)
models/: Mongoose schemas (Product, User, Order, Category, etc.)
routes/: API route definitions
authRoutes.js: Authentication (Login/Register)
productRoutes.js: Product CRUD
orderRoutes.js: Order processing
uploadRoutes.js: Image upload handler
userRoutes.js: User management
categoryRoutes.js, dashboardRoutes.js, settingsRoutes.js: Additional admin features
middleware/: Custom middleware (Auth protection, Error handling)
utils/: Helper functions
Frontend Structure (frontend/src)
pages/: Main views
Public: HomePage, ProductScreen, CartPage, LoginPage, RegisterPage
Private: CheckoutPage, OrderScreen, ProfilePage
Admin: pages/admin/ (Dashboard, Edit Pages, List Pages)
components/: Reusable UI components
context/: Global state management (Auth, Cart)
services/: API service calls
4. Key Features
User Features
Authentication: User registration and login.
Product Browsing: View all products, view single product details.
Shopping Cart: Add items, adjust quantities, remove items.
Checkout: Place orders (Cash on Delivery support implied).
Order History: View past orders and status.
Profile: Manage user details.
Admin Features
Dashboard: Overview of sales and metrics.
Product Management: Create, edit, delete products. Image uploading via Cloudinary.
Category Management: Organize products into categories.
Order Management: View and process customer orders.
User Management: View users, manage admin privileges.
5. Setup & Installation
Prerequisites: Node.js, MongoDB (Local or Atlas).

Backend Setup:

cd backend
npm install
# Configure .env with MONGO_URI, JWT_SECRET, CLOUDINARY credentials
npm run dev
Runs on http://localhost:5000.

Frontend Setup:

cd frontend
npm install
npm run dev
Runs on http://localhost:5173.

6. API Endpoints (Summary)
Auth: /api/users/login, /api/users/register
Products: /api/products (GET, POST), /api/products/:id (PUT, DELETE)
Orders: /api/orders (Create), /api/orders/myorders (User history)
Upload: /api/upload (Image upload)
