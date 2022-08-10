import { Role } from "../../enums/Role";

export const state = {
  token: null, //authorization token
  userId: null, //user id of logged in user
  user: {
    //logged in user details
    userId: null, //user id
    firstName: null, //first name of user
    lastName: null, //last name of user
    email: null, //email of user
    profileImageUrl: null, //profile image url of user
    role: Role.GUEST, //role of user
  },
};
