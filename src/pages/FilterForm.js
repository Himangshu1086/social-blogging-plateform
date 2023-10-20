import { useState } from "react";
import style from "./FilterForm.module.css";

function parseDate(dateString) {
  const [day, month, year] = dateString.split("/");
  return new Date(`${year}-${month}-${day}`);
}

function FilterForm({ yourPosts, setDisplayPosts, setFilterFormVisible }) {
  const [date, setDate] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setFilterFormVisible(false);

    setDisplayPosts(yourPosts);
    setDisplayPosts((c) => {
      return c.filter((elm) => {
        let date1 = new Date(parseDate(elm.publishDate));
        let date2 = new Date(date);
        console.log(date1, date2);
        return (
          date1.getDate() === date2.getDate() &&
          date1.getMonth() === date2.getMonth() &&
          date1.getFullYear() === date2.getFullYear()
        );
      });
    });
  }

  return (
    <div className="FilterForm">
      <div className={style.overlay}>
        <form className={style.form_filter} onSubmit={handleSubmit}>
          <label for="form_filter_Date" className={style.form_post_label}>
            Search Date
          </label>
          <input
            type="date"
            name="form_filter_Date"
            className={style.form_post_entry}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <input type="submit" value="Submit" className={style.submit} />
          <span
            className={style.cross}
            onClick={() => setFilterFormVisible(false)}
          >
            &times;
          </span>
        </form>
      </div>
    </div>
  );
}

export default FilterForm;
