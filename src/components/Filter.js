import style from "./Filter.module.css";

function Filter({ setFilterFormVisible }) {
  return (
    <div className={style.ops} onClick={() => setFilterFormVisible(true)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
        />
      </svg>
      <p>Filter</p>
      {/* <div class="filterOptions hidden">
      <div class="noFilter">No Filter</div>
      <div class="filterHigh">High</div>
      <div class="filterLow">Low</div>
      <div class="filterMedium">Medium</div>
      <div class="filterDone">Complete</div>
      <div class="filterNotDone">Not complete</div>
      <div class="categoryFilter">Category Filter</div>
    </div> */}
    </div>
  );
}

export default Filter;
