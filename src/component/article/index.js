import React from "react";

import { PageHeader } from "antd";
import { connect } from "react-redux";

const Article = (props) => {
  const { publishedArticle, match } = props;

  const article = publishedArticle.find((r) => r._id == match.params.id);
  const { title, description } = article || {};

  return (
    <>
      <PageHeader title={title || "No Article found"}></PageHeader>
      <div
        style={{ padding: "0 4rem" }}
        dangerouslySetInnerHTML={{
          __html: description || "no article content",
        }}
      ></div>
    </>
  );
};
function mapStateToProps({ publishedArticle }) {
  return {
    publishedArticle,
  };
}
export default connect(mapStateToProps, null)(Article);
