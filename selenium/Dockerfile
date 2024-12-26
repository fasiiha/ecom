FROM node:18

RUN apt-get update && apt-get install -y \
    chromium \
    chromium-driver \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY selenium/package*.json ./selenium/

RUN cd selenium && npm install

COPY . .

ENV CHROME_BIN=/usr/bin/chromium
ENV CHROME_PATH=/usr/lib/chromium/
ENV CHROME_DRIVER_PATH=/usr/bin/chromedriver

CMD ["npm", "test"]