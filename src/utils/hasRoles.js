export default function (roles = [], validRoles = []) {
    for (let rol of validRoles) {
        if (roles.includes(rol)) {
            return true;
        }
    }

    return false;
}
