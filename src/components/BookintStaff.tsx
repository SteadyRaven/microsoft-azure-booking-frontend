import React, {useState, useEffect, useRef} from 'react';
import { makeStyles, Select} from '@fluentui/react-components';
import { Calendar, mergeStyles } from '@fluentui/react';
import { getJSONStorage } from '../utils/storageAction';
import { getSchedulingPolicy, getStaffAvailibilityFromStaffAndDate } from '../utils/hourSlots';
import BookingSlot from './BookingSlot';
import { initRestDates } from '../storage/calendar';

const useStyles = makeStyles({
    staffSelectTitle:{
        textAlign:'left',
        fontSize:'18px',
        // marginTop:'10px'
    },
    staffSelect:{
        marginTop:'20px',
        width:'80%'    
    },
    calendar:{
        textSize:'20px',
        fontSize:'20px',
    }
})

interface props {
    service: any,
    filterMembers: any,
    setStaff: (staff: any) => void,
    setSlot: (slot: any) => void,
    selectDate: (date: any) => void 
}

const BookingStaff: React.FC<props> = ({service, filterMembers, setStaff, setSlot, selectDate}) => {
    const today = new Date();
    const calendarRef = useRef<HTMLDivElement>(null);

    const styles = useStyles();
    
    const [maxDate, setMaxDate] = useState(today);
    const [restrictDates, setRestrictDates] = useState<any[]>([]);
    const [month, setMonth] = useState(new Date().getMonth());
    const [selectedDate, setSelectedDate] = useState(today);
    const [staffAvailibility, setStaffAvailibility] = useState<any[]>([]); 

    const staffSelectTitle = mergeStyles('ms-Grid-row', styles.staffSelectTitle);
    
    const [staffs, setStaffs] = useState<any[]>([]);

    const [staffId, setStaffId] = useState<any>();

    const [loading, setLoading] = useState(true);
    useEffect(() =>{ 
        setLoading(true);
        if(!service?.id || service?.id === '')
            return;
        async function initStaffs() {
            debugger;
            if(!service ) {
                return;
            }
            if(!service.staffMemberIds || service.staffMemberIds.length === 0) {
                setStaffId('anyone');
            }
            
            if(staffs.length > 0 && selectedDate) {
                // set staffs availibility in localStorage
                let availibility = await getStaffAvailibilityFromStaffAndDate(staffs, selectedDate);
                setStaffAvailibility(availibility);
            }

            // init staffs
            let currentStaffs = [{id: 'anyone', displayName: 'Anyone'},...filterMembers] 
            setStaffs(currentStaffs);
            setStaffId('anyone');
            setStaff({id:'anyone', displayName: 'Anyone'});
        }

        // init calendar
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

        initStaffs();
        setLoading(true);
    }, [service, selectedDate]);

    //select staff
    const selectStaff = (e: any) => {
        e.preventDefault();
        let id = e.target.value;
        setStaffId(id);
        const staff = staffs.filter((item: any) => (item.id == id))[0];
        setStaff(staff);
    }

    const handleSelectDate = (date:any) => {
        setSelectedDate(date);
        selectDate(date);
    };
    return (
        <>
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

            <div className="ms-Grid-col ms-lg6">
                <div className={staffSelectTitle}>
                    
                    { staffs && staffs.length > 0 &&  
                    <div>
                        {(!staffId || staffId === '') && <span> Select staff (optional)</span>}

                        <Select appearance="outline" className={styles.staffSelect} onChange={selectStaff} value={staffId}>
                            {staffs?.map((staff: any) => 
                                <option key={staff?.id} value={staff?.id}>{staff?.displayName}</option>
                            )}
                        </Select>
                    </div>}
                    {!staffs || staffs.length === 0 && 
                        <h5>Select Service and then select a date...</h5>
                    }
    
                </div>
                <BookingSlot staffId={staffId} service={service} date={selectedDate} staffAvailibility={staffAvailibility} selectSlot={setSlot}/>
            </div>

        </>
        
    );
}

export default BookingStaff;