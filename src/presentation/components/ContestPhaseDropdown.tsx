import {
  Badge,
  BadgeProps,
  Dropdown,
  MenuProps,
  Space,
  Typography,
} from "antd";
import { FunctionComponent } from "react";
import { TContestPhase } from "../../data/types";
import { useContest } from "../../logic/contexts/ContestContext";
import { CaretDownOutlined } from "@ant-design/icons";

const badgeProps: { [key in TContestPhase]: BadgeProps } = {
  CLOSED: { color: "red", status: "default" },
  SUBMISSION: { color: "green", status: "processing" },
  VOTING: { color: "orange", status: "processing" },
};

const onClick: MenuProps["onClick"] = ({ key }) => {
  console.log(key);
};

const items: MenuProps["items"] = [
  {
    label: "close",
    key: "CLOSED",
    icon: <Badge {...badgeProps.CLOSED} />,
  },
  {
    label: "submissions stage",
    key: "SUBMISSION",
    icon: <Badge {...badgeProps.SUBMISSION} />,
  },
  {
    label: "voting stage",
    key: "VOTING",
    icon: <Badge {...badgeProps.VOTING} />,
  },
];

interface ContestPhaseDropdownProps {}

const ContestPhaseDropdown: FunctionComponent<
  ContestPhaseDropdownProps
> = () => {
  const { contest } = useContest();
  const phaseProps = badgeProps[contest?.phase ?? "CLOSED"];

  const itms = items.filter((item) => item?.key !== contest?.phase);

  return (
    <Dropdown menu={{ items: itms, onClick }}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <Badge {...phaseProps} />
          <Typography.Text strong style={{ color: phaseProps.color }}>
            {contest?.phase}
          </Typography.Text>
          <CaretDownOutlined style={{ color: phaseProps.color }} />
        </Space>
      </a>
    </Dropdown>
  );
};

export default ContestPhaseDropdown;
