import { CHUYEN_TAB, CHUYEN_TAB_ACTIVE, DAT_VE, DAT_VE_HOAN_TAT, DELETE_SELECTING_SEATS, GET_TICKET_BY_USER, ORDER_CONFIRM } from "../constants"

const initialState = {
    selectingSeats: [],
    tabActive: '1',
    donhang: {},
    arrTicket: [],
    disableTab: false
}

export const OrderReducer = (state = initialState, action) => {
    switch (action.type) {

        case ORDER_CONFIRM:
            state.donHang = action.donHang;
            return { ...state }

        case GET_TICKET_BY_USER:
            state.arrTicket = action.arrTicket;
            return { ...state }

        case DAT_VE:
            let danhSachGheCapNhat = [...state.selectingSeats];
            let index = danhSachGheCapNhat.findIndex(gheDD => gheDD === action.gheDuocChon);
            if (index != -1) {
                danhSachGheCapNhat.splice(index, 1)
            } else {
                danhSachGheCapNhat.push(action.gheDuocChon)
            }
            state.selectingSeats = danhSachGheCapNhat
            return { ...state }

        case DELETE_SELECTING_SEATS:
            state.selectingSeats = [];
            return { ...state }
            
        case DAT_VE_HOAN_TAT:
            state.selectingSeats = [];
            return { ...state }

        case CHUYEN_TAB:
            state.tabActive = '1'
            state.disableTab = true
            return { ...state }

        case CHUYEN_TAB_ACTIVE:
            state.tabActive = action.number
            state.disableTab = true
            return { ...state }

        default:
            return state
    }
}
