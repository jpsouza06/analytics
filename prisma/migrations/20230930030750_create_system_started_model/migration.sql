-- CreateTable
CREATE TABLE "event" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "systemStarted" (
    "id" TEXT NOT NULL,
    "estado" VARCHAR(2) NOT NULL,
    "modulo" TEXT NOT NULL,
    "filial" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "systemStarted_pkey" PRIMARY KEY ("id")
);
