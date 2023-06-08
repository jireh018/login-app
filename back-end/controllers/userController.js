import express from 'express'
import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import {BadRequestError, UnauthenticatedError} from '../errors/index.js'
import {
    createTokenUser,
    attachCookiesToResponse,
    checkPermissions,
} from '../utils/index.js'

const getAllUsers = async (req, res) => {
    const users = await User.find({role:'user'}).select('-password')
    if(!users){
        throw new BadRequestError('No existing users')
    }
    res.status(StatusCodes.OK).json({users, count:users.length})
}

const getSingleUser = async (req, res) => {
    const {id} = req.params
    const user = await User.findOne({_id: id}).select('-password')
    if(!user){
        throw new BadRequestError(`No existing user with id ${id}`)
    }
    checkPermissions(req.user, user._id)
    res.status(StatusCodes.OK).json({user})
}

const updateUser = async (req, res) => {
    const {name, email} = req.body
    if(!name || !email){
        throw new BadRequestError('Please provide both value')
    }
    const user = await User.findOne({_id: req.user.userId})

    user.email = email
    user.name = name
    await user.save()

    const tokenUser = createTokenUser(user)
    attachCookiesToResponse({res, user: tokenUser})
    res.status(StatusCodes.OK).json({user: tokenUser})
}

const updateUserPassword = async (req, res) => {
    const {oldPassword, newPassword} = req.body
    if(!oldPassword || !newPassword){
        throw new BadRequestError('Please provide both value')
    }

    const user = await User.findOne({_id: req.user.userId})
    const isPasswordCorrect = await user.comparePassword(oldPassword);
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials');
    }
    user.password = newPassword;

    await user.save();
    res.status(StatusCodes.OK).json({ msg: 'Success! Password Updated.' });
}

export {
    getAllUsers,
    getSingleUser,
    updateUser,
    updateUserPassword,
}