import api from "../utils/api";

const AUTHORS = "authors";

export const listAuthors = async () => {
  const response = await api.get(AUTHORS);
  return response.data;
};

export const getAuthor = async (authorId) => {
  const response = await api.get(`${AUTHORS}/${authorId}`);
  return response.data;
};

export const createAuthor = async (payload) => {
  const response = await api.post(AUTHORS, payload);
  return response.data;
};

export const editAuthor = async (authorId, payload) => {
  const response = await api.put(`${AUTHORS}/${authorId}`, payload);
  return response.data;
};
