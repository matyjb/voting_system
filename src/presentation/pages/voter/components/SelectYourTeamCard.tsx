import { FunctionComponent } from "react";
import { useContestData } from "../../../../logic/contexts/ContestDataContext";
import { TDocRef } from "../../../../data/types";
import { Card, Space, Button, Divider, Select } from "antd";

interface SelectYourTeamCardProps {
  currentTeamRef?: TDocRef;
  onSelectTeam: (teamRef?: TDocRef) => void;
}

const SelectYourTeamCard: FunctionComponent<SelectYourTeamCardProps> = ({
  currentTeamRef,
  onSelectTeam,
}) => {
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
          value={currentTeamRef?.id}
          dropdownRender={(menu) => (
            <>
              <Button
                type="text"
                style={{ width: "100%", textAlign: "start" }}
                onClick={() => {
                  onSelectTeam(undefined);
                }}
              >
                Im not in a team
              </Button>
              <Divider style={{ margin: "8px 0" }} />
              {menu}
            </>
          )}
          onChange={(value) => {
            onSelectTeam(submissions?.find((s) => s.fbref.id === value)?.fbref);
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
