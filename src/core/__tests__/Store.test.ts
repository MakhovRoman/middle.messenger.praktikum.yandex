import {Store} from '../Store';

describe('core/Store', () => {
  //Unit-test change state
  it('should be set state', () => {
    const store = new Store({});

    store.set({userId: 123});

    expect(store.getState()).toStrictEqual({userId: 123});
  });

  //Unit-test event
  it('should emit event after store was update', () => {
    // 1 Arrange
		const store = new Store({ userId: 111 });
		const mock = jest.fn();
		store.on('changed', mock);

    // 2 Act
		store.set({ userId: 222 });

    // 3 Assert
		expect(mock).toHaveBeenCalled();
		expect(mock).toHaveBeenCalledTimes(1);
		expect(mock).toHaveBeenCalledWith({ userId: 111 }, { userId: 222 });
	});

  // Unit-test callback
  it('should call callback with store and dispatch when it is function', () => {
		// 1. Arrange
		const store = new Store({ userId: 123 });
		const mock = jest.fn();

		// 2. Act
		store.dispatch(mock, 'PAYLOAD_PARAMS');

		// 3. Assert
		expect(mock).toHaveBeenCalled();
		expect(mock).toHaveBeenCalledTimes(1);
		expect(mock).toHaveBeenCalledWith(expect.anything(), store.getState(), 'PAYLOAD_PARAMS');
	});
});
