export default {
  namespace: "reduce",
  state: {
    index: 213,
  },
  effects: {
    *getType(_, { put }) {
      yield put({ type: "add" });
    },
  },
  reducers: {
    add(state) {
      console.log(state,321)
      return { ...state, a: 1 };
    },
  },
};
