import { useContestData } from "../../logic/contexts/ContestDataContext";
import { FunctionComponent } from "react";
import ContestAddSubmissionPage from "./ContestAddSubmissionPage";

const ContestPage: FunctionComponent = () => {
  const { contest } = useContestData();

  switch (contest?.phase) {
    case "CLOSED":
      return <h1>Contest Closed</h1>;
    case "SUBMISSION":
      return <ContestAddSubmissionPage />;
    case "VOTING":
      return <h1>Contest Voting</h1>;
  }
};

export default ContestPage;
