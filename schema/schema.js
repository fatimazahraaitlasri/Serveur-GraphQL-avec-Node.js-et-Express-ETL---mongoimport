const { clients, projects } = require("../simpleData.js");

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList } = require("graphql");

// client type
const clientType = new GraphQLObjectType({
name: "Clients",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});
// project type
const ProjectType = new GraphQLObjectType({
    name: "Projects",
      fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client:{type:clientType,
        resolve(parent,args){
            return clients.find(client => client.id === parent.clientId)
        }}
      }),
    });
 
const RootQuery = new GraphQLObjectType({
  name: "RoutQueryType",
  fields: { 
    projects :{
        type: new GraphQLList(ProjectType),
        resolve(parent ,args){
            return projects;
        }
    },
    project:{
        type:ProjectType,
        args:{ id: { type: GraphQLID}},
        resolve(parent,args){
            return projects.find(project => project.id === args.id)
        }


    },

    clients :{
        type: new GraphQLList(clientType),
        resolve(parent ,args){
            return clients;
        }
    },
    client:{
        type:clientType,
        args:{ id: { type: GraphQLID}},
        resolve(parent,args){
            return clients.find(client => client.id === args.id)
        }


    }
  },
});
module.exports = new GraphQLSchema({
    query : RootQuery
})