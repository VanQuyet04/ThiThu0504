import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchXeMays, addXeMayAPI, updateXeMayApi, deleteXeMayApi } from '../redux/action/XeMayAction';

const XeMayScreen = () => {

    const [tenXe, setTenXe] = useState('');
    const [mauSac, setMauSac] = useState('');
    const [giaBan, setGiaBan] = useState('');
    const [moTa, setMoTa] = useState('');

    const [editId, setEditId] = useState(null); // lưu id cho bản ghi cần sửa 

    const [editTenXe, setEditTenXe] = useState('');
    const [editMauSac, setEditMauSac] = useState('');
    const [editGiaBan, setEditGiaBan] = useState('');
    const [editMoTa, setEditMoTa] = useState('');

    const listXeMay = useSelector(state => state.listXeMay.listXeMay);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchXeMays());
    }, []);

    const handleEdit = (id, tenXe, mauSac, giaBan, moTa) => {
       // truyền tham số từ ô input vào hàm , để set các state dùng để cập nhật lên view  bằng giá trị state ban đầu 
       // truyền tham số để biết dữ liệu của item nào, vì sau khi thêm thì các state đã bị set về rỗng
       //còn ở xác nhận update đã lấy đc dữ liệu rồi,  chỉ cần lấy luôn để gửi dispatch lên redux thôi

        setEditId(id);
        setEditTenXe(tenXe);
        setEditMauSac(mauSac);
        setEditGiaBan(giaBan);
        setEditMoTa(moTa);
    }

    const handleUpdate = () => {
        // dữ liệu update sẽ là các state edit được lấy từ ô input, mỗi lần onchangetext sẽ được lưu ngay vào 
        // state. Vì đc lưu ngay nên ở hàm xác nhận update sẽ k cần truyền , mà lấy luôn 

        let duLieuUpdate = {
            id: editId,
            ten_xe_ph35419: editTenXe,
            mau_sac_ph35419: editMauSac,
            gia_ban_ph35419: editGiaBan,
            mo_ta_ph35419: editMoTa
        };
        // gửi yêu cầu vào redux để xử lí update
        dispatch(updateXeMayApi({ id: editId, data: duLieuUpdate }))
            .then((result) => {
                console.log('XeMay updated successfully!');

                // update thành công sẽ set các state dùng để update các thuộc tínnh về trống
                setEditId(null);
                setEditTenXe('');
                setEditMauSac('');
                setEditGiaBan('');
                setEditMoTa('');
            })
            .catch((error) => {
                console.error('Error updating XeMay:', error);
            });
    }

    const handleAddXeMay = () => {
        let duLieuThem = {
            ten_xe_ph35419: tenXe,
            mau_sac_ph35419: mauSac,
            gia_ban_ph35419: giaBan,
            mo_ta_ph35419: moTa
        };
        dispatch(addXeMayAPI(duLieuThem))
            .then((result) => {
                console.log('XeMay added successfully!');
                setTenXe('');
                setMauSac('');
                setGiaBan('');
                setMoTa('');
            })
            .catch((error) => {
                console.error('Error adding XeMay:', error);
            });
    }

    const handleDeleteXeMay = async (id) => {

        dispatch(deleteXeMayApi(id))
            .then((result) => {
                console.log('XeMay deleted successfully!');
            })
            .catch((error) => {
                console.error('Error deleting XeMay:', error);
            });
    }

    return (
        <View>
            <TextInput placeholder="Tên xe" onChangeText={setTenXe} />
            <TextInput placeholder="Màu sắc" onChangeText={setMauSac} />
            <TextInput placeholder="Giá bán" onChangeText={setGiaBan} />
            <TextInput placeholder="Mô tả" onChangeText={setMoTa} />
            <Button title="Thêm xe máy" onPress={handleAddXeMay} />
            <ScrollView>
                {
                    listXeMay.map(row => (
                        <View key={row.id} style={{ margin: 10, borderRadius: 15, padding: 10, borderColor: 'blue', borderWidth: 1 }}>

                            {
                                (editId === row.id) ?
                                    (<>
                                        <TextInput value={editTenXe} onBlur={handleUpdate} onChangeText={setEditTenXe} />
                                        <TextInput value={editMauSac} onBlur={handleUpdate} onChangeText={setEditMauSac} />
                                        <TextInput value={editGiaBan} onBlur={handleUpdate} onChangeText={setEditGiaBan} />
                                        <TextInput value={editMoTa} onBlur={handleUpdate} onChangeText={setEditMoTa} />
                                        <Button title="Update" onPress={handleUpdate} />
                                    </>)
                                    :
                                    (
                                        <>
                                            <Text>{row.ten_xe_ph35419}</Text>
                                            <Text>{row.mau_sac_ph35419} </Text>
                                            <Text>{row.gia_ban_ph35419} </Text>
                                            <Text>{row.mo_ta_ph35419} </Text>
                                            <TouchableOpacity onPress={() => handleDeleteXeMay(row.id)}>
                                                <Text style={{ color: 'red' }}>Xóa</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => handleEdit(row.id, row.ten_xe_ph35419, row.mau_sac_ph35419, row.gia_ban_ph35419, row.mo_ta_ph35419)}>
                                                <Text>Edit</Text>
                                            </TouchableOpacity>
                                        </>
                                    )
                            }
                        </View>
                    ))

                }
            </ScrollView>

        </View>
    );
}

export default XeMayScreen;