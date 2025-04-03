const Podium = ({ nickname, positions, score }) => {
    return (
        <>
            <div className="container">
                <div className="position">
                    <h1>{positions || undefined}</h1>
                </div>
                <div className="user-podium">
                    <img src="#" alt="" />
                    <span>{nickname}</span>
                    <span>{score}</span>
                </div>
            </div>
        </>
    )
}

export default Podium;