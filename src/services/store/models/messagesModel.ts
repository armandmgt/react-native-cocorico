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
    setConversationsList: (
      state,
      payload: {
        lastMessage: Array<any>;
        participants: Array<any>;
        threads: Array<any>;
        ref: string;
      },
    ) => {
      const { ref } = payload;
      const convIndex = state.conversations.findIndex(
        (elem) => elem.ref === ref,
      );

      if (convIndex === -1) {
        const newConv = [...state.conversations];
        newConv.push(payload);
        return { ...state, conversations: newConv, fetched: true };
      }
      return {
        ...state,
        fetched: true,
        conversations: [
          ...state.conversations.slice(0, convIndex),
          payload,
          ...state.conversations.slice(convIndex + 1),
        ],
      };
    },
    reset: () => INITIAL_STATE,
  },
});

export type MessagesModelType = typeof messagesModel;
export default messagesModel;
