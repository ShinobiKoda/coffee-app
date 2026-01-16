import { supabase } from "./supabase";

export interface Coffee {
  id: number;
  name: string;
  description: string;
  purchases: number;
  rating: number;
  tags: string[];
  price: number;
  image_url: string;
}

export const getAllCoffees = async () => {
  try {
    const { data, error } = await supabase
      .from("coffee_details")
      .select("*")
      .order("id", { ascending: true });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.log("Error fetching coffee: ", error);
    return { data: null, error };
  }
};

export const getCoffeeById = async (id: number) => {
  try {
    const { data, error } = await supabase
      .from("coffee_details")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.log("Error fetching coffee: ", error);
    return { data: null, error };
  }
};

export const getCoffeeByTag = async (tag: string) => {
  try {
    const { data, error } = await supabase
      .from("coffee_details")
      .select("*")
      .contains("tags", [tag]);

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.log("Error fetching coffee by tag: ", error);
    return { data: null, error };
  }
};

export const getTopRatedCoffees = async(limit=5) => {
  try {
    const { data, error } = await supabase
      .from("coffee_details")
      .select("*")
      .order('rating', {ascending: false})
      .limit(limit)

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.log("Error fetching coffee by tag: ", error);
    return { data: null, error };
  }
}

export const getMostPurchasedCoffee = async(limit=5) => {
  try {
    const { data, error } = await supabase
      .from("coffee_details")
      .select("*")
      .order('purchases', {ascending: false})
      .limit(limit)

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.log("Error fetching coffee by tag: ", error);
    return { data: null, error };
  }
}

export const searchCoffees = async(searcTerm: string) => {
  try {
    const { data, error } = await supabase
      .from("coffee_details")
      .select("*")
      .ilike('name', `%${searcTerm}%`)
      
    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.log("Error fetching coffee by tag: ", error);
    return { data: null, error };
  }
}