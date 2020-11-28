import React, { useState, useEffect } from "react";
import $ from "jquery";
import "./ProfileStatistics.css";
import LaptopIcon from "@material-ui/icons/Laptop";
import PhotoCameraOutlinedIcon from "@material-ui/icons/PhotoCameraOutlined";
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
import EmojiEventsOutlinedIcon from "@material-ui/icons/EmojiEventsOutlined";
// jquery stuff
// number count for stats, using jQuery animate
$.fn.jQuerySimpleCounter = function (options) {
  var settings = $.extend(
    {
      start: 0,
      end: 100,
      easing: "swing",
      complete: "",
    },
    options
  );

  var thisElement = $(this);

  $({ count: settings.start }).animate(
    { count: settings.end },
    {
      duration: settings.duration,
      easing: settings.easing,
      step: function () {
        var mathCount = Math.ceil(this.count);
        thisElement.text(mathCount);
      },
      complete: settings.complete,
    }
  );
};

function start_count() {
  $("#number1").jQuerySimpleCounter({ end: 656, duration: 3000 });
  $("#number2").jQuerySimpleCounter({ end: 1946, duration: 2000 });
  $("#number3").jQuerySimpleCounter({ end: 81, duration: 3100 });
  $("#number4").jQuerySimpleCounter({ end: 16, duration: 3450 });
  $("#number5").jQuerySimpleCounter({ end: 9, duration: 4000 });
}

function ProfileStatistics() {
  const [viewed, setViewed] = useState(false);

  useEffect(() => {
    $(function () {
      var oTop = $("#counter").offset().top - window.innerHeight;
      $(window).scroll(function () {
        var pTop = $("html").scrollTop();
        if (pTop > oTop && !viewed) {
          setViewed(true);
        }
      });
    });
  }, []);

  useEffect(() => {
    if (viewed) {
      console.log("count Started");
      setViewed(true);
      start_count();
    }
  }, [viewed]);

  return (
    <div className="root">
      <div class="container">
        <h1 class="heading">Journey till date</h1>
        <div class="counter" id="counter">
          <div class="item">
            <LaptopIcon />
            <p id="number1" class="number">
              0
            </p>
            <p class="label">Hours editing</p>
          </div>
          <div class="item">
            <PhotoCameraOutlinedIcon />
            <p id="number2" class="number">
              0
            </p>
            <p class="label">Photos taken</p>
          </div>
          <div class="item">
            <SentimentSatisfiedOutlinedIcon />
            <p id="number3" class="number">
              0
            </p>
            <p class="label">Satisfied Clients</p>
          </div>
          <div class="item">
            <AssignmentTurnedInOutlinedIcon />
            <p id="number4" class="number">
              0
            </p>
            <p class="label">Projects done</p>
          </div>
          <div class="item">
            <EmojiEventsOutlinedIcon />
            <p id="number5" class="number">
              0
            </p>

            <p class="label">Milestone Photography</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileStatistics;
