import mysql2 from "mysql2/promise";


let db=null;
export async function connectDB() {
    try{

        db=await mysql2.createConnection({
            host:"localhost",
            user:"root",
            password:"123240",
            database:"chatApp",
        });

        console.log("Mysql connected successfully");

    }catch(err){
        console.log("Failed to connect to DB:",err);

    }
}



export function getDB(){
    if(!db) throw new Error("DB not initialized");
    return db;
}

