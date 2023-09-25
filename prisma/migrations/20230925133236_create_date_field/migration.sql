/*
  Warnings:

  - You are about to drop the column `filial` on the `errors` table. All the data in the column will be lost.
  - You are about to drop the column `filial` on the `pagesView` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "errors" DROP COLUMN "filial",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "pagesView" DROP COLUMN "filial",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
