"use server";

import { redirect } from "next/navigation";
import { SaveMeal } from "./meals";
import { revalidatePath } from "next/cache";

export async function shareMeal(prevState,formData) {
   function isInValidText(text) {
    return !text || text.trim() ==='';
   }
    
    const meal = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image'),
        creator: formData.get('name'),
        creator_email: formData.get('email'),
    };
    if (isInValidText(meal.title)||
    isInValidText(meal.summary)||
    isInValidText(meal.instructions)||
    isInValidText(meal.creator)||
    isInValidText(meal.creator_email||
        !meal.creator_email.includes('@')||
        !meal.image || meal.image.size === 0
    )) {
       return {
        message:"invalid"
       };
        
    }
    await SaveMeal(meal);
    revalidatePath('/meals');
    redirect('/meals')
}