import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getFAQByIdAction, updateFAQByIdAction } from '../../../redux/actions/FAQAction';

const EditFAQ = (props) => {
  const dispatch = useDispatch();
  const { FAQDetail } = useSelector(state => state.FAQReducer)

  let { id } = props.match.params;
  useEffect(() => {
    dispatch(getFAQByIdAction(id));
  }, [dispatch, id])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      question: FAQDetail?.question,
      answer: FAQDetail?.answer
    },
    onSubmit: (values) => {
      let formData = new FormData();
      for (let key in values) {
        formData.append(key, values[key]);
      }
      dispatch(updateFAQByIdAction(id, formData))
    }
  })

  return (
    <Form
      onSubmitCapture={formik.handleSubmit}
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
    >
      <h3 className="text-2xl">Edit FAQ:</h3>
      <div className='row'>
        <div className='col-8'>
          <Form.Item
            label="Question"
            style={{ minWidth: '100%' }}
            rules={[
              {
                required: true,
                message: 'Bus Type is required!',
                transform: (value) => value.trim(),
              },
            ]}
          >
            <Input name="question" onChange={formik.handleChange} value={formik.values.question} />
          </Form.Item>
          <Form.Item
            label="Answer"
            style={{ minWidth: '100%' }}
            rules={[
              {
                required: true,
                message: 'Number of seat is required!',
                transform: (value) => value.trim(),
              },
            ]}
          >
            <Input name="answer" onChange={formik.handleChange} value={formik.values.answer} />
          </Form.Item>
          <Form.Item label="Action">
            <Button htmlType="submit">Update FAQ</Button>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default EditFAQ;