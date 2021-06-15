export default {
  namespace: "sage",
  state: {
    index: 213,
  },
  effects: {
    *getType(_, { put }) {
      yield put({ type: "add" });
    },
    *getTypes(_, { put }) {
      yield put({ type: "add" });
    },
  },
  reducers: {
    add() {
      console.log(321312);
      return { a: 123 };
    },
  },
};
