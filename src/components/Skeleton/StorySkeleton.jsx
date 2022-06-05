import React from 'react'
import "./storyskeleton.css"
const StorySkeleton = () => {
  return (
    <div className="wrapper">
  <div className="skel dark:bg-darkCard bg-white ">
    <div className="skel-user skel-anim">
      <div className="skel-avatar "></div>
      <div className="skel-info">

        <div className="skel-rect"></div>
        <div className="skel-rect skel-rect-sm"></div>
      </div>
    </div>
    <div className="skel-content skel-anim">
      <div className="skel-thumbnail"></div>
      <div className="skel-rect"></div>
      <div className="skel-rect"></div>
      <div className="skel-rect"></div>
    </div>
  </div>
</div>
  )
}

export default StorySkeleton