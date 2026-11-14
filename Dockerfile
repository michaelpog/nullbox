# Two images from one file:
#   docker build --target api -t nullbox-api .   (Rust API, port 3000, data in /data)
#   docker build --target web -t nullbox-web .   (Caddy: serves the web app, proxies /api to the API)
# Both are served from one origin, so the web app calls /api on its own address.

# ---------- web app (React + Vite) ----------
FROM node:22-bookworm-slim AS web-build
WORKDIR /src
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json apps/web/
RUN pnpm install --frozen-lockfile
COPY apps/web apps/web
# Empty base URL = call /api on the same origin the page came from.
RUN printf 'VITE_API_BASE_URL=\n' > apps/web/.env.production.local \
 && pnpm build

# ---------- API (Rust + axum) ----------
FROM rust:1-bookworm AS api-build
WORKDIR /src
COPY . .
# rust-toolchain.toml pins the version; rustup installs it here. .sqlx lets sqlx build without a DB.
ENV SQLX_OFFLINE=true
RUN cargo build --release --locked -p nullbox-api

FROM debian:bookworm-slim AS api
RUN useradd --system --uid 10001 nullbox && mkdir /data && chown nullbox /data
COPY --from=api-build /src/target/release/nullbox-api /usr/local/bin/nullbox-api
USER nullbox
ENV BIND_ADDR=0.0.0.0:3000 \
    DATABASE_URL=sqlite:///data/nullbox.db \
    RUST_LOG=info,tower_http=info
VOLUME /data
EXPOSE 3000
CMD ["nullbox-api"]

FROM caddy:2-alpine AS web
COPY deploy/Caddyfile /etc/caddy/Caddyfile
COPY --from=web-build /src/apps/web/dist /srv
