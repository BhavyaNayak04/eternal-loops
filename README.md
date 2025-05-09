# eternal loops

Eternal Loops is a product showcasing and businessing platform for crochet art built using Next.js, Express.js, and MongoDB, for my sister's crochet interest. It allows users to browse products, wishlist them, add items to cart, and place custom orders. The project includes both frontend and backend functionality with essential features integrated. It includes an admin dashboard for controlled access as well.

## tech stack

* **Frontend:** Next.js (with Typescript)
* **Backend:** Express.js
* **Database:** MongoDB (Atlas)

## features

* User registration and login using JWT Refresh and Access Tokens
* Product exploration
* Like functionality
* Add to cart and place orders
* Custom order request features
* Newsletter subscription
* Admin Dashboard

## getting started

#### 1. clone the repository

```bash
git clone <repo-url>
cd eternal-loops
```

#### 2. install dependencies

Install dependencies separately for frontend and backend:

```bash
# In the frontend directory
cd frontend
npm install

# In the backend directory
cd ../backend
npm install
```

#### 3. environment variables

Refer to the `.env.template` files in both `frontend` and `backend` folders to understand which environment variables you need to configure.

**For Backend (`backend/.env`):**

* `MONGO_URI` – Your MongoDB Atlas connection string
* `JWT_SECRET` – Secret key for access tokens
* `REFRESH_SECRET` – Secret key for refresh tokens

**For Frontend (`frontend/.env.local`):**

* `NEXT_PUBLIC_BASE_URL` – Backend API base URL (e.g., `http://localhost:5000/api`)

#### 4. run the servers

```bash
# Run backend
cd backend
npm run dev

# Run frontend (in another terminal)
cd frontend
npm run dev
```

## remaining TODOs

* Add **pagination** to APIs and implement **search** functionality
* Integrate **Razorpay** for payments
* Connect with a **third-party shipping/tracking API**
