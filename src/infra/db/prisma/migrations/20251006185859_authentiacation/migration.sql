-- CreateTable
CREATE TABLE "refresh_token" (
    "rtid" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "refreshToken" TEXT NOT NULL,

    CONSTRAINT "refresh_token_pkey" PRIMARY KEY ("rtid")
);

-- CreateIndex
CREATE UNIQUE INDEX "refresh_token_userId_key" ON "refresh_token"("userId");

-- AddForeignKey
ALTER TABLE "refresh_token" ADD CONSTRAINT "refresh_token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
