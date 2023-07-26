sortBy = (sortBy, sortOrder) => {

    this.setState({ sortBy: sortBy, sortOrder: sortOrder })
    this.props.mixpanelTrack("Lane - Sort by", { field: sortBy })

}

sortCards = (a, b) => {

    const { sortBy, sortOrder } = this.state

    if (sortOrder === 'desc') {
        if (a.doc[sortBy] > b.doc[sortBy]) {
            return -1
        } else if (a.doc[sortBy] < b.doc[sortBy]) {
            return 1
        }
        return 0
    } else {
        if (a.doc[sortBy] < b.doc[sortBy]) {
            return -1
        } else if (a.doc[sortBy] > b.doc[sortBy]) {
            return 1
        }
        return 0
    }
}

getMenuItems = () => {
    const { t, groupInfo: { collectionGroup }, userData, sortBy } = this.props;

    const isAdmin = collectionGroup && collectionGroup.adminIds && collectionGroup.adminIds.includes(userData.profileData.id)
    const adminMenuItems = isAdmin ? this.getAdminMenuItems() : []
    const sortMenu = {
        key: 'sortItemsInLane',
        caption: t('Sort by'),
        subMenuItems: [
            { key: "byTimestampDesc", caption: `${t("Date created (newest first)")}`, onClick: () => sortBy("docTimestamp", "desc") },
            { key: "byTimestampAsc", caption: `${t("Date created (oldest first)")}`, onClick: () => sortBy("docTimestamp", "asc") },
            { key: "byDueDateDesc", caption: `${t("Due date (closest first)")}`, onClick: () => sortBy("dueDateUTC", "desc") },
            { key: "byDueDateAsc", caption: `${t("Due date (farthest first)")}`, onClick: () => sortBy("dueDateUTC", "asc") },
            { key: "byNameAsc", caption: `${t("Name (alphbetically)")}`, onClick: () => sortBy("title", "asc") },
            { key: "byRatingAsc", caption: `${t("Rating (highest first)")}`, onClick: () => sortBy("rating", "desc") },
        ]
    }


    return [
        sortMenu,
        ...adminMenuItems,
        { key: "delete", caption: t('Delete'), onClick: this.onDeleteLane },
    ]
}