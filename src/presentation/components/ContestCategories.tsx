import { FunctionComponent } from "react";
import { useContest } from "../../logic/contexts/ContestContext";
import { List, Typography } from "antd";

interface ContestCategoriesProps {}

const ContestCategories: FunctionComponent<ContestCategoriesProps> = () => {
  const { categories } = useContest();

  return (
    <List
      footer={<div>Footer</div>}
      bordered
      dataSource={categories}
      renderItem={(item) => (
        <List.Item>
          <Typography.Text>{item.name}</Typography.Text>
        </List.Item>
      )}
    />
  );
};

export default ContestCategories;
