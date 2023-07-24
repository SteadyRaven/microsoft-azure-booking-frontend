/**
 * apis relate with slot calculation
 * Author: Kenny
 * created_at: 7/3/2023
 */

import moment from 'moment';
import { formGetDurationInSeconds } from './getDurationAndCurrency';
import { getJSONStorage, setJSONStorage } from './storageAction';
import { getStaffAvailibility } from '../service/BookingServices';
import 'moment-timezone';
import { initializeData } from '../constants/constant';

/**
 * 
 * @param staffs filtered staffs from staffMembers when select a service
 * @param date date: selected date
 */
export const getStaffAvailibilityFromStaffAndDate = async (staffs: any, date: any) => {
    const staffIds = staffs.map((item: any) => {
        return item.id;
    })    
    const selectedDate: any = getTimeStringWithTimeZone(date);

    const payload = {
        staffIds: staffIds,
        startDateTime:{
            dateTime: selectedDate?.startTime,
            timeZone: selectedDate?.timeZone,
        },
        endDateTime:{
            dateTime: selectedDate?.endTime,
            timeZone: selectedDate?.timeZone,
        },
    }
    
    const staffAvailibility = await getStaffAvailibility(payload);

    setJSONStorage('staffAvailibility', staffAvailibility);

    return staffAvailibility;
    // setJSONStorage('staffAvailibility', staffsAvailibilitiesFromStorage);
    
}

/**
 * api to filter availibility of a staff with status === 'availible'
 * @param staffId selected staffId(string)
 * @returns avaliible items (array)
 */
export const filterStaffAvailibility = (staffId: any, date: any) => {
    if(!staffId || staffId === '' )
        return null;

    let staffMembers =  getJSONStorage('staffMembers');
    if(staffId === 'anyone') {
        let businessHours = getJSONStorage('defaultBusinessHours');
        if(!businessHours || businessHours.length === 0) {
            if(staffMembers && staffMembers.length > 0 ) {
                let staff = staffMembers[0];
                    
                businessHours = staff?.workingHours;
            }
        }
        const day = date.getDay();
        if(businessHours && businessHours.length > day) {
            const slot = businessHours[day]?.timeSlots;
            return slot;
        }
    }

    const availibilities = getJSONStorage('staffAvailibility');
    if(availibilities.length > 0) {
        const availibility = availibilities.filter((item: any) => item.staffId === staffId);
        const filteredAvailibilities = availibility[0]?.availabilityItems.filter((item: any) => (item?.status === 'available'))
        return filteredAvailibilities;
    }
    
    return [];
}

/**
 * api to get Time string with timezone from date
 * @param date selected date(Date)
 * @returns DateTime: {startTime, endTime, timeZone}
 */
export const getTimeStringWithTimeZone = (date: any) => {
    
    if(!date) 
        return '';

    // let offset = new Date().getTimezoneOffset();
    let offset = - initializeData.time_diff;
    let sTime = date;
    sTime.setHours(0,0,0,0);
    let startTime = new Date(sTime.getTime() + (offset * 60 * 1000));

    let endTime = new Date(startTime.getTime() + ((23 * 60 * 60 + 59 * 60) * 1000));
    const result = {
        startTime: startTime,
        endTime: endTime,
        timeZone: "UTC"
    };
    
    return result;
}

/**
 * api to get time interval for selected service
 * @param serviceId selected service id
 * @returns service: object
 */
