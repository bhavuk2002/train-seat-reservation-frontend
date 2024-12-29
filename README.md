# Train Seat Reservation Frontend

This repository contains the frontend for the **Train Seat Reservation System**, providing an intuitive user interface for booking and managing train seat reservations. It is built with **React**, **React Router**, and styled using **TailwindCSS**.

---

## 🌟 Features

- **User Authentication**: Signup and Login functionalities.
- **Seat Map**: Visual representation of available and reserved seats.
- **Seat Booking**: Reserve 1–7 seats at a time.
- **Admin Dashboard**:
  - Initialize or reset the seat reservation system.
  - Admin login functionality.

---

## 🛠️ Tech Stack

- **React**: JavaScript library for building user interfaces.
- **React Router**: For routing between User and Admin interfaces.
- **Axios**: For handling API requests.
- **TailwindCSS**: For responsive and modern UI design.
- **Vite**: Build tool for fast development and optimized production builds.

---

## 🚀 Deployment

This frontend is deployed using **Netlify**.

Access Here: [Access Complete Deployment Here](https://train-seat-reservation-demo.netlify.app)

A Sample Admim Credentials:

- Email: admin@gmail.com
- Password: bhavuk

---

### Prerequisite

Ensure that the backend API is deployed and accessible. The base URL for API requests should be configured in the frontend.  
**Backend Base URL**: [https://train-seat-reservation-backend.onrender.com](https://train-seat-reservation-backend.onrender.com)

---

## 🧰 Setup and Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/bhavuk/train-seat-reservation-frontend.git
cd frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure API Base URL

Set the API base URL in `src/utils/config.js`:

or your localhost url.

```javascript
const baseURL = "https://train-seat-reservation-backend.onrender.com";
export default baseURL;
```

### Step 4: Run the Development Server

```bash
npm run dev
```

### Step 5: Build for Production

```bash
npm run build
```

## 🔗 Routes

### User Interface: Accessible at `/`

- View seat map.
- Login and signup.
- Book seats.

### Admin Interface: Accessible at `/admin`

- Login for admin.
- Reset or initialize the seat reservation system.

## 📧 Contact

Open to your review or feedback, please reach out to:

Email: vvbnmittal@gmail.com
