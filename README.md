# 💊 B2B Pharmacy Inventory System – Frontend

A web-based frontend for a B2B Pharmacy Inventory and Sales Tracking System where **buyers (pharmacies)** can place orders and **sellers (wholesalers or manufacturers)** can view and fulfill them. This system facilitates seamless inventory management, order placement, and billing using a unified login interface.

---

## 🚀 Features

### 👨‍⚕️ Buyer Interface
- 🔍 Search for medicines by drug name, brand, or dosage
- ➕ Add medicines to cart with quantity (tablet/strip)
- 🧾 View and manage cart before placing an order
- 📦 Track all placed orders and their statuses

### 🧑‍💼 Seller Dashboard
- 📥 View and accept/reject incoming orders from buyers
- 📈 Track total sales, revenue, and order fulfillment history
- 📦 Manage available stock and update inventory
- 🧮 View automated billing calculations based on accepted orders

### 💻 Shared Features
- 🔐 Single login interface for both roles (buyer/seller)
- 🔧 Role-based dashboards and navigation
- 📊 Modern UI using TailwindCSS and React components
- 🔌 REST API integration for backend operations

---

## 🧱 Tech Stack

- **React** (Functional Components + Hooks)
- **Tailwind CSS** (Utility-first responsive UI)
- **React Router v6** (Routing)
- **Axios** (HTTP requests)
- **React Hook Form** (Forms & validation)
- **Recharts** (Analytics and chart components)
- **React Toastify** (Toast notifications)
- **Context API** (Global auth state handling)

---

## 📁 Project Structure

```bash
src/
├── components/          # Reusable UI components
├── pages/               # Page views (Buyer/Seller split)
│   ├── Buyer/
│   └── Seller/
├── layouts/             # Layouts for different roles
├── services/            # API calls
├── context/             # Auth context
├── utils/               # Helper functions
├── App.tsx
└── main.tsx
