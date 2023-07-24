import React, {useState, useRef, useEffect} from 'react';
import { Calendar } from '@fluentui/react';
import { makeStyles } from '@fluentui/react-components';
import { initRestDates } from '../storage/calendar';
import { getSchedulingPolicy } from '../utils/hourSlots';


const useStyles = makeStyles({
    calendar:{
        textSize:'20px',
        fontSize:'20px',
    }
});

interface props {
    service: any,
    staff: any, 
    slot: any,
    selectDate: (date: any) => void 
}

const BookingCalendar: React.FC<props> = ({service, staff, slot, selectDate}) => {

    const today = new Date();

    const styles = useStyles();

    const [restrictDates, setRestrictDates] = useState<any[]>([]);
    const [month, setMonth] = useState(new Date().getMonth());
    const [selectedDate, setSelectedDate] = useState(today);
    const [maxDate, setMaxDate] = useState(today);
    const calendarRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if(!service || service === '')
            return ;
        const initRestrictDates = initRestDates(service);
        const maxLeadTime = getSchedulingPolicy(service).maxLeadTime;
        const currentDate = new Date();
        const maxTime = currentDate.getTime() + (maxLeadTime * 60 * 1000);
        const futureDate = new Date(maxTime);
        setMaxDate(futureDate);

        setRestrictDates(initRestrictDates);
        let initDate = new Date();
        if(initRestrictDates && initRestrictDates?.length > 0)
            initRestrictDates.map((date:any) => {    
                if(date.getMonth() === initDate.getMonth() && date.getDate() == initDate.getDate()){
                    initDate.setDate(initDate.getDate() + 1);
                }
            })
        setSelectedDate(initDate);
        selectDate(initDate);
        const calendarElement = calendarRef.current;
        const buttons = calendarElement?.querySelectorAll('button');
        buttons?.forEach((button:any) => {
            button.classList.add('button-font-customized');
        });

    }, [service])

    useEffect(() => {
        if(staff && staff?.id && staff?.id != 'anyone') {
            const initRestrictDates = initRestDates(service, staff);
            setRestrictDates(initRestrictDates);
        }
    }, [staff])
    const handleSelectDate = (date:any) => {
        setSelectedDate(date);
        selectDate(date);
    };

    return (
        <div className="ms-Grid-col ms-lg5">
            <Calendar showMonthPickerAsOverlay={true}
                    showGoToToday={false}
                    minDate={today}
                    maxDate={maxDate}
                    
                    onSelectDate={handleSelectDate}
                    // highlightCurrentMonth={true}
                    highlightSelectedMonth={true}
                    today={selectedDate?selectedDate: new Date()}
                    value={selectedDate}
                    restrictedDates={restrictDates}
                    // calendarMonthProps={}
                    // styles={customCalendarStyles}
                    id="calendar"
                    ref={calendarRef}
                    // size="'large'"
                    className={styles.calendar} />
            
            {/* <fluent-calendar></fluent-calendar> */}
        </div>  
  );
}

export default BookingCalendar;