import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

function Contributor({ data, id }) {
  const [createdAt, setCreatedAt] = useState(data.createdAt);
  const [updatedAt, setUpdatedAt] = useState(data.updatedAt);
  const [status, setStatus] = useState();

  const [contributor, setContributor] = useState([]);

  function formatTimestamps() {
    setCreatedAt(dayjs(createdAt).format("DD/MM/YYYY HH:m:s"));
    setUpdatedAt(dayjs(updatedAt).format("DD/MM/YYYY HH:m:s"));
  }

  useEffect(() => {
    formatTimestamps();

    let amount = [];
    delete data._id;
    delete data.createdAt;
    delete data.updatedAt;
    delete data.__v;
    setStatus(data.status.percentage);
    delete data.status;

    Array(data).forEach((obj) => {
      for (const key in obj) {
        amount = [...amount, obj[key]];
      }
    });

    setContributor(amount);
  }, []);

  useEffect(() => {}, [createdAt, updatedAt, contributor]);

  return (
    <tr className={id % 2 === 0 ? "white-row" : "green-row"}>
      <td>{id + 1}</td>

      {contributor.map((data, index) => {
        return (
          <td key={index} className={!data ? "invalid" : ""}>
            {data || "N/A"}
          </td>
        );
      })}

      <td>{status}</td>
      <td>{createdAt}</td>
      <td>{updatedAt}</td>
    </tr>
  );
}

export default Contributor;
