import User from '@/models/user';
import connectDB from '@/utils/dbconnect';
import NextAuth from 'next-auth'
import GithubProvider from "next-auth/providers/github"

const handler = NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    callbacks:{
        async signIn({profile}){
            // console.log(profile)
            try{
                await connectDB();
                const userExist = await User.findOne({
                    email:profile.email,
                })
                if(!userExist){
                    await User.create({
                        email:profile.email,
                        username:profile.name,
                        image:profile.avatar_url,
                    })
                }
                return true;

            }catch(e){  
                console.log("error in providers->",e);
                return false;
            }
        },
        async session({session}){
            try{
                const sessionUser = await User.findOne({ email: session.user.email });
                session.user.id = sessionUser._id.toString();
        
                return session;
            }catch(e){
                console.log("error in provider",e);
            }
        }
    }
})

export { handler as GET, handler as POST }