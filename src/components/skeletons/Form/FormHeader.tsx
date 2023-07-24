import React from 'react'
import { SkeletonItem, makeStyles, shorthands } from '@fluentui/react-components'

const useStyles = makeStyles({
    header: {
        alignItems: "center",
        display: "grid",
        paddingBottom: "20px",
        position: "relative",
        ...shorthands.gap('1px'),
        gridTemplateColumns: "35% 30% 35%"
    }
})

const FormHeaderSkeleton = () => {
    const style = useStyles();
    return (
    <div className={style.header}>
        <div></div>
        <SkeletonItem size={32} shape='rectangle'/>
        <div></div>
    </div>
  )
}

export default FormHeaderSkeleton;