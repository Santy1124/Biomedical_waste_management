import { bags } from "../data/mockData";

type Props = {
  zoneName: string;
  onClose: () => void;
};

export function ZoneDetail({
  zoneName,
  onClose,
}: Props) {
  return (
    <div className="detail-panel">
      <div className="detail-header">
        <h3>{zoneName}</h3>

        <button
          className="secondary-btn"
          onClick={onClose}
        >
          Close
        </button>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Bag ID</th>
              <th>Department</th>
              <th>Status</th>
              <th>Age</th>
            </tr>
          </thead>

          <tbody>
            {bags.map((bag) => (
              <tr key={bag.id}>
                <td>{bag.id}</td>
                <td>{bag.department}</td>
                <td>{bag.status}</td>
                <td>{bag.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}