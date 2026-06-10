import { supabase } from "../lib/supabase";
import type { Bag, BagStatus } from "../types/bmw";

type SupabaseBag = {
  id: string;
  category: Bag["category"];
  department: string;
  status: BagStatus;
  age: string;
  risk: Bag["risk"];
  weight: string;
  current_location: string;
};

function fromDb(row: SupabaseBag): Bag {
  return {
    id: row.id,
    category: row.category,
    department: row.department,
    status: row.status,
    age: row.age,
    risk: row.risk,
    weight: row.weight,
    currentLocation: row.current_location,
  };
}

export async function getBags(): Promise<Bag[]> {
  const { data, error } = await supabase
    .from("bags")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data ?? []).map(fromDb);
}

export async function createBagInDb(bag: Bag): Promise<Bag> {
  const { data, error } = await supabase
    .from("bags")
    .insert({
      id: bag.id,
      category: bag.category,
      department: bag.department,
      status: bag.status,
      age: bag.age,
      risk: bag.risk,
      weight: bag.weight,
      current_location: bag.currentLocation,
    })
    .select()
    .single();

  if (error) throw error;

  return fromDb(data);
}

export async function updateBagStatusInDb(
  bagId: string,
  status: BagStatus,
  currentLocation: string
): Promise<Bag> {
  const { data, error } = await supabase
    .from("bags")
    .update({
      status,
      current_location: currentLocation,
    })
    .eq("id", bagId)
    .select()
    .single();

  if (error) throw error;

  return fromDb(data);
}