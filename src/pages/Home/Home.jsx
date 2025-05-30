import { useEffect, useState } from "react";
import UserCard from "../../components/UserCard/UserCard";
import Podium from "../../components/Podium/Podium";
import RankingTable from "../../components/RankingTable/RankingTable";
import TimerInput from "../../components/TimerInput/TimerInput";

const HomeScreen = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        isMobile ? (
            <div style={{ padding: "10px 0", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <UserCard />
                <TimerInput topMobile="40%" topDesktop="20%" />
                <Podium />
                <RankingTable showCurrentUser={true} />
            </div>
        ) : (
            <div
                style={{
                    width: "100%",
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxSizing: "border-box",
                    padding: "0 5px 0 5px",
                }}
            >
                <div
                    style={{
                        width: "100%",
                        maxWidth: "1440px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "20px 0",
                        boxSizing: "border-box",
                        marginTop: "0px",
                    }}
                >
                    <div
                        style={{
                            width: "100%",
                            maxWidth: "1440px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "16px",
                            margin: "0",
                        }}
                    >
                        {/* Top Row: UserCard + TimerInput */}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                gap: "16px",
                                flexWrap: "wrap",
                            }}
                        >
                            <div style={{ flex: "1", minWidth: "388px" }}>
                                <UserCard />
                            </div>
                            <div style={{ flex: "1", minWidth: "388px", display: "flex", justifyContent: "flex-end" }}>
                                <TimerInput topMobile="40%" topDesktop="0%" />
                            </div>
                        </div>

                        {/* Bottom Row: Podium + RankingTable */}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                gap: "16px",
                                flexWrap: "wrap",
                            }}
                        >
                            <div style={{ flex: "1", minWidth: "388px", display: "flex", flexDirection: "column", gap: "16px" }}>
                                <Podium />
                            </div>
                            <div style={{ flex: "1", minWidth: "400px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                <div style={{ flex: 1.3 }}>
                                    <RankingTable showCurrentUser={true} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

export default HomeScreen;