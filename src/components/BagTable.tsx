import type { Bag } from "../types/bmw";
import { StatusBadge } from "./StatusBadge";

type Props = {
  bags: Bag[];
  onViewBag?: (bag: Bag) => void;
};

export function BagTable({ bags, onViewBag }: Props) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Bag ID</th>
            <th>Category</th>
            <th>Department</th>
            <th>Status</th>
            <th>Age</th>
            <th>Weight</th>
            <th>Location</th>
            <th>Risk</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {bags.map((bag) => (
            <tr key={bag.id}>
              <td>{bag.id}</td>
              <td>{bag.category}</td>
              <td>{bag.department}</td>
              <td>{bag.status}</td>
              <td>{bag.age}</td>
              <td>{bag.weight}</td>
              <td>{bag.currentLocation}</td>
              <td>
                <StatusBadge value={bag.risk} />
              </td>
              <td>
                <button className="mini-btn" onClick={() => onViewBag?.(bag)}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}