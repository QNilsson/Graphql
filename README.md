## GraphQL Server

This project uses a graphql server you can run from this repo and it communicates with a client-based react
component found at https://serene-einstein-be8031.netlify.app/graphql.

## Local Run Instructions:
1. download repo
2. 'npm run launch docker'
3. 'npm run migrate'
4. 'npm run seed'
5. 'npm run dev'
6. (optional) navigate to localhost:4000 to access graphql playground
7. open https://serene-einstein-be8031.netlify.app/graphql to see client side
8. Navigate to 'Graphql' menu item on react page

## Project Requirements

### Prisma as data modeling tool :white_check_mark:

### Docker-based PostgresSQL as data store :white_check_mark:
```javascript
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```
### At least 3 Query resolvers allowing users to get data from your server :white_check_mark:

#### This Project uses a recipe API to fetch recipe data that I have queried and mutated. 

#### First query: simply lists all the recipes I have from the API
```javascript
//AllRecipes Query
t.nonNull.list.nonNull.field('allRecipes', {
  type: 'Recipe',
  resolve: (_parent, _args, context) => {
    return context.prisma.recipe.findMany()
  },
})
```
#### Second query: returns a recipe of a certain ID
```javascript
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
#### Third query: returns only recipes that contain the word 'burrito' in them
```javascript

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
```
#### Fourth query: returns a list of recipes sorted in descending order by how many servings the recipe provides
```javascript

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

#### A mutation that allows users to create their own recipe. (Found with the '+' at the top of the react web page)
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
```
#### A mutation that allows users to update any existing recipe. Click on the pencil icon on the recipe card, make your edits, and then refresh the page
```javascript

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
#### Allows users to delete any existing recipe. Click the trash can icon on the recipe card, then hit refresh. 

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
## My available queries:
# 1. allRecipes {}
  * Example:
```javascript
  query allRecipes{
  allRecipes{
    title
    id
  }
}
```

# 2. recipeById{}
  * Example:
```javascript
query recipeById{
  recipeById(id:6){
    title
    id
  }
}

```

# 3. burritoRecipes {}
  * Example:
```javascript
query burritoRecipes{
  burritoRecipes{
    id
    title
  }
}
```

# 3. byServings {}
  * Example:
```javascript
query byServings{
  byServings{
    title
    servings
  }
}
```
## My available mutations:
# 1. createRecipe {}
  * Example:
```javascript
mutation createRecipe{
  createRecipe(
    data:{
      title:"created recipe2",
      servings:19,
      readyInMinutes:30,
      image:"created image",
      sourceUrl:"created source",
      id:109
    }
  ){
    id
    title
  }
}
```
# 2. deleteRecipe {}
  *Example:
```javascript
mutation deleteRecipe{
  deleteRecipe(id:51){
    title
    id
  }
}

```

# .3 updateRecipe {}
```javascript
mutation updateRecipe{
  updateRecipe(id:4, data:{
    title:"The BEST papusas",
    servings:5,
    readyInMinutes:20,
    sourceUrl:"Drews Mom",
    image:"image here"
  }){
    id
  }
}

```






### your datastore will contain at least 25 items :white_check_mark:

### App deployable locally using Docker and have seed data entered into the datastore :white_check_mark:
app is containerized on docker

### All source code properly uploaded to Github :white_check_mark:

## Descriptive ReadMe File including server install and run process :white_check_mark:
