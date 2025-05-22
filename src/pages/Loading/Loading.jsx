import Loading from "../../components/LoadingScreen/LoadingScreen"

const LoadingScreen = () => { 
    return(
        <>
            <div>
                <Loading loading={true} duration={3000} />
            </div>
        </>
    )
};

export default LoadingScreen;