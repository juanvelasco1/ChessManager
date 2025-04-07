import React, { useState } from "react";

const QuizQuestion = () => {
    const [currentQuestion, setCurrentQuestion] = useState(1);

    const handleAnswer = (answer) => {
        if (currentQuestion === 1 && answer === "Caballo") {
            setCurrentQuestion(2); // Navega a la segunda pregunta
        }
    };

    return (
        <>
            {currentQuestion === 1 && (
                <div>
                    <div>
                        <meter value="1" id="disk" min={0} max={18}>
                            1/18
                        </meter>
                    </div>

                    <div>
                        <h1>¿Cuál es la única pieza que puede saltar sobre otras?</h1>
                    </div>

                    <div>
                        <ul>
                            <li>
                                <button onClick={() => handleAnswer("Alfil")}>Alfil</button>
                            </li>
                            <li>
                                <button onClick={() => handleAnswer("Torre")}>Torre</button>
                            </li>
                            <li>
                                <button onClick={() => handleAnswer("Caballo")}>Caballo</button>
                            </li>
                            <li>
                                <button onClick={() => handleAnswer("Peón")}>Peón</button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}

            {currentQuestion === 2 && (
                <div>
                    <div>
                        <meter value="2" id="disk" min={0} max={18}>
                            2/18
                        </meter>
                    </div>

                    <div>
                        <h1>Juega blancas y da mate en 1</h1>
                    </div>
                    
                    <div>
                        <img src="https://raw.githubusercontent.com/SergioRP18/LOGO-ChessManager/b5e9ef3f4890b8f7eaa62c49eee7372e43bea001/Tablero%20pregunta%201.svg" alt="" />
                    </div>

                    <div>
                        <li><button><img src="https://raw.githubusercontent.com/SergioRP18/LOGO-ChessManager/b5e9ef3f4890b8f7eaa62c49eee7372e43bea001/Caballo.svg" alt="" />E-7</button></li>
                        <li><button><img src="https://raw.githubusercontent.com/SergioRP18/LOGO-ChessManager/b5e9ef3f4890b8f7eaa62c49eee7372e43bea001/Reina.svg" alt="" />H-7</button></li>
                        <li><button><img src="https://raw.githubusercontent.com/SergioRP18/LOGO-ChessManager/b5e9ef3f4890b8f7eaa62c49eee7372e43bea001/Alfil.svg" alt="" />H-7</button></li>
                        <li><button><img src="https://raw.githubusercontent.com/SergioRP18/LOGO-ChessManager/b5e9ef3f4890b8f7eaa62c49eee7372e43bea001/Caballo.svg" alt="" />F-6</button></li>
                    </div>
                </div>
            )}
        </>
    );
};

export default QuizQuestion;