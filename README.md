# Bamazon

Bamazon is a fake storefront I created in MySQL that can be accessed via Node.js. 

You have two options for interacting with the [database](./bamazon.sql) through Node.js:
* As a customer (utilizing the [bamazonCustomer.js code](./bamazonCustomer.js)), you can view the items for purchase and buy an item. 
* As a manager (utilizing the [bamazonManager.js code](./bamazonManager.js)), you can view the inventory of items, sort items by those with low inventory, add to the inventory of an item, and add a new item entirely.

Each item is housed in a table with a unique id number, a product name, the department of the product, the price of the item, and the amount of that item in the inventory. When you purchase an item, the inventory goes down by the amount that you purchased and you're told how much money the purchase totals. Adding to the inventory of an item or adding a brand new item to the store will update the database with the new information and log the changes to the console.

* A video walkthrough of the customer experience: [I'm a customer!](https://drive.google.com/file/d/1k8OPqLHEnwjXS-NF6Xv79xi9pqvK8RR6/view)
* A video walkthrough of the manager experience: [I'm the manager!](https://drive.google.com/file/d/1M5D5T1PCBoBXa55sB1-Rmm_Ao6VAvjWz/view)
