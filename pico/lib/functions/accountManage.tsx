import {signIn} from "next-auth/react";

export const signInWithGoogle = () =>{
    signIn("google");
}
