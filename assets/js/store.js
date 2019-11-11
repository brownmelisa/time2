import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze-strict';

/* Structure of store data:
 * {
 *   forms: {
 *     new_task: {...},
 *     new_timesheet: {...},
 *     edit_timesheet: {...},
 *     new_user: {...},
 *     edit_user: {...},
 *   },
 *   users: Map.new(
 *     1 => {id: 1, name: "Alice Anderson", email: "alice@acme.com", is_manager: true},
 *     ...
 *   ),
 *   timesheets: Map.new(
 *     1 => {id: 1, date: "...", status: "...", total_hours: int, user_id: int,
 *           tasks: [ 1 => { id: 1, hours_worked: int, job_code: "...", note: "...", user_id: int}
 *                   ...]
 *          },
 *     ...
 *   ),
 * }
 */

// define initial state structures
let st0_new_task = {
  hours_worked: 0,
  note: "",
  user_id: 0,
  timesheet_id: 0,
  job_code: "",
  job_id: 0,
  errors: null
};

let st0_new_timesheet = {
  date: "",
  status: "pending",
  total_hours: 0,
  user_id: 0,
  tasks: [{hours_worked: 0, job_code: "", note: ""}],
  errors: null
};

// HELPER REDUCERS FOR FORMS REDUCER
// add a new task row to an existing timesheet
function new_task(st0 = st0_new_task, action) {
  switch (action.type) {
    case 'CHANGE_NEW_TASK':
      return Object.assign({}, st0, action.data);
    default:
      return st0;
  }
}

// start a new timesheet
function new_timesheet( st0 = st0_new_timesheet, action) {
  switch (action.type) {
    case 'CHANGE_NEW_TIMESHEET':
      return Object.assign({}, st0, action.data);
    default:
      return st0;
  }
}

function login(st0 = {email: "", password: "", errors: null}, action) {
  switch(action.type) {
    case 'CHANGE_LOGIN':
      return Object.assign({}, st0, action.data);
    default:
      return st0;
  }
}

// REDUCERS
function forms(st0, action) {
  let reducer = combineReducers({new_task, new_timesheet, login});
  return reducer(st0, action);
}

// get all users
function users(st0 = new Map(), action) {
  return st0;
}
// add timesheets to local collection of timesheets mirroring the timesheets table in the DB
function timesheets(st0 = new Map(), action) {
  switch (action.type) {
    case 'ADD_TIMESHEETS':
      let st1 = new Map(st0);
      for (let timesheet of action.data) {
        st1.set(timesheet.id, timesheet);
      }
      return st1;
    default:
      return st0;
  }
}

let session0 = localStorage.getItem('session');
console.log("Printing out session data in store");
console.log(session0);
if (session0) {
  session0 = JSON.parse(session0);
}

// add session to store
function session(st0 = session0, action) {
  switch (action.type) {
    case 'LOG_IN':
      return action.data;
    case 'LOG_OUT':
      return null;
    default:
      return st0;
  }
}

// ROOT REDUCER
function root_reducer(st0, action) {
  console.log("root reducer", st0, action);
  let reducer = combineReducers(
    {forms,
      users,
      timesheets,
      session,
    });
  return deepFreeze(reducer(st0, action));
}

let store = createStore(root_reducer);
export default store;
