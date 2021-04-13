const {PrismaClient} = require ('@prisma/client');

const prisma = new PrismaClient ();

const recipeData = require ('./data/recipes.json');

async function main () {
  console.log (`Start seeding ...`);
  for (const i of recipeData) {
    try {
      let seededRecipes = {
        id: i.id,
        title: i.title,
        readyInMinutes: i.readyInMinutes,
        servings: i.servings,
        sourceUrl: i.sourceUrl,
        image: i.image,
      };

      const recipe = await prisma.recipe.create ({
        data: seededRecipes,
      });
    } catch (error) {
      console.log (`Error when creating data: ${error}`);
    }
  }
  console.log (`Seeding finished.`);
}

main ()
  .catch (e => {
    console.error (e);
    process.exit (1);
  })
  .finally (async () => {
    await prisma.$disconnect ();
  });
