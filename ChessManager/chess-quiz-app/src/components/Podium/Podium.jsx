const Podium = ({ nickname, score }) => {
    return (
        <>
            <div>
                <div>
                    <h1>#2</h1>
                </div>
                <div>
                    <img src="#" alt="" />
                    <span>{nickname}</span>
                    <span>{score}</span>
                </div>
                <div>
                    <h1>#1</h1>
                </div>
                <div>
                    <img src="#" alt="" />
                    <span>{nickname}</span>
                    <span>{score}</span>
                </div>
                <div>
                    <h1>#3</h1>
                </div>
                <div>
                    <img src="#" alt="" />
                    <span>{nickname}</span>
                    <span>{score}</span>
                </div>
            </div>

            <div>
                <button>General</button>
                <button>1vs1</button>
            </div>
        </>
    )
}

export default Podium;