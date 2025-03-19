'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

type loginData = {
  email: string;
  password: string;
}

export async function login(formData: loginData): Promise<{ status: number; message: string }> {
  const supabase = await createClient();
  const data = {
    email: formData.email as string,
    password: formData.password as string,
  };

  if (!data.email || !data.password) {
    return { status: 400, message: "Email and password are required" };
  }

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { status: 401, message: "Invalid email or password. Please try again." };
  }

  redirect("/");
}

export async function signup(formData: loginData): Promise<{ status: number; message: string }> {
  const supabase = await createClient();
  console.log("Attempting to sign up");

  const data = {
    email: formData.email as string,
    password: formData.password as string,
  };

  if (!data.email || !data.password) {
    console.error("Email and password are required");
    return { status: 400, message: "Email and password are required" };
  }

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    if (error.code === "user_already_exists") {
      console.error("User already exists", error);
      return { status: 409, message: "User already exists. Please log in." };
    }

    console.error("Error signing up:", error);
    return { status: 500, message: "An error occurred during signup." };
  }

  // Automatically log in the user after signup
  const { error: loginError } = await supabase.auth.signInWithPassword(data);

  if (loginError) {
    console.error("Error logging in after signup:", loginError);
    return { status: 500, message: "Signup succeeded, but login failed. Please log in manually." };
  }

  // Revalidate and return success
  revalidatePath("/", "layout");

  redirect("/")
}


export const signOut = async (): Promise<void> => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out:', error);
    return;
  }
  console.log('signout')

  revalidatePath('/', 'layout');
  redirect('/login');
};
