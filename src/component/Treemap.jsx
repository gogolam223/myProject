import React, { useEffect, useState } from "react";
import "../assets/style/Treemap.css";

export default function Treemap(props) {
  const [treemapData, setTreemapData] = useState([]);
  const [weightPerRow, setWeightPerRow] = useState(1);

  useEffect(() => {
    if (props.data.length > 0 && props.row) {
      formatData();
    }
  }, [props.data, props.row]);

  const formatData = () => {
    let formattedData = [];
    // create rows
    for (let i = 0; i < props.row; i++) {
      formattedData.push({ count: 0, weight: 0, item: [] });
    }
    // loop > assign item to the row with the lowest total weight
    for (let item of props.data) {
      formattedData.sort((a, b) => a.weight - b.weight);
      formattedData[0]["item"].push(item);
      formattedData[0]["count"]++;
      formattedData[0]["weight"] += item.weight;
    }
    // sort by weight desc
    formattedData.sort((a, b) => b.weight - a.weight);
    setTreemapData(formattedData);
    setWeightPerRow(formattedData[0]["weight"]);
  };

  return (
    <React.Fragment>
      {/* generate treemap */}
      {treemapData.length > 0 &&
        treemapData.map((itemList, index) => {
          return (
            <div className={"treemap-row"} key={`row-${index}`}>
              {itemList.item.map((value, i) => {
                let percentage = Math.round(value.value * 10000) / 100;
                return (
                  <div
                    key={`item-${i}`}
                    className={"treemap-item"}
                    style={{
                      width: `${(value.weight / weightPerRow) * 100}%`,
                      backgroundColor:
                        percentage == 0
                          ? "grey"
                          : percentage > 0
                          ? "green"
                          : "red",
                    }}
                  >
                    <h3>{value.name}</h3>
                    <p>{percentage}%</p>
                  </div>
                );
              })}
            </div>
          );
        })}
    </React.Fragment>
  );
}
