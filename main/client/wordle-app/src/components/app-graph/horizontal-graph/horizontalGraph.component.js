import React from "react";
import "./horizontal-graph.component.css";
const HorizontalGraphComponent = ({ dataset }) => {
  const distributionObj = {};

  for (let i = 0; i < dataset.length; i++) {
    for (let j = 0; j < 6; j++) {
      if (j in distributionObj) {
        distributionObj[j] += dataset[i][j];
      } else {
        distributionObj[j] = dataset[i][j];
      }
    }
  }

  console.log("distribution object is", distributionObj);
  const length = dataset.length;
  const mappedDataset = Object.keys(distributionObj).map((key, index) => {
    return (
      <div key={index} className="bar-sl-flex">
        <div>{index + 1}</div>
        <div
          style={{
            backgroundColor: distributionObj[key] !== 0 ? "#308a48" : "#3a3d3b",
            width: distributionObj[key] !== 0 ? "300px" : "40px",
            justifyContent: distributionObj[key] !== 0 ? "right" : "center",
          }}
          className="graph-cell"
        >
          {distributionObj[key]}
        </div>
      </div>
    );
  });
  return <div className="graph container">{mappedDataset}</div>;
};

export default HorizontalGraphComponent;
