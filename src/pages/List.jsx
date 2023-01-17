import { ProList } from '@ant-design/pro-components';
import {message, Pagination, Space, Tag} from 'antd';
import React, { useState, useEffect } from 'react';
import {TaskListApi, TaskUpdateApi, TaskDeleteApi} from "../request/api";
import moment from "moment";
import TaskForm from "./Form";

const defaultData = [
    {
        id: '1',
        title: '一键三连',
        content: '给小生凡一的视频一键三连',
    }
];

export default () => {
    const [dataSource, setDataSource] = useState(defaultData);
    const [total,setTotal]=useState(0)
    const [current,setCurrent]=useState(1)
    const [pageSize,setPageSize]=useState(10)

    const getList =(num)=>{
        TaskListApi({
            start:num,
            limit:pageSize,
        }).then(res=>{
            if (res.status === 200){
                res.data.item.map(item=>{
                    item.start_time = moment(parseInt(item.start_time)*1000).format("YYYY-MM-DD HH:mm:ss");
                })
                setDataSource(res.data.item)
                setTotal(res.data.total)
                setCurrent(num)
            }else{
                message.error(res.msg).then()
            }
        })
    }

    const updateList=(values)=>{
        const {id,title,content,status} = values
        TaskUpdateApi({
            id:id,
            title:title,
            content:content,
            status:status
        }).then(res=>{
            if (res.status === 200){
                message.success(res.msg).then()
            }else{
                message.error(res.msg).then()
            }
        })
    }

    const deleteList=(values)=>{
        const {id} = values
        TaskDeleteApi({
            id:id,
        }).then(res=>{
            if (res.status === 200){
                message.success(res.msg).then()
            }else{
                message.error(res.msg).then()
            }
        })
    }

    // 请求文章列表
    useEffect(()=>{
        getList(current)
    },[])

    // 分页
    const onChange = (pages) => {
        getList(pages);
    }

    return (
        <div>
        <ProList rowKey="id"
                     headerTitle="我的备忘录"
                     dataSource={dataSource}
                     showActions="hover"
                     toolBarRender={() => {
                         return [
                             <TaskForm onCreate={()=>{
                                 getList(current)
                             }}/>
                         ];
                     }}
                     editable={{
        onSave: async (key, record, originRow) => {
            updateList(record)
            return true;
        },
        onDelete: async (key, record, originRow) => {
            deleteList(record)
            return true;
        },
    }}
        onDataSourceChange={setDataSource} metas={{
        title: {
            dataIndex: 'title',
        },
        description: {
            dataIndex: 'content',
        },
        subTitle: {
            dataIndex: 'start_time',
            render: (_, row) => {
                return (<Space size={0}>
                        <Tag>
                            {row.start_time}
                        </Tag>
                </Space>);
            },
            search: false,
        },
        actions: {
            render: (text, row, index, action) => [
                <a onClick={() => {
                    action === null || action === void 0 ? void 0 : action.startEditable(row.id);
                }} key="link">
                    编辑
                </a>,
            ],
        },
    }}/>
        <Pagination style={{float: 'right',marginTop: '20px'}}
                    onChange={onChange}
                    showTotal={(total) => `Total ${total} items`}
                    total={total}
                    current={current}
                    pageSize={pageSize} />
        </div>
    );
};