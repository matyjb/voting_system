import { FunctionComponent, useState } from "react";
import { Button, Input, List, Modal, Space, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { addCategory, removeCategory } from "../../logic/firebase";
import { TContestCategory } from "../../data/types";
import { useContestData } from "../../logic/contexts/ContestDataContext";

interface ContestCategoriesProps {}

const ContestCategories: FunctionComponent<ContestCategoriesProps> = () => {
  const { contest, categories } = useContestData();
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [modal, contextHolder] = Modal.useModal();

  const handleAddCategory = () => {
    const nameTrimmed = newCategoryName.trim();
    if (nameTrimmed.length > 0) {
      addCategory(contest!, nameTrimmed);
      setNewCategoryName("");
    }
  };

  const handleRemoveCategory = async (category: TContestCategory) => {
    if (
      await modal.confirm({
        title: "Are you sure?",
        content: (
          <Typography.Text>
            Are you sure you want to <b>remove</b> the category{" "}
            <b>{category.name}</b>?
          </Typography.Text>
        ),
        okButtonProps: {
          danger: true,
          type: "primary",
        },
        okText: "Yes, remove it",
        closable: true,
        maskClosable: true,
      })
    ) {
      removeCategory(category);
    }
  };

  return (
    <>
      <List
        header={
          <Space>
            <Input
              placeholder="Add new category"
              onChange={(e) => setNewCategoryName(e.target.value)}
              value={newCategoryName}
              onSubmit={handleAddCategory}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddCategory();
                }
              }}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddCategory}
            />
          </Space>
        }
        bordered
        dataSource={categories}
        renderItem={(item) => (
          <List.Item
            style={{ margin: 2, paddingTop: 2, paddingBottom: 2 }}
            actions={[
              <Button
                type="link"
                danger
                onClick={() => {
                  handleRemoveCategory(item);
                }}
              >
                remove
              </Button>,
            ]}
          >
            <Typography.Text>{item.name}</Typography.Text>
          </List.Item>
        )}
      />
      {contextHolder}
    </>
  );
};

export default ContestCategories;
