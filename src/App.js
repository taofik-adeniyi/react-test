import "./App.css";
import data from "./data/items.json";
import formdata from "./data/form.json";
import React from "react";

function myDate(args) {
  const date = new Date(args);
  const [month, day, year] = [
    date.getMonth(),
    date.getDate(),
    date.getFullYear(),
  ];
  const [hour, minutes, seconds] = [
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ];
  return `${month}/${day}/${year} ${hour}:${minutes}:${seconds}`;
}

function App() {
  const [items, setItems] = React.useState({});
  const [formState, setFormState] = React.useState(false);
  const [formData, setFormData] = React.useState([]);
  const [selectedItem, setSelectedItem] = React.useState(null);
  React.useEffect(() => {
    setItems(data);
  }, [items]);

  React.useEffect(() => {
    setFormData(formdata?.forms);
  }, [items]);

  // console.log('items', items?.collection)
  // console.log("items", items?.collection?.items?.[0]);
  const handleTableRow = (args) => {
    setFormState(!formState);
    // setSelectedItem(args)
    setSelectedItem(args?.entity?.data);
    console.log("args", args?.entity?.data);
  };
  return (
    <div className="table-grid">
      <div className="table-grid-column-one">
        <table cellSpacing="0" cellPadding="0">
          <thead>
          <tr>
            <th>Type</th>
            <th>Summary</th>
            <th>Private</th>
            <th>Status</th>
            <th>Service</th>
            <th>Author</th>
            <th>Created</th>
            <th>Updated</th>
          </tr>
          </thead>
          <tbody>

          {items?.collection?.items &&
            items?.collection?.items.map((item, idx) => {
              const {
                entity: { data },
              } = item;
              // console.log("entity data", data);
              return (
                <tr key={idx} onClick={() => handleTableRow(item)}>
                  <td
                    id="type"
                    title={data?.type?.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      columnGap: ".4rem",
                      maxWidth: "100px",
                    }}
                    >
                    {/* {question_mark} */}
                    <i className="fa fa-question" aria-hidden="true"></i>
                    {data?.type?.prefix + "-" + data?.type?.id}
                  </td>
                  <td id="summary">{data?.summary}</td>
                  <td>
                    {data?.isPrivate ? (
                      <i
                      className="fa fa-check"
                      aria-hidden="true"
                      style={{ color: "green" }}
                      ></i>
                      ) : (
                        // <i
                        //   className="fa fa-star-o"
                        //   aria-hidden="true"
                        //   style={{ color: "red" }}
                        // ></i>
                        <i
                        className="fa fa-times"
                        aria-hidden="true"
                        style={{ color: "red" }}
                        ></i>
                        )}
                  </td>
                  <td>{data?.status?.name}</td>
                  <td>{data?.service ? data?.service?.name : null}</td>
                  <td>{data?.author ? data?.author?.name : null}</td>
                  <td>{myDate(data?.createdOn)}</td>
                  <td>{myDate(data?.updatedOn)}</td>
                </tr>
              );
            })}
          {!items?.collection?.items && (
            <tr>
              <td>No data yet!</td>
            </tr>
          )}
      </tbody>
        </table>
      </div>
      {formState && (
        <div className="form-container">
          {formData.map((item) => {
            console.log("form item", item?.fieldsets);
            return (
              <form>
                <h1>{item?.displayName}</h1>
                {item?.fieldsets?.[0].fields?.map((item, idx) => {
                  console.log('item form', item)
                  return (
                    <div>
                      {/* <label htmlFor={item?.name}>
                        {item?.displayName}
                      </label> */}
                      {item?.type === "select" && (
                        <div style={{ margin: "1rem 0" }}>
                          <label
                            htmlFor={item?.name}
                            style={{ display: "block", marginBottom: '.2rem' }}
                          >
                            {item?.displayName}
                          </label>
                          <select
                          id={item?.name}
                            defaultValue="select"
                            style={{ width: "220px", padding: ".5rem" }}
                          >
                            {item?.["x-options"]?.map((item) => (
                              <>
                                <option value={item?.value}>
                                  {item?.text}
                                </option>
                              </>
                            ))}
                          </select>
                        </div>
                      )}
                      {item?.type === "checkbox" && (
                        <div style={{ display: "flex", margin: "1rem 0" }}>
                          <input type="checkbox" name={item?.name} />
                          <label
                            htmlFor={item?.name}
                            style={{ display: "block" }}
                          >
                            {item?.displayName}
                          </label>
                        </div>
                      )}
                      {item?.type === "text" && (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            margin: "1rem 0",
                          }}
                        >
                          <label htmlFor={item?.name}>{item?.name}</label>
                          <input
                            style={{ width: "220px", padding: ".5rem" }}
                            type="text"
                            value={selectedItem?.summary}
                            onChange={(e) => console.log(e.target.value)}
                            name={item?.name}
                            id={item?.name}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </form>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
