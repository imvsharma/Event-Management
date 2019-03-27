const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const { events } = require('../../helpers/helper');
const { encrypt, decrypt } = require('../../helpers/encrypt-decrypt');
const { userTransformation } = require('../../helpers/formatted');
const {emailer} = require('../../utils/emailer');

const secretkey = 'fgghfgvkjnjhjjh$%#*()^%$Ejgfghvhbh';

module.exports = {
    createUser: (args) => {
        return User.findOne({email: args.userInput.email}).then(user => {
            if(user) {
                throw new Error('User already Exists');
            }
            
            return bcrypt.hash(args.userInput.password, 12)
        }).then(hasedPassword => {
                    const user = new User({
                        email: args.userInput.email,
                        password: hasedPassword
                    });
                    return user.save();
                })
                .then(result => {
                    return {
                        ...result._doc
                    }
                })
                .catch(err => {
                    throw err
                })
        
    },
    login: async ({email, password}) => {
        const user = await User.findOne({email: email});

        if(!user) {
            throw new Error('User not found');
        }

        const isEqual = await bcrypt.compare(password, user.password);

        if(!isEqual) {
            throw new Error('Password mismatch');
        }

        const token = jwt.sign({
            userId: user.id,
            email: user.email
        }, secretkey, {
            expiresIn: '1h'
        });

        return {
            userId: user.id,
            token: token,
            tokenExpiration: 1
        }
    },
    getAllUsers: async () => {
        try {
            const users = await User.find();
            return users.map(user => {
                return userTransformation(user)
            })
        }catch(err) {
            throw err
        }
        
    },
    getUser: async ({email}) => {
        try {
            const user = await User.findOne({email: email});
            console.log('user', user);
            return {
                ...user._doc,
                createdEvents: events.bind(this, user.createdEvents)
            }
        } catch(err) {
            throw err
        }
    },
    updateUser: async (args) => {
        /* if(!req.isAuth) {
            throw new Error('Not authenticated');
        } */

        try{
            const user = await User.findOne({email:args.email});
            if(!user) {
                throw new Error('User not found');
            }

            const updatedData = {
                email: args.email,
                password: await encrypt(args.password)
            }
            const updatedUser = await User.findOneAndUpdate({email: args.email}, {$set: updatedData}, {new: true});
            return {
                ...updatedUser._doc,
                createdEvents: events.bind(this, updatedUser.createdEvents)
            }

        }catch(err) {
            throw err
        }
    },
    deleteUser: async (args) => {
        /* if(!req.isAuth) {
            throw new Error('Not authenticated');
        } */

        try{
            const user = await User.findOne({email:args.email});
            if(!user) {
                throw new Error('User not found');
            }

            const deletedUser = await User.findOneAndDelete({email: args.email});
            return {
                ...deletedUser._doc
            }
        }catch(err) {
            throw err
        }
    },
    changePassword: async (args, req) => {
        /* if(!req.isAuth) {
            throw new Error('Not authenticated');
        } */

        try{
            const user = await User.findOne({email:args.email});
            if(!user) {
                throw new Error('User not found');
            }
            const isEqual = await decrypt(args.currentPassword, user.password);

            if(!isEqual) {
                throw new Error('Current password is not correct')
            }

            const updatedData = {
                email: args.email,
                password: await encrypt(args.updatedPassword)
            }
            const updatedUser = await User.findOneAndUpdate({email: args.email}, {$set: updatedData}, {new: true});
            return {
                ...updatedUser._doc,
                createdEvents: events.bind(this, updatedUser.createdEvents)
            }
        }catch (err) {
            throw err
        }
        
    },
    resetPassword: async (args) => {
        /* if(!req.isAuth) {
            throw new Error('Not authenticated');
        } */

        try{
            const user = await User.findOne({email:args.email});
            if(!user) {
                throw new Error('User not found');
            }
            const isEqual = await bcrypt.compare(args.currentPassword, user.password);

            if(!isEqual) {
                throw new Error('Current password is not correct')
            }

            const updatedData = {
                email: args.email,
                password: await encrypt(args.updatedPassword)
            }
            const updatedUser = await User.findOneAndUpdate({email: args.email}, {$set: updatedData}, {new: true});
            if(updatedUser) {
                const data = {
                    senderEmail: 'vsvaibhav2016@gmail.com',
                    recieverEmail: updatedUser.email
                }

                const message = {
                    subject: 'Reset password',
                    text: "Password is successfully reset"
                }
                emailer(data, message);
                return {
                    ...updatedUser._doc,
                    createdEvents: events.bind(this, updatedUser.createdEvents)
                }
            }
            
        }catch (err) {
            throw err
        }
    }
}