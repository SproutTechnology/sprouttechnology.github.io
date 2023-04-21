import React, {Suspense} from "react";
import Intro from "./Intro";

function Showcase() {
  return (
    <div className="rounded-lg flex justify-center items-center bg-charcoal h-full w-full">
        <Suspense fallback={null}>
          <Intro/>
        </Suspense>
    </div>
  );
}

export default Showcase;
