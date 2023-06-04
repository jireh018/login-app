import {
    UnauthorizedError,
} from '../errors/index.js'

const checkPermissions = (reqUser, resUserId) => {
    if(reqUser.role === 'admin') return
    if(reqUser.userId === resUserId.toString()) return
    throw new UnauthorizedError('Not authorized to access this route')
}

//reqUser : connected user; resUserId : id passed on params
export default checkPermissions