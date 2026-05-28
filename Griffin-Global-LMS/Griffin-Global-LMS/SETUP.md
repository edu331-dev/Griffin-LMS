# Setup Guide

## Prerequisites
- Node.js 20+
- pnpm 10+  (npm install -g pnpm@10)

## Install
  pnpm install

## Run
  PORT=3000 BASE_PATH=/ pnpm --filter @griffin-lms/web run dev
  Open http://localhost:3000
  Login with any @thejitu.com or @griffinglobaltech.com email

## Docker
  cp .env.example .env
  docker compose up

## Type check
  pnpm run typecheck
