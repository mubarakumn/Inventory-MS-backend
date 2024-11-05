const UserModel = require('../Models/UserModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config();
// Add User 
const createUser = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const findUser = await UserModel.findOne({ email: email })
        if (findUser) {
            return res.status(409).json({ message: "Email already exist!" })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedpass = await bcrypt.hash(password, salt)
        await UserModel.create({ name, email, password: hashedpass })

        res.status(200).json({ message: "User added sucessfully" })
    } catch (error) {
        console.error("Error Creating user:", error)
        res.status(500).json({ message: error.message })
    }
}

// User login
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const findUser = await UserModel.findOne({ email: email })
        if (!findUser) {
            return res.status(404).json({ message: "Email doesn't Exits" })
        }

        const isMatch = await bcrypt.compare(password, findUser.password)


        if (isMatch) {
            const token = jwt.sign({
                userId: findUser._id,
                name: findUser.name,
                role: findUser.role,
            },
                process.env.SECRET_KEY,
                { expiresIn: "1h" });

            const cookieOptions = {
                httpOnly: true,
                secure: false, // Only send over HTTPS 
                sameSite: 'Lax', // CSRF protection
                maxAge: 24 * 60 * 60 * 1000, // 1 hour
            };

            res.cookie('token', token, cookieOptions);
            res.status(200).json({ message: "Login succssfully" })
        } else {
            res.status(401).json({ message: "Incorrect Password" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Check if user is Authenticated
const checkAuth = async (req, res) => { 
    const details = req.user   
    return res.status(200).json({ message: "Authenticated", userData: details });
} 

const logout = async (req, res) => {
    const cookies = req.cookies
    if(!cookies?.token) return res.sendStatus(204)

    res.clearCookie('token', {
        httpOnly: true,
        secure: false, // Only send over HTTPS 
        sameSite: 'Lax', // CSRF protection
    });
    res.status(200).json({ message: 'Logged out successfully' });
};

const getUsers = async (req, res) => {
    try {
        const findUsers = await UserModel.find({}).select('-password')
        res.status(200).json(findUsers)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// update User
const updateUser = async (req, res) => {
    const { id } = req.params
    const updates = req.body
    try {
        if (updates.password) {
            const salt = await bcrypt.genSalt(10);
            updates.password = await bcrypt.hash(updates.password, salt)
        }
        const response = await UserModel.findByIdAndUpdate(id, updates)
        if (!response) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User Updated Successfully!" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// Delete User
const deleteUser = async (req, res) => {
    const { id } = req.params
    try {
        const response = await UserModel.findByIdAndDelete(id)
        if (!response) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted Successfully!" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createUser,
    loginUser,
    checkAuth,
    logout,
    getUsers,
    updateUser,
    deleteUser
}