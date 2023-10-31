/*
  Warnings:

  - You are about to drop the column `filial` on the `systemStarted` table. All the data in the column will be lost.
  - Added the required column `cidade` to the `systemStarted` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codCliente` to the `systemStarted` table without a default value. This is not possible if the table is not empty.
  - Added the required column `versao` to the `systemStarted` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "errors" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(3);

-- AlterTable
ALTER TABLE "event" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(3);

-- AlterTable
ALTER TABLE "pageViews" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(3);

-- AlterTable
ALTER TABLE "systemStarted" DROP COLUMN "filial",
ADD COLUMN     "cidade" TEXT NOT NULL,
ADD COLUMN     "codCliente" TEXT NOT NULL,
ADD COLUMN     "versao" TEXT NOT NULL,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(3);
