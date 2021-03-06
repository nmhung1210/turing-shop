import { IAttribute, IAttributeProductValue, IAttributeValue } from '../models/schemas';
import api from './webApi';

export function apiGetAttributes (): Promise<IAttribute[]> {
  return api.get('/attributes');
}

export function apiGetAttributeById (id: number): Promise<IAttribute> {
  // According to https://backendapi.turing.com/docs/#/attributes/get_attributes__attribute_id_,
  // The result the API is an array. It should return an object of attribute instead.
  // TODO: double check with backend team for this case.
  return api.get(`/attributes/${id}`).then((result) => result.pop());
}

export function apiGetAttributeValueById (id: number): Promise<IAttributeValue> {
  return api.get(`/attributes/values/${id}`);
}

export function apiGetAttributesByProductId (id: number): Promise<IAttributeProductValue[]> {
  return api.get(`/attributes/inProduct/${id}`);
}
