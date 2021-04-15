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
              endsWith: 'burritos',
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

    // t.field('togglePublishPost', {
    //   type: 'Post',
    //   args: {
    //     id: nonNull(intArg()),
    //   },
    //   resolve: async (_, args, context) => {
    //     const post = await context.prisma.post.findUnique({
    //       where: { id: args.id || undefined },
    //       select: {
    //         published: true,
    //       },
    //     })

    //     if (!post) {
    //       throw new Error(
    //         `Post with ID ${args.id} does not exist in the database.`,
    //       )
    //     }

    //     return context.prisma.post.update({
    //       where: { id: args.id || undefined },
    //       data: { published: !post.published },
    //     })
    //   },
    // })

    // t.field('incrementPostViewCount', {
    //   type: 'Post',
    //   args: {
    //     id: nonNull(intArg()),
    //   },
    //   resolve: (_, args, context) => {
    //     return context.prisma.post.update({
    //       where: { id: args.id || undefined },
    //       data: {
    //         viewCount: {
    //           increment: 1,
    //         },
    //       },
    //     })
    //   },
    // })

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

// const User = objectType({
//   name: 'User',
//   definition(t) {
//     t.nonNull.int('id')
//     t.string('name')
//     t.nonNull.string('email')
//     t.nonNull.list.nonNull.field('posts', {
//       type: 'Post',
//       resolve: (parent, _, context) => {
//         return context.prisma.user
//           .findUnique({
//             where: { id: parent.id || undefined },
//           })
//           .posts()
//       },
//     })
//   },
// })

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

// const SortOrder = enumType({
//   name: 'SortOrder',
//   members: ['asc', 'desc'],
// })

// const PostOrderByUpdatedAtInput = inputObjectType({
//   name: 'PostOrderByUpdatedAtInput',
//   definition(t) {
//     t.nonNull.field('updatedAt', { type: 'SortOrder' })
//   },
// })

// const UserUniqueInput = inputObjectType({
//   name: 'UserUniqueInput',
//   definition(t) {
//     t.int('id')
//     t.string('email')
//   },
// })

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

// const UserCreateInput = inputObjectType({
//   name: 'UserCreateInput',
//   definition(t) {
//     t.nonNull.string('email')
//     t.string('name')
//     t.list.nonNull.field('posts', { type: 'PostCreateInput' })
//   },
// })

const schema = makeSchema ({
  types: [
    Query,
    Mutation,
    Recipe,
    RecipeCreateInput,

    // UserUniqueInput,
    // UserCreateInput,
    // PostCreateInput,
    // SortOrder,
    // PostOrderByUpdatedAtInput,
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
