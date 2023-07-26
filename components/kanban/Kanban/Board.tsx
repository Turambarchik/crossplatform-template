import { Theme } from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { makeStyles } from "@material-ui/styles";
import React, { useCallback, useRef } from "react";
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
  DropResult,
} from "react-beautiful-dnd";
import { AddColumn } from "./AddColumn";
import { ALL_HEIGHT_EXCEPT_COLUMN } from "./constants";
import { DraggableColumnWrapper } from "./DraggableColumnWrapper";

interface Props {
  kanbanLanes: any;
  isLoading: boolean;
  isFetching: boolean;
  onDragEnd: (result: DropResult) => void;
}
const styles = (global: Theme) => ({
  container: {} as CSSProperties,
  board: {
    backgroundColor: "#F9F9FA",
    overflowX: "visible",
    height: "100%",
  } as CSSProperties,
  boardContainer: {
    paddingTop: 30,
    marginTop: -30,
    height: "100%",
    display: "flex",
    flexDirection: "row",
    overflowX: "hidden",
    maxHeight: "calc(100vh - " + ALL_HEIGHT_EXCEPT_COLUMN + "px)",
    overflowY: "hidden",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  } as CSSProperties,
  placeholder: {
    position: "absolute",
    backgroundColor: "rgba(123, 79, 240, 0.04)",
    border: "1px dashed #D7D7DB",
    borderRadius: 8,
  } as CSSProperties,
  column: {} as CSSProperties,
  avatarSkeleton: {
    width: "100%",
    height: "100%",
    lineHeight: 1,
  },
  confettiZone: {
    width: "inherit",
    height: "inherit",
    position: "absolute",
    left: 0,
    top: 0,
    display: "none",
  } as CSSProperties,
});

const useStyles = makeStyles(styles);

type MouseMoveL = (this: Window, ev: WindowEventMap["mousemove"]) => any;
type MouseUpL = (this: Window, ev: WindowEventMap["mouseup"]) => any;
type ClassNameTarget = EventTarget & { className: string };

export const Board = (props: Props) => {
  const { kanbanLanes, onDragEnd } = props;
  const classes = useStyles();
  const startX = useRef(0);
  const startScrollX = useRef(0);

  const renderColumn = useCallback(
    ({ item, index }: { item: any; index: number }) => (
      <div key={item.id} className={classes.column}>
        <DraggableColumnWrapper kanbanLane={item} index={index} />
      </div>
    ),
    [classes.column]
  );

  const isEmptyArea = useCallback((target: ClassNameTarget) => {
    const { className } = target;
    if (typeof className !== "string") return false;
    // if (isDeniedKanbanScrollZone(className ?? "")) return false;
    // return isAllowedKanbanScrollZone(className ?? "");
  }, []);

  const handleMouseMove: MouseMoveL = useCallback(({ clientX }) => {
    const scrollX = startScrollX.current - clientX + startX.current;
    window.scrollTo(scrollX, 0);
    const windowScrollX = window.scrollX;
    if (scrollX === windowScrollX) return;

    startX.current = clientX + windowScrollX - startScrollX.current;
  }, []);

  const handleMouseUp: MouseUpL = useCallback(() => {
    if (!startX.current) return;

    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
    startX.current = 0;
    startScrollX.current = 0;
  }, [handleMouseMove]);

  const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      const target = event.target as ClassNameTarget;

      if (!isEmptyArea(target)) return;
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);

      startX.current = event.clientX;
      startScrollX.current = window.scrollX;
    },
    [handleMouseMove, handleMouseUp, isEmptyArea]
  );

  return (
    <div
      onMouseDown={handleMouseDown}
      className={`${classes.container} ${classes.board}`}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="0" type="COLUMN" direction="horizontal">
          {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
            <>
              {/* index -1 because of NEW Column */}

              <div
                id="board-container"
                ref={provided.innerRef}
                className={classes.boardContainer}
              >
                {kanbanLanes.map((lane, i) =>
                  renderColumn({ item: lane, index: i - 1 })
                )}
                {provided.placeholder}
                <AddColumn />
              </div>
            </>
          )}
        </Droppable>
      </DragDropContext>
      <canvas
        className={classes.confettiZone}
        id="kanban_green_lane_confetti"
      ></canvas>
    </div>
  );
};
