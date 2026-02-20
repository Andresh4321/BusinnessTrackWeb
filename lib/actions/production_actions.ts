"use server";
import { productionAPI } from '../api/endpoints';

export const createProductionAction = async (formData: any) => {
  try {
    const response = await productionAPI.create(formData);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response?.data?.message || 'Failed to create production' };
  }
};

export const getProductionsAction = async () => {
  try {
    const response = await productionAPI.getAll();
    return { success: true, data: response.data.data };
  } catch (error: any) {
    return { success: false, error: error.response?.data?.message || 'Failed to fetch productions' };
  }
};

export const completeProductionAction = async (id: string, actualOutput: number) => {
  try {
    const response = await productionAPI.complete(id, actualOutput);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response?.data?.message || 'Failed to complete production' };
  }
};

export const deleteProductionAction = async (id: string) => {
  try {
    await productionAPI.delete(id);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.response?.data?.message || 'Failed to delete production' };
  }
};
