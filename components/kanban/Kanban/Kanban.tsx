import { Theme } from "@material-ui/core";
import { CSSProperties, makeStyles } from "@material-ui/styles";
import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Board } from "./Board";
import { KANBAN_COLUMN_WIDTH } from "./constants";
import { useKanbanActions } from "./useKanbanActions";

interface Props {}

const styles = (global: Theme) => ({
  skeletonContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  } as CSSProperties,
});

const useStyles = makeStyles(styles);

const Kanban = (props: Props) => {
  const classes = useStyles();

  const isLoading = false;

  const kanbanLanes = "mock";
  const {
    onDragEnd,
    onDeleteLane,
    onAddColumn,
    onEditLaneTitle,
    onEditLaneColor,
  } = useKanbanActions([nonAssignLane, ...kanbanLanes]);

  return (
    <>
      {isLoading && kanbanLanes ? (
        <SkeletonTheme baseColor="#f3f3f3" highlightColor="#ecebeb">
          <Skeleton
            containerClassName={classes.skeletonContainer}
            count={30}
            height={200}
            width={KANBAN_COLUMN_WIDTH}
            style={{ marginLeft: "1rem", marginBottom: "1rem" }}
          />
        </SkeletonTheme>
      ) : (
        <Board
          kanbanLanes={kanbanLanes}
          isLoading={isLoading}
          isFetching={isFetching}
          onEditLaneTitle={onEditLaneTitle}
          onDragEnd={onDragEnd}
          getItemsByIds={getItemsByIds}
          onAddColumn={onAddColumn}
          onEditLaneColor={onEditLaneColor}
          onDeleteLane={onDeleteLane}
        />
      )}
    </>
  );
};

export default Kanban;
