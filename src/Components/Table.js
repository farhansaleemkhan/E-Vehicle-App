import React from "react";
// import Dropdown from "../dropdown-pill-search/dropdown-pill-search";

function Table({ tableColumns, tableBody }) {
  const getComponent = (rowData, data, index) => {
    const Component = rowData.componentName;

    if (rowData.componentName == "Dropdown") {
      return (
        <p1>dropdown</p1>
        // <Dropdown
        //   style={rowData.value.style}
        //   list={rowData.value.list}
        //   selectedItem={rowData.value.selectedItem}
        //   setSelectedItem={rowData.value.setSelectedItem}
        //   searchValue={rowData.value.searchValue}
        //   setSearchValue={rowData.value.setSearchValue}
        //   idkey={rowData.value.idkey}
        //   displayKey={rowData.value.displayKey}
        //   prevSelectedItemName={rowData.value.prevSelectedItemName}
        // ></Dropdown>
      );
    } else if (rowData.componentName == "image") {
      return (
        <div onClick={() => rowData.handler(data, index)}>
          <img src={rowData.url} height={20} width={20} priority />
        </div>
      );
    } else {
      return <Component value={rowData.value} handler={rowData.handler} index={index} data={data} />;
    }
  };

  return (
    <div className="table-container">
      <table className="table">
        <thead className="table-head">
          <tr className="tr">
            {tableColumns?.map((item) => (
              <th className="th" style={item.class} key={item.id}>
                {item.name}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="table-body">
          {tableBody &&
            tableBody?.map((item, index) => {
              let rowValues = Object.values(item);
              return (
                <tr className="tr" key={index}>
                  {rowValues?.map((rowData, index1) => {
                    if (typeof rowData == "object") {
                      if (rowData == null) {
                        return <td className="td">N/A</td>;
                      } else {
                        return (
                          <td className="td" key={++index1}>
                            {
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                {getComponent(rowData, item, index)}
                              </div>
                            }
                          </td>
                        );
                      }
                    } else {
                      return <td className="td">{rowData}</td>;
                    }
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
