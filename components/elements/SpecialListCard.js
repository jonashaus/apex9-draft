import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const SpecialListCard = ({
  title,
  itemTitles,
  itemIDs,
  items,
  maxShownItemsCount = 10,
  filterMode = "filterTitles",
  children,
  extraComponent,
}) => {
  const [filterValue, setfilterValue] = useState("");
  const [itemsWithData, setItemsWithData] = useState([]);
  const [filteredItemsWithData, setFilteredItemsWithData] = useState([]);
  const [expanded, setExpanded] = useState(false);

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
      if (filterMode == "filterTitles") {
        setFilteredItemsWithData(
          itemsWithData.filter((item) => item.title.includes(filterValue))
        );
      }
      if (filterMode == "filterData") {
        setFilteredItemsWithData(
          itemsWithData.filter((item) =>
            JSON.stringify(item).replace(/['"]+/g, "").includes(filterValue)
          )
        );
      }
    }
  }, [filterValue, itemsWithData]);

  useEffect(() => {
    if (expanded) {
      const myModalEl = document.getElementById(`modal_${title}`);
      myModalEl.addEventListener("hidden.bs.modal", () => {
        setExpanded(false);
      });
    }
  }, [title, expanded]);

  const handleChangeFilter = (filterValue) => {
    setfilterValue(filterValue);
  };

  const handleChangeExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <div className="modal" id={`modal_${title}`} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            {expanded && (
              <Card
                title={title}
                itemTitles={itemTitles}
                filteredItemsWithData={filteredItemsWithData}
                maxShownItemsCount={maxShownItemsCount}
                children={children}
                filterValue={filterValue}
                handleChangeFilter={handleChangeFilter}
                handleChangeExpanded={handleChangeExpanded}
                expanded={expanded}
                extraComponent={extraComponent}
              />
            )}
          </div>
        </div>
      </div>
      {!expanded && (
        <Card
          title={title}
          itemTitles={itemTitles}
          filteredItemsWithData={filteredItemsWithData.slice(
            0,
            maxShownItemsCount
          )}
          maxShownItemsCount={maxShownItemsCount}
          children={children}
          filterValue={filterValue}
          handleChangeFilter={handleChangeFilter}
          handleChangeExpanded={handleChangeExpanded}
          expanded={expanded}
          extraComponent={extraComponent}
        />
      )}
    </>
  );
};

const Card = ({
  title,
  itemTitles,
  filteredItemsWithData,
  maxShownItemsCount,
  children,
  filterValue,
  handleChangeFilter,
  handleChangeExpanded,
  expanded,
  extraComponent,
}) => {
  return (
    <div className={`card ${!expanded && "mb-3"}`}>
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
        <div className="d-flex justify-content-end align-items-center align-middle">
          <input
            type="text"
            className="form-control ms-5"
            placeholder="Filter..."
            value={filterValue}
            onChange={(e) => handleChangeFilter(e.target.value)}
          />
          {extraComponent}
        </div>
      </div>
      <div className="card-body p-0">
        <div
          className="list-group list-group-flush"
          style={{ minHeight: `${maxShownItemsCount * 2.6}em` }}
        >
          {filteredItemsWithData.map((item, i) => {
            return (
              <div key={item.id}>
                {children({ title: item.title, id: item.id, data: item.data })}
              </div>
            );
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
        <div className="card-footer">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              {!expanded && (
                <>
                  List is limited to{" "}
                  <span className="text-primary">{maxShownItemsCount}</span>{" "}
                  items.
                </>
              )}
            </div>
            {expanded && (
              <button
                className="btn btn-light"
                data-bs-dismiss="modal"
                onClick={handleChangeExpanded}
              >
                Minimize
                <i className="bi bi-arrows-angle-contract ms-2" />
              </button>
            )}
            {!expanded && (
              <button
                className="btn btn-light"
                onClick={handleChangeExpanded}
                data-bs-toggle="modal"
                data-bs-target={`#modal_${title}`}
              >
                Show all
                <i className="bi bi-arrows-angle-expand ms-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialListCard;
