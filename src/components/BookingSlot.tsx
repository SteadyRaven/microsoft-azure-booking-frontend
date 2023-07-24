/* eslint-disable react/jsx-no-comment-textnodes */

import { makeStyles, } from '@fluentui/react-components';
import { mergeStyles } from '@uifabric/styling';
import {createRef, useEffect, useState} from 'react';
import { filterStaffAvailibility, getHourSlots, getServiceBuffer, getSchedulingPolicy, exchangeHourInDate, getSlotsFromAvailibility, getSlotsFromAvailibilityAllStaff } from '../utils/hourSlots';
import { setJSONStorage, setStringStorage } from '../utils/storageAction';

const useStyles = makeStyles({
    
    slotArea:{
        marginTop:'10px',
        width:'83%',
        height:'260px',
        overflowY: 'scroll' 
    },
    slot:{
        paddingTop:'10px',
        paddingLeft:'15px',
        paddingRight: '15px',
        paddingBottom: '10px',    
    },
    selectedSlot: {
        backgroundColor: '#c3c3c3',
    }
  });

interface props {
    date: any,
    staffId: any,
    service: any,
    staffAvailibility: any, 
    selectSlot: (slot: any) => void
}

const BookingSlot: React.FC<props> = ({staffId, service, date, staffAvailibility, selectSlot}) => {
    const styles = useStyles();
    const hoverStyle = mergeStyles({
        selectors: {
          ':hover': {
            backgroundColor: 'lightgray',
            cursor: 'pointer',
          },
        },
        height:'inherit',
      });

    const slotArea = mergeStyles('ms-Grid-row', styles.slotArea);
    const slotItem = mergeStyles('ms-Grid-col ms-lg4', styles.slot);

    const [slots, setSlots] = useState<any[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<any>();
    useEffect(() => {
        let slot = null;
        setSelectedSlot(slot);
        selectSlot(slot);
        if(!service?.id || service?.id ==='' || !staffId || staffId === '')
            return;
        // test services on local
        
        const schedulingPolicy = getSchedulingPolicy(service);
        const interval = schedulingPolicy?.slotInterval;
        const serviceBuffer = getServiceBuffer(service);
        const minLeadTime = schedulingPolicy?.minLeadTime;
        let slos: any[] = [];

        if(staffId !== 'anyone') {
            slos = getSlotsFromAvailibility(staffAvailibility, staffId, interval, serviceBuffer, minLeadTime, date);            
        }
        if(staffId == 'anyone') {
            slos = getSlotsFromAvailibilityAllStaff(staffAvailibility, interval, serviceBuffer, minLeadTime, date);
        }
        // const availible = filterStaffAvailibility(staffId, date);
        
        // if(availible && availible.length > 0) {


        //     let slos: any[] = [];
        //     availible.map((item: any) => {
        //         let tempDate = new Date(date);
        //         const sTime = staffId == 'anyone'? exchangeHourInDate(tempDate, item.startTime): item?.startDateTime?.dateTime;
        //         const eTime = staffId == 'anyone'? exchangeHourInDate(date, item.endTime): item?.endDateTime?.dateTime;
        //         const isUTC = staffId == 'anyone' ? false: true;
        //         const slot1 = getHourSlots(sTime, eTime, interval.toString(), isUTC, serviceBuffer, minLeadTime);
                
        //         slot1.map((item : any) => slos.push(item));
        //     })  
        //     setSlots(slos);
        // }
        // else
        //     setSlots([]);
        setSlots(slos);
        
    }, [staffId, date]);

    const _onClickSlot = (slot: string) => {
        setJSONStorage('slot', slot);
        setSelectedSlot(slot);
        selectSlot(slot);
    }    
    
    return(
        <>
            <div className={slotArea}>
                {slots && slots.length > 0 && slots.map((slot: any, index: number) => (
                    <div key={index}>
                        <div className={slotItem} 
                        onClick={(e) => {
                            e.preventDefault();

                            _onClickSlot(slot);
                        }}>
                            <div className={selectedSlot===slot?styles.selectedSlot: hoverStyle}>
                                {slot?.slot}
                            </div>
                        </div>
                    </div>
                ))}
                {(!slots || slots.length === 0) && 
                    <h4>No Slots are here....</h4>
                }

            </div>            
        </>
    )
}

export default BookingSlot;