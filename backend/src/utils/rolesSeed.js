import UserRoles from "supertokens-node/recipe/userroles/index.js";
import EmailPassword from "supertokens-node/recipe/emailpassword/index.js";

/* 
User id ad940701-02a6-4b87-9bfb-f56ffa073654
Email admin@localhost.com
*/

async function createRole() {
  const response = await UserRoles.createNewRoleOrAddPermissions("admin", [
    "read",
    "write",
  ]);

  if (response.createdNewRole === false) {
    console.log("Role already exist");
  } else {
    console.log("Role added successfully");
  }
}

async function addRoleToUser() {
  const response = await UserRoles.addRoleToUser("", "admin");

  if (response.status === "UNKNOWN_ROLE_ERROR") {
    console.log("No such a role");
    return;
  }

  if (response.didUserAlreadyHaveRole === true) {
    console.log("User already assigned");
    return;
  }

  console.log("Role added successfully");
}

async function getAllRoles() {
  const roles = (await UserRoles.getAllRoles()).roles;
  console.log(roles);
}

async function getUserInfo() {
  let usersInfo = await EmailPassword.getUserByEmail("admin@localhost.com");
  console.log(usersInfo);
}

export { createRole, addRoleToUser, getAllRoles, getUserInfo };
