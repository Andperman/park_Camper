export const queries = {
    getUsersByEmail: `
    SELECT username,email,password,role
    FROM users
    WHERE email=$1;`,
    getAllUsers: `
    SELECT u.id,u.username,u.email,u.password,u.role
    FROM users AS u
    ORDER BY u.id;`,
    createUser: `
    INSERT INTO users(username,email,password) 
    VALUES ($1,$2,$3)
    `,
    deleteUserByEmail: `
    DELETE FROM users
    WHERE email = $1;
    `,
};
