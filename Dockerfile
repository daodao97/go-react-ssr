# 构建阶段
FROM golang:1.24 AS builder
WORKDIR /app

# 安装 git
RUN apt-get update && apt-get install -y git

COPY . .
RUN go get -d rogchap.com/v8go

# 获取 Git 信息并构建
RUN GIT_COMMIT=$(git rev-parse HEAD) \
    GIT_TAG=$(git describe --tags --always) \
    && echo "GIT_COMMIT=${GIT_COMMIT}" \
    && echo "GIT_TAG=${GIT_TAG}" \
    && go build -ldflags="-s -w -X main.GitCommit=${GIT_COMMIT} -X main.GitTag=${GIT_TAG}" -o myapp
# 运行时阶段
FROM alpine:latest
WORKDIR /app

RUN apk add --no-cache libc6-compat gcompat libstdc++

COPY --from=builder /app/myapp .
COPY *.yaml /app/
COPY locales /app/locales
COPY static /app/static
COPY build /app/build

ENTRYPOINT ["./myapp"]