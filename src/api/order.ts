import client from "./client";
import { CreateOrder } from "../types/create_order";

export const getOrder = (eventName: string, currentUserId: number) => {
  return client.get(`/orders/show_order/${eventName}/${currentUserId}`);
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