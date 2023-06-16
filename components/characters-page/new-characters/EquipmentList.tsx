import { SimpleEquipmentModel } from "@/data/database-models/equipmentModels";

function EquipmentList({ equipment }: { equipment: SimpleEquipmentModel[]}) {
  return (
    <div className="border border-white border-dashed p-5">
      <h2>Equipment</h2>
      - - - - - - - -
      {equipment.map((item, index) => (
        <div key={`equip-${item.id}-${index}`}>{item.name}</div>
      ))}
    </div>
  );
}

export default EquipmentList;
