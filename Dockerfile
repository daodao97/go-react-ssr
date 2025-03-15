# 构建阶段
FROM golang:1.24 AS builder
WORKDIR /app
COPY . .
RUN go get -d rogchap.com/v8go
RUN go build -ldflags="-s -w" -o myapp .

# 运行时阶段
FROM alpine:latest
WORKDIR /app

# 安装必要的运行时库
RUN apk add --no-cache libc6-compat gcompat libstdc++

# 从构建阶段复制文件
COPY --from=builder /app/myapp .
COPY *.yaml /app/
COPY locales /app/locales
COPY static /app/static
COPY build /app/build

ENTRYPOINT ["./myapp"]