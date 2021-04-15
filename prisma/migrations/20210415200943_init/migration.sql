/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Recipe` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Recipe.id_unique" ON "Recipe"("id");
