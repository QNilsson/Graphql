const {
  intArg,
  makeSchema,
  nonNull,
  objectType,
  stringArg,
  inputObjectType,
  arg,
  asNexusMethod,
  enumType,
} = require ('nexus');
const {GraphQLDateTime} = require ('graphql-iso-date');

const DateTime = asNexusMethod (GraphQLDateTime, 'date');

const Query = objectType ({
  name: 'Query',
  definition (t) {
    //allRecipes Query
    t.nonNull.list.nonNull.field ('allRecipes', {
      type: 'Recipe',
      resolve: (_parent, _args, context) => {
        return context.prisma.recipe.findMany ();
      },
    });

    //find recipe by id query
    t.nullable.field ('recipeById', {
      type: 'Recipe',
      args: {
        id: intArg (),
      },
      resolve: (_parent, args, context) => {
        return context.prisma.recipe.findUnique ({
          where: {id: args.id || undefined},
        });
      },
    });

    //filter out burritos recipes query
    t.nonNull.list.nonNull.field ('burritoRecipes', {
      type: 'Recipe',
      resolve: (_parent, _args, context) => {
        return context.prisma.recipe.findMany ({
          where: {
            title: {
              contains: 'Burrito',
            },
          },
        });
      },
    });

    //Query to sort into descending list of serving size
    t.nonNull.list.nonNull.field ('byServings', {
      type: 'Recipe',
      resolve: (_parent, _args, context) => {
        return context.prisma.recipe.findMany ({
          orderBy: [{servings: 'desc'}],
        });
      },
    });
  },
});

const Mutation = objectType ({
  name: 'Mutation',
  definition (t) {
    t.field ('createRecipe', {
      type: 'Recipe',
      args: {
        data: nonNull (
          arg ({
            type: 'RecipeCreateInput',
          })
        ),
      },
      resolve: (_, args, context) => {
        return context.prisma.recipe.create ({
          data: {
            title: args.data.title,
            id: args.data.id,
            servings: args.data.servings,
            readyInMinutes: args.data.readyInMinutes,
            image: args.data.image,
            sourceUrl: args.data.sourceUrl,
          },
        });
      },
    });

    t.field ('updateRecipe', {
      type: 'Recipe',
      args: {
        id: nonNull (intArg ()),
        data: nonNull (
          arg ({
            type: 'RecipeCreateInput',
          })
        ),
      },
      resolve: (_, args, context) => {
        return context.prisma.recipe.update ({
          where: {id: args.id || undefined},
          data: {
            title: args.data.title,
            servings: args.data.servings,
            readyInMinutes: args.data.readyInMinutes,
            image: args.data.image,
            sourceUrl: args.data.sourceUrl,
          },
        });
      },
    });

    


   

    t.field ('deleteRecipe', {
      type: 'Recipe',
      args: {
        id: intArg (),
      },
      resolve: (_, args, context) => {
        return context.prisma.recipe.delete ({
          where: {id: args.id},
        });
      },
    });
  },
});


const Recipe = objectType ({
  name: 'Recipe',
  definition (t) {
    t.nonNull.int ('id');
    t.nonNull.field ('createdAt', {type: 'DateTime'});
    t.nonNull.field ('updatedAt', {type: 'DateTime'});
    t.nonNull.string ('title');
    t.nonNull.string ('image');
    t.nonNull.int ('readyInMinutes');
    t.nonNull.int ('servings');
    t.string ('sourceUrl');
  },
});



const RecipeCreateInput = inputObjectType ({
  name: 'RecipeCreateInput',
  definition (t) {
    t.nonNull.string ('title');
    t.nonNull.int ('servings');
    t.nonNull.int ('readyInMinutes');
    t.nonNull.string ('image');
    t.string ('sourceUrl');
    t.int ('id');
  },
});





const schema = makeSchema ({
  types: [
    Query,
    Mutation,
    Recipe,
    RecipeCreateInput,
    DateTime,
  ],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
});

module.exports = {
  schema: schema,
};
