import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/adviser/adviser.reducer';

test('attempt retrieving a single adviser', () => {
  const state = reducer(INITIAL_STATE, Actions.adviserRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.adviser).toEqual({ id: undefined });
});

test('attempt retrieving a list of adviser', () => {
  const state = reducer(INITIAL_STATE, Actions.adviserAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.adviserList).toEqual([]);
});

test('attempt updating a adviser', () => {
  const state = reducer(INITIAL_STATE, Actions.adviserUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a adviser', () => {
  const state = reducer(INITIAL_STATE, Actions.adviserDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a adviser', () => {
  const state = reducer(INITIAL_STATE, Actions.adviserSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.adviser).toEqual({ id: 1 });
});

test('success retrieving a list of adviser', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.adviserAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.adviserList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a adviser', () => {
  const state = reducer(INITIAL_STATE, Actions.adviserUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.adviser).toEqual({ id: 1 });
});
test('success deleting a adviser', () => {
  const state = reducer(INITIAL_STATE, Actions.adviserDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.adviser).toEqual({ id: undefined });
});

test('failure retrieving a adviser', () => {
  const state = reducer(INITIAL_STATE, Actions.adviserFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.adviser).toEqual({ id: undefined });
});

test('failure retrieving a list of adviser', () => {
  const state = reducer(INITIAL_STATE, Actions.adviserAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.adviserList).toEqual([]);
});

test('failure updating a adviser', () => {
  const state = reducer(INITIAL_STATE, Actions.adviserUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.adviser).toEqual(INITIAL_STATE.adviser);
});
test('failure deleting a adviser', () => {
  const state = reducer(INITIAL_STATE, Actions.adviserDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.adviser).toEqual(INITIAL_STATE.adviser);
});

test('resetting state for adviser', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.adviserReset());
  expect(state).toEqual(INITIAL_STATE);
});
