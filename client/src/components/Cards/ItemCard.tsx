import { FC } from "react";
import { Card } from "../../interfaces/Dashboard";

const ItemCard: FC<{ data: Card; onClick: (e: any) => void }> = ({
  data,
  onClick,
}) => {
  return (
    <div
      data-name={data.name}
      onClick={onClick}
      style={{ width: "calc(100vh - 60vh)" }}
      className="card p-4 post-card pointer d-flex flex-row align-items-center"
    >
      <span className="material-symbols-outlined fs-1 me-5">{data.icon}</span>

      <div className="d-flex flex-column fs-4 text-center">
        <span>{data.name}</span>
        <span>{data.count}</span>
      </div>
    </div>
  );
};

export default ItemCard;
