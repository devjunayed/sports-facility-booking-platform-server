# Sports Facility Booking Platform

## Introduction

Sport Facility Booking Platform is a server site project which gives various api for creating facility as admin and book facilities as user. Admin can manage facilities as well as user can manage booked facilities. This project include all the various error handling and Authentication, Autherization system.

🔴 LIVE API LINK: https://sports-facility-booking-platform-delta.vercel.app/

## Technology Stack:

- **Programming Language**: TypeScript
- **Web Framework**: Express.js
- **ODM & Validation Library**: Mongoose for MongoDB
- **Packages**:
  - bcrypt,
  - cors,
  - dotenv,
  - express,
  - http-status,
  - jsonwebtoken,
  - mongodb,
  - mongoose,
  - zod,
  - prettier,
  - ts-node-dev,
  - eslint

## Installation guidelines
First of all you need to clone the repository to your local machine. Then setup ```.env``` file as given ```.env.example``` file. Then run ```npm install``` this will install all dependencies. To run the project run command ```npm run dev``` on your terminal.

```js 
don't forget to look in the package.json file
```

## API END POINTS

### User Routes

1. **User Sign Up**

   ```js
   POST / api / auth / signup
   ```

2. **User Login**

    ```js
    POST / api / auth / login
    ```


3. **Create a Facility (Admin Only)**

    ```js
    POST / api / facility
    ```

4. **Update a Facility (Admin Only)**

    ```js
    PUT / api / facility / : id
    ```

5. **Delete a Facility - Soft Delete (Admin Only)**

    ```js
    DELETE / api / facility / : id
    ```

6. **Get All Facilities**

    ```js
    GET / api / facility
    ```


### Booking Routes

7. **Check Availability**

    ```js
    GET / api / check-availability
    ```
    👆This will check the availability of current date


    ```js
    GET / api / check-availability ? date=2024-06-15
    ```



8. **Create a Booking (User Only)**

    ```js
    POST / api / bookings
    ```

9. **View All Bookings (Admin Only)**

    ```js
    GET / api / bookings
    ```

10. **View Bookings by User (User Only)**

    ```js
    GET / api / bookings / user
    ```

11. **Cancel a Booking (User Only)**

    ```js
    DELETE / api / bookings / : id
    ```


