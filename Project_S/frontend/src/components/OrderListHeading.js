import { Fragment } from 'react';

import classes from './OrderListHeading.module.css';

function OrderListHeading() {
    return (
        <Fragment>
            <div className={classes['order-head']}>
                <div className={`${classes.heading} ${classes.name}`}>Name</div>
                <div className={`${classes.heading} ${classes.name}`}>Item</div>
                <div className={`${classes.heading} ${classes.odrs}`}>C Odrs</div>
                <div className={`${classes.heading} ${classes.odrs}`}>Total</div>
                <div className={`${classes.heading} ${classes.status}`}>Status</div>
                <div className={`${classes.heading} ${classes.status} ${classes.handled}`}>HandledBy</div>
                <div className={`${classes.heading} ${classes.status}`}>Clock</div>
            </div>
        </Fragment>
    );
}

export default OrderListHeading;