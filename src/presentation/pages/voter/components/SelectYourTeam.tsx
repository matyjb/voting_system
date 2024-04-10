import { FunctionComponent } from "react";
import { useContestData } from "../../../../logic/contexts/ContestDataContext";
import { Space, Button, Divider, Select, Typography } from "antd";
import { VoterActionType, useVoterState } from "./VoterContext";

interface SelectYourTeamProps {}

const SelectYourTeam: FunctionComponent<SelectYourTeamProps> = () => {
  const {
    state: { voterTeamId },
    dispatch,
  } = useVoterState();
  const { submissions } = useContestData();

  const options: { value: string | null; label: string }[] =
    submissions?.map((s) => ({
      value: s.fbref.id,
      label: `${s.gameTitle} by ${s.teamName}`,
    })) ?? [];

  const filterOption = (
    input: string,
    option?: { label: string; value: string | null }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Typography.Title level={5}>Select your team</Typography.Title>
      <Select
        showSearch
        optionFilterProp="children"
        filterOption={filterOption}
        options={options}
        style={{ width: "100%" }}
        allowClear
        value={voterTeamId}
        dropdownRender={(menu) => (
          <>
            <Button
              type="text"
              style={{ width: "100%", textAlign: "start" }}
              onClick={() => {
                dispatch({
                  type: VoterActionType.DESELECT_TEAM,
                  payload: undefined,
                });
              }}
            >
              Im not in a team
            </Button>
            <Divider style={{ margin: "8px 0" }} />
            {menu}
          </>
        )}
        onChange={(value) => {
          dispatch({
            type: VoterActionType.SELECT_TEAM,
            payload: { teamId: value },
          });
        }}
      />
    </Space>
  );
};

export default SelectYourTeam;
