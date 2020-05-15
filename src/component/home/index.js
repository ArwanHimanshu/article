import React, { useEffect, useState } from "react";
import { PageHeader, Button, Input, Row, Col, Collapse, Divider } from "antd";
import { connect } from "react-redux";
import { getPublishedArticle, getUser, logout } from "../../actions";
const { Panel } = Collapse;
const Home = (props) => {
  const [filteredList, setFilteredList] = useState([]);

  const {
    history,
    getPublishedArticle,
    publishedArticle,
    auth,
    getUser,
    logout,
  } = props;

  const changeArticleList = (req) => {
    const list = publishedArticle.filter(
      (r) => r.title.toLowerCase().indexOf(req.target.value.toLowerCase()) > -1
    );

    setFilteredList(list);
  };

  useEffect(() => {
    getUser();
    getPublishedArticle();
  }, []);

  useEffect(() => {
    setFilteredList(publishedArticle);
  }, [publishedArticle]);

  return (
    <>
      <PageHeader
        tags={
          <Input
            placeholder="search article"
            onChange={changeArticleList}
          ></Input>
        }
        title="Article"
        extra={
          auth.isAuthenticated
            ? [
                <Button
                  type="primary"
                  onClick={() => {
                    history.push("/addArticle");
                  }}
                >
                  Add Article
                </Button>,

                <Button
                  type="primary"
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </Button>,
              ]
            : [
                <Button
                  type="primary"
                  onClick={() => {
                    history.push("/login");
                  }}
                >
                  Login
                </Button>,
              ]
        }
      ></PageHeader>
      <Row gutter={12} justify="center">
        <Col span={16}>
          <Collapse>
            {filteredList.map((article) => {
              return (
                <Panel header={article.title} key={article._id}>
                  {article.summary}
                  <Divider />
                  <Button
                    size="small"
                    shape="round"
                    type="primary"
                    onClick={() => {
                      history.push(`/article/${article._id}`);
                    }}
                  >
                    Read More
                  </Button>
                </Panel>
              );
            })}
          </Collapse>
        </Col>
      </Row>
    </>
  );
};

function mapStateToProps({ publishedArticle, auth }) {
  return {
    publishedArticle,
    auth,
  };
}

export default connect(mapStateToProps, {
  getPublishedArticle,
  getUser,
  logout,
})(Home);
