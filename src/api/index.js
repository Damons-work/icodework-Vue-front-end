import request from "./request";
//Person
export const Person = data => {
  return request({
    url: "/project/person/get",
    method: "POST",
    data: {}
  });
};
export const personList = data => {
  return request({
    url: "/project/person/list",
    method: "POST",
    data: {}
  });
};
export const getPerson = data => {
  return request({
    url: "/project/person/list",
    method: "GET",
    params: {
      id: data.id
    }
  });
};
export const insertPerson = data => {
  return request({
    url: "/project/person/insert",
    method: "POST",
    data
  });
};
export const updatePerson = data => {
  return request({
    url: "/project/person/update",
    method: "POST",
    data
  });
};
export const deletePerson = data => {
  return request({
    url: "/project/person/delete",
    method: "POST",
    data
  });
};
export const dictPerson = data => {
  return request({
    url: "/project/person/dict",
    method: "POST",
    data: {}
  });
};

//Program列表
export const getProjectCost = data => {
  return request({
    url: "/project/projectCost/get",
    method: "POST",
    data: {}
  });
};
export const projectCostList = data => {
  return request({
    url: "/project/projectCost/list",
    method: "POST",
    data: {}
  });
};

export const insertProjectCost = data => {
  return request({
    url: "/project/projectCost/insert",
    method: "POST",
    data
  });
};
export const updateProjectCost = data => {
  return request({
    url: "/project/projectCost/update",
    method: "POST",
    data
  });
};
export const deleteProjectCost = data => {
  return request({
    url: "/project/projectCost/delete",
    method: "POST",
    data
  });
};
export const dictProjectCost = data => {
  return request({
    url: "/project/projectCost/dict",
    method: "POST",
    data: {}
  });
};

// export const proList = data => {
//   return request({
//     url: "/project/projectx/list",
//     method: "POST",
//     data: {}
//   });
// };
export const getProgramList = data => {
  return request({
    url: "/project/projectx/list",
    method: "GET",
    params: {
      id: data.id
    }
  });
};
