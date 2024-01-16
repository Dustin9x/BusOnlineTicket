import { notification } from 'antd';
import { history } from '../../App';
import { faqService } from '../../services/FAQService';
import { GET_FAQ_DETAIL, GET_FAQ_LIST } from '../constants';


export const getFAQListAction = () => {
    return async (dispatch) => {
        try {
            const result = await faqService.getFAQList();
            dispatch({
                type: GET_FAQ_LIST,
                arrFAQ: result.data.data
            })
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const getFAQByIdAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await faqService.getFAQById(id);
            dispatch({
                type: GET_FAQ_DETAIL,
                FAQDetail: result.data.data[0]
            })
        } catch (error) {
            console.log('error', error);
        }
    }
}


export const addFAQAction = (formData) => {
    return async (dispatch) => {
        try {
            const result = await faqService.addNewFAQ(formData)
            notification.success({
                closeIcon: true,
                message: 'Success',
                description: (
                    <>Add new FAQ successfully</>
                ),
            });
            history.push('/admin/faqmng');
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const updateFAQByIdAction = (id,formData) => {
    return async (dispatch) => {
        try {
            const result = await faqService.updateFAQ(id,formData);
            notification.success({
                closeIcon: true,
                message: 'Success',
                description: (
                    <>Update FAQ successfully</>
                ),
            });
            history.push('/admin/faqmng');
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const deleteFAQAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await faqService.deleteFAQ(id);
            notification.success({
                closeIcon: true,
                message: 'Success',
                description: (
                    <>Delete FAQ successfully</>
                ),
            });
            dispatch(getFAQListAction())
        } catch (error) {
            console.log('error', error);
        }
    }
}