export const getSchedulingPolicy = (service: any) => {
    const defaultDuration = formGetDurationInSeconds(service?.defaultDuration);
    const postbuffer = formGetDurationInSeconds(service?.postBuffer);
    const prebuffer = formGetDurationInSeconds(service?.preBuffer);
    setJSONStorage(`defaultDurationBuffer["${service?.id}"]`, { duration: defaultDuration, prebuffer: prebuffer , postbuffer: postbuffer});
    if(!service?.schedulingPolicy) {
        let defaultBusinessSchedulingPolicy:any = getJSONStorage('defaultBusinessSchedulingPolicy');        
        let minLeadTime = formGetDurationInSeconds(defaultBusinessSchedulingPolicy?.minimumLeadTime);
        if(!defaultBusinessSchedulingPolicy?.minimumLeadTime)
            minLeadTime = 24* 60;
        let interval = formGetDurationInSeconds(defaultBusinessSchedulingPolicy?.timeSlotInterval);
        if(!defaultBusinessSchedulingPolicy?.timeSlotInterval) {
            interval = 1 * 60;
        }
        let maxLeadTime = formGetDurationInSeconds(defaultBusinessSchedulingPolicy?.maximumAdvance);
        if (!defaultBusinessSchedulingPolicy?.maximumAdvance) {
            maxLeadTime = 365 * 24 * 60;
        }

        return {
            minLeadTime: minLeadTime,
            slotInterval: interval,
            maxLeadTime: maxLeadTime
        }
    }

    if (service?.schedulingPolicy?.minimumLeadTime) {
        const minutes = formGetDurationInSeconds(service?.schedulingPolicy?.minimumLeadTime);
        const maxLeadTime = formGetDurationInSeconds(service?.schedulingPolicy?.maximumAdvance) 
        return {
            minLeadTime: minutes,
            slotInterval: formGetDurationInSeconds(service?.schedulingPolicy?.timeSlotInterval),
            maxLeadTime: maxLeadTime
        }
    }
    return {
        minLeadTime: 1440,
        slotInterval: 60,
        maxLeadTime: 365 * 24 * 60
    };

}

/**
 * api to get slots with slotTimeInterval
 * @param slotsStartTime :startTime(string)
 * @param slotsEndTime endTime(string)
 * @param format timeFormat(number)
 * @param slotTimeInterval interval(string)
 * @param isUTC boolean
 * @param bufferObj service buffer Times(any)
 * @returns slots: array  
 */

export const getHourSlots = (slotsStartTime: any, slotsEndTime: string, slotTimeInterval: string, isUTC: boolean, bufferObj: any, minLeadTime: number) => {
    debugger;
    let x = {
        slotInterval: slotTimeInterval,
        openTime: slotsStartTime,
        closeTime: slotsEndTime,
        duration: bufferObj?.duration
    };
    const localeTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    const timeZone = isUTC ? "UTC" : localeTimeZone;

    const nowDateTime = moment.tz(new Date().toISOString(), timeZone).tz(localeTimeZone).add(minLeadTime.toString(), 'minute');
    const endTime = moment.tz(x.closeTime, timeZone).tz(localeTimeZone);
    const timeSlots = [];
    let currentTime = moment.tz(x.openTime, timeZone).tz(localeTimeZone).add(bufferObj?.prebuffer, 'minute');
    let sTime = moment.tz(x.openTime, timeZone).tz(localeTimeZone).add(bufferObj?.prebuffer, 'minute');
    while (currentTime.isBefore(endTime)) {
        currentTime.add((x.duration?x.duration: slotTimeInterval), 'minutes');

        let diff = endTime.diff(currentTime)/(1000 * 60 ) - parseInt(bufferObj?.postbuffer);
        if(diff > 0)
            while( sTime.isSameOrBefore(currentTime)) {
                // eslint-disable-next-line no-mixed-operators
                if(sTime.isSame(currentTime) && diff >= parseInt(slotTimeInterval) || sTime.isBefore(currentTime))
                    if(nowDateTime.isSameOrBefore(sTime))    
                        timeSlots.push({
                            slot: moment(sTime).format("HH mm A"),
                            startTime: moment(sTime).format(),
                            endTime: moment(sTime.add(slotTimeInterval, 'minutes')).format()                        
                    });
                    else{
                        sTime.add(slotTimeInterval, 'minutes');
                    }
                else
                    break;
            }
    }

    return timeSlots;
}
/**
 * 
 * @returns localeTimeZone: string
 */
