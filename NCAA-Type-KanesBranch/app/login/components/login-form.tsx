"use client"
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login, signup } from "../actions";
import { toast } from "sonner";


export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  // State to track form inputs
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [signups, setSignUps] = useState(true);


  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    const result = signups ? await signup(formData) : await login(formData);
    console.log(result)
    if (result.status === 200) {
          toast(result.message)

    } else {
      toast(result.message);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a href="#" className="flex flex-col items-center gap-2 font-medium">
              <div className="flex h-8 w-8 items-center justify-center rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={32}
                height={32}
                viewBox="0 0 24 24"
                fill="orange"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`lucide lucide-basketball animate-bounce ${className}`}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2.1 13.4A10.1 10.1 0 0 0 13.4 2.1" />
      <path d="m5 4.9 14 14.2" />
      <path d="M21.9 10.6a10.1 10.1 0 0 0-11.3 11.3" />
    </svg>
              </div>
              <span className="sr-only">Diddy Bop March Madness</span>
            </a>
            <h1 className="text-xl text-center font-bold">
              Welcome to Diddy Bop March Madness.
            </h1>
            <div className="text-center text-sm">
            {signups ?
            "Already have an account?":
              "Don't have an account?"
            }{" "}
              {signups ? 
               <a onClick={()=>setSignUps(!signups)} className="underline underline-offset-4">Login</a>: 
               <a onClick={()=>setSignUps(!signups)} className="underline underline-offset-4">Sign Up</a>}
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="unclestevesux123"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <Button type="submit" className="w-full">
              {signups ? 'Sign Up': 'Login'}
            </Button>
          </div>
        </div>
      </form>
      <div className="text-center text-xs text-muted-foreground">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
