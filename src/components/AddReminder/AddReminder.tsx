import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import {
  WithStyles,
  withStyles,
  createStyles,
  Theme,
} from "@material-ui/core/styles";
import { Button, FormControl, FormLabel, Grid, Input } from "@material-ui/core";
import ColorSelect from "./ColorSelector";

const styles = (theme: Theme) =>
  createStyles({
    addReminderFormContainer: {
      minHeight: "250px",
      marginTop: "10px",
      display: "flex",
      flexDirection: "column",
    },
    closeButton: {
      position: "absolute",
      right: "10px",
      top: "10px",
    },
  });

interface Props extends WithStyles<typeof styles> {
  isOpen: boolean;
  onClose: () => void;
}

const AddReminder = (props: Props) => {
  const { classes, isOpen, onClose } = props;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">
        Add Reminder
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider light />
      <DialogContent className={classes.addReminderFormContainer}>
        <Typography>Add Your Reminder Here</Typography>
        <Grid container>
          <form>
            <Grid item>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl>
                <FormLabel>Date</FormLabel>
                <Input type="date" />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl>
                <FormLabel>Time</FormLabel>
                <Input type="time" />
              </FormControl>
            </Grid>
            <ColorSelect />
            <Grid item>
              <Button type="submit">Create Reminder</Button>
            </Grid>
          </form>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default withStyles(styles)(AddReminder);
