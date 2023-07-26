import { Button, InputBase, makeStyles, Theme } from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import AddIcon from "@material-ui/icons/Add";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { KANBAN_COLUMN_WIDTH, MARGIN_RIGHT_COLUMN } from "./constants";

interface Props {}

const styles = (theme: Theme) => ({
  addColumnContainer: {
    minWidth: KANBAN_COLUMN_WIDTH,
    marginRight: MARGIN_RIGHT_COLUMN,
  } as CSSProperties,
  addColumnOpened: {
    boxSizing: "border-box",
    padding: 12,
    height: 96,
    background: "#FFFFFF",
    border: "1px solid #D7D7DB",
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
  } as CSSProperties,
  input: {
    paddingLeft: 6,
    backgroundColor: "#EDEDF0",
    width: 200,
    height: 28,
    borderRadius: 4,
    color: "#B1B1B3",
    fontFamily: "Rubik",
    fontSize: 12,
    lineHeight: "16px",
    letterSpacing: 0.4,
  } as CSSProperties,
  inputInner: {
    padding: 0,
  },
  buttons: {
    marginTop: 16,
    display: "flex",
    flexDirection: "row",
  } as CSSProperties,
  add: {
    backgroundColor: "#7B4FF0",
    color: "#FFFFFF",
    fontFamily: "Rubik",
    fontSize: 12,
    lineHeight: "16px",
    letterSpacing: 0.4,
    "&:hover": {
      backgroundColor: "rgba(123, 79, 240, 0.9)",
      boxShadow: "0px 1px 3px rgba(12, 12, 13, 0.08)",
    },
  } as CSSProperties,
  cancel: {
    marginLeft: 12,
    backgroundColor: "#FFFFFF",
    color: "#7B4FF0",
    fontFamily: "Rubik",
    fontSize: 12,
    lineHeight: "16px",
    letterSpacing: 0.4,
    border: "1px solid #7B4FF0",
    "&:hover": {
      backgroundColor: "rgba(123, 79, 240, 0.16)",
    },
  } as CSSProperties,

  addColumnClosed: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    backgroundColor: "#F9F9FA",
    border: "1px solid #EDEDF0",
    borderRadius: 8,
    color: "#0C0C0D",
    "&:hover": {
      color: theme.palette.primary[400],
      boxShadow: "0px 0px 4px rgba(12, 12, 13, 0.06)",
      backgroundColor: theme.palette.primary[50],
      border: "1px solid #D7D7DB",
      borderRadius: 8,
    },
  } as CSSProperties,
  addColumnText: {
    fontSize: 12,
    lineHeight: "16px",
    fontFamily: "Rubik",
    fontWeight: 500,
    letterSpacing: 0.4,

    // '&:hover': {
    //     color: theme.palette.primary[400],
    // }
  } as CSSProperties,
  addCardIcon: {
    width: 16,
    height: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 4,
  } as CSSProperties,
  icon: {
    color: theme.palette.primary[50],
    // backgroundColor: theme.palette.primary[50],
    fill: theme.palette.primary[50],
    stroke: theme.palette.primary[50],
  },
});

const useStyles = makeStyles(styles);

export const AddColumn = (props: Props) => {
  const [t] = useTranslation("i18_newKanban");

  const classes = useStyles();
  const [title, setTitle] = useState<string>("");
  const [isOpenedAddColumn, setIsOpenedAddColumn] = useState<boolean>(false);

  const edit = (e: any) => {
    setTitle(e.target.value);
  };

  const handleAddColumn = () => {
    setTitle("");
    setIsOpenedAddColumn(false);
  };

  const onKeyDown = (e: any) => {
    const enterKeyCode = 13;
    if (e.keyCode === enterKeyCode) {
      handleAddColumn();
    }
  };

  const open = () => {
    setIsOpenedAddColumn(true);
  };

  const cancel = () => {
    setTitle("");
    setIsOpenedAddColumn(false);
  };

  return (
    <div className={classes.addColumnContainer}>
      {isOpenedAddColumn ? (
        <div className={classes.addColumnOpened}>
          <InputBase
            autoFocus={false} //important
            classes={{
              root: classes.input,
              input: classes.inputInner,
            }}
            placeholder={`${t("Enter column name")}...`}
            value={title}
            onChange={edit}
            onKeyDown={onKeyDown}
          />
          <div className={classes.buttons}>
            <Button
              disabled={!title}
              onClick={handleAddColumn}
              className={classes.add}
              variant="contained"
            >
              {t("Add")}
            </Button>
            <Button
              onClick={cancel}
              className={classes.cancel}
              variant="contained"
            >
              {t("Cancel")}
            </Button>
          </div>
        </div>
      ) : (
        <div className={classes.addColumnClosed} onClick={open}>
          <div className={classes.addCardIcon}>
            <AddIcon fontSize="inherit" />
          </div>
          <div className={classes.addColumnText}>{t("Add new")}</div>
        </div>
      )}
    </div>
  );
};
