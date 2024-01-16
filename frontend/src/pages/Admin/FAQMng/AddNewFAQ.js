import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { addFAQAction } from '../../../redux/actions/FAQAction';

const AddNewFAQ = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      question: '',
      answer: '',
    },
    onSubmit: (values) => {
      if (values.question == '' || values.answer == '') {
        notification.error({
          closeIcon: true,
          message: 'Error',
          description: (
            <>
              Please fill in all required fields.
            </>
          ),
        });
      } else {
        let formData = new FormData();
        for (let key in values) {
          formData.append(key, values[key]);
        }
        console.table('formData', [...formData])
        dispatch(addFAQAction(formData));
      }

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
      <h3 className="text-2xl">Add New Bus Type</h3>
      <div className='row'>
        <div className='col-8'>
          <Form.Item
            label="Question"
            name="question"
            style={{ minWidth: '100%' }}
            rules={[
              {
                required: true,
                message: 'Question is required!',
                transform: (value) => value.trim(),
              },
            ]}
          >
            <Input name="question" onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item
            label="Answer"
            name="answer"
            style={{ minWidth: '100%' }}
            rules={[
              {
                required: true,
                message: 'Answer of seat is required!',
                transform: (value) => value.trim(),
              },
            ]}
          >
            <Input name="answer" onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item label="Action">
            <Button htmlType="submit" >Add New FAQ</Button>
          </Form.Item>
        </div>
      </div>

    </Form>
  );
};

export default AddNewFAQ;