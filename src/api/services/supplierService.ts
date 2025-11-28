import apiClient from '../index';
import { SUPPLIER_ENDPOINT } from '@src/constants';
import { PaginatedResponse, SearchParams } from '@src/types';
import {
  SupplierInfoItem,
  SupplierRegistrationFormValues,
  SupplierSite,
} from '@src/types/supplier';

export interface CreateSupplierResponse {
  id: string;
}

export interface UpdateSupplierResponse {
  id: string;
}

export interface UpdateSitesResponse {
  success: boolean;
  message?: string;
}

export interface GetSupplierResponse {
  id: string;
  information: any;
  sites: any[];
}

export const supplierService = {
  createSupplier: async (): Promise<CreateSupplierResponse> => {
    const response = await apiClient.post(SUPPLIER_ENDPOINT.CREATE, {});
    return response.data;
  },

  updateSites: async (
    registrationId: string,
    sites: SupplierSite[],
  ): Promise<UpdateSitesResponse> => {
    const normalizedSites = (sites || []).map((site) => {
      const parsedMinOrderValue = Number(site.minOrderValue);
      const parsedMinOrderQty = Number(site.minOrderQty);

      return {
        ...site,
        ...(Number.isFinite(parsedMinOrderValue)
          ? { minOrderValue: parsedMinOrderValue }
          : {}),
        ...(Number.isFinite(parsedMinOrderQty)
          ? { minOrderQty: parsedMinOrderQty }
          : {}),
      } as SupplierSite;
    });

    const response = await apiClient.put(
      `/registrations/${registrationId}/sites`,
      { sites: normalizedSites },
    );
    return response.data;
  },

  updateSupplier: async (
    id: string,
    data: SupplierRegistrationFormValues,
  ): Promise<UpdateSupplierResponse> => {
    const transformedAddresses = data.information.addresses?.map((address) => ({
      ...address,
      purpose: address.purpose?.map((purposeKey) => ({
        key: purposeKey,
        value: true,
      })),
      line_1: address.line1,
      line_2: address.line2,
    }));

    const normalizedSites = (data.sites || []).map((site: SupplierSite) => {
      const parsedMinOrderValue = Number(site.minOrderValue);
      const parsedMinOrderQty = Number(site.minOrderQty);

      return {
        ...site,
        ...(Number.isFinite(parsedMinOrderValue)
          ? { minOrderValue: parsedMinOrderValue }
          : {}),
        ...(Number.isFinite(parsedMinOrderQty)
          ? { minOrderQty: parsedMinOrderQty }
          : {}),
      } as SupplierSite;
    });

    const payload = {
      ...data.information,
      numberOfEmp: Number(data.information.numberOfEmp) || 0,
      addresses: transformedAddresses,
      sites: normalizedSites,
    };

    const response = await apiClient.patch(
      SUPPLIER_ENDPOINT.UPDATE(id),
      payload,
    );
    return response.data;
  },

  submitSupplier: async (id: string): Promise<void> => {
    await apiClient.post(SUPPLIER_ENDPOINT.SUBMIT(id), {});
  },

  getSupplierById: async (id: string): Promise<GetSupplierResponse> => {
    const response = await apiClient.get(SUPPLIER_ENDPOINT.GET_BY_ID(id));
    const apiData = response.data;

    const transformedAddresses = apiData.addresses?.map((address: any) => ({
      ...address,
      purpose: address.purpose?.map((purposeObj: any) => purposeObj.key),
    }));

    const transformedData: GetSupplierResponse = {
      id: apiData.id,
      information: {
        nameTh: apiData.nameTh || '',
        nameEn: apiData.nameEn || '',
        taxType: apiData.taxType || '',
        taxCountry: apiData.taxCountry || '',
        taxId: apiData.taxId || '',
        businessRelationship: apiData.businessRelationship || '',
        supType: apiData.supType || '',
        supTradingType: apiData.supTradingType || '',
        smeFlag: apiData.smeFlag || '',
        numberOfEmp: Number(apiData.numberOfEmp) || 0,
        productDivision: apiData.productDivision || '',
        productType: apiData.productType || '',
        documentQuality: apiData.documentQuality || '',
        connectionType: apiData.connectionType || '',
        contactPersonName: apiData.contactPersonName || '',
        contactPersonEmail: apiData.contactPersonEmail || '',
        contactPersonPhone: apiData.contactPersonPhone || '',
        buyerId: apiData.buyerId || '',
        buyerPhone: apiData.buyerPhone || '',
        remark: apiData.remark || '',
        juristicType: apiData.juristicType || '',
        commercialTax: apiData.commercialTax || '',
        withholdingTax: apiData.withholdingTax || '',
        distributionArea: apiData.distributionArea || '',
        incorporationCountry: apiData.incorporationCountry || '',
        businessCountry: apiData.businessCountry || '',
        commuLanguage: apiData.commuLanguage || '',
        businessUnits: apiData.businessUnits || [],
        addresses: transformedAddresses || [],
        contacts: apiData.contacts || [],
        payments: apiData.payments || [],
      },
      sites: apiData.sites || [],
    };

    return transformedData;
  },

  getSuppliers: async (
    searchParams: SearchParams,
  ): Promise<PaginatedResponse<SupplierInfoItem>> => {
    const response = await apiClient.get(SUPPLIER_ENDPOINT.GET_LIST(), {
      params: searchParams,
    });
    return response.data;
  },
};
