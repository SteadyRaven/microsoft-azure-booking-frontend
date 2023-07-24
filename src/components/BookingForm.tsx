import { makeStyles, shorthands,Label,Input,Textarea,Button, Dialog, DialogSurface, DialogBody, DialogTitle, DialogContent, DialogActions, DialogTrigger, SkeletonItem } from '@fluentui/react-components';
import { mergeStyles } from '@uifabric/styling';
import QuestionField from './QuestionField';
import React, { useState } from 'react';
import BookingDialog from './BookingDialog';

const useStyles = makeStyles({
    title: {        
        fontSize:'22px',
        fontFamily: '"WF-Segoe-UI-Light", "Segoe UI Light", "Segoe WP Light", "Segoe UI", Tahoma, Arial, Sans-Serif',
        fontWeight: 'bold',
        opacity: '1',
        display: 'block',     
        ...shorthands.margin('6px','20px','36px','20px'),   
        
    },
    titleArea:{
        ...shorthands.padding('16px', '0px', '16px','0px'),
        boxShadow: '0 -2px 6px 0 rgba(0, 0, 0, 0.1)',
    },
    inputField:{
        fontSize:'18px',
        width:'90%',
        ...shorthands.margin('20px','50px','0px','50px')
    },
    label:{
        fontSize:'18px',
        width:'100%',
        marginLeft:'30px',
        marginTop:'10px',
        marginRight:'20px',
        textAlign:'left'
    },
    row:{
        display:'flex'
    },
    textArea:{
        fontSize:'18px',
        width:'90%',
        height:'130px',
        marginLeft:'30px',
        marginTop:'30px',
        marginRight:'20px',
        textAlign:'left'
    },
    buttonArea:{
        marginTop:'50px',
        marginBottom: '50px'
    },
    button:{
        minWidth:'240px',
        lineHeight:'30px',
        fontSize:'18px',
        backgroundColor:'#444791',
        color:'white'
    },
    warningHeader: {
        textAlign: 'center'
    }
});

interface props {
    service: any,
    date: any,
    staff: any,
    slot: any,
    questions: any,
    answers: any,
    changeAnswer: (e: any) => void,
    sendAppointment: (formData: any, answers: any) => void,
}

const Form: React.FC<props> = React.memo(({service,date, staff, slot, questions, answers, sendAppointment, changeAnswer}) => {
    const styles = useStyles();
    const labelClass = mergeStyles('ms-Grid-row', styles.row);
    
    const [errorExist, setErrorExist] = useState<any>();
    const [errorBusinessData, setErrorBusinessData] = useState<any>();
    const [formError, setFormError] = useState<any>();
    // const [questionError, setQuestionError] = useState<any>();

    // const textAreaClass = mergeStyles('ms-Grid-row', styles.textArea);
    const [formData, setFormData] = useState<any>({
        name: '',
        email: '',
        address: '',
        phone: '',
        notes: ''
    });

    const validData0 = () => {
        let error0: any = {}; 
        if(!service || !service?.id)
            error0.service = true;
        if(!date || !date?.getDate())
            error0.date = true;
        if(!staff || !staff?.id)
            error0.staff = true;
        if(!slot || slot.length === 0)
            error0.slot = true;
        setErrorBusinessData(error0);
        return Object.keys(error0).length !== 0;
    }

    const validateForm = () => {
        let errors: any = {};
    
        if (!formData.name.trim()) {
            errors.name = 'Name is required';
        }
    
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Invalid email address';
        }
    
        setFormError(errors);
        
        return Object.keys(errors).length !== 0;
    };
    

    const isValid = () => {
        let error: any = {};
        // seted errorData and returned true or false (true means there are error,,,)
        let error0 = validData0();
        if(error0)
            error.data = true;
        // seted formError and then returned true or false
        let error1 = validateForm();
        if(error1)
            error.form = true;
        // seted questionError and then returned true or false
        // let error2 = validateQuestions();
        // if(error2) 
        //     error.questions = true;
        setErrorExist(Object.keys(error).length !== 0);
        // if true then error exist...
        return Object.keys(error).length !== 0;
    }

    const _onClick = async (e: any) => {
        e.preventDefault();
        
        // when isvalid is false, there are no errors, so available to book...
        if(!isValid()) {
            sendAppointment(formData, answers);
            // false: booking
        }
    }

    const _onChangeForm = (e: any) => {
        e.preventDefault();

        const { name, value } = e.target;
        setFormData((prevData: any) => ({
          ...prevData,
          [name]: value,
        }));
    }

    return(
        <>           
        <div className={styles.titleArea}>
            <h1 id='formTitle' className={styles.title}> Add your details

            </h1>  
            <div className="ms-Grid" >
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-lg6">
                        <div className="ms-Grid-row">
                            <Input 
                                id="name" 
                                name='name'
                                type='text'
                                onChange={_onChangeForm}
                                appearance="underline" 
                                placeholder="Name*" 
                                className={styles.inputField}/>

                        </div>
                        <div className="ms-Grid-row">
                            <Input 
                                id="email" 
                                name='email'
                                type='email'
                                onChange={_onChangeForm}
                                appearance="underline" 
                                placeholder="Email*" 
                                className={styles.inputField}/>
                        </div>
                        <div className="ms-Grid-row">
                            <Input 
                                id="address"
                                name='address'
                                type='text' 
                                onChange={_onChangeForm}
                                appearance="underline" 
                                placeholder="Address(optional)" 
                                className={styles.inputField}/>
                        </div>
                        <div className="ms-Grid-row">
                            <Input 
                                id="phone"
                                name='phone'
                                type='number'
                                onChange={_onChangeForm}
                                appearance="underline"
                                placeholder="Phone number(optional)" 
                                className={styles.inputField}/>
                        </div>
                    </div>                    
                    <div className="ms-Grid-col ms-lg6">
                        <div className={labelClass}>
                            <Label  
                                className={styles.label}> 
                                Please let us know if you have any special requests. Thank you.
                            </Label>
                        </div>
                        <div className={labelClass}>
                            <Textarea
                                id='notes'
                                name='notes'
                                onChange={_onChangeForm}
                                placeholder="Notes(optional)" className={styles.textArea} />
                        </div>
                    </div>
                </div>
            </div>

        </div>  
        {questions && questions.length > 0 && <div className={`ms-Grid ${styles.titleArea}`} >
            <h1 id='formTitle' className={`${styles.title}`}>Provide additional information</h1>

            {questions?.map((question: any) => 
                <QuestionField key={question?.id} question={question} changeAnswer={changeAnswer} answer={answers[question.displayName]}/>
            )}
        </div>}      
        <div className={styles.buttonArea}>
            <Button className={styles.button} onClick={(e: any) => _onClick(e)}>Book</Button>

        </div>
        {errorExist &&
            <BookingDialog submit={(e) => setErrorExist(false)} title="Missing Information" type="warning" submitLabel="Go back">
                <h4>Please provide the following:</h4>
                <ul>
                    {errorBusinessData && Object.keys(errorBusinessData).length > 0 && Object.keys(errorBusinessData).map((key: any) => 
                        <li key={key}>{key}&nbsp;required</li>
                    )}
                    {formError && Object.keys(formError).length > 0 && Object.values(formError).map((value: any) => 
                        <li key={value}>{value}</li>
                    )}
                </ul>
            </BookingDialog>
        }
        
        </>
    );
});

export default Form;