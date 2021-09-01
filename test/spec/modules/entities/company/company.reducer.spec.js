import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/company/company.reducer';

test('attempt retrieving a single company', () => {
  const state = reducer(INITIAL_STATE, Actions.companyRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.company).toEqual({ id: undefined });
});

test('attempt retrieving a list of company', () => {
  const state = reducer(INITIAL_STATE, Actions.companyAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.companyList).toEqual([]);
});

test('attempt updating a company', () => {
  const state = reducer(INITIAL_STATE, Actions.companyUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a company', () => {
  const state = reducer(INITIAL_STATE, Actions.companyDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a company', () => {
  const state = reducer(INITIAL_STATE, Actions.companySuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.company).toEqual({ id: 1 });
});

test('success retrieving a list of company', () => {
  const state = reducer(INITIAL_STATE, Actions.companyAllSuccess([{ id: 1 }, { id: 2 }]));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.companyList).toEqual([{ id: 1 }, { id: 2 }]);
});

test('success updating a company', () => {
  const state = reducer(INITIAL_STATE, Actions.companyUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.company).toEqual({ id: 1 });
});
test('success deleting a company', () => {
  const state = reducer(INITIAL_STATE, Actions.companyDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.company).toEqual({ id: undefined });
});

test('failure retrieving a company', () => {
  const state = reducer(INITIAL_STATE, Actions.companyFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.company).toEqual({ id: undefined });
});

test('failure retrieving a list of company', () => {
  const state = reducer(INITIAL_STATE, Actions.companyAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.companyList).toEqual([]);
});

test('failure updating a company', () => {
  const state = reducer(INITIAL_STATE, Actions.companyUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.company).toEqual(INITIAL_STATE.company);
});
test('failure deleting a company', () => {
  const state = reducer(INITIAL_STATE, Actions.companyDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.company).toEqual(INITIAL_STATE.company);
});

test('resetting state for company', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.companyReset());
  expect(state).toEqual(INITIAL_STATE);
});
