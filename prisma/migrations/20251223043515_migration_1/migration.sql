-- CreateTable
CREATE TABLE "url_pairs" (
    "id" BIGSERIAL NOT NULL,
    "url1" TEXT NOT NULL,
    "url2" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "url_pairs_pkey" PRIMARY KEY ("id")
);
