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
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Recipe.id_unique" ON "Recipe"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Recipe.title_unique" ON "Recipe"("title");
