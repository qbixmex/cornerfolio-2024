# Cornerfolio

Cornerfolio is a Full Stack application designed to showcase your projects and achievements.
The application is built with Next.js and TypeScript for the frontend, and Express.js with MongoDB for the backend.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- User registration and authentication.
- User portfolio management.
- Dynamic content rendering from database.
- Responsive design.
- RESTful API for backend services.

## Technologies

### Frontend

- [Next.js](https://nextjs.org/) - A React framework for server-rendered or statically exported React applications.

- [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript that compiles to plain JavaScript.

- [Redux Toolkit](https://redux-toolkit.js.org/) - Redux Toolkit is a library that provides a set of tools to simplify common Redux use cases.

- [Tailwind](https://www.typescriptlang.org/) - Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces.

### Backend

- [Express.js](https://expressjs.com/) - A minimal and flexible Node.js web application framework.

- [Cloudinary](https://cloudinary.com/) - Streamline media management and improve user experience by automatically delivering images and videos, enhanced and optimized for every user.

- [MongoDB](https://www.mongodb.com/) - A document-oriented NoSQL database used to store application data.

## Installation

To run this project locally, follow these steps:

### 1. Clone the repository:
```sh
git clone https://github.com/qbixmex/cornerfolio-2024
```

### 2. Navigate to the project directory:
```sh
cd Cornerfolio
```

### 3. Install the dependencies for frontend:
```sh
cd frontend

# NPM
npm install

# YARN
yarn i

# PNPM
pnpm i

# BUN
bun i
```

### 4. Install the dependencies for backend:
```sh
# For backend
cd ../backend

# NPM
npm install

# YARN
yarn i

# PNPM
pnpm i

# BUN
bun i
```

### 5. Set up environment variables:

Create a `.env` file in the backend directory and add the following:

```ini
PORT=3000 # <-- Put your free local port here.
HOST=http://localhost

MONGO_URL=mongodb://your_user_name:your_password@localhost:27017
MONGO_DB_NAME=YOUR_DATABASE_NAME
MONGO_USERNAME=your_user_name
MONGO_PASSWORD=your_password

CLOUDINARY_API_SECRET=your_cloudinary_api_secret

JWT_SECRET=dd23a30c7c9159857d6fc52df8725160b6d57 ...
```

#### 5.1 Generate JWT_SECRET (optional)

```sh
node
require("node:crypto").randomBytes(64).toString('hex');

# It will generate something like this:
'1f135548a57a4e2c043d6eb6a6b5e144 and more ...'
```
Copy the generated numbers and paste them into: ```.env```

```ini
# Note: the three dots means there are more numbers and characters.
JWT_SECRET=1f135548a57a4e2c043d6eb6a6b5e144...
```

### 6. Start the development server:

```sh
# ============ FRONTEND ============

cd frontend
# NPM
npm run dev

# YARN
yarn dev

# PNPM
pnpm dev

# BUN
bun dev

# ============ BACKEND ============

cd ../backend

# NPM
npm run dev

# YARN
yarn dev

# PNPM
pnpm dev

# BUN
bun dev
```

## Usage

Once the servers are running, you can access the application at `http://localhost:3000` (or whatever port your frontend server is running on). You can create an account, log in, and start managing your project portfolio.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries or issues, please contact me at qbixmex@gmail.com.

---

Thank you for using Cornerfolio!
