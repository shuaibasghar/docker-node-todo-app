#each line is a layer in this config
#when we run docker build
#it cached each layer
#it is very help full that if we rebuild images docker will use cached layer if noting ing changes if change only get that changed lay
#first time it will take time to make build
#any time we change our source code it just run the layer of COPY . ./ most of the time this will run again and again during build
FROM node:20.11.1
#we will move our whole code inside the /app folder 
WORKDIR /app

#copy our package.json file . is same directory means inside app package .json is there
COPY package.json .

#install dependencies
# RUN npm install

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; then \
        npm install; \
    else \
        npm install --only=production; \
    fi
#here we are copying our rest of code 
COPY . ./

ENV PORT=3000
# SERVER will be running on this port
EXPOSE ${PORT}

#when we deploy our container it is going to run this command
#CMD ["node","index.js"]
#because now we are using nodemon
#CMD ["npm","run","dev"] 

# after using docker-compose and differnt environment setup development and production
#but we will over write this in docker-compose file
CMD ["npm","start"] 
