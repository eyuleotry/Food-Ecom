-- Create the database
CREATE DATABASE IF NOT EXISTS Foodord;
USE Foodord;

-- Roles table
CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  role_name ENUM('admin', 'vendor', 'customer') UNIQUE NOT NULL
);

-- Users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role_id INT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- Vendors table
CREATE TABLE vendors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNIQUE NOT NULL,
  business_name VARCHAR(100),
  description TEXT,
  location TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Restaurants table
CREATE TABLE restaurants (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  vendor_id INT NOT NULL,
  location TEXT,
  description TEXT,
  image_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (vendor_id) REFERENCES vendors(id) ON DELETE CASCADE
);

-- Menu items table
CREATE TABLE menu_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  restaurant_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  category VARCHAR(50),
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);

-- Cart items table
CREATE TABLE cart_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  menu_item_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE CASCADE
);

-- Orders table
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  restaurant_id INT NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  status ENUM('pending', 'preparing', 'delivered', 'cancelled') DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);

-- Order items table
CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  menu_item_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE CASCADE
);

-- Payments table
CREATE TABLE payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  payment_method VARCHAR(50),
  transaction_id VARCHAR(100),
  status ENUM('success', 'failed') DEFAULT 'success',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- Seed data: Roles
INSERT INTO roles (id, role_name) VALUES
  (1,'admin'),
  (2,'vendor'),
  (3,'customer');

-- Seed data: Users
INSERT INTO users (id, name, email, password_hash, role_id) VALUES
  (1,'Admin User','admin@eyasufoods.com','hashed_admin',1),
  (2,'Vendor One','vendor1@eyasufoods.com','hashed_vendor1',2),
  (3,'Customer One','customer1@eyasufoods.com','hashed_customer1',3),
  (4,'Customer Two','customer2@eyasufoods.com','hashed_customer2',3),
  (5,'Vendor THREE','vendor2@eyasufoods.com','hashed_vendor1',2);

-- Seed data: Vendors
INSERT INTO vendors (id, user_id, business_name, description, location) VALUES
  (1,2,'Vendor One Foods','Quality meals','Karachi'),
  (2,5,'Vendor wow','wanda meals','Faisalabad');

-- Seed data: Restaurants
INSERT INTO restaurants (id, name, vendor_id, location, description, image_url) VALUES
  (1,'Vendor One Main Branch',1,'Karachi','Main branch of Vendor One','https://example.com/restaurant1.jpg'),
  (2,'Vendor One DHA Branch',1,'Karachi DHA','Second branch of Vendor One','https://example.com/restaurant2.jpg'),
  (3,'DHA Branch',1,'DHA','Third branch of Vendor One','https://example.com/restaurant3.jpg');

-- Seed data: Menu items
INSERT INTO menu_items (id, restaurant_id, name, description, price, image_url, category) VALUES
  (1,1,'Chicken Biryani','Spicy chicken biryani',450.00,'https://example.com/biryani.jpg','Main Course'),
  (2,1,'Beef Burger','Juicy beef burger',300.00,'https://example.com/burger.jpg','Fast Food'),
  (3,2,'Chicken Karahi','Traditional chicken karahi',800.00,'https://example.com/karahi.jpg','Main Course'),
  (4,2,'Garlic Naan','Soft garlic naan',80.00,'https://example.com/naan.jpg','Bread');

-- Seed data: Cart items
INSERT INTO cart_items (user_id, menu_item_id, quantity) VALUES
  (3,1,2),
  (3,2,1),
  (4,3,1);

-- Seed data: Orders
INSERT INTO orders (id, user_id, restaurant_id, total_price, status) VALUES
  (1,3,1,1200.00,'pending'),
  (2,4,2,880.00,'preparing');

-- Seed data: Order items
INSERT INTO order_items (order_id, menu_item_id, quantity, price) VALUES
  (1,1,2,450.00),
  (1,2,1,300.00),
  (2,3,1,800.00),
  (2,4,1,80.00);

-- Seed data: Payments
INSERT INTO payments (order_id, payment_method, transaction_id, status) VALUES
  (1,'Credit Card','TXN123456','success'),
  (2,'COD','TXN123457','success');
