import { Fragment, useState } from 'react';
import { json } from 'react-router-dom';
import classes from './OrderListItem.module.css';

// For counter setup on backend disabled=true

function OrderListItem(props) {
    const [processingState, setProcessingState] = useState(props.state.toLowerCase());
    const userData = JSON.parse(localStorage.getItem('userData'));

    function secondsToTime(sec) {
        let seconds = 0;
        let minutes = 0;
        let hours = 0;
        let time = '';
        if (sec >= 60) {
            minutes = Math.floor((sec) / 60);
            seconds = sec % 60;
        }
        if (minutes >= 60) {
            hours = Math.floor((minutes) / 60);
            minutes = minutes % 60;
        }
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        if (hours < 10) {
            hours = `0${hours}`;
        }
        time = `${hours}:${minutes}:${seconds}`;
        return time;
    }
    function calcSec(time, quantity) {
        const timeArray = (time).split(':');
        let timeInSec = 0;
        for (let i = 0; i < timeArray.length; i++) {
            timeInSec += parseInt(timeArray[i]) * (Math.pow(60, timeArray.length - i - 1));
        }
        timeInSec = timeInSec * parseInt(quantity);
        return timeInSec;
    }

    const changeProcessingState = async () => {
        const processingData = {
            restaurentName: userData.restaurentName,
            foodName: props.foodName,
            email: props.email,
            state: processingState.toLowerCase(),
            _id: props._id,
            quantity: props.quantity,
            time: props.time,
            price: props.price,
            userName: props.userName,
            handledBy: userData.userName
        }

        if (props.state == 'start' || (userData.userName === props.handledBy)) {
            console.log('Sending request....');
            const response = await fetch(
              `https://muddy-girdle-wasp.cyclic.app/foods/changeProcessingState`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(processingData),
              }
            );

            if (!response.ok) {
                throw json({ error: 'Could Not Update Processing State...' });
            }
        }
        else {
            alert("You are Not handling this order...")
        }

        if (processingState.toLowerCase() === 'start') {
            setProcessingState('processing');
        }
        else if (processingState.toLowerCase() === 'processing') {
            setProcessingState('done');
        }
    }

    let buttonCss = '';
    if (props.state === 'start') {
        buttonCss = 'start';
    } else if (props.state === 'processing') {
        buttonCss = 'in-process';
    }

    return (
        <Fragment>
            <div className={classes['order-content']}>
                <div className={`${classes['odr-row']} ${classes.name}`}>{props.userName}</div>
                <div className={`${classes['odr-row']} ${classes.name}`}>{props.foodName}</div>
                <div className={`${classes['odr-row']} ${classes.odrs}`}>{props.quantity}</div>
                <div className={`${classes['odr-row']} ${classes.odrs}`}>{parseInt(props.price) * parseInt(props.quantity)}</div>
                <button className={`${classes[buttonCss]} ${classes['status-button']}`} onClick={changeProcessingState} >{props.state}</button>
                <div className={`${classes.done} ${classes.handled}`} >{props.handledBy || "None"}</div>
                <div className={`${classes['odr-row']} ${classes.clock}`}>{secondsToTime(calcSec(props.time, props.quantity))}</div>
            </div>
        </Fragment>
    );
}

export default OrderListItem;