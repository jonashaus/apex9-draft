import { useState, useEffect, use, Children } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Tags from "../elements/Tags";

const SpecialListCard = ({ title, itemTitles, itemIDs, items, children }) => {
  const [filterValue, setfilterValue] = useState("");
  const [itemsWithData, setItemsWithData] = useState([]);
  const [filteredItemsWithData, setFilteredItemsWithData] = useState([]);

  useEffect(() => {
    if (itemTitles.length > 0) {
      if (
        itemTitles.length != items.length ||
        itemTitles.length != itemIDs.length
      ) {
        toast.error(
          "The props 'items', 'itemTitles' and 'itemIDs' must have the same length."
        );
        return;
      } else {
        const listItems = [];
        for (let i = 0; i < itemTitles.length; i++) {
          listItems.push({
            title: itemTitles[i],
            id: itemIDs[i],
            data: items[i],
          });
        }
        setItemsWithData(listItems);
      }
    }
  }, [itemTitles, items]);

  useEffect(() => {
    if (itemsWithData.length > 0) {
      setFilteredItemsWithData(
        itemsWithData.filter((item) => item.title.includes(filterValue))
      );
    }
  }, [filterValue, itemsWithData]);

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <div className="d-flex justify-content-start align-items-center">
          <h3 className="mb-0">{title}</h3>
          <span className="badge bg-primary ms-2 fs-6">{`Total: ${itemTitles.length}`}</span>
          {filterValue && (
            <span className="badge bg-warning ms-2 fs-6">
              {`Filtered: ${filteredItemsWithData.length}`}
            </span>
          )}
        </div>
        <div className="d-flex justify-content-end align-items-center">
          <input
            type="text"
            className="form-control"
            placeholder="Filter..."
            onChange={(e) => setfilterValue(e.target.value)}
          />
        </div>
      </div>
      <div className="card-body p-0">
        <div className="list-group list-group-flush">
          {filteredItemsWithData.map((item, i) => {
            return <div>{children(item.title, item.id, item.data)}</div>;
          })}
          {filteredItemsWithData.length == 0 && (
            <button
              type="button"
              className="list-group-item list-group-item-action text-center"
            >
              No items found
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpecialListCard;
