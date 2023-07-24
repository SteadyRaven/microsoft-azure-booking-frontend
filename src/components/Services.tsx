import { makeStyles, shorthands} from '@fluentui/react-components';
import { mergeStyles } from '@uifabric/styling';
import { useEffect, useState } from 'react';
import { setJSONStorage } from '../utils/storageAction';
import { getBookingServices } from '../service/BookingServices';
import ServiceItem from './ServiceItem';
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
        boxShadow: '0 -2px 6px 0 rgba(0, 0, 0, 0.1)'
    },
    selected: {
        backgroundColor: '#c3c3c3',
    },
    labelLeft:{
        borderTopWidth: '1px',
        borderTopStyle: 'solid',
        borderTopColor:'#eaeaea',
        marginRight:'4%',
        width:'46%',
        height:'80px'
    },
    labelRight:{
        borderTopWidth: '1px',
        borderTopStyle: 'solid',
        borderTopColor:'#eaeaea',
        width:'46%',
        marginLeft:'4%',
        height:'80px'
    },

  });

interface props {
    selectService: (service: any) => void,
}

const Services:React.FC<props> = ({selectService}) => {

    const styles = useStyles();
    const hoverStyle = mergeStyles({
        selectors: {
          ':hover': {
            backgroundColor: 'lightgray',
            cursor: 'pointer',
          },
        },
        height:'inherit'
      });
    const selectedClass = styles.selected;

    const labelLeftClass = mergeStyles('ms-Grid-col ms-lg2', styles.labelLeft);
    
    const labelRightClass = mergeStyles('ms-Grid-col ms-lg6', styles.labelRight);
    
    const [loading, setLoading] = useState(true);
    
    const [selectedService, setSelectedService] = useState<any>();
    
    const [services, setServices] = useState([]);
    
    // const services = bookingServiceData;
    useEffect(() => {
        async function fetchServices(){

            let myservices = await getBookingServices();

            if (myservices) {
                setServices(myservices);
                setJSONStorage('services', myservices);
            }
            setLoading(false);
        }
        
        fetchServices();
    }, []);

    useEffect(() => {
        async function fetchQuestions() {
            selectService(selectedService);
        }
        fetchQuestions();
    }, [selectedService])

    const onSelectService = async (service: any) => {
        setJSONStorage('service', service);
        setSelectedService(service);
    }

    return(
        <>
            <div>
                <div className={styles.titleArea}>
                    {!loading && <h1 id='serviceTitle' className={styles.title}>{(selectedService && selectedService?.displayName) ? selectedService?.displayName:`Select service`}</h1>}
                    
                    {!loading && <div className="ms-Grid" >
                        <div className="ms-Grid-row">

                            {services && services.length > 0 && services?.map((service: any, index: number) => 
                                <div key={service?.id} className={`${hoverStyle} ${ index % 2 === 0? labelLeftClass: labelRightClass} ${service.id === selectedService?.id ? selectedClass: ''}`} onClick={e => {
                                    e.preventDefault();
                                    onSelectService(service);
                            }}>
                                    <ServiceItem service={service}/>
                                </div>
                            )}
                        </div>
                    </div>}
                </div>              
            </div>
        </>
    );
}

export default Services;