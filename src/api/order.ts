import client from "./client";
import { CreateOrder } from "../types/create_order";

export const getOrder = (id: number) => {
  return client.get(`/orders/show_order/${id}`);
};

export const getTeams = (id: number) => {
  return client.get(`/orders/${id}/have_team_all`);
};

export const getMembers = (id: number) => {
  return client.get(`/orders/create/${id}`);
};

export const createOrder  = (params: CreateOrder) => {
  return client.post('/orders/submit', params)
}