# Get latest image
FROM node:16

# Create the directory
WORKDIR /usr/src/app/

# Install the dependencies
COPY package*.json ./

RUN npm install

# Bundle source
COPY . . 

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
