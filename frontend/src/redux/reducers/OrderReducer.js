import { CHUYEN_TAB, CHUYEN_TAB_ACTIVE, DAT_VE, DAT_VE_HOAN_TAT, GET_TICKET_BY_USER, LAY_CHI_TIET_LICH_CHIEU, LAY_DANH_SACH_DON_HANG_THEO_USER, LAY_DANH_SACH_GHE, LAY_DANH_SACH_LICH_CHIEU, LAY_LICH_CHIEU_THEO_PHIM, ORDER_CONFIRM } from "../constants"

const initialState = {
    selectingSeats: [],
    danhSachGheKhachDat: [{ maGhe: 61641 }, { maGhe: 61642 }],
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

        case DAT_VE_HOAN_TAT:
            state.selectingSeats = [];
            return { ...state }

        case CHUYEN_TAB:
            state.tabActive = '2'
            state.disableTab = true
            return { ...state }

        case CHUYEN_TAB_ACTIVE:
            state.tabActive = action.number
            state.disableTab = true
            state.disableTab1 = true
            return { ...state }

        default:
            return state
    }
}
