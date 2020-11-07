import { createModel } from '@rematch/core';

import { RootModel } from './types';

type MessagesState = {
  conversations: Array<any>;
  detailsMessages: Array<any>;
  fetched: boolean;
};
const INITIAL_STATE: MessagesState = {
  conversations: [],
  detailsMessages: [],
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
    setDetailsMessage: (state, payload: Array<any>) => {
      return { ...state, detailsMessages: payload };
    },
    reset: () => INITIAL_STATE,
  },
});

export type MessagesModelType = typeof messagesModel;
export default messagesModel;
