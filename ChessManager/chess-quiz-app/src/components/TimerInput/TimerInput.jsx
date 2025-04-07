import React, { useState, useEffect } from "react";

const TimerInput = () => {
    const [timeLeft, setTimeLeft] = useState(15 * 24 * 60 * 60); // 15 días en segundos

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    return 15 * 24 * 60 * 60; // Reinicia a 15 días
                }
                return prevTime - 1;
            });
        }, 1000); // Actualiza cada segundo

        return () => clearInterval(interval); // Limpia el intervalo al desmontar
    }, []);

    const formatTime = (seconds) => {
        const days = Math.floor(seconds / (24 * 60 * 60));
        const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((seconds % (60 * 60)) / 60);
        const secs = seconds % 60;

        return `${days}d ${hours}h ${minutes}m ${secs}s`;
    };

    return (
        <div>
            <h1>Contador de 15 días</h1>
            <p>Tiempo restante: {formatTime(timeLeft)}</p>
        </div>
    );
};

export default TimerInput;