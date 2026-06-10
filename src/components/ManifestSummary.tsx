import type { Bag } from "../types/bmw";

type Props = {
  bags: Bag[];
};

export function ManifestSummary({ bags }: Props) {
  const totalWeight = bags.reduce(
    (sum, bag) => sum + parseFloat(bag.weight),
    0
  );

  const categoryCounts = bags.reduce(
    (acc, bag) => {
      acc[bag.category] = (acc[bag.category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="card">
      <h3>Manifest Summary</h3>

      <p>
        <span>{bags.length}</span> bags selected
      </p>

      <p>
        <span>{totalWeight.toFixed(1)} kg</span> total
        weight
      </p>

      <div className="manifest-breakdown">
        {Object.entries(categoryCounts).map(
          ([category, count]) => (
            <p key={category}>
              {category}: <span>{count}</span>
            </p>
          )
        )}
      </div>
    </div>
  );
}