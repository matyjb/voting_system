import { FunctionComponent } from "react";
import { useContestData } from "../../../../logic/contexts/ContestDataContext";
import { Card, Space, Button, Divider, Select } from "antd";
import { VoterActionType, useVoterState } from "./VoterContext";

const SelectYourTeamCard: FunctionComponent = () => {
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
    <Card title="Select your team" style={{ minWidth: 300 }}>
      <Space direction="vertical" style={{ width: "100%" }}>
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
              payload: value,
            });
          }}
        />
        <Button type="primary" style={{ width: "100%" }}>
          Next
        </Button>
      </Space>
    </Card>
  );
};

export default SelectYourTeamCard;
