import { useCallback } from "react";
import { DropResult } from "react-beautiful-dnd";

const NEW_COLUMN_TEMP_ID = -2;
const GREEN_COLOR = 20;

export const useKanbanActions = (kanbanLanes: any) => {
  const getUpdatedLanesViews = (
    lists: any,
    oldLaneIndex: number,
    newLaneIndex: number
  ): any => {
    const newLists = lists;
    const [removed] = newLists.splice(oldLaneIndex, 1);
    newLists.splice(newLaneIndex, 0, removed);

    return newLists.map((l, i) => ({ ...l, order: i }));
  };

  const onMoveItemBetweenLanes = useCallback(
    (
      itemId: string,
      fromLaneId: number,
      toLaneId: number,
      oldCardIndex: number,
      newCardIndex: number
    ) => {
      if (fromLaneId === toLaneId) return;
      let rules: any = [];

      const destList = kanbanLanes.find((el) => el.id === toLaneId);
      const sourceList = kanbanLanes.find((el) => el.id === fromLaneId);

      if (destList && sourceList) {
      }
    []
  );

  const onMoveCardInLane = useCallback(
    (
      itemId: string,
      laneId: number,
      oldCardIndex: number,
      newCardIndex: number
    ) => {
    },
    []
  );

  const onMoveLane = useCallback(
    (oldLaneIndex: number, newLaneIndex: number) => {

      kanbanView.itemLists = getUpdatedLanesViews(
        kanbanView.itemLists,
        oldLaneIndex,
        newLaneIndex
      );
      const updatedItemLists = kanbanView.itemLists.map((el, i) => ({
        ...el,
        order: i,
      }));

      const collection = {
        id: collectionID,
        collectionUid: collectionUid,
        collectionViews: [
          {
            id: kanbanView.id,
            itemLists: updatedItemLists,
          },
        ],
      };
    },
    []
  );


  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination, type } = result;
      if (!destination) {
        return;
      }

      switch (type) {
        case "COLUMN":
          if (source.index !== destination.index) {
            onMoveLane(source.index, destination.index);
          }
          break;
        case "CARD":
          if (source.droppableId !== destination.droppableId) {
            onMoveItemBetweenLanes(
              result.draggableId,
              Number(source.droppableId),
              Number(destination.droppableId),
              source.index,
              destination.index
            );
          } else if (source.index !== destination.index) {
            onMoveCardInLane(
              result.draggableId,
              Number(source.droppableId),
              source.index,
              destination.index
            );
          }
          const lane = kanbanLanes.find(
            (l) => l.id + "" === destination.droppableId
          );
          if (
            source.droppableId !== destination.droppableId &&
            !!lane &&
            lane.listColor === GREEN_COLOR
          ) {
            const element = window.document.getElementById(
              `list_header_green_id_${destination.droppableId}`
            );

            if (!element) return;
          }

          break;
        default:
          break;
      }
    },
    [
      onMoveCardInLane,
      onMoveItemBetweenLanes,
      onMoveLane,
      kanbanLanes,
    ]
  );

  return {
    onMoveItemBetweenLanes,
    onMoveCardInLane,
    onDragEnd,
  };
};
