FROM node:14-alpine as builder
USER node
ENV NODE_ENV build
WORKDIR /home/node
COPY . /home/node
RUN npm ci \
CMD ["npm", "start"]
