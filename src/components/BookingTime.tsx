
import React, { useState, useEffect, useRef  } from "react";
import { makeStyles, shorthands,Select} from '@fluentui/react-components';

// import { fluentCalendar, provideFluentDesignSystem } from '@fluentui/web-components';


import { Calendar,ICalendarStyles ,mergeStyles } from '@fluentui/react';
import { initRestDates } from "../storage/calendar";

// provideFluentDesignSystem().register(fluentCalendar());
  

const useStyles = makeStyles({
    title: {
        
        fontSize:'18px',
        fontFamily: '"WF-Segoe-UI-Light", "Segoe UI Light", "Segoe WP Light", "Segoe UI", Tahoma, Arial, Sans-Serif',
        fontWeight: 'normal',
        opacity: '0.9',
        display: 'block',
    },
    titleArea:{
        ...shorthands.padding('16px', '0px', '16px','0px'),
        boxShadow: '0 -2px 6px 0 rgba(0, 0, 0, 0.1)'
    },
    staffSelectTitle:{
        textAlign:'left',
        fontSize:'18px',
        marginTop:'20px'
    },
    staffSelect:{
        marginTop:'20px',
        width:'80%'    
    },
    calendar:{
        textSize:'20px',
        fontSize:'20px',
    }
   
  });

interface prop {
    service : any
}

const TimeArea: React.FC<prop> = ({service}) => {
    const styles = useStyles();
    const staffSelectTitle = mergeStyles('ms-Grid-row', styles.staffSelectTitle);

    const today = new Date();
    
    const [restrictDates, setRestrictDates] = useState<any[]>([]);
    const [selectedDate, setSelectedDate] = useState(today);

    const handleSelectDate = (date:any) => {
        setSelectedDate(date);
      };
    const calendarRef = useRef<HTMLDivElement>(null);
    useEffect(()=>{
        
        // const initRestrictDates: any = initRestDates();
        // setRestrictDates(initRestrictDates);

        const calendarElement = calendarRef.current;
        const buttons = calendarElement?.querySelectorAll('button');
            buttons?.forEach((button:any) => {
            button.classList.add('button-font-customized');
        });
        
        
    }, [service])
   
    return(
        <>
            <div>
                <div className={styles.titleArea}>
                    <h1 id='timeTitle' className={styles.title}>Select time</h1>
                    <div className="ms-Grid" >
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-lg1"></div>
                            <div className="ms-Grid-col ms-lg5" >
                                <Calendar showMonthPickerAsOverlay={true}
                                        showGoToToday={false} 
                                        minDate={today}
                                        onSelectDate={handleSelectDate}
                                        today={selectedDate}
                                        value={selectedDate}
                                        restrictedDates={restrictDates}
                                        // styles={customCalendarStyles}
                                        id="calendar"
                                        ref={calendarRef}
                                        // size="'large'"
                                        className={styles.calendar}                                       
                                        />
                                {/* <fluent-calendar></fluent-calendar> */}
                            </div>                   
                            <div className="ms-Grid-col ms-lg6">
                                <div className={staffSelectTitle}>
                                    <span> Select staff (optional)</span>
                                    <Select appearance="outline" className={styles.staffSelect} >
                                        <option>Red</option>
                                        <option>Green</option>
                                        <option>Blue</option>
                                    </Select>
                                </div>
                               {/* <Slot staffId={staff}/> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

   
}

export default TimeArea;

