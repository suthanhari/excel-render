import React from 'react'
import { Individualdata } from './Individualdata'

export const Data = ({ excelData }) => {
    return excelData.map((individualExcelData) => (
        <tr key={individualExcelData.Id}>
            <Individualdata individualExcelData={individualExcelData} />
        </tr>
    ))
}

