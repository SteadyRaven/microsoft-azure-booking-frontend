import { setJSONStorage, getJSONStorage, getStringStorage } from '../utils/storageAction';

/**
 * api to set item with the field "selectedStaff" in localStorage
 * @param selectStaffId selected staffId
 * @returns 
 */
export async function selectedStaffMember(selectStaffId: string) {
    console.log("selectedStaffMember", selectStaffId);
    if(selectStaffId === 'anyone') {
      // all booking slots are selected
      return;
    };

    if(selectStaffId !== 'anyone') {
      setJSONStorage( 'selectedStaff',getJSONStorage('staffMembers').filter((staff:any) => staff?.id === selectStaffId));
    }
  }

  