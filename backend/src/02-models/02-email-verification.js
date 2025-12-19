import { getDB } from "../01-config/connectDb.js";

 export async function insertEmailVerification( name, email, passwordHash, token) {
    const db=getDB();
    const expiresAt=new Date(Date.now() +  5* 60 * 1000);

    await db.execute(`
        insert into emailverification (name,email,passwordHash,token,expiresAt) values(?,?,?,?,?)
        ON DUPLICATE KEY UPDATE passwordHash=?, token=?, expiresAt=?
    `,[name, email, passwordHash, token,expiresAt,passwordHash, token,expiresAt]);
    
}



export async function   deleteVerification(email) {
    const db=getDB();
    await db.execute(`delete from emailverification where email=?`,[email]);
}


export async function findVerificationByEmail(email){
    const db=getDB();
    const [row] = await db.execute(`
        select * from emailVerification  where email=?
    `,[email]);

    return row; // row--> is filed and row is array

    //[rows, fields] 

}



