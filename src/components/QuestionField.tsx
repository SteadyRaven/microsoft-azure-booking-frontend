import { Input, Label, Select, makeStyles, shorthands } from '@fluentui/react-components';
import { mergeStyles } from '@uifabric/styling';
import React, {useState} from 'react';
const useStyles = makeStyles({
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
  });
interface props {
    question: any,
    answer: any,
    changeAnswer: (e: any) => void,
}

const QuestionField: React.FC<props> = ({question, changeAnswer, answer}) => {
    const styles = useStyles();
    const labelClass = mergeStyles('ms-Grid-row', styles.row);
    const {displayName, answerInputType, answerOptions} = question;
    const [value, setValue] = useState<any>(answer);

    const _onChange = (e: any) => {
        e.preventDefault();
        changeAnswer(e);
        setValue(e.target.value);
    }

    return (
        <>
            {answerInputType == 'text' && 
                <div className="ms-Grid-row">            
                    <div className="ms-Grid-col ms-lg12">
                        <div className={labelClass}>
                            <Label className={styles.label}>{displayName}(optional)</Label>
                        </div>
                        <div className={labelClass}>
                            <Input
                            name={displayName}
                            value={value}
                            onChange={_onChange}
                            placeholder={displayName} className={styles.inputField} />
                        </div>
                    </div>
                </div>
            }
            {answerInputType == 'radioButton' && 
                <div className="ms-Grid-row">            
                    <div className="ms-Grid-col ms-lg12">
                        <div className={labelClass}>
                            <Label  className={styles.label}>{displayName}(optional)</Label>
                        </div>
                        <div className={labelClass}>
                            <Select 
                            name={displayName}
                            value={value}
                            onChange={_onChange}
                            placeholder="Notes(optional)" 
                            className={styles.selectField} >
                                <option>----select a value----</option>
                                {answerOptions && answerOptions.length > 0 && answerOptions.map((item: any, index: number) =>
                                    <option key={index} value={item}>{item}</option>
                                )}
                            </Select>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default QuestionField;