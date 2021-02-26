import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../Contexts/ChallengeContext';
import styles from '../styles/components/Countdown.module.css'

let countDownTimeOut: NodeJS.Timeout;

export function Countdown() {

    const { startNewChallenge } = useContext(ChallengesContext);

     const [time, setTime] = useState(0.1 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinish, setHasFinish] = useState(false);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    function startCount() {
        setIsActive(true);
    }

    function resetCount() {
        clearTimeout(countDownTimeOut);
        setIsActive(false);
        setTime(0.1*60);

    }

    useEffect(() => {
        if (isActive && time > 0) {
            countDownTimeOut= setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        } else if (isActive && time ===0) {
            setHasFinish(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time]);

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>
            { hasFinish ? (
                <button
                    disabled
                    type='button'
                   className={styles.countdownButton}>
                   Ciclo encerrado
               </button>
            ):
            <>
            { isActive ? (
                <button
                    onClick={resetCount}
                    type='button'
                    className={`${styles.countdownButton} ${styles.countdownButtonActive}`}>
                    Abandonar ciclo
                </button>
            ) : (
                    <button
                        onClick={startCount}
                        type='button'
                        className={styles.countdownButton}>
                        Iniciar ciclo
                    </button>
               )}
            </> 
            }   
         </div>
    );
}