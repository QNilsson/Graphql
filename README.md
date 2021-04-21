## GraphQL Server

## Local Run Instructions:
1. download repo
2. 'npm run launch docker'
3. 'npm run migrate'
4. 'npm run seed'
5. 'npm run dev'
6. open https://serene-einstein-be8031.netlify.app/graphql to see client side

## Project Requirements

### Prisma as data modeling tool :white_check_mark:

### Docker-based PostgresSQL as data store :white_check_mark:

### At least 3 Query resolvers allowing users to get data from your server :white_check_mark:

```javascript
//AllRecipes Query
t.nonNull.list.nonNull.field('allRecipes', {
  type: 'Recipe',
  resolve: (_parent, _args, context) => {
    return context.prisma.recipe.findMany()
  },
})

//getRecipeById Query
t.nullable.field('recipeById', {
  type: 'Recipe',
  args: {
    id: intArg(),
  },
  resolve: (_parent, args, context) => {
    return context.prisma.recipe.findUnique({
      where: { id: args.id || undefined },
    })
  },
})

//filter out burritos recipes query
t.nonNull.list.nonNull.field('burritoRecipes', {
  type: 'Recipe',
  resolve: (_parent, _args, context) => {
    return context.prisma.recipe.findMany({
      where: {
        title: {
          contains: 'burrito',
        },
      },
    })
  },
})

 //Query to sort into descending list of serving size
    t.nonNull.list.nonNull.field ('byServings', {
      type: 'Recipe',
      resolve: (_parent, _args, context) => {
        return context.prisma.recipe.findMany ({
          orderBy: [{servings: 'desc'}],
        });
      },
    });
```

### At least 2 Mutation resolvers allowing users to create, update, or upsert an item :white_check_mark:

```javascript
//createRecipe mutation

t.field('createRecipe', {
  type: 'Recipe',
  args: {
    data: nonNull(
      arg({
        type: 'RecipeCreateInput',
      }),
    ),
  },
  resolve: (_, args, context) => {
    return context.prisma.recipe.create({
      data: {
        title: args.data.title,
        id: args.data.id,
        servings: args.data.servings,
        readyInMinutes: args.data.readyInMinutes,
        image: args.data.image,
        sourceUrl: args.data.sourceUrl,
      },
    })
  },
})

//Mutation to update recipe
t.field('updateRecipe', {
  type: 'Recipe',
  args: {
    id: nonNull(intArg()),
    data: nonNull(
      arg({
        type: 'RecipeCreateInput',
      }),
    ),
  },
  resolve: (_, args, context) => {
    return context.prisma.recipe.update({
      where: { id: args.id || undefined },
      data: {
        title: args.data.title,
        servings: args.data.servings,
        readyInMinutes: args.data.readyInMinutes,
        image: args.data.image,
        sourceUrl: args.data.sourceUrl,
      },
    })
  },
})
```

### At least 1 Mutation resolvers allowing users to delete an item :white_check_mark:

```javascript
//Mutation to Delete
t.field('deleteRecipe', {
  type: 'Recipe',
  args: {
    id: intArg(),
  },
  resolve: (_, args, context) => {
    return context.prisma.recipe.delete({
      where: { id: args.id },
    })
  },
})
```

### your datastore will contain at least 25 items :white_check_mark:

### App deployable locally using Docker and have seed data entered into the datastore

### All source code properly uploaded to Github

## Descriptive ReadMe File including server install and run process
