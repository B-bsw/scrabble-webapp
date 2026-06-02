FROM oven/bun:alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN bun install

COPY ./ ./

EXPOSE 8000

CMD ["bun", "api/index.ts"]
