const USER_PATH = 'users';

export const USER_ENDPOINT = {
  GET_LIST: `${USER_PATH}`,
  UPDATE: (id: string) => `${USER_PATH}/${id}`,
  BULK_UPDATE_STATUS: `${USER_PATH}/bulk-update-status`,
};

export const EUserStatus = {
  ACTIVE: 1,
  INACTIVE: 0,
};
