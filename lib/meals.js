import fs from "node:fs";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
const db=sql('meals.db');

export async function GetMeals() {
    await new Promise((resolve)=>setTimeout(resolve, 2000));
    // throw new Error("whatever");
    
   return db.prepare('SELECT * FROM meals').all();

}
export function GetMeal(slug) {
    
    
   return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);

}
export async function  SaveMeal(meal) {
    meal.slug=slugify(meal.title,{lower:true});
    meal.instructions=xss(meal.instructions);

    const extension = meal.image.name.split('.').pop();
    const filename = `${meal.slug}.${extension}`

    const stream =  fs.createWriteStream(`public/images/${filename}`)
    const bufferdImage = await meal.image.arrayBuffer();
    
    stream.write(Buffer.from(bufferdImage),(error)=>{
        if (error) {
        throw new Error("save image failed ");
        }
    });

    meal.image =`/images/${filename }`

    db.prepare(`
        INSERT INTO meals
        (title,summary,instructions,creator,creator_email,image,slug)
        VALUES (
         @title,
         @summary,
         @instructions,
         @creator,
         @creator_email,
         @image,
         @slug
        )
        `).run(meal);
}