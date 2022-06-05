import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getDataPost } from "../../Redux/Action/Story-Action";

const StoryDetail = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataPost());
  }, []);
  return (
    <div>
      <div className="h-[30vh] bg-red-500">
        <h1>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores
          asperiores distinctio ut. Hic, consectetur aliquid. Ea labore laborum
          eos dignissimos, voluptas dolorum, voluptates minus laboriosam
          perferendis, saepe nobis? Soluta, illo.
        </h1>
      </div>
    </div>
  );
};

export default StoryDetail;
