import React from "react";
import { Button, Link, Grid, Typography, Paper } from "@material-ui/core";

import { db, storage, auth, googleProvider } from "./firebase";
import { useStateValue } from "./StateProvider";
import reducer, { actionTypes } from "./reducer";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";

function Dashboard() {
  const [
    { user, parkingZoneData, parkingSpaceData, displaySpaceData },
    dispatch,
  ] = useStateValue();

  const [initialized, setInitialized] = React.useState(false);
  const [zone, setZone] = React.useState("None");
  const [role, setRole] = React.useState("None");
  const handleZoneChange = (event) => {
    setZone(event.target.value);
  };

  const useStyles = makeStyles({
    occupied: {
      backgroundColor: "lightgray",
      margin: "1%",
      padding: "1%",
      display: "flex",
      flexDirection: "row",
      flex: "1",
      justifyContent: "space-between",
      alignItems: "center",
      overFlow: "scroll",
    },
    notOccupied: {
      backgroundColor: "lightgreen",
      margin: "1%",
      padding: "1%",
      display: "flex",
      flexDirection: "row",
      flex: "1",
      justifyContent: "space-between",
      alignItems: "center",
      overFlow: "scroll",
    },
    heroContent: {
      margin: "2%",
      padding: "2%",
      display: "flex",
      flexDirection: "row",
      flex: "1",
      justifyContent: "space-between",
      alignItems: "center",
      overFlow: "scrool",
    },
  });

  const classes = useStyles();

  function initialize() {
    setInitialized(true);
    dispatch({
      type: actionTypes.SET_PARKINGZONEDATA,
      parkingZoneData: ["A", "B", "C"],
    });
    db.collection("vehicle_parking")
      .get()
      .then((res) => {
        res.forEach((element) => {
          element.ref.delete();
        });
      });
  }

  React.useEffect(() => {
    db.collection("user_role")
      .doc(user.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          console.log(snapshot.data().role);
          setRole(snapshot.data().role);
        }
      })
      .catch();
  }, []);
  React.useEffect(() => {
    let obj = {};
    parkingZoneData.forEach((zone) => {
      obj[zone] = Array.from(Array(10).keys()).map((item, i) => {
        return {
          spaceTitle: zone + (i + 1),
          occupied: false,
          occupiedBy: null,
        };
      });
    });
    dispatch({
      type: actionTypes.SET_PARKINGSPACEDATA,
      parkingSpaceData: obj,
    });
  }, [parkingZoneData]);

  React.useEffect(() => {
    console.log("parkingSpaceData[zone]" + parkingSpaceData[zone]);
    dispatch({
      type: actionTypes.SET_DISPLAYSPACEDATA,
      displaySpaceData: parkingSpaceData[zone] ? parkingSpaceData[zone] : [],
    });
  }, [parkingSpaceData, zone]);

  React.useEffect(() => {}, [displaySpaceData]);

  const register = (spaceTitle, vehicle_id) => {
    console.log(spaceTitle);
    db.collection("vehicle_parking")
      .doc(vehicle_id)
      .get()
      .then((snapshot) => {
        if (!snapshot.exists) {
          db.collection("vehicle_parking")
            .doc(vehicle_id)
            .set({ vehicle_id: vehicle_id, spaceTitle: spaceTitle })
            .then(() => {
              //update local copy
              let obj = parkingSpaceData;
              obj[spaceTitle[0]][spaceTitle[1] - 1].occupied = true;
              obj[spaceTitle[0]][spaceTitle[1] - 1].occupiedBy = vehicle_id;
              dispatch({
                type: actionTypes.SET_PARKINGSPACEDATA,
                parkingSpaceData: obj,
              });
            });
        } else {
          alert(
            "vehicle_id: " +
              vehicle_id +
              " is already parked at " +
              snapshot.data().spaceTitle
          );
        }
      })
      .catch();
  };
  const unRegister = (spaceTitle, vehicle_id) => {
    console.log(spaceTitle);
    db.collection("vehicle_parking")
      .doc(vehicle_id)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          db.collection("vehicle_parking")
            .doc(vehicle_id)
            .delete()
            .then(() => {
              //update local copy
              let obj = parkingSpaceData;
              obj[spaceTitle[0]][spaceTitle[1] - 1].occupied = false;
              obj[spaceTitle[0]][spaceTitle[1] - 1].occupiedBy = null;
              dispatch({
                type: actionTypes.SET_PARKINGSPACEDATA,
                parkingSpaceData: obj,
              });
            })
            .catch();
        } else {
          alert("This does not exist");
        }
      })
      .catch();
  };

  return (
    <div>
      <Paper elevation={3} className={classes.heroContent}>
        <Typography color={"secondary"}>{role}</Typography>
        <Button onClick={initialize} color={"primary"}>
          Initialize
        </Button>
        <FormControl>
          <InputLabel id="zone-select-label">Zone</InputLabel>
          <Select
            labelId="zone-select-label"
            id="zone-select"
            value={zone}
            onChange={handleZoneChange}
          >
            <MenuItem value={"None"}>{"NONE"}</MenuItem>;
            {parkingZoneData.map((item, index) => {
              return <MenuItem value={item}>Zone {item}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </Paper>

      {/* sort
      filter */}

      {displaySpaceData.map((item, index) => {
        return (
          <Grid>
            <Paper
              className={item.occupied ? classes.occupied : classes.notOccupied}
            >
              <b>{item.spaceTitle}</b>
              {"  "}
              {item.occupied
                ? "Occupied By " + item.occupiedBy
                : "Not Occupied"}
              {item.occupied ? (
                <Button
                  color={"secondary"}
                  onClick={() => {
                    unRegister(item.spaceTitle, "123");
                  }}
                >
                  UnRegister
                </Button>
              ) : (
                <Button
                  color={"primary"}
                  onClick={() => {
                    register(item.spaceTitle, "123");
                  }}
                >
                  Register
                </Button>
              )}
            </Paper>
          </Grid>
        );
      })}
    </div>
  );
}

export default Dashboard;
