FROM node:18-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache \
    chromium \
    chromium-chromedriver \
    harfbuzz \
    nss \
    freetype \
    ttf-freefont \
    font-noto-emoji

ENV CHROME_BIN=/usr/bin/chromium-browser \
    CHROME_PATH=/usr/lib/chromium/ 

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "test"]