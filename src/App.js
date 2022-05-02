import { useState } from 'react';
import './App.css';
import * as XLSX from "xlsx";
import { Data } from './component/Data';

function App() {

  const [excelFile, setExcelfile] = useState(null);
  const [excelError, setExcelerror] = useState(null);

  const [excelData, setExcelData] = useState(null);
  const fileType = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]

  const handleFile = (e) => {
    let files = e.target.files[0];

    if (files) {

      
      if (files && fileType.includes(files.type)) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(files)
        reader.onload = (e) => {
          setExcelerror(null)
          setExcelfile(e.target.result);
        }
      } else {
        setExcelerror("Please select only excel Files");
        setExcelfile(null);
      }
    } else {
      console.log("file not selected");
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workBook = XLSX.read(excelFile, { type: "buffer" });
      const workSheetName = workBook.SheetNames[0];
      const workSheet = workBook.Sheets[workSheetName];
      const data = XLSX.utils.sheet_to_json(workSheet);
      setExcelData(data);
    } else {
      setExcelData(null)
    }
  }
  return (
    <>
      <div className='container'>
        <div className='row mt-2 d-flex justify-content-center'>
          <div className='col-md-6'>
            <div className='mb-3'>

              <form onSubmit={handleSubmit} autoComplete={"off"}>
                <input type={'file'} onChange={handleFile} className={'form-control'} />
                {
                  <p>{excelError}</p>
                }
                <button type='submit' className='btn btn-info'>Submit</button>
              </form>
            </div>
          </div>
        </div>
        <div className='row mt-2 d-flex justify-content-center'>
          <div className='col-md-6'>
            {
              excelData === null && <p>No File Selected</p>
            }
            {
              excelData !== null
              && (
               
                  <table className='table'>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      <Data excelData={excelData} />

                    </tbody>
                  </table>
            
              )

            }
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
