import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Formsss from "./components/Formsss";

axios.defaults.baseURL = "http://localhost:8080/";
function App() {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [formDataEdit, setFormDataEdit] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [dataList, setDataList] = useState([]);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((preve) => {
      return {
        ...preve,
        [name]: value,
     };
  });
};

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post("/create", formData);
      if (data.success) {
        setAddSection(false);
        alert(data.message);
        getFetchData();
        cancelButton()
      }
    } catch (error) {
      alert("something went wrong");
      console.log(error);
    }
  };

  const getFetchData = async () => {
    const data = await axios.get("/");
    if (data.data.success) {
      // setAddSection(false);
      setDataList(data.data.data);
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  const handleDelete = async (id) => {
    const data = await axios.delete("/delete/" + id);
    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
    }
  };

  const handleUpdate = async (e) => {
    try{
      e.preventDefault();
      const data = await axios.put("/update", formDataEdit);
      if (data.data.success) {
        setEditSection(false)
        getFetchData();
        alert(data.data.message);
      }
    }catch (error) {
      alert("something went wrong");
      console.log(error); 
    }
  
  };
  const handleEditOnChange = async (e) => {
    const { value, name } = e.target;
    setFormDataEdit((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleEdit = (el) => {
    setFormDataEdit(el);
    setEditSection(true);
  };

  const cancelButton = () =>{setFormData({
      name: "",
      email: "",
      mobile: "",
  })
}
  const cancelButtonEdit = () =>{setFormDataEdit({
    name: "",
    email: "",
    mobile: "",
})
}

  return (
    <>
      <div className="container">
        <button className="btn btn-add" onClick={() => setAddSection(true)}>
          Add
        </button>

        {addSection && (
          <Formsss
            handleSubmit={handleSubmit}
            handleOnChange={handleOnChange}
            handleClose={() => setAddSection(false)}
            rest={formData}
            cancelButton = {cancelButton}
          />
        )}

        {editSection && (
          <Formsss
            handleSubmit={handleUpdate}
            handleOnChange={handleEditOnChange}
            handleClose={() => setEditSection(false)}
            rest={formDataEdit}
            cancelButton = {cancelButtonEdit}
            
          />
        )}

        <div className="tableContainer">
          <table>
            <thead className="table-head">
              <tr>
                <th>Name</th>
                <th>Class</th>
                <th>Mobile</th>
                <th></th>
              </tr>
            </thead> 
            <tbody>
              {dataList[0] ? (
                dataList.map((item) => {
                  return ( 

                    <tr>       
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.mobile}</td>
                      <td>     
                        <button
                          className="btn btn-edit"
                          onClick={() => {
                            handleEdit(item);
                          }} >
                          Edit
                        </button>
                        <button
                          className="btn btn-delete"
                          onClick={() => handleDelete(item._id)}>
                          Delete 
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <p className="no-data">No data</p>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
