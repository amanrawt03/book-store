const api = 'http://localhost:3000'
const fetchUserAddressApi = `${api}/api/auth/checkAddress`
const AddUserAddressApi = `${api}/api/auth/addAddress`
const confirmOTPApi = `${api}/api/cart/confirmOTP`
const requestOTPApi = `${api}/api/cart/requestOTP`
const createOrderApi = `${api}/api/cart/createOrder`
export {
    fetchUserAddressApi,
    AddUserAddressApi,
    confirmOTPApi,
    requestOTPApi,
    createOrderApi
}