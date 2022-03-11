//Action creater

const newBooking = (name, amount) => {
  return {
    type: "NEW_BOOKING",
    payload: {
      name,
      amount,
    },
  };
};

const cancelBooking = (name, refundAmount) => {
  return {
    type: "CANCEL_BOOKING",
    payload: {
      name,
      refundAmount,
    },
  };
};

//Reducers

const reservationHistory = (oldReservationList = [], action) => {
  if (action.type === "NEW_BOOKING") {
    return [...oldReservationList, action.payload];
  } else if (action.type === "CANCEL_BOOKING") {
    return oldReservationList.filter((record) => {
      return record.name !== action.payload.name;
    });
  }
  return oldReservationList;
};

const cancellationHistory = (cancellationList = [], action) => {
  if (action.type === "CANCEL_BOOKING") {
    return [...cancellationList, action.payload];
  }
  return cancellationList;
};

const accounting = (totalMoney = 100, action) => {
  if (action.type === "NEW_BOOKING") {
    return totalMoney + action.payload.amount;
  } else if (action.type === "CANCEL_BOOKING") {
    return totalMoney - action.payload.refundAmount;
  }
  return totalMoney;
};
console.log(Redux);
const { createStore, combineReducers } = Redux;

const railwayCentralStore = combineReducers({
  accounting: accounting,
  cancellationHistory: cancellationHistory,
  reservationHistory: reservationHistory,
});

const store = createStore(railwayCentralStore);

store.dispatch(newBooking("Mukesh", 20));
store.dispatch(newBooking("saranya", 30));
store.dispatch(newBooking("krithika", 50));
store.dispatch(cancelBooking("Mukesh", 10));

console.log(store.getState());
