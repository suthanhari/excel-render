import React from 'react';

export const Individualdata = ({individualExcelData,index}) => {
  return (
    <>
    
    <td key={index}>{individualExcelData.Id}</td>
    <td key={index}>{individualExcelData.name}</td>
    <td key={index}>{individualExcelData.email}</td>
   
    </>
  )
}

