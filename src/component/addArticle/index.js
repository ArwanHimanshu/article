import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { PageHeader, Form, Row, Col, Input, Button, List, Tag } from "antd";
import { addArticle, getArticle, updateArticle } from "../../actions";
import { connect } from "react-redux";

const AddComponent = (props) => {
  const { addArticle, userArticles, getArticle, updateArticle } = props;
  const [form] = Form.useForm();
  const [description, setDescription] = useState("");
  const [isAdding, SetIsAdding] = useState(false);

  const onFinish = async (values) => {
    SetIsAdding(true);
    values.description = description;
    const result = await addArticle(values);
    if (result) {
      form.resetFields();
      setDescription("");
    }
    SetIsAdding(false);
  };

  useEffect(() => {
    getArticle();
  }, []);
  return (
    <>
      <PageHeader title="Add Article"></PageHeader>

      <Row gutter={12} style={{ padding: "0 5rem" }}>
        <Col span={8}>
          <List
            dataSource={userArticles}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button
                    onClick={() => {
                      updateArticle(item._id, { isPublished: true });
                    }}
                    type="link"
                  >
                    Publish
                  </Button>,
                ]}
              >
                <List.Item.Meta title={item.title} description={item.summary} />
              </List.Item>
            )}
          />
        </Col>
        <Col span={16}>
          <Form onFinish={onFinish} form={form}>
            <Col span={24}>
              <Form.Item
                name="title"
                rules={[
                  {
                    required: true,
                    message: "A Article must have title",
                  },
                ]}
              >
                <Input placeholder="add title"></Input>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="summary"
                rules={[
                  {
                    required: true,
                    message: "A Article must have summary",
                  },
                ]}
              >
                <Input.TextArea placeholder="add title"></Input.TextArea>
              </Form.Item>
            </Col>
            <Col span={24}>
              <ReactQuill
                value={description}
                onChange={(value, delta, source, editor) => {
                  setDescription(editor.getHTML());
                }}
              ></ReactQuill>
            </Col>
            <Col span={24} style={{ marginTop: "1rem" }}>
              <Form.Item>
                <Button htmlType="submit" type="primary" block>
                  {" "}
                  Add{" "}
                </Button>
              </Form.Item>
            </Col>
          </Form>
        </Col>
      </Row>
    </>
  );
};

function mapStateToProps({ userArticles }) {
  return {
    userArticles,
  };
}

export default connect(mapStateToProps, {
  addArticle,
  getArticle,
  updateArticle,
})(AddComponent);
