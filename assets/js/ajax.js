import store from './store';

export function post(path, body) {
  return fetch('/ajax' + path, {
    method: 'post',
    credentials: 'same-origin',
    headers: new Headers(
      {'x-csrf-token': window.csrf_token,
        'content-type': "application/json; charset=UTF-8",
        'accept': 'application/json',
      }),
    body: JSON.stringify(body),
  }).then((resp) => resp.json());
}

export function get(path) {
  let state = store.getState();
  console.log("printing out state from ajax");
  return fetch('/ajax' + path, {
    method: 'get',
    credentials: 'same-origin',
    headers: new Headers(
      {'x-csrf-token': window.csrf_token,
        'content-type': "application/json; charset=UTF-8",
        'accept': 'application/json',
      }),
  }).then((resp) => resp.json());
}

export function get_timesheet(id) {
  get('/timesheets/'+id)
    .then((resp) => {
      store.dispatch(
        {type: 'ADD_TIMESHEETS',
          data: [resp.data],
        });
    });
}

export function list_timesheets() {
  get('/timesheets')
    .then((resp) => {
      console.log("list_timesheets", resp);
      store.dispatch(
        {type: 'ADD_TIMESHEETS',
          data: resp.data,
        });
    });
}

export function list_users() {
  get('/users')
    .then((resp) => {
      console.log("list_users", resp);
      store.dispatch(
        {type: 'ADD_USERS',
          data: resp.data,
        });
    });
}

export function submit_new_timesheet(form) {
  let state = store.getState();
  console.log("state", state);
  let data = state.forms.new_timesheet;

  if (data.user_id === 0) {
    return;
  }

  post('/timesheets', {
    timesheet: {
        date: data.date,
        status: data.status,
        total_hours: data.total_hours,
        user_id: data.user_id,
        tasks: data.tasks,
    }
  }).then((resp) => {
    console.log(resp);
    if (resp.data) {
      store.dispatch(
        {type: 'ADD_TIMESHEETS',
          data: [resp.data],
        });
      form.redirect('/timesheets/' + resp.data.id);
    }
    else {
      store.dispatch(
        { type: 'CHANGE_NEW_TIMESHEET',
          data: {errors: JSON.stringify(resp.errors)},
        });
    }
  });
}

export function submit_login(form) {
  let state = store.getState();
  let data = state.forms.login;

  post('/sessions', data)
    .then((resp) => {
      console.log(resp);
      if (resp.token) {
        localStorage.setItem('session', JSON.stringify(resp));
        store.dispatch(
          {type: 'LOG_IN',
            data: resp,
          });
        form.redirect('/');
      }
      else {
        store.dispatch(
          {type: 'CHANGE_LOGIN',
            data: {errors: JSON.stringify(resp.errors)},
          });
      }
    });
}
