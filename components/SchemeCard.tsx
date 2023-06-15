import React, { useState } from "react";
import { projectData } from "typings";
import FlatSlabDesign from "./FlatSlabDesign";
import * as d3 from "d3";

function SchemeCard(props: projectData) {
  let deadLoadTotal = 0;
  let groundDeadTotal = 0;
  let roofDeadTotal = 0;
  props.deadLoads?.map((load) => {
    if (load.loadGround === false && load.loadRoof === false) {
      deadLoadTotal = deadLoadTotal + +load.loadValue;
    } else if (load.loadGround && load.loadRoof === false) {
      groundDeadTotal = groundDeadTotal + +load.loadValue;
    } else {
      roofDeadTotal = roofDeadTotal + +load.loadValue;
    }
    return { deadLoadTotal, groundDeadTotal, roofDeadTotal };
  });

  let liveLoadTotal = 0;
  let groundLiveTotal = 0;
  let roofLiveTotal = 0;
  props.liveLoads?.map((load) => {
    if (load.loadGround === false && load.loadRoof === false) {
      liveLoadTotal = liveLoadTotal + +load.loadValue;
    } else if (load.loadGround && load.loadRoof === false) {
      groundLiveTotal = groundLiveTotal + +load.loadValue;
    } else {
      roofLiveTotal = roofLiveTotal + +load.loadValue;
    }
    return { liveLoadTotal, groundLiveTotal, roofLiveTotal };
  });

  let designs = [];
  const flatSlab = FlatSlabDesign(
    props,
    deadLoadTotal,
    groundDeadTotal,
    roofDeadTotal,
    liveLoadTotal,
    groundLiveTotal,
    roofLiveTotal
  );
  designs.push(flatSlab);

  const schemeCardElements = designs.map((scheme) => (
    <div key={scheme?.schemeType} className="scheme-card">
      <h2>{scheme?.schemeType}</h2>
      <img
        className="scheme-image"
        src="/Flat-Slab-Icon.svg"
        alt="flat-slab-icon"
      />
      <p>{`Structural Depth: ${scheme?.structuralDepth}mm`}</p>
      <p>{`Internal Square Column: ${scheme?.internalColumnSquare}mm Square`}</p>
      <p>{`Edge Square Column: ${scheme?.edgeColumnSquare}mm Square`}</p>
      <p>{`Corner Square Column: ${scheme?.cornerColumnSquare}mm Square`}</p>
      <p>{`Internal Column Load (ULS): ${scheme?.internalULSLoad} kN`}</p>
      <p>{`Edge Column Load (ULS): ${scheme?.edgeULSLoad} kN`}</p>
      <p>{`Corner Column Load (ULS): ${scheme?.cornerULSLoad} kN`}</p>
    </div>
  ));

  return <div>{schemeCardElements}</div>;
}

export default SchemeCard;
