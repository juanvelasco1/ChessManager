import UserTeacher from "../../components/UserTeacher/UserTeacher";
import TimerInput from "../../components/TimerInput/TimerInput";
import Podium from "../../components/Podium/Podium";
import RankingTable from "../../components/RankingTable/RankingTable";
import NavBar from "../../components/Navbar/Navbar";

const HomeTeacherScreen = () => {
  return (
    <>
      <div>
        <UserTeacher />
      </div>
      <div>
        <TimerInput top="21%" /> {/* Cambia este valor libremente */}
      </div>
      <div>
        <Podium />
      </div>
      <div>
        <RankingTable showCurrentUser={false} />
      </div>
      <div>
        <NavBar />
      </div>
    </>
  );
};

export default HomeTeacherScreen;