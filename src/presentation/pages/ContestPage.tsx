import { useContestData } from "../../logic/contexts/ContestDataContext";
import { FunctionComponent } from "react";
import ContestAddSubmissionPage from "./ContestAddSubmissionPage";
import ContestVotePage from "./voter";
import { ProvideContestData } from "../../logic/ProvideContestData";
import { VoterStateProvider } from "./voter/components/VoterContext";

const ContestPage: FunctionComponent = () => {
  const { contest } = useContestData();

  switch (contest?.phase) {
    case "CLOSED":
      return (
        <ProvideContestData noSubmissions noCategories noVoters>
          <h1>Contest Closed</h1>
        </ProvideContestData>
      );
    case "SUBMISSION":
      return (
        <ProvideContestData noSubmissions noVoters>
          <ContestAddSubmissionPage />
        </ProvideContestData>
      );
    case "VOTING":
      return (
        <ProvideContestData noVoters>
          <VoterStateProvider>
            <ContestVotePage />
          </VoterStateProvider>
        </ProvideContestData>
      );
  }
};

export default ContestPage;
