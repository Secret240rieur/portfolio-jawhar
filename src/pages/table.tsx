import "./table.css";
import Navbardown from "./navbardown";
import { CommentSection } from "./commentSection";

const Table = () => {
  const table2tr1 = [
    "Certificat",
    "Starting year",
    "Finishing year",
    "1st year",
    "2nd year",
    "3rd year",
  ];

  return (
    <div className="h-full">
      <div className="Table">
        <h2 style={{ fontSize: "20px" }}>My studies</h2>
        <table>
          <tr>
            {table2tr1.map((value, i) => (
              <th key={i}>{value}</th>
            ))}
          </tr>
          <tr>
            <td>C#</td>
            <td>2019</td>
            <td>2022</td>
            <td colSpan={3}>LaSalle College</td>
          </tr>
          <tr>
            <td>Html5</td>
            <td rowSpan={2}>2022</td>
            <td rowSpan={2}>2023</td>
            <td rowSpan={2}>LaSalle College</td>
            <td colSpan={2} rowSpan={2}></td>
          </tr>
          <tr>
            <td>CSS</td>
          </tr>
          <tr>
            <td>JavaScript</td>
            <td>2021</td>
            <td rowSpan={3}>2023</td>
            <td>self</td>
            <td>LaSalle College</td>
            <td></td>
          </tr>
          <tr>
            <td>React Js</td>
            <td rowSpan={2}>2022</td>
            <td colSpan={3} rowSpan={2} id="last-td">
              self
            </td>
          </tr>
          <tr>
            <td>TypeScript</td>{" "}
          </tr>
        </table>
      </div>
      <CommentSection />
      <Navbardown />
    </div>
  );
};

export default Table;
