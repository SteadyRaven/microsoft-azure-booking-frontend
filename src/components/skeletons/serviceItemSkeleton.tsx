import React from 'react'
import { SkeletonItem, makeStyles, shorthands } from '@fluentui/react-components'

const useStyles = makeStyles({
    firstRow: {
        alignItems: "center",
        display: "grid",
        position: "relative",
        paddingBottom: "2px",
        ...shorthands.gap("10px"),
        gridTemplateColumns: "80% min-content"
    },
    secondThirdRow: {
        alignItems: "center",
        display: "grid",
        paddingBottom: "10px",
        position: "relative",
        ...shorthands.gap("70px"),
        gridTemplateColumns: "45% 45%"
    },
    serviceContent: {
        borderTopWidth: "1px",
        borderTopStyle: "solid",
        borderTopColor: "#eaeaea",
        marginLeft: '50px',
        marginRight:"2px",
        textAlign: "left"
    },
    serviceDefaultPrice: {
        paddingBottom: "2px",
        marginBottom: "3px"
      },
})

const ServiceItemSkeletonRow = () => {

    const styles = useStyles();

    return (
    <div className={styles.secondThirdRow}>
        <div className={styles.serviceContent}>
            <div className={styles.firstRow}>
                <SkeletonItem shape="rectangle" size={16} />
                <SkeletonItem shape="circle" size={24} />
            </div>
            <div className={styles.serviceDefaultPrice}>
                <SkeletonItem style={{ width: "20%" }} size={16} />
            </div>
            <div className={styles.serviceDefaultPrice}>
                <SkeletonItem style={{ width: "40%" }} size={16} />
            </div>
        </div>
        <div className={styles.serviceContent}>
            <div className={styles.firstRow}>
                <SkeletonItem shape="rectangle" size={16} />
                <SkeletonItem shape="circle" size={24} />
            </div>
            <div className={styles.serviceDefaultPrice}>
                <SkeletonItem style={{ width: "20%" }} size={16} />
            </div>
            <div className={styles.serviceDefaultPrice}>
                <SkeletonItem style={{ width: "40%" }} size={16} />
            </div>
        </div>
    </div>
  )
}

export default ServiceItemSkeletonRow
