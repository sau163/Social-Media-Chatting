FROM node:18

WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Remove existing node_modules if they exist
RUN rm -rf node_modules

# Install dependencies
RUN npm install --production

# Copy the rest of the application files to the working directory
COPY . .

# Rebuild native modules for the correct architecture
RUN npm rebuild bcrypt --build-from-source

# Expose the port the app runs on
EXPOSE 3002

# Start the application
CMD ["node", "index.js"]
