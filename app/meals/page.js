import Link from "next/link";
import classes from "./page.module.css";
import MealsGrid from "@/component/meals/meals-grid";
import { GetMeals } from "@/lib/meals";
import { Suspense } from "react";

export const metadata = {
    title: 'All Meals',
    description: 'explore Delicious meals, shared by a food-loving community.',
};
async function MealsData() {
    const meals = await GetMeals();
    return <MealsGrid meals={meals}/> ;
}
export default async function Meals() {
    
    return (
        <>
           <header className={classes.header}>
           <h1>
                Delicious Meals, Created {' '}
                <span className={classes.highlight}> by you</span></h1>
                <p>Choose your favourite recipes and cook it yourself. It is easy and fun!</p>
                <p className={classes.cta}>
                    <Link href="/meals/share">
                        Share Your Favourite Recipe
                    </Link>
                </p>
           </header>
           <main className={classes.main}>
                <Suspense fallback={<p className={classes.loading} >Featching Meals. ...</p>}>
                <MealsData/>
            </Suspense>
           </main>
        </>
    ); 
}