import { getDB } from "../01-config/connectDb.js";



export async function insertUserSessionRecord(userId,hashedRefreshToken,user_agent,ip) {
    const db=getDB();
    const [rows]=await db.execute(`select id from sessions where user_id=? and ip=? and user_agent=?`,[userId,ip,user_agent]);

    if(rows.length > 0){
          await db.execute(`
            update sessions set refresh_token = ?, updated_at = NOW()
             WHERE id = ?
        `,[hashedRefreshToken,rows[0].id]);
    }else{
         await db.execute(`
            insert into sessions (user_id,user_agent,ip, refresh_token, created_at) values(?,?,?,?,now())
        `,[userId,user_agent,ip,hashedRefreshToken]);
    }

}





export async function deleteUserSession(userId,userAgent,ip) {
    const db=getDB();
    await db.execute(`
        delete from sessions where user_id=? and user_agent=? and ip=?
    `,[userId,userAgent,ip]);
    
}



export async function deleteUserSessionsByUserId(userId) {
    const db=getDB();
    await db.execute(`
        delete from sessions where user_id=?
    `,[userId]);
}