import React, { useState, useEffect, useRef } from "react";
import useComponentVisible from "../customHooks/onclickListener";

export default function DropdownSearhable(props) {
  const {
    selectedItem,
    setSelectedItem,
    list = [],
    style,
    displayKey,
    placeholder,
    showDefaultValue,
    prevSelectedItemId,
    prevSelectedItemName,
  } = props;

  const [value, setValue] = useState("");
  const [searchValueLocal, setSearchValueLocal] = useState("");
  const [isValueEntering, setIsValueEntering] = useState(
    searchValueLocal || showDefaultValue ? false : true
  );
  const { ref, isComponentVisible, handleClose, setIsComponentVisible } = useComponentVisible(false);
  const [indexOfFocusedDropdownItem, setIndexOfFocusedDropdownItem] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const maintainScrollPositionRef = useRef(null);
  const inputFocusRef = useRef(null);
  //   const [filteredItems, setFilteredItems] = useState([]);

  let filteredItems =
    list &&
    list.length > 0 &&
    list.filter((item) => {
      return item[displayKey]?.toLowerCase().includes(value?.toString().toLowerCase());
    });

  useEffect(() => {
    // setFilteredItems(items);
  }, [list]);

  useEffect(() => {
    if (!selectedItem) {
      setValue("");
      setIsValueEntering(true);
    }
  }, [selectedItem]);

  useEffect(() => {
    if (showDefaultValue) {
      let { name } = list[0];
      setValue(name);
      selectItem(list[0]);
      setIsValueEntering(false);
    }
  }, [showDefaultValue]);

  useEffect(() => {
    if (prevSelectedItemId && list && list.length > 0) {
      let index = list?.findIndex((item) => item.id == prevSelectedItemId);
      let { name } = list[index];
      setValue(name);
      selectItem(list[index]);
      setIsValueEntering(false);
    }
  }, [prevSelectedItemId]);

  useEffect(() => {
    if (prevSelectedItemName) {
      let index = list?.findIndex((item) => item.name.includes(prevSelectedItemName));
      let { name } = list[index];
      setValue(name);
      selectItem(list[index]);
      setIsValueEntering(false);
    }
  }, [prevSelectedItemName]);

  //
  const handleKeyboardEvent = (e) => {
    if (!isComponentVisible) return;

    if (e.key === "ArrowUp" && indexOfFocusedDropdownItem > 0) {
      setIndexOfFocusedDropdownItem((prevIndex) => prevIndex - 1);
      if (maintainScrollPositionRef.current) {
        maintainScrollPositionRef.current.scrollTop -= 40;
      }
    } else if (e.key === "ArrowDown" && indexOfFocusedDropdownItem < filteredItems.length - 1) {
      setIndexOfFocusedDropdownItem((prevIndex) => prevIndex + 1);
      if (maintainScrollPositionRef.current) {
        maintainScrollPositionRef.current.scrollTop += 40;
      }
    } else if (e.key === "Enter" && indexOfFocusedDropdownItem >= 0) {
      const selectedItem = filteredItems[indexOfFocusedDropdownItem];
      if (selectedItem) {
        setValue(selectedItem[displayKey]);
        setSearchValueLocal(selectedItem[displayKey]);
        selectItem(selectedItem);
        setIsValueEntering(false);
      }
    }
  };

  const selectItem = (item) => {
    setSelectedItem(item);
    handleClose();
  };

  const handleDeselect = () => {
    setValue("");
    setIsValueEntering(true);
    setIsComponentVisible(true);
    setIndexOfFocusedDropdownItem(0);
    setIsHovered(false);
  };

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <div className="DropDownInputContainer" style={style}>
        {isValueEntering && (
          <>
            <input
              style={style}
              value={value}
              placeholder={placeholder ? placeholder : "Select"}
              className="DropDownInput"
              ref={inputFocusRef}
              onChange={(e) => {
                e.preventDefault();
                setValue(() => e.target.value);
                setSearchValueLocal(() => e.target.value);
                setIsComponentVisible(true);
              }}
              onClick={() => {
                setIsComponentVisible(true);
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "Enter") {
                  e.preventDefault();
                  handleKeyboardEvent(e);
                }
              }}
            ></input>
            <img
              src="/down arow.svg"
              alt="arrow"
              width="15"
              height="15"
              //   style={{ position: "initial", zIndex: 0 }}
              onClick={() => {
                setIsComponentVisible(!isComponentVisible);
              }}
            />
          </>
        )}

        {!isValueEntering && (
          <div className="SelectedValue">
            <div>{value}</div>
            <button
              className="CloseButton"
              onClick={async () => {
                try {
                  await handleDeselect();
                } catch (error) {}
                inputFocusRef.current.focus();
              }}
            >
              &times;
            </button>
          </div>
        )}
      </div>

      {isComponentVisible && (
        <div
          className="DropDownListContainer"
          //   style={style}
          tabIndex="0"
          ref={maintainScrollPositionRef}
          onMouseLeave={() => {
            setIndexOfFocusedDropdownItem(0);
            if (maintainScrollPositionRef.current) {
              maintainScrollPositionRef.current.scrollTop = 0;
            }
          }}
        >
          {filteredItems &&
            filteredItems?.map((item, index) => (
              <p
                className="DropDownListItem"
                key={index}
                onClick={() => {
                  setValue(() => item[displayKey]);
                  selectItem(item);
                  setIsValueEntering(false);
                }}
                onMouseEnter={() => {
                  setIsHovered(true);
                }}
                onMouseLeave={() => {
                  setIsHovered(false);
                }}
              >
                {index == indexOfFocusedDropdownItem && !isHovered ? (
                  <p className="DropDownListFocusedItem">
                    <p>{item[displayKey]}</p>
                  </p>
                ) : (
                  <p className="DropDownListItemWithoutFocused">{item[displayKey]}</p>
                )}
              </p>
            ))}
        </div>
      )}
    </div>
  );
}
