import { InputBase, makeStyles, Theme } from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import React, { useCallback, useState } from "react";
import LaneMenu from "./laneMenu/LaneMenu";

const styles = (theme: Theme) => ({
  columnHeaderContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 4,
    marginTop: 4,
  } as CSSProperties,
  statusColor: {
    width: 4,
    height: 16,
    minWidth: 4,
    borderRadius: 2,
  } as CSSProperties,
  columnHeaderContent: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  } as CSSProperties,
  columnTitle: {
    maxWidth: 110,
    display: "inline",
    marginLeft: 8,
    fontFamily: "Rubik",
    fontWeight: 500,
    fontSize: 12,
    lineHeight: "16px",
    color: "#0C0C0D",
    letterSpacing: 0.4,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  } as CSSProperties,
  columnTitleWrap: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  } as CSSProperties,
  columnLength: {
    display: "inline",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 4,
    textAlign: "center",
    padding: "0px 4px",
    marginLeft: 4,
  } as CSSProperties,
  columnLengthText: {
    display: "inline",
    fontFamily: "Rubik",
    fontWeight: 400,
    fontSize: 12,
    lineHeight: "16px",

    letterSpacing: 0.4,
    color: "#0C0C0D",
  } as CSSProperties,
  rightContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  } as CSSProperties,
  moreIcon: {
    width: 16,
    height: 16,
    marginLeft: 15,
  },
  input: {
    height: 15,
    minWidth: 30,
    marginLeft: 8,
    fontFamily: "Rubik",
    fontWeight: 500,
    fontSize: 12,
    lineHeight: "16px",
    letterSpacing: 0.4,
    color: "#0C0C0D",
  } as CSSProperties,
  inputInner: {
    padding: 0,
    fontFamily: "Rubik",
    fontWeight: 500,
    fontSize: 12,
    lineHeight: "16px",
    letterSpacing: 0.4,
    color: "#0C0C0D",
  } as CSSProperties,
  flagIcon: {
    fontSize: 16,
  },
  confetti: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
  },
});

interface Props {
  isEmptyList: boolean;
  isFocused: boolean;
  statusColorStyles: any;
  laneDocs: any;
  kanbanLane: any;
}
const useStyles = makeStyles(styles);
const RulesFlagIcon = <></>;
export const ColumnHeader = (props: Props) => {
  const { isEmptyList, isFocused, kanbanLane, laneDocs, statusColorStyles } =
    props;
  const classes = useStyles();
  const [columnTitle, setColumnTitle] = useState(kanbanLane.title);

  const onChangeTitleHandler = (e: any) => {
    setColumnTitle(e.target.value);
  };

  const _onPressTitle = useCallback(() => {}, [kanbanLane, columnTitle]);

  const onKeyDownHadnler = (event: any) => {
    if (event.key === "Enter") {
      event.stopPropagation();
      _onPressTitle();
      return false;
    }
    return true;
  };

  const listHeaderGreenProps =
    kanbanLane.listColor !== 20
      ? {}
      : {
          id: `list_header_green_id_${kanbanLane.id}`,
        };

  return (
    <div
      style={{ marginBottom: isEmptyList ? 30 : 8 }}
      className={`${classes.columnHeaderContainer} `}
    >
      <div className={`${classes.confetti} `} {...listHeaderGreenProps}>
        <div className={`${classes.columnHeaderContent} `}>
          <div className={`${classes.columnTitleWrap} `}>
            <div
              style={statusColorStyles}
              className={`${classes.statusColor} `}
            />
            {isFocused ? (
              <InputBase
                autoFocus
                classes={{
                  root: classes.input,
                  input: classes.inputInner,
                }}
                className={``}
                value={columnTitle}
                onChange={onChangeTitleHandler}
                onBlur={_onPressTitle}
                onKeyDown={onKeyDownHadnler}
              />
            ) : (
              <div
                className={`${classes.columnTitle} `}
              >{`${kanbanLane.title}`}</div>
            )}
            {!isFocused && (
              <div className={`${classes.columnLength} `}>
                <div className={`${classes.columnLengthText} `}>
                  {laneDocs.length}
                </div>
              </div>
            )}
          </div>
          <div className={`${classes.rightContainer} `}>
            {kanbanLane.rules && kanbanLane.rules.length ? (
              <RulesFlagIcon className={``} />
            ) : null}
            <LaneMenu kanbanLane={kanbanLane} />
          </div>
        </div>
      </div>
    </div>
  );
};
