import { RoleBuilder } from "../../enums/Role";

export const getModifiedUserState = (user) => {
  const roleString = user.roles[0].name;

  return {
    userId: user.userId, //user id
    firstName: user.firstName, //first name of user
    lastName: user.lastName, //last name of user
    email: user.email, //email of user
    profileImageUrl: user.profileImageUrl, //profile image url of user
    role: RoleBuilder(roleString),
  };
};
