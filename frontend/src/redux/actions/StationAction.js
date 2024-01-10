import { stationManageService } from "../../services/StationManageService";
import { GET_STATION_LIST } from "../constants";


export const getStationListAction = () => {
    return async (dispatch) => {
        try {
            const result = await stationManageService.getStationList();
            dispatch({
                type: GET_STATION_LIST,
                arrStation: result.data.data
            })
        } catch (error) {
            console.log('error', error);
        }
    }
}
