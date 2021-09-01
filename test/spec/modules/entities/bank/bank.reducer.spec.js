import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/bank/bank.reducer';

test('attempt retrieving a single bank', () => {
  const state = reducer(INITIAL_STATE, Actions.bankRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.bank).toEqual({ id: undefined });
});

test('attempt retrieving a list of bank', () => {
  const state = reducer(INITIAL_STATE, Actions.bankAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.bankList).toEqual([]);
});

test('attempt updating a bank', () => {
  const state = reducer(INITIAL_STATE, Actions.bankUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a bank', () => {
  const state = reducer(INITIAL_STATE, Actions.bankDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a bank', () => {
  const state = reducer(INITIAL_STATE, Actions.bankSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.bank).toEqual({ id: 1 });
});

test('success retrieving a list of bank', () => {
  const state = reducer(INITIAL_STATE, Actions.bankAllSuccess([{ id: 1 }, { id: 2 }]));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.bankList).toEqual([{ id: 1 }, { id: 2 }]);
});

test('success updating a bank', () => {
  const state = reducer(INITIAL_STATE, Actions.bankUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.bank).toEqual({ id: 1 });
});
test('success deleting a bank', () => {
  const state = reducer(INITIAL_STATE, Actions.bankDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.bank).toEqual({ id: undefined });
});

test('failure retrieving a bank', () => {
  const state = reducer(INITIAL_STATE, Actions.bankFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.bank).toEqual({ id: undefined });
});

test('failure retrieving a list of bank', () => {
  const state = reducer(INITIAL_STATE, Actions.bankAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.bankList).toEqual([]);
});

test('failure updating a bank', () => {
  const state = reducer(INITIAL_STATE, Actions.bankUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.bank).toEqual(INITIAL_STATE.bank);
});
test('failure deleting a bank', () => {
  const state = reducer(INITIAL_STATE, Actions.bankDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.bank).toEqual(INITIAL_STATE.bank);
});

test('resetting state for bank', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.bankReset());
  expect(state).toEqual(INITIAL_STATE);
});
