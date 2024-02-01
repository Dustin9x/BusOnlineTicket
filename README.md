
<p align="center"><a href="#" target="_blank"><img src="https://github.com/Dustin9x/BusOnlineTicket/assets/116355841/a2f1700a-873f-4a6e-bd62-26b5b8bf511f" width="180" alt="Laravel Logo"></a></p>


# Project PHTV-BusOnlineTicket

A is a preety basic system implemented using ASP.NET, ReactJS, SQL Server.

PHTV Bus Ticket Booking System is designed to automate the online ticket purchasing through an easy online bus booking system. With PHTV bus ticket reservation system you can manage/book reservations, clients data and passengers lists through its Admin page and book tickets effortlessly through the Bus reservation Website. Customer needs to register at the site to book tickets to the bus. After selecting the schedule, the user is presented a seating layout so that he can select seats of his choice.

If you found this project useful, then please consider giving it a ⭐ on Github and follow me on GitHub.


## How To Run
-   Backend ()
       -   Installation Laragon
            ```bash
            Install SQL Server
            Create a account and let SQL Server run as service of Windows
            Database already seeded in by code first method or you can download database in document folder
            ```
       -   Setup backend database
            ```bash
            $ Adjust the appsetting.json file with your SQL Server account
            $ Open Nuget console and run the command: "update-database"
            $ Wait for database is created and updated
            $ After finishing, Start the ASP.NET server
            ```                       
-   Frontend ()
       -   Installation NodeJS
       -   Installation dependencies
            ```bash
            $ npm i
            $ npm start
            ```
            
## Features:
       -   Login/Logout to System with authentication, encrypt password
       -   Search for schedule, filter the schedule by time, price and bus type
       -   Select seat, purchase a Ticket, make online payments, apply discount voucher
       -   Generates QR codes for confirmed tickets
       -   Sends forget password email, confirm ticket order email
       -   Ticket tracking
       -   Cancel a Ticket and get refund
       -   Register to be driver
       -   Driver tracking their assigned bus and schedule
       -   Overview Profit/Revenue by chart
       -   Fully CRUD function in Admin page
       -   …

       
## Techs:
       -   SQL Server - A proprietary relational database management system developed by Microsoft. 
       -   ASP.NET - A server-side web-application framework designed for web development to produce dynamic web pages.
       -   ReactJS - A JavaScript library for building user interfaces.
       -   Redux - A predictable state container for JavaScript apps.
       -   NodeJS - A JavaScript runtime built on Chrome's V8 JavaScript engine
       
## Screenshots:
<h3>Login Page:</h3>
<img src="https://github.com/Dustin9x/BusOnlineTicket/assets/116355841/e4344a6c-671b-48de-b54b-b62c338608cc" width="100%" alt="Login Page">


<h3>Home Page:</h3>
<img src="https://github.com/Dustin9x/BusOnlineTicket/assets/116355841/a19e6d34-8241-4466-995c-31618ad302c7" width="100%" alt="Homepage">



<h3>Search/Sort/Filter the Trip:</h3>
<img src="https://github.com/Dustin9x/BusOnlineTicket/assets/116355841/00fe0264-59cf-45ae-beda-015c8dde70b1" width="100%" alt="Search/Sort/Filter the Trip">


<h3>Seat Selecting:</h3>
<img src="https://github.com/Dustin9x/BusOnlineTicket/assets/116355841/defe2b87-507c-4f71-9429-5d9994b7a3b4" width="100%" alt="Seat Selecting">


<h3>Ticket purchased:</h3>
<img src="https://github.com/Dustin9x/BusOnlineTicket/assets/116355841/d84a3fd5-abc3-419b-8aaf-23a8c6f10388" width="100%" alt="Ticket purchased">


<h3>Admin Page:</h3>
<img src="https://github.com/Dustin9x/BusOnlineTicket/assets/116355841/cf26a6ac-7dbf-43b6-8c33-228982b83439" width="100%" alt="Adminpage">


<h3>Revenue/Profit chart:</h3>
<img src="https://github.com/Dustin9x/BusOnlineTicket/assets/116355841/be44ce07-9cbb-4f44-b17d-86cb4a044f4a" width="100%" alt="Revenue/Profit">

## Introduction video:
[https://www.youtube.com/watch?v=eAeMKUPtbkk](https://www.youtube.com/watch?v=Rp4BoOmFS-8)

## Collaborators:
       -   Phạm Huy Hoàng - Student1421362
       -   Tran Gia Toan - Student1416122
       -   Le Pham Tran Phu - Student1414240
       -   Bui Quoc Viet - Student1420715

## Instructor:
We give our sincere thanks to: FPT APTECH MS. NGUYEN HA VY
