import BASE_URL from "./baseurl";
import { commonRequest } from "./commonReq";

//register
export const registerEmployee=async(body,headers)=>{
    return commonRequest('POST',`${BASE_URL}/employees/register`,body,headers)
}

//get employees
export const getEmployees=async(searchData)=>{
    return commonRequest('GET',`${BASE_URL}/employees/getEmployees?search=${searchData}`,"")
}

//get single employee data
export const getSingleEmployees=async(id)=>{
    return commonRequest('GET',`${BASE_URL}/employees/getSingleEmployee/${id}`,"")
}

//delete single employee data
export const deleteEmp=async(id)=>{
    return commonRequest('DELETE',`${BASE_URL}/employees/deleteEmp/${id}`,"")
}

//edit employee
export const editEmpl=async(id,body,header)=>{
    return commonRequest('POST',`${BASE_URL}/employees/editEmployee/${id}`,body,header)
    
}
