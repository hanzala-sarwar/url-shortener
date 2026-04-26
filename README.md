# 🔗 URL Shortener App

A modern, fast, and privacy-focused **URL Shortener Web Application** built with **Next.js, MongoDB, and Tailwind CSS**.
Easily convert long URLs into clean, shareable short links with optional user authentication.

---

## 🚀 Features

* 🔗 **Shorten Long URLs** instantly
* ✏️ **Custom Short Links** (user-defined keywords)
* 🔐 **Authentication System** (Login / Signup)
* 👤 **User Dashboard** – view your created URLs
* 🌙 **Dark & Light Mode UI**
* 📱 **Fully Responsive Design** (mobile, tablet, desktop)
* ⚡ **Fast & Optimized Backend** using MongoDB
* 📋 **Copy to Clipboard** functionality
* 🔄 **Instant Redirection** using dynamic routing

---

## 🧠 How It Works

1. User enters a long URL and custom short name
2. The app stores it in MongoDB
3. A short link is generated:

   ```
   https://yourdomain.com/shortcode
   ```
4. When visited → app fetches original URL → redirects instantly

---

## 🛠 Tech Stack

### Frontend

* Next.js (App Router)
* React.js
* Tailwind CSS
* shadcn/ui
* Redux Toolkit

### Backend

* Next.js API Routes
* MongoDB (Mongoose)

### Other Tools

* Axios
* JWT Authentication
* Sonner (toast notifications)
* Lucide Icons

---

## 📁 Project Structure

```
/app
  /about
  /login
  /signup
  /shorten
  /my-urls
  /[shorturl]   → redirect logic

/api
  /generate
  /my-urls
  /user

/models
  urlModel.js
  userModel.js

/dbConfig
/lib
/redux
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/hanzala-sarwar/url-shortener.git
cd url-shortener
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup environment variables

Create `.env.local`:

```env
MONGO_URI=your_mongodb_connection
SECRET_KEY=your_jwt_secret
NEXT_PUBLIC_HOST=http://localhost:3000
```

---

### 4️⃣ Run the development server

```bash
npm run dev
```

Open in browser:

```
http://localhost:3000
```

---

## 📱 Access on Mobile (Dev)

Run:

```bash
npm run dev -- -H 0.0.0.0
```

Then open:

```
http://YOUR_LOCAL_IP:3000
```

---

## 🔐 Authentication Flow

* Users can:

  * Signup
  * Login
  * Generate URLs
  * View their URLs in **My URLs page**

* Guests can:

  * Generate URLs (without login)

---

## 🔁 URL Redirection Logic

Dynamic route:

```
/app/[shorturl]/page.jsx
```

* Fetches original URL from DB
* Uses `redirect()` to send user

---

 

## 🚀 Future Improvements

* 📊 Click analytics (track visits)
* 🗑 Delete & Edit URLs
* 🔍 Search & filter links
* 📅 Created date & stats
* 🔗 QR Code generation
* 🔐 OAuth login (Google)

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create your branch
3. Commit changes
4. Push and open PR

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Hanzala Sarwar**

* GitHub: https://github.com/hanzala-sarwar
* LinkedIn: https://www.linkedin.com/in/hanzala-sarwar-28224a26b/

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
 