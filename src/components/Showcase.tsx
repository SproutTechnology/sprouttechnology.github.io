import React, {Suspense} from "react";
import Intro from "./Intro/Index";

function Showcase() {
  return (
      <div className="rounded-lg flex justify-center items-center h-full w-full animate-fade">
          <Suspense fallback={null}>
          <Intro />
        </Suspense>
      </div>
  );
}

export default Showcase;
