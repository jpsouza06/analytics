/*
  Warnings:

  - Added the required column `codCliente` to the `pageViews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pageViews" ADD COLUMN     "codCliente" TEXT NOT NULL;
