import { createModel } from '@rematch/core';

import { RootModel } from './types';

type MessagesState = {
  conversations: Array<any>;
  fetched: boolean;
};
const INITIAL_STATE: MessagesState = {
  conversations: [],
  fetched: false,
};

const messagesModel = createModel<RootModel>()({
  state: INITIAL_STATE,
  reducers: {
    setFetched: (state, payload: boolean) => {
      return { ...state, fetched: payload };
    },
    setConversationsList: (state, payload: Array<any>) => {
      return {
        ...state,
        conversations: payload,
        fetched: true,
      };
    },
    reset: () => INITIAL_STATE,
  },
});

export type MessagesModelType = typeof messagesModel;
export default messagesModel;
