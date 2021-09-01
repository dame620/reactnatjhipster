import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/appointment/appointment.reducer';

test('attempt retrieving a single appointment', () => {
  const state = reducer(INITIAL_STATE, Actions.appointmentRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.appointment).toEqual({ id: undefined });
});

test('attempt retrieving a list of appointment', () => {
  const state = reducer(INITIAL_STATE, Actions.appointmentAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.appointmentList).toEqual([]);
});

test('attempt updating a appointment', () => {
  const state = reducer(INITIAL_STATE, Actions.appointmentUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a appointment', () => {
  const state = reducer(INITIAL_STATE, Actions.appointmentDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a appointment', () => {
  const state = reducer(INITIAL_STATE, Actions.appointmentSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.appointment).toEqual({ id: 1 });
});

test('success retrieving a list of appointment', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.appointmentAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.appointmentList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a appointment', () => {
  const state = reducer(INITIAL_STATE, Actions.appointmentUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.appointment).toEqual({ id: 1 });
});
test('success deleting a appointment', () => {
  const state = reducer(INITIAL_STATE, Actions.appointmentDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.appointment).toEqual({ id: undefined });
});

test('failure retrieving a appointment', () => {
  const state = reducer(INITIAL_STATE, Actions.appointmentFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.appointment).toEqual({ id: undefined });
});

test('failure retrieving a list of appointment', () => {
  const state = reducer(INITIAL_STATE, Actions.appointmentAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.appointmentList).toEqual([]);
});

test('failure updating a appointment', () => {
  const state = reducer(INITIAL_STATE, Actions.appointmentUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.appointment).toEqual(INITIAL_STATE.appointment);
});
test('failure deleting a appointment', () => {
  const state = reducer(INITIAL_STATE, Actions.appointmentDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.appointment).toEqual(INITIAL_STATE.appointment);
});

test('resetting state for appointment', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.appointmentReset());
  expect(state).toEqual(INITIAL_STATE);
});
