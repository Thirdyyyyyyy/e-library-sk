import { createTRPCRouter } from '~/server/api/trpc';
import { addUserProcedure } from './addUserProcedure';
// import { updateUserProcedure } from './updateUserProcedure';
// import { getUserProcedure } from './getUserProcedure';
// import { getAllUsersProcedure } from './getAllUsersProcedure';
// import { checkUserIdProcedure } from './checkUserIdProcedure';

export const userRouter = createTRPCRouter({
  addUser: addUserProcedure,
  // updateUser: updateUserProcedure,
  // getUser: getUserProcedure,
  // getAllUsers: getAllUsersProcedure,
  // checkUserId: checkUserIdProcedure,
});
