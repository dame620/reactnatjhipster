import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/manager/manager.reducer';

test('attempt retrieving a single manager', () => {
  const state = reducer(INITIAL_STATE, Actions.managerRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.manager).toEqual({ id: undefined });
});

test('attempt retrieving a list of manager', () => {
  const state = reducer(INITIAL_STATE, Actions.managerAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.managerList).toEqual([]);
});

test('attempt updating a manager', () => {
  const state = reducer(INITIAL_STATE, Actions.managerUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a manager', () => {
  const state = reducer(INITIAL_STATE, Actions.managerDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a manager', () => {
  const state = reducer(INITIAL_STATE, Actions.managerSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.manager).toEqual({ id: 1 });
});

test('success retrieving a list of manager', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.managerAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.managerList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a manager', () => {
  const state = reducer(INITIAL_STATE, Actions.managerUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.manager).toEqual({ id: 1 });
});
test('success deleting a manager', () => {
  const state = reducer(INITIAL_STATE, Actions.managerDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.manager).toEqual({ id: undefined });
});

test('failure retrieving a manager', () => {
  const state = reducer(INITIAL_STATE, Actions.managerFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.manager).toEqual({ id: undefined });
});

test('failure retrieving a list of manager', () => {
  const state = reducer(INITIAL_STATE, Actions.managerAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.managerList).toEqual([]);
});

test('failure updating a manager', () => {
  const state = reducer(INITIAL_STATE, Actions.managerUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.manager).toEqual(INITIAL_STATE.manager);
});
test('failure deleting a manager', () => {
  const state = reducer(INITIAL_STATE, Actions.managerDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.manager).toEqual(INITIAL_STATE.manager);
});

test('resetting state for manager', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.managerReset());
  expect(state).toEqual(INITIAL_STATE);
});
