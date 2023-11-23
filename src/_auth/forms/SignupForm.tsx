
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {Form, FormControl,FormField,FormItem,FormLabel, FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'; 
import { SignupValidation } from "@/lib/validation";
import {z} from 'zod'
import Loader from "@/components/shared/Loader";
import { Link } from "react-router-dom";
import { createUserAccount } from "@/lib/appwrite/api";
import { useToast } from "@/components/ui/use-toast"





const SignupForm = () => {
  const {toast} = useToast(); 

  const isLoading = false; 

   // 1. Define your form.
   const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name:'',
      username: "",
      email: '',
      password: '',

    },
  })
 
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    const newUser = await createUserAccount(values); 

    if (!newUser) {
      return  toast({
        title: "Sign Up failed. Please try again.",
      })
    }
    //const session = await signInAccount()
  }

  return (
    <Form {...form}>

    <div className="sm:w-420 flex-center flex-col">
      <img src="/assets/images/logo.svg"/>
      <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12 ">Create A new Account</h2>
      <p className="text-light-3 small-medium md:base-regular mt-12">To use this Social Media App enter your Account Details </p>
    


      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='bg-blue-600 rounded-xl' type="submit">
          {isLoading ? (
            <div className="flex-center gap-2">
              <Loader />
            </div>
          ): "Sign up"}
        
        </Button>
        <p className="text-small-regular text-light-2 text-center">
          Already have an Account?
          <Link to='/sign-in' className="text-primary-500 text-small-semibold ml-1">Log in</Link>
        </p>
      </form>
      </div>
    </Form> 
  )
}

export default SignupForm
