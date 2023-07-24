/**
 * booking services.
 */
import { httpservice } from "./httpservice";
import { constants, initializeData } from "../constants/constant";
import { formGetDurationInSeconds } from "../utils/getDurationAndCurrency";
import moment from "moment-timezone";

const businessid = initializeData.businessid;
const token = initializeData?.accessToken;

export function intializa(data: { accessToken: string; businessid: string; }) {
    if (data.accessToken && data.businessid) {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('businessId', data.businessid);
    }
}

export function getBusinessData() {
    // solutions/
    return httpservice()
        .get(`${constants.API.BOOKING_BUSINESSES_URL}/${businessid}`)
        .then(function ({ data }: any) {            
            console.log('get business', data);
            return data;
        })
        .catch(function (error: { data: any; }) {
            return error.data;
    });
}

export function getBookingServices() {
    return httpservice()
        .get(`${constants.API.BOOKING_BUSINESSES_URL}/${businessid}/${constants.API.SERVICES}`)
        .then((res:any) => {
            return res?.data?.value;
        })
        .catch(function (error: { data: any; }) {
            return error.data;
        });
}

export function getCustomQuestion(serviceId: string) {
    return httpservice()
        .get(`${constants.API.BOOKING_BUSINESSES_URL}/${businessid}/${constants.API.SERVICES}/${serviceId}`)
        .then(function ({ data }: any) {
            console.log('get getCustomQuestion', data.customQuestions);            
            return data.customQuestions;
        })
        .catch(function (error: { data: any; }) {
            return error.data;
    });
}

export function getStaffMembers() {
    return httpservice()
        .get(`${constants.API.BOOKING_BUSINESSES_URL}/${businessid}/${constants.API.STAFF_MEMBERS}`)
        .then(function ({ data }: any) {
            return data.value;
        })
        .catch(function (error: { data: any; }) {
            return error.data;
    });
}

export async function getStaffAvailibility (payload: any) {
    const url = 'https://graph.microsoft.com/v1.0/solutions/bookingBusinesses/'+ businessid + '/microsoft.graph.getStaffAvailability';

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Host': window.location.host // Calculate the host dynamically
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
    });

    const result = await response.json();
    return result?.value;
}

export function getTimeSlots(payload:any) {
    console.log("payload in service", payload);
    return httpservice()
        .get(`${constants.API.BOOKING_BUSINESSES_URL}/${businessid}/${constants.API.STAFF_MEMBERS}`)
        .then(function ({ data }: any) {
            return data.value;
        })
        .catch(function (error: { data: any; }) {
            return error.data;
    });
}

export function getAllQuestions() {
    return httpservice()
        .get(`${constants.API.BOOKING_BUSINESSES_URL}/${businessid}/${constants.API.QUESTIONS}`)
        .then(function ({ data }: any) {
            return data.value;
        })
        .catch(function (error: { data: any; }) {
            return error.data;
    });
}

export async function createAppointment(service: any, date: any, staff: any, slot: any, formData: any, questions: any, answers: any) {

    let timeZone = initializeData.timezone;
    let staffIds:any = [];
    if(staff?.id == 'anyone') {
        staffIds = service?.staffMemberIds;
    }
    else
        staffIds.push(staff?.id);
    let serviceInterval = formGetDurationInSeconds(service?.defaultDuration);
    let endTime = moment.tz(slot?.startTime, timeZone).tz(timeZone).add(serviceInterval, 'minute');
    let endDateTime = endTime.format();
    let questionAndAnswers: any = [];

    if(questions && questions.length > 0) {
        questions.map((question: any, index: number) => {
            let item = {
                "questionId": "3bc6fde0-4ad3-445d-ab17-0fc15dba0774",
                    "question": question?.displayName,
                    "answerInputType": question?.answerInputType,
                    "answerOptions": question?.answerOptions,
                    "isRequired": true,
                    "answer": answers[question?.displayName],
                    "selectedOptions": []
            }
            questionAndAnswers.push(item);
        })
    }
    const payload = {
        "@odata.type": "#microsoft.graph.bookingAppointment",
        "customerTimeZone": initializeData.timezone,
        "postBuffer": service?.postBuffer,
        "preBuffer": service?.preBuffer,
        "endDateTime": {
            "@odata.type": "#microsoft.graph.dateTimeTimeZone",
            "dateTime": endDateTime,
            "timeZone": "UTC"
        },
        "startDateTime": {
            "@odata.type": "#microsoft.graph.dateTimeTimeZone",
            "dateTime": new Date(slot?.startTime).toISOString(),
            "timeZone": "UTC"
        },
        "price": parseFloat(service?.defaultPrice),
        "priceType@odata.type": "#microsoft.graph.bookingPriceType",
        "priceType": service?.defaultPriceType,
        "customers": [
            {
                "@odata.type": "microsoft.graph.bookingCustomerInformation",
                "emailAddress": formData?.email,
                "name": formData?.name,
                "notes": formData?.notes,
                "location": {
                    "@odata.type": "microsoft.graph.location",
                    "address": {
                        "city": formData?.address,
                        "countryOrRegion": formData?.address,
                        "postalCode": "string",
                        "state": formData?.address,
                        "street": formData?.address
                    },
                },
                "phone": formData?.phone,
                "timeZone": initializeData?.timezone,
                "customQuestionAnswers": questionAndAnswers
            }
          ],
          "serviceId": service?.id,
          "serviceName": service?.displayName,
          "staffMemberIds": staffIds
    }

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Host': window.location.host // Calculate the host dynamically
    };

    const url = 'https://graph.microsoft.com/v1.0/solutions/bookingBusinesses/'+ businessid + '/appointments';

    const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
    });
    
    const result = await response.json();
    return result;
}

export function getCalenderAppointment({ startDateTime, endDateTime, filterType, filterName, selectQuery }: any) {
    // console.log("payload in service", filterType, filterName, selectQuery);
    const filter = `${filterType} eq '${filterName}'`
    
    const url = `${constants.API.BOOKING_BUSINESSES_URL}/${businessid}/${constants.API.CALENDAR_VIEW}?startDateTime=${startDateTime}&endDateTime=${endDateTime}`
    return httpservice()
        .get(url)
        .then(function ({ data }: any) {
            return data.value;
        })
        .catch(function (error: { data: any; }) {
            return error.data;
    });
}