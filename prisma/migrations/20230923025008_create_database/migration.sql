-- CreateTable
CREATE TABLE "errors" (
    "id" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "rotina" TEXT NOT NULL,
    "modulo" TEXT NOT NULL,
    "filial" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,

    CONSTRAINT "errors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pagesView" (
    "id" TEXT NOT NULL,
    "rotina" TEXT NOT NULL,
    "modulo" TEXT NOT NULL,
    "filial" TEXT NOT NULL,

    CONSTRAINT "pagesView_pkey" PRIMARY KEY ("id")
);
