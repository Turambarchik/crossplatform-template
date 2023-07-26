import { IconButton, Menu, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { MouseEvent as ReactMouseEvent, useState } from "react";

const styles = (theme: Theme) => ({
  icon: {
    color: theme.palette.grey[500],
  },
  menu: {
    width: 255,
  },
});

const useStyles = makeStyles(styles);

interface Props {
  kanbanLane: any;
}

export const LaneMenu = (props: Props) => {
  const classes = useStyles();
  const { kanbanLane } = props;
  const MoreIcon = <></>;
  const [anchor, setAnchor] = useState<Element | null>(null);

  const handleOpen = (e: ReactMouseEvent) => {
    setAnchor(e.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <>
      <div className={``}>
        <IconButton className={``} onClick={handleOpen}>
          <MoreIcon className={``} />
        </IconButton>
        {anchor && (
          <Menu
            classes={{ paper: classes.menu }}
            anchorEl={anchor}
            open={!!anchor}
            onClose={handleClose}
            elevation={8}
          >
            <></>
          </Menu>
        )}
      </div>
    </>
  );
};

export default LaneMenu;
