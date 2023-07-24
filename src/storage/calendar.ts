import { formGetDurationInSeconds, getDaysInMonth, getRestDates } from "../utils/getDurationAndCurrency";
import { getJSONStorage } from "../utils/storageAction";
import { text_overwrite } from '../constants/constant';
/**
 * api to init Rest Dates from default Business Days and sort
 * @returns initial rest Dates
 */
export function initRestDates(service: any, staff: any = undefined) {
    if(service === null || service === "") 
        return [];

    let defaultBusinessDays = getJSONStorage('defaultBusinessHours'); 

    if(staff && staff?.id && staff?.id !== 'anyone') {
        if(!staff?.useBusinessHours)
            defaultBusinessDays = staff?.workingHours;
    }
    if(defaultBusinessDays === null || defaultBusinessDays?.length === 0)
        return [];
    if(defaultBusinessDays?.length > 0) {
        const restDays =  defaultBusinessDays.filter((workDay:any)=>{
            if(workDay?.timeSlots?.length < 1){
                return workDay;
            }
        });        
        const restDates = getRestDates(restDays);
        const year = new Date().getFullYear();
        const month = new Date().getMonth() + 1;
        const daysInMonth = getDaysInMonth(year, month);
        let restricDates:any[] = [];
        for(let i=-7; i <= 0; i++){
            const date = new Date(year,month-2,i).getDay();
            restDates.map((restDate:number)=> {
                if(restDate == date){
                    const d1 = new Date();
                    d1.setMonth(new Date().getMonth() - 1);
                    d1.setDate(new Date(year,month,i).getDate());
                    restricDates.push(d1);
                }
            })
        }
        for(let i=1; i<=daysInMonth; i++){
            const date = new Date(year,month-1,i).getDay();
            restDates.map((restDate:number)=> {
                if(restDate == date){
                    const d1 = new Date();
                    d1.setDate(new Date(year,month-1,i).getDate());
                    restricDates.push(d1);
                }
            })
        }
        for(let i=1; i <= 7; i++){
            const date = new Date(year,month,i).getDay();
            restDates.map((restDate:number)=> {
                if(restDate == date){
                    const d1 = new Date();
                    d1.setMonth(new Date().getMonth() + 1);
                    d1.setDate(new Date(year,month,i).getDate());
                    restricDates.push(d1);
                }
            })
        }

        const minTime = service.schedulingPolicy?.minimumLeadTime? service.schedulingPolicy?.minimumLeadTime: getJSONStorage('businessInformation')?.schedulingPolicy?.minimumLeadTime;
        // add from today to today + minLeadTime into the restrictDate
        const minleadtime = formGetDurationInSeconds(minTime)/(24 * 60);
        let leadTime = new Date();
        const today = new Date().getDate();
        for(var i = 1; i <= minleadtime; i ++) {
            let leadDate = new Date();
            leadDate.setDate(today - 1 + i);
            if(!restricDates.includes(leadTime)) {
                restricDates.push(leadDate);
            }
            leadTime.setDate(today + i);
        }
    
        return sortDateTime(restricDates);
    }
    else
        return [];
}
/**
 * 
 * @param dateList restrictDates(array)
 * @returns sorted RestrictDates(array)
 */
export function sortDateTime(dateList: any) {
    if(!dateList || dateList.length === 0)
        return [];

    const tempList = dateList.map((date: any) => {
        return date.toISOString();
    });
    tempList.sort();
    const result = tempList.map((date: any, index: number) => {
        return new Date(date);
    })

    return result;
}

// export function initSelectedDate(restricDates: any) {
//     let initDate = new Date();

//     restricDates.map((date: any) => {
//         if(initDate.getDate() === date.getDate()) {
//             initDate
//         }
//     })
// }