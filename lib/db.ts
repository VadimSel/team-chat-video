import { PrismaClient } from "@prisma/client";

// Файл для доступа к базе данных черех призма клиент, так же оптимизирован для избежания лишних перерисовок. Предназначен для настройки подключения к базе данных с использованием Prisma, ORM (Object-Relational Mapping) для работы с базами данных в Node.js.

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

export const db = global.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalThis.prisma = db