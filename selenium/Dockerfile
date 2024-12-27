FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN apk add --no-cache \
    chromium \
    chromium-chromedriver \
    bash \
    udev \
    ttf-freefont \
    harfbuzz \
    ca-certificates \
    dbus


ENV CHROME_BIN=/usr/bin/chromium-browser \
    CHROME_PATH=/usr/lib/chromium/

EXPOSE 3000

CMD ["npm", "test"]
