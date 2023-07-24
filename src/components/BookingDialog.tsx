import React, { Component } from 'react'
import {Warning28Regular, iconFilledClassName, iconRegularClassName, FluentIconsProps} from '@fluentui/react-icons'
import { makeStyles, shorthands,Label,Input,Textarea,Button, Dialog, DialogSurface, DialogBody, DialogTitle, DialogContent, DialogActions, DialogTrigger } from '@fluentui/react-components';

interface props {
    title?: string,
    subtitle?: string,
    type?: any,
    submit?: (data: any) => void,
    children: any,
    submitLabel?: string,
}
const iconStyleProps: FluentIconsProps = {
    primaryFill: 'red',
    className: 'iconClass',
};
  
const useIconStyles = makeStyles({
    icon: {
        ':hover': {
        [`& .${iconFilledClassName}`]: {
            display: 'none',
        },
        [`& .${iconRegularClassName}`]: {
            display: 'inline',
        },
        },
    },
    alignCenter: {
        textAlign: 'center'
    }
});
const BookingDialog:React.FC<props> = ({title, subtitle, type, submit, children, submitLabel}) => {
    const styles = useIconStyles();

    return (
    <Dialog open={true}>
        <DialogSurface>
            <DialogBody>
                <DialogTitle className={styles.alignCenter}>
                        {type === 'warning' && 
                            <Warning28Regular aria-label="An AccessTime icon" {...iconStyleProps}/>
                        }
                    <br/>{title}<br/>
                </DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
                <DialogActions>
                {submit && <Button appearance="primary" onClick={(e:any) => {
                    e.preventDefault();
                    submit(e)}}>{submitLabel}</Button> }
                </DialogActions>
            </DialogBody>
        </DialogSurface>
    </Dialog>
    )
}

export default BookingDialog;
