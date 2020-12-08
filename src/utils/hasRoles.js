export default function (roles = [], validRoles = []) {
    for (let rol of validRoles) {
        console.log(rol);
        if (roles.includes(rol)) {
            return true;
        }
    }

    return false;
}
