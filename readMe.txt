Working - 

--------Starting the project and server ----------

1. After successfull pull run npm install inside both foodApp and server folder.
2. First start the server using the cmd/powershell/etc.. and write node server.js to start the server.
3. Once the server is started it will start listening to the requests by default on port 3000.
4. Go inside foodApp folder run ng serve command to start the project.
5. For database - Visit https://www.mongodb.com/ and then signin for the ATLAS 

--------Using the website (From anular)--------------

1. Signup as a user or a deliveryExecutive. (Skip if already a user/deliveryExecutive/RestaurantOwner{hardcoded})
2. Login as your role 

*****-------For User-----******
	1. After successfull login you can search for restaurants or dishes based on city on the all restaurants tab.
	2. Place an order by going inside a restaurant and then in Order Online tab.
	3. You can add multiple items from a restaurant (Remember only from same restaurant)
	4. Place order by going inside the cart.
	5. Add your address (you can update address till you confirm order).
	6. You can check the progress of yoour order in your orders section from navbar
	7. After order you can give rating to the food as well as deliveryexecutive.
	8. Can check reports in the form of graph of Highly ordered restaurants and top rated restaurants.

*****-----For Delivery Executive----*****
	1. After successfull login you'll be redirected to de home page where you can see all the incomming orders your active orders and the recent deliveries.
	2. you can accept the order from incomming orders section(Atmost 3 orders can be accepted)
	3. You can update the status of the food in active orders and when delivered enter the otp to verify.
	4. You can check your reports of Total delivered orders, monthly ratings, monthly deliveries.
	5. You can edit your profile using profile tab.

*****-----For Restaurant Owner (Adition Module)-----******
	1. After successfull login you will be redirected to restaurant owner home page where you can see all the incomming orders for your restaurant.
	2. you can accept the orders from here and those orders will be then showed to deliveryexecutive


--------Build Version ------------

For build version you need to make changes in the following paths - 
	1. In index.html update base href to ->  <base href="/dist/"> 
	2. Search for ../../../ in main.js and replace it with "/dist/"
	3. Also update the same path for jpg images in script.js
	4. after making the above changes run the server.
	5. After server run the index.html in live server and boom it will work.


*******Used Material UI for designing*****************


Third Party components used - 
	1. NodeMailer
	2. ngChart2
	3. JSON Web Token for authentication of tokens
	4. Mongoose for mongoDb
	5. Material for UI
	6. Bootstrap for styling
	7. NgStarRating



Static code Testing (SonarQube)-

	http://172.27.12.78/overview?id=ng_g2_MajorProject

 