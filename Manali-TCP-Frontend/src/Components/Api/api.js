const API_HOST = "http://localhost:7001/api"; // to be kept in the env
export const api = {
  //   allTeam: (pageLimit: Number, pageNo: Number) =>
  //     `/api/teams/get-all?pageLimit=${pageLimit}&pageNo=${pageNo}`,
  login: () => `${API_HOST}/user/signup`,
  signup: () => `${API_HOST}/user/signup`,
  logout: () => `${API_HOST}/user/logout`,
  userDetails: () => `${API_HOST}/user/details`,
  setBookingDetails: () => `${API_HOST}/bookings/bookPlace`,
  getBookingDetails: () => `${API_HOST}/bookings/details`,
};
