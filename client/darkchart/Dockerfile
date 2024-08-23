# Use the official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Build the Vite app for production
RUN npm run build

# Expose the port the app runs on
EXPOSE 5173

# Start the Vite preview server
CMD ["npm", "run", "preview", "--", "--port", "5173"]


