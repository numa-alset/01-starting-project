
import  logo  from "@/assets/logo.png";
import Link from "next/link";

import classes from "./header.module.css";
import Image from "next/image";
import HeaderBackground from "./header-background";  
import NavLink from "./nav-link";

export default function Header() {

   
   
   return (
      <> 
      <HeaderBackground/>
      <header className={classes.header}>
      <Link href="/" className={classes.logo}>
         <Image src={logo} alt="A plate with food on it" priority/>
         NextLevel Meal
         </Link>
            <nav className={classes.nav}>
               <ul>
                  <li>
                     <NavLink href="/meals">Brows Meals</NavLink>
                  </li>
                  <li>
                    <NavLink href="/community">Foodies Community</NavLink>
                   </li>
               </ul>
            </nav>
        
      </header >
      </>
   );
}