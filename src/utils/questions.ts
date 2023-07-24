import { constants, initializeData } from "../constants/constant";
import { httpservice, httpserviceWithMultipart } from "../service/httpservice";
import { setJSONStorage } from "./storageAction";
const businessid = initializeData.businessid;

export async function getQuestionsForService (service: any) {
    const data = service;
    if(!data || !data?.customQuestions || data.customQuestions.length === 0) {
        setJSONStorage('customQuestions', JSON.stringify([]));
        return;
    }
    setJSONStorage('customQuestions', JSON.stringify([]));

    const questionIds = data.customQuestions;
    if(questionIds && questionIds.length > 0) {
        let urls:any = [];
        questionIds.map((item: any) => {
            if(item.questionId)
            urls.push(item?.questionId);
        })
        let dlist = await multiFetchData(urls);

        return dlist;
    }

}

export async function multiFetchData(urls: any) {
    try {
        const token = initializeData?.accessToken;

        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Host': window.location.host // Calculate the host dynamically
        };
        const fetchUrls = urls.map((id: any) =>
          fetch(`https://graph.microsoft.com/v1.0/solutions/bookingBusinesses/TestBusiness@dwsnow.com/customQuestions/${id}`, {
            method: 'GET',
            headers: headers,
        }).then((response) => response.json()));
    
        const results = await Promise.all(fetchUrls);

        return results;
    
      } catch (error) {
        console.log('Error:', error);
      }
}
