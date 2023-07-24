import React from 'react'
import { SkeletonItem, makeStyles, shorthands } from '@fluentui/react-components'

const useStyles = makeStyles({
    calendarHeaderRow: {
        width: "60%",
        alignItems: "center",
        display: "grid",
        paddingBottom: "15px",
        position: "relative",
        ...shorthands.gap('1px'),
        gridTemplateColumns: "30% 39% 14% 14%"
      },
      dateRow: {
        width: "60%",
        alignItems: "center",
        display: "grid",
        paddingBottom: "px",
        marginBottom: "5px",
        position: "relative",
        gridTemplateColumns: "14% 14% 14% 14% 14% 14% 14%"
      },
})

const CalendarSkeleton = () => {
    const styles = useStyles();

    return (
    <div>
        <div className={styles.calendarHeaderRow} >
            <SkeletonItem shape="rectangle" size={16} />
            <div></div>
            <SkeletonItem shape="circle" size={24} />
            <SkeletonItem shape="circle" size={24} />
        </div>        
        <div className={styles.dateRow}>
            <SkeletonItem shape="circle" size={24} />
            <SkeletonItem size={24} shape="circle"/>
            <SkeletonItem size={24} shape="circle" />
            <SkeletonItem size={24} shape="circle"/>
            <SkeletonItem size={24} shape="circle"/>
            <SkeletonItem size={24} shape="circle"/>
            <SkeletonItem size={24} shape="circle"/>
        </div>
        <div className={styles.dateRow}>
            <SkeletonItem shape="circle" size={24} />
            <SkeletonItem size={24} shape="circle"/>
            <SkeletonItem size={24} shape="circle" />
            <SkeletonItem size={24} shape="circle"/>
            <SkeletonItem size={24} shape="circle"/>
            <SkeletonItem size={24} shape="circle"/>
            <SkeletonItem size={24} shape="circle"/>
        </div>
        <div className={styles.dateRow}>
            <SkeletonItem shape="circle" size={24} />
            <SkeletonItem size={24} shape="circle"/>
            <SkeletonItem size={24} shape="circle" />
            <SkeletonItem size={24} shape="circle"/>
            <SkeletonItem size={24} shape="circle"/>
            <SkeletonItem size={24} shape="circle"/>
            <SkeletonItem size={24} shape="circle"/>
        </div>
        <div className={styles.dateRow}>
            <SkeletonItem shape="circle" size={24} />
            <SkeletonItem size={24} shape="circle"/>
            <SkeletonItem size={24} shape="circle" />
            <SkeletonItem size={24} shape="circle"/>
            <SkeletonItem size={24} shape="circle"/>
            <SkeletonItem size={24} shape="circle"/>
            <SkeletonItem size={24} shape="circle"/>
        </div>
        <div className={styles.dateRow}>
            <SkeletonItem shape="circle" size={24} />
            <SkeletonItem size={24} shape="circle"/>
            <SkeletonItem size={24} shape="circle" />
            <SkeletonItem size={24} shape="circle"/>
            <SkeletonItem size={24} shape="circle"/>
            <SkeletonItem size={24} shape="circle"/>
            <SkeletonItem size={24} shape="circle"/>
        </div>
        <div className={styles.dateRow}>
            <SkeletonItem shape="circle" size={24} />
            <SkeletonItem size={24} shape="circle"/>
            <SkeletonItem size={24} shape="circle" />
            <SkeletonItem size={24} shape="circle"/>
            <SkeletonItem size={24} shape="circle"/>
            <SkeletonItem size={24} shape="circle"/>
            <SkeletonItem size={24} shape="circle"/>
        </div>
    </div>
  )
}

export default CalendarSkeleton
