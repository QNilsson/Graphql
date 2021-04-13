/*
  Warnings:

  - You are about to drop the `list` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `recipe` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "list";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "recipe";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Recipe" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "readyInMinutes" INTEGER NOT NULL,
    "servings" INTEGER NOT NULL,
    "sourceUrl" TEXT,
    "image" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "List" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uid" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Recipe.title_unique" ON "Recipe"("title");
