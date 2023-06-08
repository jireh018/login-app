import express from 'express'
import User from '../models/User.js'
import Token from '../models/Token.js'
import { StatusCodes } from 'http-status-codes'
import {BadRequestError, UnauthenticatedError} from '../errors/index.js'
import {
    createTokenUser,
    isTokenValid,
    attachCookiesToResponse,
    sendResetPasswordEmail,
    sendVerificationEmail,
    createHash,
} from '../utils/index.js'
import crypto from 'crypto'

const register = async (req, res) => {
    const {name, email, password} = req.body
    if(!name || !email || !password){
        throw new BadRequestError('please provide all values')
    }

    const userAlreadyExists = await User.findOne({email})
    if(userAlreadyExists){
        throw new BadRequestError('Email already in use')
    }
    const isFirstAccount = await User.countDocuments({}) === 0
    const role = isFirstAccount ? 'admin' : 'user'

    const verificationToken = crypto.randomBytes(40).toString('hex')

    const user = await User.create({name, email, password, role, verificationToken})
    
    const origin = 'http://localhost:3000';
    await sendVerificationEmail({
        name: user.name,
        email: user.email,
        verificationToken: user.verificationToken,
        origin,
    })
//     const tokenUser = createTokenUser(user)
//     attachCookiesToResponse({res, user: tokenUser})
     res.status(StatusCodes.CREATED).json({msg:'Success! Please check your email to verify your account', verificationToken})
}

const verifyEmail = async (req, res) => {
    const {verificationToken, email } = req.body
    // if(!verificationToken || !email){
    //     throw new BadRequestError('Please provide all values')
    // }
    const user = await User.findOne({email})
    if(!user){
        throw new UnauthenticatedError('verification failed')
    }

    if(user.verificationToken !== verificationToken){
        throw new UnauthenticatedError('verification failed')
    }
    user.isVerified = true
    user.verified = Date.now()
    user.verificationToken = ''

    await user.save()

    res.status(StatusCodes.OK).json({msg: 'email verified'})
}

const login = async (req, res) => {
    const {email, password} = req.body
    if(!email || !password){
        throw new BadRequestError('please provide all values')
    }

    const user = await User.findOne({email})//.select('+password')
    if(!user){
        throw new UnauthenticatedError('invalid credentials')
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('invalid credentials')
    }
    if(!user.isVerified){
        throw new UnauthenticatedError('Please verify your email')
    }

    const tokenUser = createTokenUser(user)
    // create refresh token
    let refreshToken = '';
    // check for existing token
    const existingToken = await Token.findOne({ user: user._id });

    if (existingToken) {
        const { isValid } = existingToken;
        if (!isValid) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials');
        }
        refreshToken = existingToken.refreshToken;
        attachCookiesToResponse({ res, user: tokenUser, refreshToken });
        res.status(StatusCodes.OK).json({ user: tokenUser });
        return;
    }

    refreshToken = crypto.randomBytes(40).toString('hex');
    const userAgent = req.headers['user-agent'];
    const ip = req.ip;
    const userToken = { refreshToken, ip, userAgent, user: user._id };

    await Token.create(userToken);

    attachCookiesToResponse({res, user: tokenUser, refreshToken})
    res.status(StatusCodes.OK).json({user: user})
}

const showCurrentUser = async (req, res) => {
    res.status(StatusCodes.OK).json({user:req.user})
}

const logout = async (req, res) => {
     await Token.findOneAndDelete({user: req.user.userId})

    res.cookie('accessToken', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
    })

    res.cookie('refreshToken', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
    })

    res.status(StatusCodes.OK).json({msg: 'user logged out!'})
}

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) {
      throw new CustomError.BadRequestError('Please provide valid email');
    }
  
    const user = await User.findOne({ email });
  
    if (user) {
      const passwordToken = crypto.randomBytes(70).toString('hex');
      // send email
      const origin = 'http://localhost:3000';
      await sendResetPasswordEmail({
        name: user.name,
        email: user.email,
        token: passwordToken,
        origin,
      });
  
      const tenMinutes = 1000 * 60 * 10;
      const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);
  
      user.passwordToken = createHash(passwordToken);
      user.passwordTokenExpirationDate = passwordTokenExpirationDate;
      await user.save();
    }
  
    res
      .status(StatusCodes.OK)
      .json({ msg: 'Please check your email for reset password link', token : user.passwordToken });
  };

  const resetPassword = async (req, res) => {
    const { token, email, password } = req.body;
    if (!token || !email || !password) {
      throw new CustomError.BadRequestError('Please provide all values');
    }
    const user = await User.findOne({ email });
  
    if (user) {
        console.log('user', user.passwordToken, ' - ', token)
      const currentDate = new Date();
  
      if (
        user.passwordToken === token &&
        user.passwordTokenExpirationDate > currentDate
      ) {
        console.log('password', password)
        user.password = password;
        user.passwordToken = null;
        user.passwordTokenExpirationDate = null;
        await user.save();
      }
    }
  
    res
      .status(StatusCodes.OK)
      .json({ msg:'password reset successfully', user});
  };  

export {
    register,
    login,
    logout,
    verifyEmail,
    forgotPassword,
    resetPassword,
    showCurrentUser,
}