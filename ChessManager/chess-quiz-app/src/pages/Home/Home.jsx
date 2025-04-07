import UserCard from "../../components/UserCard/UserCard";
import Podium from "../../components/Podium/Podium";
import RankingTable from "../../components/RankingTable/RankingTable";
import TimerInput from "../../components/TimerInput/TimerInput";

const HomeScreen = () => {
    return (
        <>
            <div>
                <UserCard />
            </div>
            <div>
                <TimerInput />
            </div>
            <div>
                <Podium />
            </div>
            <div>
                <RankingTable />
            </div>
        </>
    );
};

export default HomeScreen;