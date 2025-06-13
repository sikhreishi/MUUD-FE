import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://muud-project.onrender.com/api',

    prepareHeaders: async (headers, { getState }) => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: '/auth/register',
        method: 'POST',
        body: credentials,
      }),
    }),
    createJournalEntry: builder.mutation({
      query: (entry) => ({
        url: '/journal/entry',
        method: 'POST',
        body: entry,
      }),
    }),
    getJournalEntries: builder.query({
      query: (userId) => ({
        url: `/journal/user/${userId}`,
        method: 'GET',
      }),
    }),
    addJournalEntry: builder.mutation({
      query: (entry) => ({
        url: '/journal',
        method: 'POST',
        body: entry,
      }),
    }),
    addContact: builder.mutation({
      query: (contact) => ({
        url: '/contacts/add',
        method: 'POST',
        body: contact,
      }),
    }),
    getContacts: builder.query({
      query: (userId) => ({
        url: `/contacts/user/${userId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useCreateJournalEntryMutation,
  useGetJournalEntriesQuery,
  useAddJournalEntryMutation,
  useGetContactsQuery,
  useAddContactMutation,
} = apiSlice; 