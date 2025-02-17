const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const Employee = require("../model/Employee");

const resolvers = {

    getAllEmployees: async () => {
        return await Employee.find();
    },

    getEmployeeByEid: async (parent, args) => {
        const employee = await Employee.findById(args.eid);
        if (!employee) {
            throw new Error("Employee not found!");
        }
        return employee;
    },

    getEmployeeByDesDep: async (parent, args ) => {
        const {designation, department} = args;
        const filter = {};
        if (designation) filter.designation = designation;
        if (department) filter.department = department;

        return await Employee.find(filter);
    },
    login: async ( parent, args ) => {
        const {email, password} = args;
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error("User not found!");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Incorrect password!");
        }

        const token = jwt.sign({ userId: user.id }, "secret", {
            expiresIn: "1h",
        });

        return token;
    },

    signup: async (parent, args) => {
        const { username, email, password } = args;
        console.log("Received data:", { username, email, password });
    
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error("User already exists!");
        }
    
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ username, email, password: hashedPassword });
    
        await user.save();
    
        console.log("User created:", user);
        return { _id: user.id, username: user.username, email: user.email };
    },
    

    addEmployee: async (parent, args) => {
        if (args.salary < 1000) {
            throw new Error("Salary must be at least 1000!");
        }

        const employee = new Employee({ ...args });
        await employee.save();
        return employee;
    },

    updateEmployee: async (parent, args) => {
        const {eid, ...updates} = args;
        const employee = await Employee.findByIdAndUpdate(eid, updates, { new: true });
        if (!employee) {
            throw new Error("Employee not found!");
        }
        return employee;
    },

    deleteEmployee: async (parent, args) => {
        const result = await Employee.findByIdAndDelete(args.eid);
        if (!result) {
            throw new Error("Employee not found!");
        }
        return "Employee deleted successfully!";
    }

};

module.exports = resolvers;
