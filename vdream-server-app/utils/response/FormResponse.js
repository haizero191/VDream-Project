

/**
 * đóng gói các dữ liệu trả về theo khuôn mẫu khi đã hoàn thành xử lý request từ server.
 * @param {boolean} success Status of response form
 * @param {any} data Data of response form
 * @param {string} message Message of response form
 * @returns Return a Object
 */
const FormResponse = (success, data, message) => {
  return {
    success: success || false,
    data: data || null,
    message: message || "No message response !",
  };
};

module.exports = FormResponse;