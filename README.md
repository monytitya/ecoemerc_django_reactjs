# 🛒 GreatKart — Django E-Commerce Web Application

A full-featured e-commerce web application built with **Django 3.1**, featuring user authentication, product catalog, shopping cart, PayPal payment integration, AWS S3 media storage, and admin management.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Local Setup & Installation](#-local-setup--installation)
- [Environment Variables](#-environment-variables)
- [Running the Project](#-running-the-project)
- [Loading Sample Data](#-loading-sample-data)
- [Admin Panel](#-admin-panel)
- [URL Routes](#-url-routes)
- [App Modules Explained](#-app-modules-explained)
- [AWS S3 Configuration (Production)](#-aws-s3-configuration-production)
- [Deploying to AWS Elastic Beanstalk](#-deploying-to-aws-elastic-beanstalk)
- [Common Issues & Tips](#-common-issues--tips)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **Custom Authentication** | Register, login, logout with email verification |
| 👤 **User Dashboard** | Profile editing, order history, password change |
| 🏷️ **Product Catalog** | Products with categories, variations (color/size), gallery images |
| ⭐ **Reviews & Ratings** | Authenticated users can submit star ratings and reviews |
| 🛒 **Shopping Cart** | Add, remove, update cart items with variation support |
| 💳 **Checkout & Payment** | PayPal payment gateway integration |
| 📦 **Order Management** | Order tracking with statuses: New → Accepted → Completed → Cancelled |
| 📧 **Email Notifications** | Account verification emails, order confirmation emails |
| 🔒 **Admin Honeypot** | Fake `/admin/` to trap unauthorized access; real admin at `/securelogin/` |
| ⏱️ **Session Timeout** | Auto-logout after 1 hour of inactivity |
| ☁️ **AWS S3 Storage** | Static & media files stored on Amazon S3 |
| 🚀 **AWS Elastic Beanstalk** | Production deployment config included |

---

## 🛠 Tech Stack

- **Backend:** Python 3.x, Django 3.1
- **Database:** SQLite (dev) / PostgreSQL (production via AWS RDS)
- **Storage:** AWS S3 (`django-storages`, `boto3`)
- **Payment:** PayPal SDK (via JavaScript)
- **Frontend:** Bootstrap 4, jQuery, HTML5/CSS3
- **Email:** SMTP (Gmail / any provider)
- **Deployment:** AWS Elastic Beanstalk
- **Config Management:** `python-decouple` (`.env` file)

---

## 📁 Project Structure

```
Python-Django/
└── ecomerc_django/           # Django project root
    ├── greatkart/            # Main project settings & URLs
    │   ├── settings.py       # All settings (DB, AWS, email, etc.)
    │   ├── urls.py           # Root URL dispatcher
    │   ├── views.py          # Home page view
    │   └── media_storages.py # Custom S3 media storage class
    │
    ├── accounts/             # User auth & profiles
    ├── store/                # Products, variations, reviews
    ├── category/             # Product categories
    ├── carts/                # Shopping cart logic
    ├── orders/               # Checkout, payments, order records
    │
    ├── templates/            # HTML templates
    │   ├── base.html
    │   ├── home.html
    │   ├── accounts/         # Login, register, dashboard, etc.
    │   ├── store/            # Store, product detail, cart, checkout
    │   ├── orders/           # Payment page, order complete
    │   └── includes/         # Navbar, footer, alerts, sidebar
    │
    ├── static/               # CSS, JS, images
    ├── .ebextensions/        # AWS Elastic Beanstalk config
    ├── .env-sample           # Template for your .env file
    ├── data.json             # Sample fixture data
    ├── manage.py
    └── requirements.txt
```

---

## ✅ Prerequisites

Make sure you have the following installed:

- Python **3.8+**
- pip
- Git
- (Optional) [virtualenv](https://docs.python.org/3/library/venv.html)

---

## 🚀 Local Setup & Installation

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Python-Django/ecomerc_django
```

### 2. Create & Activate a Virtual Environment

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS / Linux
python -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Set Up Environment Variables

Copy the sample env file and fill in your values:

```bash
# Windows
copy .env-sample .env

# macOS / Linux
cp .env-sample .env
```

Then open `.env` and fill in the required values (see [Environment Variables](#-environment-variables) section below).

### 5. Apply Migrations

```bash
python manage.py migrate
```

### 6. Create a Superuser (Admin Account)

```bash
python manage.py createsuperuser
```

You will be prompted to enter:
- First name
- Last name
- Email *(used as login username)*
- Username
- Password

### 7. Collect Static Files (optional for local dev)

```bash
python manage.py collectstatic
```

---

## 🔑 Environment Variables

Create a `.env` file inside `ecomerc_django/` with these values:

```ini
# Django Core
SECRET_KEY=your-very-secret-key-here
DEBUG=True

# Email (SMTP) — example uses Gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your_email@gmail.com
EMAIL_HOST_PASSWORD=your_app_password
EMAIL_USE_TLS=True

# AWS S3 (required even in dev if settings.py uses it)
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_STORAGE_BUCKET_NAME=your-s3-bucket-name
```

> **Tip for local development:** If you don't have AWS S3 set up yet, temporarily edit `settings.py` to use local static/media files instead (comment out the AWS block and uncomment the local static config).

### 📧 Gmail App Password Setup

1. Enable **2-Step Verification** on your Google account
2. Go to **Google Account → Security → App passwords**
3. Generate a new app password for "Mail"
4. Use that password as `EMAIL_HOST_PASSWORD`

---

## ▶️ Running the Project

```bash
# From the ecomerc_django/ directory
python manage.py runserver
```

Then open your browser at: **http://127.0.0.1:8000/**

---

## 📦 Loading Sample Data

The project includes a `data.json` fixture with sample categories and products:

```bash
python manage.py loaddata data.json
```

---

## 🔐 Admin Panel

| URL | Description |
|---|---|
| `/admin/` | **Honeypot** — logs unauthorized access attempts |
| `/securelogin/` | **Real Django Admin** — login with your superuser account |

In the real admin panel you can:
- Add / edit / delete **Products**, **Categories**, **Variations**
- Manage **Orders** and change their status
- View **Payments**
- Manage **User Accounts** and **Profiles**
- Review **Review & Ratings**
- See **Admin Honeypot** logs

---

## 🌐 URL Routes

| URL | View / Page |
|---|---|
| `/` | Home page |
| `/store/` | All products listing |
| `/store/<category_slug>/<product_slug>/` | Product detail page |
| `/cart/` | Shopping cart |
| `/cart/add_cart/<product_id>/` | Add item to cart |
| `/cart/remove_cart/<product_id>/<cart_item_id>/` | Remove item from cart |
| `/cart/remove_cart_item/<product_id>/<cart_item_id>/` | Decrease item quantity |
| `/accounts/register/` | User registration |
| `/accounts/login/` | User login |
| `/accounts/logout/` | User logout |
| `/accounts/dashboard/` | User dashboard |
| `/accounts/edit_profile/` | Edit user profile |
| `/accounts/change_password/` | Change password |
| `/accounts/my_orders/` | Order history |
| `/accounts/order_detail/<order_number>/` | Order detail page |
| `/orders/place_order/` | Checkout / place order |
| `/orders/payments/` | Payment processing (PayPal) |
| `/orders/order_complete/` | Order confirmation page |
| `/admin/` | Honeypot admin |
| `/securelogin/` | Real admin panel |

---

## 📱 App Modules Explained

### `accounts` — User Authentication
- Custom `Account` model extending `AbstractBaseUser` (login via **email**, not username)
- `UserProfile` model: address, profile picture, city, state, country
- Email verification on registration (token-based via `urlsafe_base64_encode`)
- Password reset via email
- Session-based login with auto-timeout (1 hour)

### `store` — Product Catalog
- `Product`: name, slug, description, price, stock, image, category
- `Variation`: color and size options per product
- `ReviewRating`: user star ratings (1–5) and text reviews
- `ProductGallery`: multiple images per product

### `category` — Categories
- `Category`: name, slug, description, image
- Context processor injects category list into all templates (navbar menu)

### `carts` — Shopping Cart
- `Cart`: session-based (anonymous) or user-linked cart
- `CartItem`: product + quantity + selected variations
- Context processor injects cart item count into all templates

### `orders` — Checkout & Orders
- `Order`: billing info, shipping info, totals, status
- `Payment`: payment ID, method (PayPal), amount, status
- `OrderProduct`: items within an order with variations
- Tax calculated at **2%** of subtotal
- Order confirmation email sent after successful payment

---

## ☁️ AWS S3 Configuration (Production)

The project is pre-configured to serve static and media files from **Amazon S3**.

### Steps:
1. Create an S3 bucket on AWS
2. Set the bucket to **public-read** ACL (or configure a bucket policy)
3. Create an IAM user with `AmazonS3FullAccess` policy
4. Add the keys to your `.env` file
5. Run `python manage.py collectstatic` to upload static files

> Static files → `s3://<bucket>/static/`  
> Media files → `s3://<bucket>/media/` (via custom `MediaStorage` class)

---

## 🌩️ Deploying to AWS Elastic Beanstalk

The `.ebextensions/` folder contains two config files:

| File | Purpose |
|---|---|
| `django.config` | Sets the WSGI path for the Django app |
| `db-migrate.config` | Runs `python manage.py migrate` automatically on deploy |

### Quick Deploy Steps:
```bash
# Install EB CLI
pip install awsebcli

# Initialize EB application
eb init -p python-3.8 greatkart

# Create environment with PostgreSQL RDS
eb create greatkart-env

# Set environment variables on EB
eb setenv SECRET_KEY=... DEBUG=False EMAIL_HOST=... ...

# Deploy
eb deploy
```

> On EB with RDS, the app auto-detects `RDS_DB_NAME` environment variable and switches to PostgreSQL.

---

## 🐛 Common Issues & Tips

### `SECRET_KEY` not found
Make sure your `.env` file exists in the same directory as `manage.py` (inside `ecomerc_django/`).

### AWS S3 errors during local development
Temporarily switch to local static files. In `settings.py`, comment out the AWS static block and uncomment:
```python
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'static'
STATICFILES_DIRS = ['greatkart/static']
```
And remove `STATICFILES_STORAGE` and `DEFAULT_FILE_STORAGE` lines.

### Email not sending
- Make sure Gmail **2FA** is enabled and you're using an **App Password** (not your real password)
- Check that `EMAIL_USE_TLS=True` and `EMAIL_PORT=587`

### Users can't log in after registration
New accounts are **inactive by default** until email is verified. Check your email or manually activate in admin: `securelogin/` → Accounts → set `is_active = True`.

### `psycopg2` install error on Windows
Use the binary version already listed in `requirements.txt`:
```bash
pip install psycopg2-binary
```

---

## 📄 License

This project is for educational purposes. Feel free to use and modify it.

---

*Built with ❤️ using Django*

