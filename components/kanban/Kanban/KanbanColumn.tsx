import { makeStyles, Theme } from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Draggable,
  DraggableProvided,
  DraggableRubric,
  DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";
import { VariableSizeList } from "react-window";
import { CardWrapper } from "./card/DraggableCardWrapper";
import { ColumnHeader } from "./ColumnHeader";
import {
  KANBAN_CARD_WIDTH,
  marginBetweenCards,
  MARGIN_RIGHT_COLUMN,
} from "./constants";

const DashboardIcon = <></>;
const AddIcon = <></>;

const styles = (theme: Theme) => ({
  emptyCard: {
    width: KANBAN_CARD_WIDTH,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginRight: 8,
  } as CSSProperties,
  statusColor: {
    borderRadius: 5,
    width: 10,
    height: 10,
    borderWidth: 2,
  } as CSSProperties,
  cardsContainer: {
    height: "100%",
    overflow: "auto",
    paddingRight: 8,
    "&::-webkit-scrollbar": {
      visibility: "hidden",
      width: 6,
      display: "block",
      backgroundColor: "#D7D7DB",
      borderRadius: 16,
    },
    "&::-webkit-scrollbar-thumb": {
      visibility: "hidden",
      opacity: 0.5,
      backgroundColor: "#B1B1B3",
      borderRadius: 16,
    },
    "&:hover": {
      "&::-webkit-scrollbar": {
        visibility: "visible",
      },
      "&::-webkit-scrollbar-thumb": {
        visibility: "visible",
      },
    },
  } as CSSProperties,
  placeholder: {
    position: "absolute",
    backgroundColor: "rgba(123, 79, 240, 0.04)",
    border: "1px dashed #D7D7DB",
    borderRadius: 8,
  } as CSSProperties,

  noCardsText: {
    marginTop: 6,
    fontFamily: "Rubik",
    fontSize: 14,
    lineHeight: "20px",
    letterSpacing: 0.246063,
    color: "#737373",
  },
  addCardContainer: {
    zIndex: 100,
    position: "absolute",
  } as CSSProperties,
  addCardContainerFixed: {
    marginLeft: -3,
    zIndex: 100,
    bottom: 0,
    position: "absolute",
    width: 226,
    height: 60,
    backgroundColor: "rgba(249, 249, 250,0.95)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as CSSProperties,
  addCard: {
    width: KANBAN_CARD_WIDTH,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 32,
    borderRadius: 8,
    backgroundColor: "#F9F9FA",
    border: "1px solid #EDEDF0",
    color: "#4A4A4F",
    "&:hover": {
      boxShadow: "0px 0px 4px rgba(12, 12, 13, 0.06)",
      background:
        "linear-gradient(0deg, rgba(123, 79, 240, 0.08), rgba(123, 79, 240, 0.08)), #FFFFFF",
      color: theme.palette.primary[400],
    },
  } as CSSProperties,
  addCardText: {
    display: "flex",
    flexDirection: "row",
    fontFamily: "Rubik",
    fontSize: 12,
    lineHeight: "16px",
    letterSpacing: 0.4,
    color: "#4A4A4F",
  } as CSSProperties,
  addCardIcon: {
    width: 5,
    height: 5,
    marginBottom: 12,
  } as CSSProperties,
});

interface Props {
  dragHandleProps: any;
  isDragging: boolean;
  kanbanLane: any;
}
const useStyles = makeStyles(styles);

export const __KanbanColumn = (props: Props) => {
  const { isDragging, kanbanLane, dragHandleProps } = props;

  const listRef: any = useRef();
  const cardsRef: any = useRef();
  const mounted = useRef(false);
  const rowHeights: any = useRef({});

  const classes = useStyles();

  const [laneDocs, setLaneDocs] = useState<Document[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [sortOrder, setOrder] = useState<any>("asc");
  const [sortOption, setOption] = useState<any>("");
  const [isColumnHover, setIsColumnHover] = useState<boolean>(false);
  const [cardsHeight, setCardsHeight] = useState<number>(0);
  const { items: laneItems } = kanbanLane;

  const onFocusToggle = () => {
    setIsFocused((prev) => !prev);
  };

  const getRowHeight = useCallback(
    (
      index: number,
      isVirtual?: boolean,
      useCalculate?: boolean,
      doc?: Document
    ) => {
      if (index === laneDocs.length - 1) {
        return rowHeights.current[index] + 80 || 160;
      }
      return rowHeights.current[index] + marginBetweenCards || 160;
    },
    [rowHeights, laneDocs.length]
  );

  const setRowHeight = useCallback(
    (index: any, size: any) => {
      listRef.current.resetAfterIndex(0);
      rowHeights.current[index] = size;
    },
    [rowHeights, listRef]
  );

  const sortBy = (sortOption: any, sortOrder: any) => {
    setOption(sortOption);
    setOrder(sortOrder);
  };

  const _onAddCard = useCallback(() => {}, [kanbanLane]);

  useEffect(() => {
    if (items.length * 100 > window.innerHeight) {
      setCardsHeight(window.innerHeight - 150);
    } else {
      setTimeout(() => {
        cardsRef.current && setCardsHeight(cardsRef.current.clientHeight + 50);
      }, 0);
    }
  }, [sortOption, sortOrder]);

  const statusColorStyles = useMemo(() => {
    const backgroundColor = kanbanLane.listColor === 0 ? "#F0F3FF" : blue;

    return {
      backgroundColor,
    };
  }, [kanbanLane]);

  const renderEmptyCard = (isDraggingOver: boolean) =>
    !isDraggingOver && laneDocs.length === 0 ? (
      <div className={classes.emptyCard}>
        <DashboardIcon />
        <div className={classes.noCardsText}>{t("No cards")}</div>
      </div>
    ) : null;

  const getListStyle = (
    isDragginOverColumn: boolean,
    isColumnHover: boolean,
    isDraggingColumn: boolean,
    height: number,
    isCardsContainerHeightSmallerKanban: boolean
  ) => ({
    width: KANBAN_CARD_WIDTH,
    marginRight: MARGIN_RIGHT_COLUMN,
    height: height + 40,
    borderRadius: 12,
    padding: 8,
    paddingRight: isCardsContainerHeightSmallerKanban ? 8 : 10,
    paddingTop: 0,
    background: isDragginOverColumn
      ? "linear-gradient(180deg, rgba(123, 79, 240, 0.08) 0%, rgba(123, 79, 240, 0) 100%)"
      : "linear-gradient(180deg, #EDEDF0 0%, rgba(237, 237, 240, 0) 100%)",
    border: isColumnHover ? "1px solid #D7D7DB" : "1px solid transparent",
    borderBottom: isColumnHover ? "1px solid #D7D7DB" : "0px solid transparent",
    transform: isDraggingColumn ? "rotate(-3deg)" : "none",
  });

  const renderRowItem = useCallback(
    (props) => {
      const { index, style } = props;

      const item = laneDocs[index];
      if (!laneDocs[index]) {
        return null;
      }

      return (
        <Draggable draggableId={item.docId} index={index}>
          {(
            provided: DraggableProvided,
            snapshot: DraggableStateSnapshot,
            rubric: DraggableRubric
          ) => (
            <CardWrapper
              setRowHeight={setRowHeight}
              style={style}
              provided={provided}
              snapshot={snapshot}
              item={item}
              index={index}
            />
          )}
        </Draggable>
      );
    },
    [laneDocs, setRowHeight]
  );

  const onKeyDown = () => {};
  const otherProps = {
    ...(isFocused ? {} : { ...dragHandleProps }),
    onKeyDown: onKeyDown,
  };

  return (
    <>
      <Droppable
        droppableId={`${kanbanLane.id}`}
        mode="virtual"
        type="CARD"
        renderClone={(provided, snapshot, rubric) => (
          <CardWrapper
            setRowHeight={setRowHeight}
            item={laneDocs[rubric.source.index]}
            index={rubric.source.index}
            provided={provided}
            snapshot={snapshot}
            style={null}
          />
        )}
      >
        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => {
          const itemCount = snapshot.isUsingPlaceholder
            ? laneDocs.length + 1
            : laneDocs.length;
          const isCardsContainerHeightSmallerKanban =
            cardsHeight < window.innerHeight - 150;
          const emptyCardsContainerHeight = 140;
          const lastCardPadding = 80;
          return (
            <div
              {...otherProps}
              style={getListStyle(
                snapshot.isDraggingOver,
                isColumnHover,
                isDragging,
                itemCount === 0
                  ? emptyCardsContainerHeight
                  : isCardsContainerHeightSmallerKanban
                  ? cardsHeight - 10 - lastCardPadding
                  : isCardsContainerHeightSmallerKanban
                  ? cardsHeight - 30
                  : window.innerHeight - 105,
                isCardsContainerHeightSmallerKanban
              )}
              onMouseEnter={() => setIsColumnHover(true)}
              onMouseLeave={() => setIsColumnHover(false)}
            >
              <ColumnHeader
                isEmptyList={itemCount === 0}
                isFocused={isFocused}
                laneDocs={laneDocs}
                kanbanLane={kanbanLane}
                statusColorStyles={statusColorStyles}
              />
              {renderEmptyCard(snapshot.isDraggingOver)}
              {isColumnHover && (
                <div
                  className={
                    isCardsContainerHeightSmallerKanban
                      ? classes.addCardContainer
                      : classes.addCardContainerFixed
                  }
                  style={{
                    marginTop:
                      itemCount === 0
                        ? 22
                        : isCardsContainerHeightSmallerKanban
                        ? cardsHeight - 45 - lastCardPadding
                        : 0,
                  }}
                >
                  <div className={classes.addCard} onClick={_onAddCard}>
                    <div className={classes.addCardIcon}>
                      <AddIcon fontSize="inherit" />
                    </div>
                  </div>
                </div>
              )}
              <VariableSizeList
                {...provided.droppableProps}
                className={classes.cardsContainer}
                height={window.innerHeight - 105}
                itemCount={itemCount}
                itemSize={getRowHeight}
                width={KANBAN_CARD_WIDTH}
                outerRef={provided.innerRef}
                itemData={laneDocs}
                innerRef={cardsRef}
                ref={listRef}
              >
                {renderRowItem}
              </VariableSizeList>
            </div>
          );
        }}
      </Droppable>
    </>
  );
};

export const KanbanColumn = __KanbanColumn;
