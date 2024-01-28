import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getListNewsAction,
  detailNewsAction,
} from "./../../redux/actions/NewAction";
import {  addCommentAction,DeleteCommentAction, updateCommentAction} from "./../../redux/actions/CommentAction";
import { Avatar, Button, Card, Form, Input, List, Pagination, Popover } from "antd";
import dayjs from "dayjs";
import { DOMAIN, TOKEN } from "../../util/settings/config";
import { useFormik } from "formik";

export default function NewsDetail(props) {
  const { TextArea } = Input;

  const { arrNews, newsDetail } = useSelector((state) => state.NewReducer);
  const { userLogin } = useSelector(state => state.UserReducer);


  const dispatch = useDispatch();

  let { id } = props.match.params;
  useEffect(() => {
    dispatch(detailNewsAction(id));

    dispatch(getListNewsAction());
  }, []);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      userId: userLogin?.id,
      newsId: id,
      CreatedAt :dayjs().format("YYYY-MM-DD"),
    },
    onSubmit: (values) => {
        let formData = new FormData();
        for (let key in values) {
            formData.append(key, values[key]);
        }
        console.table('formData123', [...formData])
            
            if (!formik?.values?.existingId && !formik?.values?.existingId!=="" && values.content !== '') {
              dispatch(addCommentAction(formData,id))
              formik.setFieldValue('content',"")
             
          } else {
             dispatch(updateCommentAction(formik.values.existingId,formData,id));
             formik.setFieldValue('existingId',"")
             formik.setFieldValue('content',"")
          }
    }
})
  //Phan trang
  const [currentPage, setCurrentPage] = useState(1);
  const [form] = Form.useForm();
  const [postsPerPage] = useState(5);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const comments = newsDetail.comments;
  console.log("detail:",comments);
  const renderBinhLuan = () => {
   return comments?.map((item, index) => {
        const content = (
            <div className='d-flex flex-col'>
                <Button className='btn' type='link' onClick={() => {
                     formik.setFieldValue("content",item.content);
                     formik.setFieldValue('existingId',item.id)
                }}>Sửa</Button>

                <Button className='btn' danger type='link' onClick={() => {
                    if (window.confirm('Are you sure delete this comment?')) {
                        dispatch(DeleteCommentAction(item.id,id));
                    }
                }}>Xóa</Button>
            </div>
        );
        return <Card
            className='d-flex my-3 w-full no-underline'
            style={{ minHeight: 130, overflow: 'hidden' }}
            bodyStyle={{ width: '100%' }}
        >
            <div className='d-flex align-center'>
                {item?.user.avatar !== null
                    ? <div style={{ width: 40, height: 40, minWidth: '40px', minHeight: 40, backgroundSize: 'cover', borderRadius: '50%', backgroundImage: `url(${DOMAIN}+"/Image/User/"${item.user.avatar}` }} />
                    :  <Avatar size={40} style={{ fontSize: '28px', lineHeight: '32px' }} icon={item?.user?.email?.substr(0, 1)}/>}
                <div className='w-full'>
                    <p className='my-auto m-3 text-danger'>{item?.user?.email}</p>
                    <p className='my-auto ml-3'>{item?.createdAt}</p>
                </div>
                {item?.user?.email === userLogin?.email || userLogin?.role === 'Admin' || userLogin?.role === 'Mod' ? <Popover placement="bottomRight" content={content} trigger="hover">
                    <div className='btn cursor-pointer px-3 border-none drop-shadow-none hover:bg-gray-100'>...</div>
                </Popover> : ''}

            </div> 

            <div className='text-slate-700 mt-3'> {item?.content} </div>
        </Card>
    }
   )}
  return (
    <div>
      <div className="container">

        <div
          className="d-flex items-center absolute z-10"
          style={{ top: "50%" }}
        >
          <div className="container">
            <h2 className=" text-white drop-shadow-md text-5xl">
              {newsDetail.title}
            </h2>
          </div>
        </div>
      </div>

      <div
        className=""
        style={{
          backgroundImage: `url(${
            DOMAIN + "/Images/News/" + newsDetail.image
          })`,
          height: 1000,
          backgroundSize: "cover",
          filter: "brightness(0.5)",
        }}
      ></div>
      <div
        className="container relative z-10 bg-white p-10 shadow-lg mb-10 rounded-lg"
        style={{ marginTop: "-30px" }}
      >
        <div className="row">
          <div className="col-8">
            <div className="mb-5">
              <p className="text-gray-400 py-4">
                Posting Date :{" "}
                {dayjs(newsDetail.dayCreate).format("DD-MM-YYYY")}
              </p>
              <div
                dangerouslySetInnerHTML={{ __html: newsDetail.content }}
              ></div>
            </div>
            <div>
                        <hr></hr>
                        <h1 className='mt-5 text-xl'>Comment:</h1>
                        <div className='bg-light rounded-xl p-2 mb-5 '>

                            {(localStorage.getItem(TOKEN)) ? <Form onSubmitCapture={formik.handleSubmit} className='w-full d-flex flex-col items-end' >
                                <Form.Item label="" className='mb-2 w-full' >
                                    <TextArea
                                        name='content' allowClear rows={4} placeholder='Enter Comment' onChange={formik.handleChange} value={formik.values.content} />
                                </Form.Item>
                                <Button htmlType="submit" className="bg-blue-700 disabled:opacity-25 rounded-full text-white p-2 px-5 flex justify-center items-center" disabled={!formik.values.content?.trim()}>Send</Button>
                            </Form> : <Button href="/login" className='w-full'>Please Sign in for Comment!!</Button>}

                        </div>
                        {renderBinhLuan()}
                        <Pagination className='d-flex justify-center line-clamp-3 mb-20' pageSize={postsPerPage} currentPage={currentPage} total={comments?.length} onChange={(page) => { setCurrentPage(page) }} />


                    </div>
          </div>

       

          <div className="col-4">
            <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-md md:flex-row w-full my-3">
              <div className="flex flex-col justify-between p-4 leading-normal w-full">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  The Lastest News
                </h5>
                <List
                  itemLayout="horizontal"
                  dataSource={arrNews.slice(-5).reverse()}
                  renderItem={(item, index) => (
                    <List.Item>
                      <div className="d-flex mb-1 mt-1 w-full font-normal text-gray-700 dark:text-gray-400">
                        <img
                          className="rounded-md"
                          src={`${DOMAIN}/Images/News/${item.image}`}
                          alt={item.image}
                          style={{
                            width: 140,
                            height: 110,
                            objectFit: "cover",
                          }}
                        />
                        <div className="px-4">
                          <a
                            className="text-md font-bold"
                            href={`/news/detail/${item.id}`}
                          >
                            {item.title}
                          </a>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: newsDetail.content,
                            }}
                            className="text-ellipsis overflow-hidden line-clamp-2"
                          ></div>
                        </div>
                      </div>
                    </List.Item>
                  )}
                />
              </div>
              

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