export const getLocaleTimeZone = () => {
    const date = new Date();
    const offsetInMinutes = date.getTimezoneOffset();
    const hours = Math.floor(Math.abs(offsetInMinutes) / 60);
    const minutes = Math.abs(offsetInMinutes) % 60;
    const localeTimeZone = `GMT${offsetInMinutes < 0 ? '+' : '-'}${hours}:${minutes}`;
    return localeTimeZone;
}

export const getServiceBuffer = (service: any) => {
    if(!service || service === '')
        return null;    

    return {
        prebuffer: formGetDurationInSeconds(service?.preBuffer),
        postbuffer: formGetDurationInSeconds(service?.postBuffer),
        duration: formGetDurationInSeconds(service?.defaultDuration)
    }
}

export const exchangeHourInDate = (date: Date, hours: string) => {
    const time = hours.split('.')[0];
    const hour = time.split(':')[0];
    const minute = time.split(':')[1];
    const second = time.split(':')[2];
    let tempDate = new Date(date);
    tempDate.setHours(parseInt(hour));
    tempDate.setMinutes(parseInt(minute));
    tempDate.setSeconds(parseInt(second));
    return tempDate;
}

export const filterStaffAvailibilityFromList = (staffId: string, availibities: any) => {
    if(availibities.length > 0) {
        const availibility = availibities.filter((item: any) => item.staffId === staffId);
        const filteredAvailibilities = availibility[0]?.availabilityItems.filter((item: any) => (item?.status === 'available'))
        return filteredAvailibilities;
    }
    return [];
}

export const getSlotsFromAvailibility = (staffAvailibility: any, staffId: any, interval: number, serviceBuffer: any, minLeadTime: number, date: any) => {
    let slos: any = [];
    const availible = filterStaffAvailibilityFromList(staffId, staffAvailibility);
    slos = getSlotsFromAvailible(availible, interval, serviceBuffer, minLeadTime, date);    
    
    return slos;
}

export const getSlotsFromAvailibilityAllStaff = (availibilities: any, interval: number, serviceBuffer: any, minLeadTime: number, date: any) => {
    debugger;
    let slots : string[] = [];

    // when staff equals anyone, get all slots from staffAvailibility
    if(availibilities.length > 0) {
        // eslint-disable-next-line array-callback-return
        availibilities.map((staffAvailible: any) => {
            const filteredAvailibilities = staffAvailible?.availabilityItems.filter((item: any) => (item?.status === 'available'))
            const slos = getSlotsFromAvailible(filteredAvailibilities, interval, serviceBuffer, minLeadTime, date);
            slos.map((item : string) => slots.push(item));
        })
    }
    
    // merge slots
    if(slots.length > 0) {
        let uniqueSlots = Array.from(new Set(slots));
        uniqueSlots.sort((a: any, b: any) => {
            let slotA = a.slot.toLowerCase();
            let slotB = b.slot.toLowerCase();
          
            if (slotA < slotB) {
              return -1;
            }
            if (slotA > slotB) {
              return 1;
            }
            return 0;
          });
        
        // Sort the uniqueSlots array in ascending order
        
        return uniqueSlots;    
    }

    return slots;
}

export const getSlotsFromAvailible = (availible: any, interval: number, serviceBuffer: any, minLeadTime: number, date: any ) => {
    let slos:any = [];
    if(availible && availible.length > 0) {

        availible.map((item: any) => {

            // should modify when staffId doesnot equal anyone

            const sTime = item?.startDateTime?.dateTime;
            const eTime = item?.endDateTime?.dateTime;
            const isUTC = true;
            
            const slot1 = getHourSlots(sTime, eTime, interval.toString(), isUTC, serviceBuffer, minLeadTime);
            
            slot1.map((item : any) => slos.push(item));
        })  
    }

    return slos;
}