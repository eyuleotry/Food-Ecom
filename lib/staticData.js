export const db = {
  roles: [
    { id: 1, roleName: "admin" },
    { id: 2, roleName: "vendor" },
    { id: 3, roleName: "customer" }
  ],
  users: [
    { id: 1, name: "Admin User", email: "admin@eyasufoods.com", passwordHash: "hashed_admin", roleId: 1 },
    { id: 2, name: "Vendor One", email: "vendor1@eyasufoods.com", passwordHash: "hashed_vendor1", roleId: 2 },
    { id: 3, name: "Customer One", email: "customer1@eyasufoods.com", passwordHash: "hashed_customer1", roleId: 3 },
    { id: 4, name: "Customer Two", email: "customer2@eyasufoods.com", passwordHash: "hashed_customer2", roleId: 3 },
    { id: 5, name: "Vendor THREE", email: "vendor2@eyasufoods.com", passwordHash: "hashed_vendor1", roleId: 2 }
  ],
  vendors: [
    { id: 1, userId: 2, businessName: "Vendor One Foods", description: "Quality meals", location: "Addis Ababa" },
    { id: 2, userId: 5, businessName: "Vendor wow", description: "wanda meals", location: "Hawassa" }
  ],
  restaurants: [
    { id: 1, name: "Sheraton Addis, a Luxury Collection Hotel", vendorId: 1, location: "Addis Ababa", description: "A renowned luxury hotel known for its grand architecture, lush gardens, and upscale dining options.", image_url: "https://cache.marriott.com/content/dam/marriott-renditions/ADDLC/addlc-hotel-exterior-night-4692-hor-pano.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1920px:*" },
    { id: 2, name: "Hyatt Regency Addis Ababa", vendorId: 1, location: "Addis Ababa", description: "A contemporary hotel located in Meskel Square, offering modern amenities, diverse culinary experiences, and excellent service.", image_url: "https://lh3.googleusercontent.com/p/AF1QipM8F-CiZ2OM-O_D29CpuEWGHV_TnC1RtSPDWHrI=w243-h174-n-k-no-nu" },
    { id: 3, name: "Ethiopian Skylight Hotel", vendorId: 1, location: "Addis Ababa", description: "The largest hotel in Ethiopia, conveniently located near Bole International Airport, boasting numerous restaurants and a large convention center.", image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4DIINjayDqYBkEcAHQkaUl27YoLggbTwV6Q&s" },
    { id: 4, name: "Kuriftu Resort & Spa", vendorId: 2, location: "Bishoftu", description: "A lakeside resort with beautiful views, spa facilities, and a restaurant serving both local and international cuisines.", image_url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/db/d6/11/caption.jpg?w=900&h=-1&s=1" },
    { id: 5, name: "Castelli Restaurant", vendorId: 3, location: "Addis Ababa", description: "One of the oldest Italian restaurants in Addis Ababa, famous for authentic Italian dishes and vintage atmosphere.", image_url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/6f/7a/8b/shaheen-restaurant-dining.jpg?w=1200&h=-1&s=1" },
    { id: 6, name: "2000 Habesha Cultural Restaurant", vendorId: 4, location: "Addis Ababa", description: "A vibrant restaurant showcasing Ethiopian culture with traditional music, dance, and a diverse local menu.", image_url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/a5/6f/ea/inside-view.jpg?w=900&h=500&s=1" },
    { id: 7, name: "Radisson Blu Hotel Addis Ababa", vendorId: 5, location: "Addis Ababa", description: "A high-end hotel in the business district, offering exceptional dining and modern amenities.", image_url: "https://www.destinationafrica.travel/wp-content/uploads/2024/08/Radisson-Blu-Hotel-Addis-Ababa-01.jpg" },
    { id: 8, name: "Jupiter International Hotel", vendorId: 6, location: "Addis Ababa", description: "A business-friendly hotel with a variety of dining options and convenient city access.", image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7HfjTpTSM6DXuJr_FhC29JkTEHI6V-ZXJsw&s" },
    { id: 9, name: "Saro-Maria Hotel", vendorId: 7, location: "Addis Ababa", description: "A popular hotel near Bole, offering comfortable rooms and a tasty mix of Ethiopian and international cuisine.", image_url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/c7/e5/67/saro-maria-hotel.jpg?w=900&h=500&s=1" },
    { id: 10, name: "Harmony Hotel", vendorId: 8, location: "Addis Ababa", description: "A modern hotel known for its cozy ambiance, poolside bar, and restaurant serving delicious meals.", image_url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/360773656.jpg?k=af6be94de338bec9e36e89bba184b55e3b9a4005c08f9d0d048d543f1608cb79&o=&hp=1" },
    { id: 11, name: "Friendship International Hotel", vendorId: 9, location: "Addis Ababa", description: "A contemporary hotel providing friendly service and diverse food choices for travelers.", image_url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/04/1b/70/d7/friendship-international.jpg?w=900&h=500&s=1" },
    { id: 12, name: "Capital Hotel & Spa", vendorId: 10, location: "Addis Ababa", description: "A luxury hotel and spa featuring a large pool, fitness center, and high-quality dining.", image_url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/03/7c/60/capital-hotel-and-spa.jpg?w=900&h=500&s=1" }
  ],

  menuItems: [
    { id: 1, restaurantId: 1, name: "Shiro", description: "A flavorful, stew-like dish made from ground chickpeas or broad beans, often seasoned with garlic, ginger, and other spices.", price: 350.00, image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0CfFf3Jj5enniHla5Pzg6ab5y-OsTnngMVQ&s", category: "Main Course" },
    { id: 2, restaurantId: 1, name: "Tibs", description: "Sautéed pieces of beef, lamb, or goat, often cooked with onions, peppers, and various spices, served hot.", price: 600.00, image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl5-8HA7qJmjMe-uPKfYY2bkpuC_FcanSdrA&s", category: "Fast Food" },
    { id: 3, restaurantId: 2, name: "Kitfo", description: "Finely minced raw beef, marinated in mitmita and niter kibbeh. Can be served raw, rare, or well-done.", price: 750.00, image_url: "https://cdn.tasteatlas.com/Images/Dishes/1da821e8c98a42f38ede3fd8556652d2.jpg?w=600&h=450", category: "Main Course" },
    { id: 4, restaurantId: 2, name: "Gored Gored", description: "Cubes of raw beef, often seasoned with berbere and niter kibbeh, similar to kitfo but with larger pieces of meat.", price: 700.00, image_url: "https://i.ytimg.com/vi/HWJD4BlJDuQ/maxresdefault.jpg", category: "Bread" },
    
    { id: 5, restaurantId: 3, name: "Doro Wot", description: "A spicy chicken stew with hard-boiled eggs, simmered in a rich berbere sauce and served with injera.", price: 800.00, image_url: "https://www.diversivore.com/wp-content/uploads/2023/05/Doro-Wat-mobile-banner-1.jpg", category: "Main Course" },
    { id: 6, restaurantId: 3, name: "Injera", description: "Soft, sour flatbread made from teff flour, serving as the base for most Ethiopian dishes.", price: 100.00, image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmPjii-nbg6I6TC0-iXwlBW34BRGzKFmTJEQ&s", category: "Bread" },
    { id: 7, restaurantId: 4, name: "Fish Goulash", description: "Chunks of fresh fish cooked in a lightly spiced sauce, served with injera or rice.", price: 500.00, image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFvi9FiOrpP5b8dFa_nKljGlx95tbFmBvmAg&s", category: "Main Course" },
    { id: 8, restaurantId: 4, name: "Salad", description: "A refreshing salad with local greens, avocado, tomato, and homemade dressing.", price: 200.00, image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh5d-ZLSzGRF6HDdYEyo0X6YhEd08hmo6Rdg&s", category: "Salad" },
    { id: 9, restaurantId: 5, name: "Lasagna", description: "Classic Italian-style lasagna with layers of pasta, meat sauce, and cheese.", price: 650.00, image_url: "https://newmansown.com/wp-content/uploads/2022/03/Homemade-lasagna-1200x675.png", category: "Main Course" },
    { id: 10, restaurantId: 5, name: "Spaghetti Bolognese", description: "Spaghetti pasta served with a rich Italian-style meat sauce.", price: 550.00, image_url: "https://www.slimmingeats.com/blog/wp-content/uploads/2010/04/spaghetti-bolognese-36-720x720.jpg", category: "Main Course" },
    { id: 11, restaurantId: 6, name: "Injera Firfir", description: "Shredded injera sautéed with onions, peppers, and spices, a popular Ethiopian breakfast dish.", price: 300.00, image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUPGiT-vFd4IOerH52A1c5AI0uPpaJz6tzlQ&s", category: "Breakfast" },
    { id: 12, restaurantId: 6, name: "Derek Tibs", description: "Crispy, spicy pan-fried beef cubes served with injera and spicy awaze sauce.", price: 600.00, image_url: "https://pekinthechef.com/_next/image?url=https%3A%2F%2Fwkefbybaeklskadsmwlu.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2FRecipe%2520Images%2F105245_derek-tibs.webp&w=1024&q=75", category: "Main Course" },
    
    { id: 13, restaurantId: 7, name: "Beef Burger", description: "Juicy grilled beef patty with lettuce, tomato, and cheese on a toasted bun.", price: 400.00, image_url: "https://simplehomeedit.com/wp-content/uploads/2024/03/Homemade-Beef-Burgers-4.webp", category: "Fast Food" },
    { id: 14, restaurantId: 7, name: "Fruit Salad", description: "Seasonal fresh fruit mix, perfect for a light dessert.", price: 150.00, image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDsa97h3F7GwiilRhV-zTxK-PnFNnzgv2xWw&s", category: "Dessert" },
    { id: 15, restaurantId: 8, name: "Chicken Sandwich", description: "Grilled chicken breast with lettuce, tomato, and aioli on ciabatta.", price: 350.00, image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLkiOrxPi26skuWCPlDOcRS_mCnnX_kjRIQQ&s", category: "Fast Food" },
    { id: 16, restaurantId: 8, name: "Vegetable Soup", description: "A healthy soup with seasonal vegetables and light broth.", price: 180.00, image_url: "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_4:3/k%2FPhoto%2FRecipes%2F2024-09-vegetable-soup%2Fvegetable-soup-104", category: "Soup" },
    { id: 17, restaurantId: 9, name: "Cheesecake", description: "Creamy cheesecake with a graham cracker crust and fresh fruit topping.", price: 300.00, image_url: "https://www.jocooks.com/wp-content/uploads/2018/11/cheesecake-1-22-500x500.jpg", category: "Dessert" },
    { id: 18, restaurantId: 9, name: "Lamb Tibs", description: "Tender lamb cubes sautéed with onion, rosemary, and peppers.", price: 700.00, image_url: "https://www.seriouseats.com/thmb/7krlJdfnpXB53aqHg-vBSHjiDPc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/perfectly-grilled-lamb-rib-or-loin-chops-recipe-hero-03-262fe2defc7c491688cb2d363dad3446.JPG", category: "Main Course" },
    { id: 19, restaurantId: 10, name: "Greek Salad", description: "Crisp lettuce, cucumber, tomato, olives, and feta cheese.", price: 250.00, image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVszQzT5Yler0fycOCa3f6d06GXPyjKxl7rg&s", category: "Salad" },
    { id: 20, restaurantId: 10, name: "Chicken Pizza", description: "Wood-fired pizza topped with grilled chicken, vegetables, and mozzarella.", price: 500.00, image_url: "https://www.allrecipes.com/thmb/qZ7LKGV1_RYDCgYGSgfMn40nmks=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-24878-bbq-chicken-pizza-beauty-4x3-39cd80585ad04941914dca4bd82eae3d.jpg", category: "Main Course" },
    { id: 21, restaurantId: 11, name: "Vegetarian Burger", description: "Grilled veggie patty with lettuce, tomato, and avocado.", price: 350.00, image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQVrO9FKarrAGq08vByBi6iEz-wLoEUi7c_g&s", category: "Fast Food" },
    { id: 22, restaurantId: 11, name: "Beef Steak", description: "Grilled beef steak served with mashed potatoes and vegetables.", price: 800.00, image_url: "https://takrecipe.com/wp-content/uploads/2022/10/beef-steak-recipe.jpg", category: "Main Course" },
    { id: 23, restaurantId: 12, name: "Chicken Curry", description: "Tender chicken pieces in a mildly spiced Ethiopian curry sauce.", price: 650.00, image_url: "https://www.foodandwine.com/thmb/8YAIANQTZnGpVWj2XgY0dYH1V4I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/spicy-chicken-curry-FT-RECIPE0321-58f84fdf7b484e7f86894203eb7834e7.jpg", category: "Main Course" },
    { id: 24, restaurantId: 12, name: "Fruit Parfait", description: "Layers of yogurt, fresh fruit, and granola.", price: 200.00, image_url: "https://tatyanaseverydayfood.com/wp-content/uploads/2021/06/Easy-Fruit-Granola-Parfaits.jpg", category: "Dessert" }
  ],
  cartItems: [
    { id: 1, userId: 3, menuItemId: 1, quantity: 2 },
    { id: 2, userId: 3, menuItemId: 2, quantity: 1 },
    { id: 3, userId: 4, menuItemId: 3, quantity: 1 }
  ],
  orders: [
    { id: 1, userId: 3, restaurantId: 1, totalPrice: 1200.00, status: "pending" },
    { id: 2, userId: 4, restaurantId: 2, totalPrice: 880.00, status: "preparing" }
  ],
  orderItems: [
    { id: 1, orderId: 1, menuItemId: 1, quantity: 2, price: 450.00 },
    { id: 2, orderId: 1, menuItemId: 2, quantity: 1, price: 300.00 },
    { id: 3, orderId: 2, menuItemId: 3, quantity: 1, price: 800.00 },
    { id: 4, orderId: 2, menuItemId: 4, quantity: 1, price: 80.00 }
  ],
  payments: [
    { id: 1, orderId: 1, paymentMethod: "Credit Card", transactionId: "TXN123456", status: "success" },
    { id: 2, orderId: 2, paymentMethod: "COD", transactionId: "TXN123457", status: "success" }
  ]
};
