# GuruKhoj-FYP-Backend


Welcome to GuruKhoj - your ultimate solution for connecting students with professional teachers for a seamless learning experience! GuruKhoj is a mobile application built on React Native, offering a robust platform for students to explore and enroll in their desired courses and subjects. 

Our backend, powered by Express.js, ensures smooth communication between the GuruKhoj app and the database, which is MongoDB in this case. With a focus on security, reliability, and efficiency, our backend leverages various dependencies to provide essential functionalities.

GuruKhoj addresses the challenges and insecurities associated with traditional methods of finding tutors or attending classes. Through our platform, students can confidently connect with skilled educators, whether they need in-person or virtual tutoring sessions. Parents can rest assured knowing the background details of the teachers, fostering a sense of security and trust.

Moreover, GuruKhoj facilitates seamless communication between students, teachers, and parents, creating a safe and supportive learning environment. By leveraging modern technologies and innovative features, GuruKhoj revolutionizes the way education is accessed and delivered.

A journey towards academic excellence and personal growth!

# An explanation of the dependencies used in the backend:

1. **bcryptjs**: Used for hashing passwords securely. This ensures that user passwords are stored in a secure manner in the database.

2. **cors**: CORS (Cross-Origin Resource Sharing) is a mechanism that allows resources on a web page to be requested from another domain outside the domain from which the first resource was served. This package is used to enable CORS in the Express.js server, allowing the frontend of the GuruKhoj app, which is likely hosted on a different domain, to communicate with the backend.

3. **dotenv**: This package is used to load environment variables from a .env file into process.env. Environment variables are often used to store sensitive information such as database connection strings or API keys.

4. **express**: Express.js is a web application framework for Node.js, designed for building web applications and APIs. It provides a robust set of features for web and mobile applications.

5. **express-jwt**: This package is used for validating JSON Web Tokens (JWT) and securing Express routes. JWTs are often used for authentication and authorization in web applications.

6. **jsonwebtoken**: Used for generating and verifying JSON Web Tokens (JWT). JWTs are used for securely transmitting information between parties as a JSON object.

7. **mongodb**: MongoDB is a NoSQL database used for storing data in JSON-like documents with dynamic schemas. It is widely used in Node.js applications due to its flexibility and scalability.

8. **mongoose**: Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a higher-level abstraction for interacting with MongoDB, making it easier to define schemas, perform CRUD operations, and perform data validation.

9. **morgan**: Morgan is a logging middleware for Express.js. It simplifies the process of logging HTTP requests in the backend, providing information such as request method, URL, status code, response time, and more.

10. **multer**: Multer is a middleware for handling multipart/form-data, which is primarily used for uploading files. It is commonly used in conjunction with Express.js for handling file uploads in web applications.

These dependencies are essential for building the backend of the GuruKhoj app, enabling features such as authentication, database interaction, file uploads, logging, and more.

npm start is used to run the backend.

