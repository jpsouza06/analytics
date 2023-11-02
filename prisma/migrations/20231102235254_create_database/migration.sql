-- CreateTable
CREATE TABLE "errors" (
    "id" TEXT NOT NULL,
    "unit" TEXT NOT NULL DEFAULT '',
    "rotina" TEXT NOT NULL DEFAULT '',
    "modulo" TEXT NOT NULL DEFAULT '',
    "conteudo" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "errors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pageViews" (
    "id" TEXT NOT NULL,
    "rotina" TEXT NOT NULL DEFAULT '',
    "modulo" TEXT NOT NULL DEFAULT '',
    "codCliente" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pageViews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL DEFAULT '',
    "conteudo" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "systemStarted" (
    "id" TEXT NOT NULL,
    "estado" VARCHAR(2) NOT NULL DEFAULT '',
    "cidade" TEXT NOT NULL DEFAULT '',
    "modulo" TEXT NOT NULL DEFAULT '',
    "codCliente" TEXT NOT NULL DEFAULT '',
    "versao" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "systemStarted_pkey" PRIMARY KEY ("id")
);
