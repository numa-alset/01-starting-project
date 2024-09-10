import sql from "better-sqlite3";

const db=sql('meals.db');

export async function GetMeals() {
    await new Promise((resolve)=>setTimeout(resolve, 2000));
    // throw new Error("whatever");
    
   return db.prepare('SELECT * FROM meals').all();

}
export function GetMeal(slug) {
    
    
   return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);

}
