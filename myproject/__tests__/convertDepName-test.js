"use strict";
import {convertDepName} from "../src/components/Protocol";
import department from "../src/dataDepartments"


test('Проверка подстановки названия кафедры', () =>{

  expect (convertDepName("Grado",department)).toBe("Градостроительство")
})

/*
const convertDepName = (code, departments)=> {
  departments.forEach((el) => {
    if(el.code === code){
      code = el.name;
    }
  });
  return code;
};*/
