#!/bin/bash
npx prisma migrate deploy
exec node server.js