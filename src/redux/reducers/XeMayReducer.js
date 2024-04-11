import { createSlice } from "@reduxjs/toolkit";
import { addXeMayAPI, deleteXeMayApi, updateXeMayApi } from "../action/XeMayAction";

//1. khai báo khởi tạo state
const initialState = {
  listXeMay: [] // chứa danh sách công việc
}

//2. thiết lập cho reducer và định nghĩa các action
const xemaySlice = createSlice({

  name: 'xemay',
  initialState,
  reducers: {
    addXeMay: (state, action) => {
      state.listXeMay.push(action.payload);
    }
  },
  extraReducers: builder => {


    // sau khi gọi api xong mới gọi vào đây
    builder.addCase(deleteXeMayApi.fulfilled, (state, action) => {
      // Xóa xemay cụ bộ trên store để không phải load lại danh sách
      state.listXeMay = state.listXeMay.filter(row => row.id !== action.payload);

    }).addCase(deleteXeMayApi.rejected, (state, action) => {
      // Xử lý khi yêu cầu xóa XeMay bị từ chối hoặc xảy ra lỗi
      console.log('Delete XeMay rejected:', action.error.message);
    });

    builder.addCase(addXeMayAPI.fulfilled, (state, action) => {
      state.listXeMay.push(action.payload);
    })

    builder.addCase(updateXeMayApi.fulfilled, (state, action) => {
      // lấy tham số truyền vào
      // console.log(action);
      const { id, ten_xe_ph35419, mau_sac_ph35419, gia_ban_ph35419, mo_ta_ph35419, hinh_anh_ph35419 } = action.payload;
      // tìm bản ghi phù hợp với tham số truyền vào
      const xemay = state.listXeMay.find(row => row.id === id);
      // update
      if (xemay) {
        xemay.ten_xe_ph35419 = ten_xe_ph35419;
        xemay.mau_sac_ph35419 = mau_sac_ph35419;
        xemay.gia_ban_ph35419 = gia_ban_ph35419;
        xemay.mo_ta_ph35419 = mo_ta_ph35419;
        xemay.hinh_anh_ph35419 = hinh_anh_ph35419
      }

    })


  },
})

// export các thành phần để bên screen có thể sử dụng
export const { addXeMay } = xemaySlice.actions;
export default xemaySlice.reducer;
