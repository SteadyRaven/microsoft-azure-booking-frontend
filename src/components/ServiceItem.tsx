import { Button, makeStyles } from '@fluentui/react-components';
import { Icon } from '@fluentui/react/lib/Icon';
import { mergeStyles } from '@uifabric/styling';
import { GlobePerson24Regular, Info28Filled, iconFilledClassName, iconRegularClassName, FluentIconsProps } from '@fluentui/react-icons'
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
});
const useStyles = makeStyles({
   
    serviceContent:{
        textAlign:'left',
    },
    serviceIcon:{
        marginTop:'12px',
        fontSize:'24px'
    },
    serviceMainName:{
        fontSize: '20px',
        marginTop:'5px',
        marginBottom:'5px'
    },
    serviceDefaultPrice:{
        fontSize: '14px',
        marginTop:'3px',
        marginBottom:'3px'
    },
});

interface props {
    service: any
}

const ServiceItem: React.FC<props> = ({service}) => {
    const styles = useStyles();
    const iconStyles = useIconStyles();

    const serviceContentClass = mergeStyles('ms-Grid-col ms-lg8', styles.serviceContent);
    const serviceIconClass = mergeStyles('ms-Grid-col ms-lg2', styles.serviceIcon);
    const serviceMainName = mergeStyles('ms-Grid-row', styles.serviceMainName);
    const serviceDefaultPrice = mergeStyles('ms-Grid-row', styles.serviceDefaultPrice);

    return(
        <>
         <div>
            <div className='ms-Grid-row'>
                <div className='ms-Grid-col ms-lg2'></div>
                <div className={serviceContentClass}>
                    <div className={serviceMainName}>
                        <span >{service?.displayName}</span>
                    </div>
                    <div className={serviceDefaultPrice}>
                        <span>{service?.defaultDuration}</span>
                    </div>
                    <div className={serviceDefaultPrice}>
                        <span>{service?.defaultPrice && `$${service?.defaultPrice}`}&nbsp;{service?.defaultPriceType}</span>
                    </div>
                </div>
                <div className={serviceIconClass}>
                    {/* <div className={iconStyles.icon}> */}
                        {service?.isLocationOnline && <GlobePerson24Regular />}
                        <Button icon={<Info28Filled />} appearance='transparent'/>            
                    {/* </div> */}
                </div>

            </div>
        </div>
        </>
    )
}

export default ServiceItem;