import React, { useEffect, useState } from 'react';
import './App.css';

import { SkeletonItem, makeStyles, shorthands } from '@fluentui/react-components';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { initialize } from './storage/book';

import ServiceItemSkeletonRow from './components/skeletons/serviceItemSkeleton';
import Skeleton2 from './components/skeletons/Skeleton2';
import FormBodySkeleton from './components/skeletons/Form/FormBodySkeleton';
import FormHeaderSkeleton from './components/skeletons/Form/FormHeader';
import Header from './components/BookingHeader';
import Services from './components/Services';
import BookingCalendar from './components/BookingCalendar';
import BookingStaff from './components/BookintStaff';
import Form from './components/BookingForm';
import Footer from './components/BookingFooter';
import { createAppointment } from './service/BookingServices';
import { getQuestionsForService } from './utils/questions';
import { getJSONStorage, setJSONStorage } from './utils/storageAction';
import BookingDialog from './components/BookingDialog';
// import { mergeTimeZones } from './utils/hourSlots';
import { MailUnread48Regular, FluentIconsProps } from '@fluentui/react-icons';
import { getStaffAvailibilityFromStaffAndDate } from './utils/hourSlots';
initializeIcons();

const iconStyleProps: FluentIconsProps = {
  primaryFill: '#fd8383',
  className: 'iconClass',
};

const useMainStyles = makeStyles({
  root: {
    backgroundColor: '#ffffff',
    maxWidth: '1024px',    
    minWidth: '320px',
    marginTop: '0px',
    marginRight: 'auto',
    marginBottom: '0px',
    marginLeft: 'auto',
    textAlign: 'center',
    fontFamily: ' WF-Segoe-UI-Semilight, Segoe UI Semilight, Segoe WP Semilight, Segoe UI, Tahoma, Arial, Sans-Serif',
    color: '#333333'
  },
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
  servicesHeaderRow: {
    width: "100%",
    alignItems: "center",
    display: "grid",
    paddingTop: "20px",
    paddingBottom: "50px",
    position: "relative",
    ...shorthands.gap("2px"),
    gridTemplateColumns: "40% 20% 40%"
  },
  itemsAlignCenter: {
    textAlign: 'center'
  }
});

function App() {
  // mergeTimeZones();
  const styles = useMainStyles();
  const [loading, setLoading] = useState<any>(true);
  const [service, setService] = useState('');
  const [date, setDate] = useState<any>();
  const [staff, setStaff] = useState<any>();
  const [staffs, setStaffs] = useState<any[]>([]);
  const [slot, setSlot] = useState<any>();
  const[showThankU, setShowThankU] = useState(false);
  const [bookingError, setBookingError] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<any>();

  useEffect(() => {
    initialize();
    setLoading(false);
  }, [])

  useEffect(() => {   
  }, [loading]);

  const selectService = (service1: any) => {
    async function fetchQuestions() {
      if(!service1 || !service1?.id)
          return;
      
      let questionlist: any = await getQuestionsForService(service1);
      setJSONStorage('questionList', questionlist);
      if(!questionlist || questionlist.length === 0) {
        setAnswers([]);
        return;
      }
      let ans: any = [];
      // eslint-disable-next-line array-callback-return
      questionlist?.map((question: any) => {
          ans[question?.displayName] = '';
      })
      setAnswers(ans);
      setQuestions(questionlist);
    }

    async function fetchMembers() {
      let myStaffs = getJSONStorage('staffMembers');

      if(!service1 ) {
          return;
      }

      const staffIdsInSelectedService = service1?.staffMemberIds;
      // filter staffs from staffMembers
      const filterMembers = myStaffs?.filter((staff:any) => {
          if (staffIdsInSelectedService?.includes(staff?.id)) {
              return staff;
          }
      });
      setStaffs(filterMembers);

    }
    fetchMembers();
    fetchQuestions();
    setService(service1);
  }
  const _onChangeAnswers = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    setAnswers((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  }
  const sendAppointment = async (formData: any, answers: any) => {
    setLoading(true);
    const bookingResult: any = await createAppointment(service, date, staff, slot, formData, questions, answers);
    setLoading(false);
    if(bookingResult?.id && bookingResult.id.length > 0) {
        setShowThankU(true);
    }
    else {
        setBookingError(bookingResult?.error?.message);
    }
  } 

  return (
    <div className="App">
      <div className={styles.root}>
        <Header />
            {!loading &&
              <Services selectService={selectService} />
            }
            {loading &&
              <div> 
                  <div className={styles.servicesHeaderRow} >
                    <div></div>
                    <SkeletonItem shape="rectangle" size={32} />
                    <div></div>
                  </div>                            
                  <ServiceItemSkeletonRow />
                  <ServiceItemSkeletonRow />
                  <ServiceItemSkeletonRow />
                  <ServiceItemSkeletonRow />
                  <ServiceItemSkeletonRow />
              </div>
            }
            {!loading && <div className={styles.titleArea}>
                <h1 id='timeTitle' className={styles.title}>
                  {slot? slot?.slot:''}&nbsp;
                  {date? date.toLocaleDateString():'Select Date'}&nbsp;
                  {staff? 'with ' + staff?.displayName:''}&nbsp;
                </h1>
                <div className="ms-Grid" >
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-lg1"></div>
                        {/* <BookingCalendar service={service} selectDate={setDate} staff={staff} slot={slot}/> */}
                        <BookingStaff service={service} setStaff={setStaff} selectDate={setDate} setSlot={setSlot} filterMembers={staffs} />
                    </div>  
                </div>
            </div>}
            {loading && 
              <Skeleton2 />
            }          
            {!loading && <Form service={service} date={date} staff={staff} slot={slot} questions={questions} answers={answers} sendAppointment={sendAppointment} changeAnswer={_onChangeAnswers}/>}
            {loading && 
            <div>
              <FormHeaderSkeleton/>
              <FormBodySkeleton />
            </div>
            }
        <Footer/>
        {showThankU && 
            <BookingDialog submit={(e) => setShowThankU(false)} title="Thank you for booking with us!" submitLabel="OK">
                <div className={styles.itemsAlignCenter}>
                    <p >
                    You will get a confirmation message in email shortly
                    </p>
                    <MailUnread48Regular aria-label="An AccessTime icon" {...iconStyleProps} className={styles.itemsAlignCenter}/>
                </div>
            </BookingDialog>
        }

        {bookingError && 
            <BookingDialog submit={(e) => setBookingError(null)} title="Sorry, Booking Failed." type="warning" submitLabel="Confirm">
                <div className={styles.itemsAlignCenter}>
                    <p >
                        {bookingError}
                    </p>
                </div>
            </BookingDialog>
        }
      </div>
    </div>
  );
}

export default App;