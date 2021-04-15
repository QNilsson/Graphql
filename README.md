## GraphQL Server

## Project Requirements

### Prisma as data modeling tool

### Docker-based PostgresSQL as data store

### At least 3 Query resolvers allowing users to get data from your server

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

```

### At least 2 Mutation resolvers allowing users to create, update, or upsert an item

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
            id:args.data.id,
            servings: args.data.servings,
            readyInMinutes:args.data.readyInMinutes,
            image:args.data.image,
            sourceUrl:args.data.sourceUrl
          },
        })
      },
    })

```
### At least 1 Mutation resolvers allowing users to delete an item

### your datastore will contain at least 25 items

### App deployable locally using Docker and have seed data entered into the datastore

### All source code properly uploaded to Github

## Descriptive ReadMe File including server install and run process
