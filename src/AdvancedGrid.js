import React from "react";
import $ from "jquery";
import "./AdvancedGrid.css";

import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

function rotate(d) {
  var list = prepareLi(),
    temp;

  if (d > 0) {
    for (var i = 0; i < 9; i++) {
      temp = i + d;
      if (temp > 8) temp = temp - 9;
      $(list[i]).removeClass();
      if (temp != 0) $(list[i]).addClass("box anim b" + temp);
      else $(list[i]).addClass("box b" + temp);
    }
  }
  if (d < 0) {
    for (var i = 0; i < 9; i++) {
      temp = i + d;
      if (temp < 0) temp = temp + 9;
      $(list[i]).removeClass();
      if (temp != 8) $(list[i]).addClass("box anim b" + temp);
      else $(list[i]).addClass("box b" + temp);
    }
  }
}

function prepareLi() {
  var list = $(".box"),
    listArr = [],
    index,
    f = 0,
    tmp,
    _class;

  list.each(function (i) {
    tmp = $(this).attr("class").split(" ");
    _class = tmp.length == 3 ? tmp[2] : tmp[1];
    if (_class == "b0") {
      index = i;
      f = 1;
    }

    if (f) listArr.push(this);
  });

  for (var i = 0; i < index; i++) {
    listArr.push(list[i]);
  }

  return listArr;
}

// swipe events
var xDown = null;
var yDown = null;

function getTouches(evt) {
  return (
    evt.touches || // browser API
    evt.originalEvent.touches
  ); // jQuery
}

function handleTouchStart(evt) {
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return;
  }

  var xUp = evt.touches[0].clientX;
  var yUp = evt.touches[0].clientY;

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    /*most significant*/
    if (xDiff > 0) {
      $(".advanced_grid_root_container_nav_left").trigger("click");
    } else {
      $(".advanced_grid_root_container_nav_right").trigger("click");
    }
  } else {
    if (yDiff > 0) {
      /* up swipe */
    } else {
      /* down swipe */
    }
  }
  /* reset values */
  xDown = null;
  yDown = null;
}

function AdvancedGrid() {
  return (
    <div className={"advanced_grid_root"}>
      <div
        className="advanced_grid_root_container"
        id={"3Dcontainer"}
        onLoad={() => {
          document
            .getElementById("3Dcontainer")
            .addEventListener("touchstart", handleTouchStart, false);
          document
            .getElementById("3Dcontainer")
            .addEventListener("touchmove", handleTouchMove, false);
        }}
      >
        <div className="box anim b0">
          <img src={`https://picsum.photos/seed/${Math.random()}/300`} alt="" />
        </div>
        <div className="box anim b1">
          <img src={`https://picsum.photos/seed/${Math.random()}/300`} alt="" />
        </div>
        <div className="box anim b2">
          <img src={`https://picsum.photos/seed/${Math.random()}/300`} alt="" />
        </div>
        <div className="box anim b3">
          <img src={`https://picsum.photos/seed/${Math.random()}/300`} alt="" />
        </div>
        <div className="box anim b4">
          <img src={`https://picsum.photos/seed/${Math.random()}/300`} alt="" />
        </div>
        <div className="box anim b5">
          <img src={`https://picsum.photos/seed/${Math.random()}/300`} alt="" />
        </div>
        <div className="box anim b6">
          <img src={`https://picsum.photos/seed/${Math.random()}/300`} alt="" />
        </div>
        <div className="box anim b7">
          <img src={`https://picsum.photos/seed/${Math.random()}/300`} alt="" />
        </div>
        <div className="box anim b8">
          <img src={`https://picsum.photos/seed/${Math.random()}/300`} alt="" />
        </div>
      </div>
      <div className="advanced_grid_root_container_nav">
        <div
          className="advanced_grid_root_container_nav_left"
          onClick={function () {
            rotate(-1);
          }}
        >
          <ArrowLeftIcon />
        </div>
        <div className="advanced_grid_root_container_nav_center"></div>
        <div
          className="advanced_grid_root_container_nav_right"
          onClick={function () {
            rotate(+1);
          }}
        >
          <ArrowRightIcon />
        </div>
      </div>
    </div>
  );
}

export default AdvancedGrid;
