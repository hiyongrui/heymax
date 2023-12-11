# heymax

# Running of file

# client react running on port 3000
```
cd client
npm run dev
```


# client react running on port 8000
```
cd server
npm run dev
```

# run sql script (from setup.sql)
### which will create database heymax in MYSQL
#### - database configuration of user and password (i used root for mine computer) set in server/server.js


### manage to do
by clicking on user/admin button on home page (setting user data through localStorage), will lead to the respective pages
1) user page - can view catalog of items, add to cart, checkout
2) admin page - add new item, change price, quantity (edit), remove item
3) Inventory Management: Keep track of inventory for each item and prevent users from
adding more of an item to their cart than is available in inventory

### did not manage to do
unit test - need more knowledge as i ended up spending most of my time trying to think of how to do the cart for user and admin, and tried to use EJS for client side (as it was long ago in my school project) but ended up switching back to react

