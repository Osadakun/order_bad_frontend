import client from "./client";

export const getOrder = (id: number) => {
  return client.get(`/orders/${id}`);
};

export const getTeams = (id: number) => {
  return client.get(`/orders/${id}/have_team_all`);
};

export const getMembers = (id: number) => {
  return client.get(`/orders/create/${id}`);
};