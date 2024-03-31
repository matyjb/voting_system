import { FunctionComponent, useEffect } from "react";
import { useContest } from "../../logic/contexts/ContestContext";
import { Typography } from "antd";
import { editContest } from "../../logic/firebase";
import useTextState from "../hooks/useTextState";

interface ContestNameProps {}

const ContestName: FunctionComponent<ContestNameProps> = () => {
  const { contest } = useContest();
  const [name, setName] = useTextState(contest?.name);

  useEffect(() => {
    if (name.length > 0 && contest && contest.name !== name) {
      editContest({ ...contest, name: name });
    }
  }, [name]);

  return (
    <Typography.Title
      editable={{
        onChange: setName,
        triggerType: ["text", "icon"],
        maxLength: 100,
      }}
      level={1}
      style={{ margin: 0 }}
    >
      {name}
    </Typography.Title>
  );
};

export default ContestName;
