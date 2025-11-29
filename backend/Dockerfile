# Use official Node LTS image
FROM node:22

# Set work directory inside container
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install production dependencies
RUN npm install

# Copy source code
COPY . .

# Expose backend port
EXPOSE 4000

# Start the server
CMD ["npm", "start"]
