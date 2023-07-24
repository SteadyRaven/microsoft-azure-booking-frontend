import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Input, Label, Button, makeStyles, shorthands, Select } from '@fluentui/react-components';
import { mergeStyles } from '@uifabric/styling';
import { getQuestionsForService } from '../utils/questions';
import { setJSONStorage } from '../utils/storageAction';
import QuestionField from './QuestionField';

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
        marginBottom:'20px'
    },
    inputField:{
        fontSize:'18px',
        width:'90%',
        ...shorthands.margin('20px','50px','0px','50px')
    },
    label:{
        fontSize:'18px',
        width:'100%',
        marginLeft:'50px',
        marginTop:'40px',
        marginRight:'50px',
        textAlign:'left'
    },
    selectField:{
        fontSize:'24px',
        color: "#707070",
        width:'90%',
        ...shorthands.margin('20px','50px','0px','50px'),
        paddingTop: '10px',
        // height: '35px'
    },
    row:{
        display:'flex'
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
    }
  });

function CustomQuestion(service: any) {
    const styles = useStyles();
    const labelClass = mergeStyles('ms-Grid-row', styles.row);  
    const gridArea = mergeStyles('ms-Grid', styles.buttonArea);

    const [questions, setQuestions] = useState<any[]>([]);

    useEffect(() => {
        async function fetchQuestions() {
            if(!service)
                return;
            let questionlist: any = await getQuestionsForService(service);
            setJSONStorage('questionList', questionlist);
            setQuestions(questionlist);
        }
        fetchQuestions();
    }, [service])

  return (
    <div>
        {questions && questions.length > 0 && <div className={`ms-Grid ${styles.titleArea}`} >
            <h1 id='formTitle' className={`${styles.title} `}>Provide additional information</h1>

            {/* {questions.map((question: any) => 
                <QuestionField key={question?.id} question={question} />
            )} */}
        </div>}      
        <div className={styles.buttonArea}>
            <Button className={styles.button}>Book</Button>
        </div>          
    </div> 
  )
}

export default CustomQuestion;
