import { createAsyncThunk } from '@reduxjs/toolkit';
import { addXeMay } from '../reducers/XeMayReducer';

const api_url = 'http://192.168.2.9:3000/XeMay';

// ở đây cung cấp các action fetch, thêm sửa xóa , sau đấy export đi các class khác để sử dụng, cụ thể là reducers
// cung cấp khung api, còn xử lí sâu hơn cần vào reducer

export const fetchXeMays = () => {
  return async dispatch => {
    try {
      const response = await fetch(api_url);
      const data = await response.json();
      
      // dữ liệu lấy được từ api về, duyệt mảng và lưu vào store của redux
      console.log(data);
      data.forEach(row => {

        dispatch(addXeMay(row));

      });
    } catch (error) {
      console.error('Error fetching xemays:', error);
    }
  };
};


export const deleteXeMayApi = createAsyncThunk(
  'xemay/deleteXeMayApi',
  async (id, thunkAPI) => {
    try {
      // Gửi yêu cầu DELETE đến API để xóa xemay
      const response = await fetch(`${api_url}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Sau khi xóa thành công, trả về id của xemay đã xóa để cập nhật store
        return id;
      } else {
        // Nếu có lỗi từ phía server, trả về lỗi
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData);
      }
    } catch (error) {
      // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const addXeMayAPI = createAsyncThunk(
  'xemay/addXeMayAPI',
  async (objXeMay, thunkAPI) => {
    console.log(objXeMay);
    try {
      const response = await fetch(api_url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(objXeMay)
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        // Nếu có lỗi từ phía server, trả về lỗi
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData);
      }
    } catch (error) {
      // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const updateXeMayApi = createAsyncThunk(
  'xemay/updateXeMayApi',
  async (objUpdate, thunkAPI) => {
    try {
      // Gửi yêu cầu DELETE đến API để xóa xemay

      const response = await fetch(`${api_url}/${objUpdate.id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(objUpdate.data)
      });

      const data = await response.json();
      // Kiểm tra nếu status code là 200 hoặc 204 thì xóa thành công
      if (response.ok) {
        // Sau khi Sửa thành công, trả về data kết quả để cập nhật store

        return data;
      } else {
        // Nếu có lỗi từ phía server, trả về lỗi
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData);
      }
    } catch (error) {
      // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);






