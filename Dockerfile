# Use an official Node runtime as a parent image
FROM node:22

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) into the container
COPY package*.json ./
# If you're using Yarn, copy yarn.lock as well
# COPY yarn.lock ./

# Install any needed packages specified in package.json
RUN npm install
# If you're using Yarn, run yarn install
# RUN yarn install

# Bundle app source inside the Docker image
COPY . .

# Build the React application
RUN npm run build

# Use serve to serve the application on port 5000
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "5000"]

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 3000


# docker build -t health-ui .
# docker run -d -p 3000:3000 health-ui
# docker build --platform linux/amd64/v3 -t health-ui .
# burpe acct pwd jGE5|q8~M4*86gHwJ6zyR6?4J?|y72^}
