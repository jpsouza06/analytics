/*
  Warnings:

  - You are about to drop the column `filial` on the `systemStarted` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "errors" ALTER COLUMN "unit" SET DEFAULT '',
ALTER COLUMN "rotina" SET DEFAULT '',
ALTER COLUMN "modulo" SET DEFAULT '',
ALTER COLUMN "conteudo" SET DEFAULT '';

-- AlterTable
ALTER TABLE "event" ALTER COLUMN "nome" SET DEFAULT '',
ALTER COLUMN "conteudo" SET DEFAULT '';

-- AlterTable
ALTER TABLE "pageViews" ADD COLUMN     "codCliente" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "rotina" SET DEFAULT '',
ALTER COLUMN "modulo" SET DEFAULT '';

-- AlterTable
ALTER TABLE "systemStarted" DROP COLUMN "filial",
ADD COLUMN     "cidade" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "codCliente" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "versao" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "estado" SET DEFAULT '',
ALTER COLUMN "modulo" SET DEFAULT '';
