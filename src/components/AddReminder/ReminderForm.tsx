import {
  Grid,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import { TimePicker } from "material-ui-pickers";
import React, { useState } from "react";
import Alert from "../Alert";
import ColorSelect from "./ColorSelector";

export default function ReminderForm() {
  const [allDay, setAllDay] = useState(false);
  const [formData, updateFormData] = useState({
    title: "",
    date: "",
    // startTime: "8:00",
    // endTime: "",
    color: "red",
    // notes: "",
  });

  const [hasErrors, setErrors] = useState({
    title: null,
    date: null,
    startTime: null,
    // endTime: null,
    color: null,
    // notes: null,
  });

  // function handleChange(e) {
  //   e.preventDefault();
  //   const name = e.target.name;
  //   const value = e.target.value;

  //   updateFormData({ ...formData, [name]: value });

  //   console.log(formData);
  // }

  function handleChange(e) {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    updateFormData({ ...formData, [name]: value });

    console.log(formData);
  }

  const addReminder = async () => {
    await fetch("http://localhost:8000/reminders", {
      method: "POST",
      body: JSON.stringify({
        ...formData,
        date: new Date(formData.date),
        allDay,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (!formData.title) {
      return setErrors({ ...hasErrors, title: "Please enter a title." });
    } else {
      setErrors({ ...hasErrors, title: null });
    }
    if (formData.title.length > 30) {
      return setErrors({
        ...hasErrors,
        title: "Event title can be no more than 30 characters",
      });
    }

    if (!formData.date) {
      return setErrors({
        ...hasErrors,
        date: "Please select a date.",
      });
    }
    // handle form submission to db
    addReminder();
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={8}>
        <Grid item xs={6}>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            {hasErrors.title && <Alert message={hasErrors.title} />}
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl>
            <FormLabel>Date</FormLabel>
            <input
              type="datetime-local"
              name="date"
              step={"900"}
              value={formData.date}
              onChange={handleChange}
            />
            {hasErrors.date && <Alert message={hasErrors.date} />}
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Switch checked={allDay} onChange={() => setAllDay(!allDay)} />
            }
            label={"All Day"}
          />
        </Grid>
        {/* Conditionally display time if AllDay is unchecked */}
        {!allDay && (
          // <>
          //   <Grid item xs={6}>
          //     <FormControl>
          //       <FormLabel>Start Time</FormLabel>
          //       <input
          //         type="time"
          //         name="startTime"
          //         onChange={handleChange}
          //         step="900"
          //         value={formData.startTime}
          //       />
          //     </FormControl>
          //     {/* <FormControl>
          //       <FormLabel>End Time</FormLabel>
          //       <Input
          //         type="time"
          //         name="time"
          //         value={formData.endTime}
          //         onChange={handleChange}
          //       />
          //     </FormControl> */}
          //   </Grid>
          // </>
          <></>
        )}
        {/* <Grid item xs={6}>
          <FormControl>
            <FormLabel>Notes</FormLabel>
            <Input
              type="textarea"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </FormControl>
        </Grid> */}
        <Grid item xs={6}>
          <ColorSelect
            value={formData.color}
            handleChange={handleChange}
            name="color"
          />
          {/* <select name="color" onChange={handleChange} value={formData.color}>
            <option value={"red"}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    height: "1em",
                    width: "1em",
                    background: "red",
                    marginRight: ".5em",
                  }}
                />
                <span>Red</span>
              </div>
            </option>
            <option value="yellow">
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    height: "1em",
                    width: "1em",
                    background: "yellow",
                    marginRight: ".5em",
                  }}
                />
                <span>Yellow</span>
              </div>
            </option>
          </select> */}
        </Grid>
        <Grid item xs={6}>
          <Button type="submit">Create Reminder</Button>
        </Grid>
      </Grid>
    </form>
  );
}
