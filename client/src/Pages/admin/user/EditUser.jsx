import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Upload, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchOneQuery, useUpdateUserMutation } from "../../../services/user.service";


function EditUser() {
    const { id } = useParams()
    const { data, isLoading } = useFetchOneQuery(id)
    const [fileList, setFileList] = useState([])
    const [updateUser] = useUpdateUserMutation()
    const navigate = useNavigate()
    const [form] = Form.useForm()

    useEffect(() => {
        if(!isLoading && data) {
            form.setFieldsValue({
                userName: data.user?.userName,
                email: data.user?.email,
                phoneNumber: data.user?.phoneNumber,
                passWord: data.user?.passWord,
                role: data.user?.role,
                state: data.user?.state
            })
        }
    }, [data, isLoading])

    const dummyRequest = ({ onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

    const handleBeforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('Bạn chỉ có thể tải lên file JPG/PNG!');
        }
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isLt10M) {
            message.error('Kích thước hình ảnh không được vượt quá 10MB!');
        }

        return isJpgOrPng && isLt10M;
    };

    const handleOnChange = ({ fileList }) => {
        setFileList(fileList)
    }

    const onFinish = (values) => {
        // console.log({ ...values, avatar: fileList.length > 0 ? [fileList[0].thumbUrl] : [] });
        updateUser({id, info: { ...values, avatar: fileList.length > 0 ? [fileList[0].thumbUrl] : [data?.user?.avatar[0]]}});
        navigate('/admin/users')
    };
    return <div>
        <h1>Create New</h1>
        <Form
            form={form}
            style={{ width: '70%', margin: '0 auto' }}
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item
                label="Username"
                name="userName"
                rules={[{ required: true, message: 'Please input your username!' }]}
                hasFeedback
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!', }, { type: 'email', message: 'Please enter a valid email address!' }]}
                hasFeedback
            >
                <Input />
            </Form.Item>
            <Form.Item
                hasFeedback
                label="Phone"
                name="phoneNumber"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Password"
                name="passWord"
                rules={[{ required: true, message: 'Please input your password!' }, { min: 6, message: 'The password must be at least 6 characters long!' }]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                initialValue={'member'}
                label="Role"
                name="role"
            >
                <Select
                    style={{
                        width: 200,
                    }}
                    options={[
                        {
                            value: 'member',
                            label: 'member',
                        },
                        {
                            value: 'contributor',
                            label: 'contributor',
                        },
                        {
                            value: 'admin',
                            label: 'admin',
                        }
                    ]}
                />
            </Form.Item>
            <Form.Item
                initialValue={true}
                label="State"
                name="state"
            >
                <Select
                    style={{
                        width: 200,
                    }}
                    options={[
                        {
                            value: true,
                            label: 'ACTIVE',
                        },
                        {
                            value: false,
                            label: 'DISIBLED',
                        }
                    ]}
                />
            </Form.Item>
            <Upload
                name="avatar"
                beforeUpload={handleBeforeUpload}
                customRequest={dummyRequest}
                onChange={handleOnChange}
                listType="picture"
                fileList={fileList}
            >
                {fileList.length === 1 ? "" : <Button icon={<UploadOutlined />}>Click to Upload</Button>}
            </Upload>
            <Form.Item style={{ margin: '20px 0' }}>
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
            </Form.Item>
        </Form>
    </div>;
}

export default EditUser;