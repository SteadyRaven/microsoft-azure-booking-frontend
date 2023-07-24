import React from 'react'
import CalendarSkeleton from './CalendarSkeleton'
import { SkeletonItem, makeStyles, shorthands } from '@fluentui/react-components'
const useStyles = makeStyles({
    calendarHeaderRow: {
        width: "100%",
        alignItems: "center",
        display: "grid",
        paddingBottom: "50px",
        position: "relative",
        ...shorthands.gap("2px"),
        gridTemplateColumns: "40% 20% 40%"
      },
    secondThirdRow: {
        alignItems: "center",
        display: "grid",
        paddingBottom: "10px",
        position: "relative",
        ...shorthands.gap("30px"),
        gridTemplateColumns: "45% 45%"
    },
    
})
const Skeleton2 = () => {
    const styles = useStyles();
  return (
    <>
      <div className={styles.calendarHeaderRow} >
            <div></div>
            <SkeletonItem shape="rectangle" size={32} />
            <div></div>
    </div>
    <div className={styles.secondThirdRow}>
        
        <div style={{paddingLeft: "100px"}}>
            <CalendarSkeleton />
        </div>
                
        <div  style={{paddingBottom:"200px", marginRight: "30px"}}>
            <SkeletonItem shape="rectangle" size={24} />
        </div>   

    </div>

    </>
  )
}

export default Skeleton2;