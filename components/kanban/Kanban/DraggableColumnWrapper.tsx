import React from "react";
import { KanbanColumn } from "./KanbanColumn";
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";

interface Props {
  kanbanLane: any;
  index: number;
}

const getLaneStyle = (isDraggingOver: boolean) => {
  if (isDraggingOver) return {};
  return {
    height: "100%",
  };
};

export const DraggableColumnWrapper = React.memo(
  function __DraggableColumnWrapper(props: Props) {
    const { kanbanLane, index } = props;

    return (
      <Draggable
        draggableId={`${kanbanLane.id}`}
        isDragDisabled={kanbanLane.id === -1}
        index={index}
        disableInteractiveElementBlocking
      >
        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            // style={getLaneStyle(snapshot.isDragging)}
          >
            <KanbanColumn
              dragHandleProps={provided.dragHandleProps}
              isDragging={snapshot.isDragging}
              kanbanLane={kanbanLane}
            />
          </div>
        )}
      </Draggable>
    );
  }
);
