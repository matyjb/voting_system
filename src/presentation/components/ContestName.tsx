import { FunctionComponent, useEffect } from "react";
import { Typography } from "antd";
import { editContest } from "../../logic/firebase";
import useTextState from "../hooks/useTextState";
import { useContestData } from "../../logic/contexts/ContestDataContext";

interface ContestNameProps {}

const ContestName: FunctionComponent<ContestNameProps> = () => {
  const { contest } = useContestData();
  const [name, setName] = useTextState(contest?.name);

  useEffect(() => {
    if (name.length > 0 && contest && contest.name !== name) {
      editContest({ ...contest, name: name });
    }
  }, [name]);

  useEffect(() => {
    setName(contest?.name || "");
  }, [contest?.name]);

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
