# A node.js v8 box
FROM node:8-alpine
 
# Who(m) to blame if nothing works
MAINTAINER sushilkumar4sep@gmail.com
 
# Create a working directory 
RUN mkdir -p /usr/src/app
 
# Switch to working directory
WORKDIR /usr/src/app

COPY package*.json ./

# Install dependencies (if any) in package.json
RUN npm install
 
# Copy contents of local folder to `WORKDIR`
# You can pick individual files based on your need
COPY . .
 
RUN npm run build
  
# Start the Node.js app on load
CMD [ "npm", "start" ]

