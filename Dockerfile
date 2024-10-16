# build stage
FROM node:12

LABEL maintainer=511252519@qq.com

# 创建一个工作目录
WORKDIR /app

COPY . .

RUN yarn install --registry=https://registry.npm.taobao.org

# 这里产生了dist目录，及server.bundle.js
RUN npm run build

EXPOSE 12005

VOLUME ["/app/public"]

CMD ["node", "dist/server.bundle.js"]