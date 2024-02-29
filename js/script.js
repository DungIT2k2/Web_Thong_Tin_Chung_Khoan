const blackbox = document.querySelector(".super-box");
const stock_content = document.querySelector(".stock-content");
const stock_nav_btn = document.querySelector(".stock-nav");
const blabla_btn = document.querySelector(".blabla");
const chart_content = document.querySelector(".chart_content");
const stock_table = document.querySelector(".stock_table");
const time_option = document.querySelector("#time_option");
const time_Daily = document.querySelector(".time_Daily")
const time_Weekly = document.querySelector(".time_Weekly");
const time_Monthly = document.querySelector(".time_Monthly");
const btn_min = document.querySelectorAll(".btn_min");
const btn_line_graph = document.querySelector(".btn_line_graph");
const btn_col_graph = document.querySelector(".btn_col_graph");

//  START js of CSS
stock_nav_btn.addEventListener("click", () => {
  stock_content.classList.add("show-Content");
  chart_content.classList.add("disable");
  stock_table.classList.remove("disable");
});

btn_line_graph.addEventListener("click",() =>{
  btn_line_graph.style.backgroundColor = "#afa9a9"
  btn_col_graph.style.backgroundColor = "#fff"

})
btn_col_graph.addEventListener("click",() =>{
  btn_col_graph.style.backgroundColor = "#afa9a9"
  btn_line_graph.style.backgroundColor = "#fff"

})

function performAction() {
  // Lấy giá trị của option đã chọn
  var time_option = document.getElementById("time_option").value;
  // Xử lý dựa trên giá trị đã chọn
  if (time_option === "daily") {
    time_Daily.click();
    // Thêm mã xử lý Daily tại đây
  } else if (time_option === "weekly") {
    time_Weekly.click();
    // Thêm mã xử lý Weekly tại đây
  } else if (time_option === "monthly") {
    time_Monthly.click();
    // Thêm mã xử lý Monthly tại đây
  } else if (time_option === "1min") {
    btn_min[0].click();
    // Thêm mã xử lý Monthly tại đây
  }else if (time_option === "5min") {
    btn_min[1].click();
    // Thêm mã xử lý Monthly tại đây
  }else if (time_option === "15min") {
    btn_min[2].click();
    // Thêm mã xử lý Monthly tại đây
  }else if (time_option === "30min") {
    btn_min[3].click();
    // Thêm mã xử lý Monthly tại đây
  }else if (time_option === "60min") {
    btn_min[4].click();
    // Thêm mã xử lý Monthly tại đây
  }
  
}
// END js of CSS