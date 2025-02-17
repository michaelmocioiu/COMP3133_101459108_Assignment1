const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID, GraphQLInt } = require("graphql");
const resolvers = require("./resolvers");

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        _id: { type: GraphQLID },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
    }
});

const EmployeeType = new GraphQLObjectType({
    name: 'Employee',
    fields: {
        _id: { type: GraphQLID },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        email: { type: GraphQLString },
        gender: { type: GraphQLString },
        designation: { type: GraphQLString },
        salary: { type: GraphQLInt },
        date_of_joining: { type: GraphQLString },
        department: { type: GraphQLString },
        employee_photo: { type: GraphQLString },
    }
});

// Mutation and Query type setup
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        signup: {
            type: UserType,
            args: {
                username: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve: resolvers.signup
        },
        addEmployee: {
            type: EmployeeType,
            args: {
                first_name: { type: GraphQLString },
                last_name: { type: GraphQLString },
                email: { type: GraphQLString },
                gender: { type: GraphQLString },
                designation: { type: GraphQLString },
                salary: { type: GraphQLInt },
                date_of_joining: { type: GraphQLString },
                department: { type: GraphQLString },
                employee_photo: { type: GraphQLString },
            },
            resolve: resolvers.addEmployee
        },
        updateEmployee: {
            type: EmployeeType,
            args: {
                eid: { type: GraphQLID },
                first_name: { type: GraphQLString },
                last_name: { type: GraphQLString },
                email: { type: GraphQLString },
                gender: { type: GraphQLString },
                designation: { type: GraphQLString },
                salary: { type: GraphQLInt },
                date_of_joining: { type: GraphQLString },
                department: { type: GraphQLString },
                employee_photo: { type: GraphQLString },
            },
            resolve: resolvers.updateEmployee
        },
        deleteEmployee: {
            type: GraphQLString,
            args: {
                eid: { type: GraphQLID }
            },
            resolve: resolvers.deleteEmployee
        }
    }
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        login: {
            type: GraphQLString,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve: resolvers.login
        },
        getAllEmployees: {
            type: new GraphQLList(EmployeeType),
            resolve: resolvers.getAllEmployees
        },
        getEmployeeByEid: {
            type: EmployeeType,
            args: {
                eid: { type: GraphQLID }
            },
            resolve: resolvers.getEmployeeByEid
        },
        getEmployeeByDesDep: {
            type: new GraphQLList(EmployeeType),
            args: {
                designation: { type: GraphQLString },
                department: { type: GraphQLString }
            },
            resolve: resolvers.getEmployeeByDesDep
        }
    }
});

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});
