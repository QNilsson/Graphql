/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Post";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "recipe" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "readyInMinutes" INTEGER NOT NULL,
    "servings" INTEGER NOT NULL,
    "sourceUrl" TEXT,
    "image" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "list" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uid" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "recipe.title_unique" ON "recipe"("title");
