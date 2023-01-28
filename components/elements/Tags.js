import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Tags = ({
  tags,
  tagDescription,
  addTagHandler,
  removeTagHandler,
  selectOptions,
}) => {
  const addTag = (tagText) => {
    if (tags.lastIndexOf(tagText) !== -1) {
      toast.error("This tag already exists!");
    } else {
      addTagHandler(tagText);
    }
  };
  const removeTag = (tagText) => {
    removeTagHandler(tagText);
  };
  return (
    <div className="d-flex flex-wrap px-2 py-1 border rounded-4">
      {tags &&
        tags.map((tag, i) => {
          return (
            <Tag
              text={tag}
              key={i}
              removeTagHandler={removeTagHandler && removeTag}
            />
          );
        })}
      {!tags && !addTagHandler && (
        <input
          type="text"
          placeholder="No data found :("
          className="border-0 p-0 ps-1 bg-transparent text-secondary"
          style={{ fontSize: "0.75em", fontWeight: "700", outline: "none" }}
          disabled
        />
      )}
      {addTagHandler && (
        <TagCreator
          tagDescription={tagDescription}
          addTagHandler={addTag}
          selectOptions={selectOptions}
        />
      )}
    </div>
  );
};

const Tag = ({ text, removeTagHandler }) => {
  const removeTag = () => {
    removeTagHandler(text);
  };
  return (
    <span className="badge rounded-pill text-bg-secondary me-1 d-flex align-items-center my-1">
      {text}
      {removeTagHandler && <i className="bi bi-x ms-1" onClick={removeTag} />}
    </span>
  );
};

const TagCreator = ({ addTagHandler, tagDescription, selectOptions }) => {
  const [newTag, setNewTag] = useState("");

  const enterPressHandler = (event) => {
    if (event.key == "Enter") {
      addTagHandler(newTag);
      setNewTag("");
    }
  };
  return (
    <>
      {selectOptions ? (
        <select class="form-select" aria-label="Default select example">
          <option selected>{`Add ${tagDescription || "tag"}...`}</option>
          {selectOptions.map((option, i) => {
            return (
              <option value={option} key={i}>
                {option}
              </option>
            );
          })}
        </select>
      ) : (
        <input
          id="tagCreator"
          type="text"
          placeholder={`Add ${tagDescription || "tag"}...`}
          className="border-0 p-0 ps-1 bg-transparent text-secondary flex-fill"
          style={{ fontSize: "0.75em", fontWeight: "700", outline: "none" }}
          onChange={(e) => setNewTag(e.target.value)}
          value={newTag}
          onKeyDown={enterPressHandler}
        />
      )}
    </>
  );
};

export default Tags;
