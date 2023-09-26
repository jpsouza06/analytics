/*
  Warnings:

  - You are about to drop the `pagesView` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "pagesView";

-- CreateTable
CREATE TABLE "pageViews" (
    "id" TEXT NOT NULL,
    "rotina" TEXT NOT NULL,
    "modulo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pageViews_pkey" PRIMARY KEY ("id")
);
