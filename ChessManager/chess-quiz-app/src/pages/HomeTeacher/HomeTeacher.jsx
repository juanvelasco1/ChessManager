import UserTeacher from "../../components/UserTeacher/UserTeacher";
import TimerInput from "../../components/TimerInput/TimerInput";
import Podium from "../../components/Podium/Podium";
import RankingTable from "../../components/RankingTable/RankingTable";
import NavBar from "../../components/Navbar/Navbar";

const HomeTeacherScreen = () => {
    return(
        <>
        <div>
            <UserTeacher/>
        </div>
        <div>
            <TimerInput/>
        </div>
        <div>
            <Podium
                sx={{
                    position:"relative",
                    top:"80px",
                }}
            />
        </div>
        <div>
            <RankingTable/>
        </div>
        <div>
            <NavBar/>
        </div>
        </>
    )
};

export default HomeTeacherScreen;