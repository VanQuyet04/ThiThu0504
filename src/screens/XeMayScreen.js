import React, { useEffect, useState } from 'react';
import { launchCamera, launchImageLibrary, ImagePickerResponse, ImageLibraryOptions } from 'react-native-image-picker';

import { View, TextInput, Button, Text, TouchableOpacity, ScrollView, Modal, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchXeMays, addXeMayAPI, updateXeMayApi, deleteXeMayApi } from '../redux/action/XeMayAction';
import Banner from '../../component/Banner';

const XeMayScreen = () => {

    const [images, setImages] = useState('');

    const commonOptions: OptionsCommon = {
        mediaType: 'photo',
        maxWidth: 500,
        maxHeight: 500,
    }
    const cameraOptions: CameraOptions = {
        cameraType: 'front',
        saveToPhotos: true,
        ...commonOptions,
    }

    const libraryOptions: ImageLibraryOptions = {
        selectionLimit: 1,
        ...commonOptions,
    }

    // hàm chọn ảnh từ camera
    const onOpenLibrary = async () => {
        const response: ImagePickerResponse = await launchImageLibrary(
            libraryOptions,
        );
        if (response?.assets) {
            setImages(response.assets[0].uri);
            setEditHinhAnh(response.assets[0].uri)
        } else {
            Alert.alert('Error', response.errorMessage);
        }

    };
    const onOpenCamera = async () => {

        const response: ImagePickerResponse = await launchCamera(cameraOptions);
        if (response?.assets) {
            setImages(response.assets);
        } else {
            Alert.alert('Error', response.errorMessage);
        }
    };
    // -------------------------------------

    const [tenXe, setTenXe] = useState('');
    const [mauSac, setMauSac] = useState('');
    const [giaBan, setGiaBan] = useState('');
    const [moTa, setMoTa] = useState('');

    const [showAddXeMay, setShowAddXeMay] = useState(false);

    const [editId, setEditId] = useState(null);
    const [editTenXe, setEditTenXe] = useState('');
    const [editMauSac, setEditMauSac] = useState('');
    const [editGiaBan, setEditGiaBan] = useState('');
    const [editMoTa, setEditMoTa] = useState('');
    const [editHinhAnh, setEditHinhAnh] = useState('');

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [deleteId, setDeleteId] = useState(null); // State để lưu trữ id của xe máy cần xóa

    const listXeMay = useSelector(state => state.listXeMay.listXeMay);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchXeMays());
    }, []);

    const handleEdit = (id, tenXe, mauSac, giaBan, moTa, hinhAnh) => {
        setEditId(id);
        setEditTenXe(tenXe);
        setEditMauSac(mauSac);
        setEditGiaBan(giaBan);
        setEditMoTa(moTa);
        setEditHinhAnh(hinhAnh)
    }

    const handleUpdate = () => {
        let duLieuUpdate = {
            id: editId,
            ten_xe_ph35419: editTenXe,
            mau_sac_ph35419: editMauSac,
            gia_ban_ph35419: editGiaBan,
            mo_ta_ph35419: editMoTa,
            hinh_anh_ph35419: editHinhAnh
        };
        dispatch(updateXeMayApi({ id: editId, data: duLieuUpdate }))
            .then((result) => {
                console.log('XeMay updated successfully!');
                setEditId(null);
                setEditTenXe('');
                setEditMauSac('');
                setEditGiaBan('');
                setEditMoTa('');
                setEditHinhAnh('');
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
            mo_ta_ph35419: moTa,
            hinh_anh_ph35419: images
        };
        dispatch(addXeMayAPI(duLieuThem))
            .then((result) => {
                console.log('XeMay added successfully!');
                setTenXe('');
                setMauSac('');
                setGiaBan('');
                setMoTa('');
                setShowAddXeMay(false);
            })
            .catch((error) => {
                console.error('Error adding XeMay:', error);
            });
    }

    const handleDeleteXeMay = async () => {
        if (deleteId) {
            dispatch(deleteXeMayApi(deleteId))
                .then((result) => {
                    console.log('XeMay deleted successfully!');
                    setShowDeleteConfirmation(false);
                    setDeleteId(null);
                })
                .catch((error) => {
                    console.error('Error deleting XeMay:', error);
                });
        }
    }

    return (
        <View >
            <Banner />

            <TouchableOpacity onPress={() => setShowAddXeMay(true)} style={{ backgroundColor: 'gray', margin: 5 }}>
                <Text style={{ textAlign: 'center', marginVertical: 10, color: 'blue' }}>ADD NEW</Text>
            </TouchableOpacity>

            {showAddXeMay && (
                <View style={{ marginHorizontal: 10 }}>
                    <TextInput placeholder="Tên xe" value={tenXe} onChangeText={setTenXe} />
                    <TextInput placeholder="Màu sắc" value={mauSac} onChangeText={setMauSac} />
                    <TextInput placeholder="Giá bán" value={giaBan} onChangeText={setGiaBan} />
                    <TextInput placeholder="Mô tả" value={moTa} onChangeText={setMoTa} />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                        <Text>Ảnh</Text>
                        <Image source={{ uri: editHinhAnh || 'https://i.9mobi.vn/cf/Images/tt/2021/8/20/anh-avatar-dep-54.jpg' }} style={{ width: 100, height: 100 }} />
                        <TouchableOpacity onPress={onOpenLibrary}>
                            <Text style={{ fontWeight: 'bold', color: 'blue' }} >Chọn ảnh</Text>
                        </TouchableOpacity>

                    </View>



                    <Button title="Thêm xe máy" onPress={handleAddXeMay} />
                    <Button title="Thoát" onPress={() => setShowAddXeMay(false)} />
                </View>
            )}

            <ScrollView style={{ marginBottom: 130 }}>
                {
                    listXeMay.map(row => (
                        <View key={row.id} style={{ marginBottom: 30, marginHorizontal: 10, marginTop: 10, borderRadius: 15, padding: 10, borderColor: 'blue', borderWidth: 1 }}>

                            {
                                (editId === row.id) ?
                                    (<>
                                        <TextInput value={editTenXe} placeholder='Nhập tên' onChangeText={setEditTenXe} />
                                        <TextInput value={editMauSac} placeholder='Nhập màu' onChangeText={setEditMauSac} />
                                        <TextInput value={editGiaBan} placeholder='Nhập giá' onChangeText={setEditGiaBan} />
                                        <TextInput value={editMoTa} placeholder='Nhập mô tả' onChangeText={setEditMoTa} />

                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                                            <Text>Ảnh</Text>
                                            <Image source={{ uri: editHinhAnh || 'https://i.9mobi.vn/cf/Images/tt/2021/8/20/anh-avatar-dep-54.jpg' }} style={{ width: 100, height: 100 }} />
                                            <TouchableOpacity onPress={() => {
                                                onOpenLibrary();

                                            }}>
                                                <Text style={{ fontWeight: 'bold', color: 'blue' }} >Chọn ảnh</Text>
                                            </TouchableOpacity>

                                        </View>
                                        <Button title="Update" onPress={handleUpdate} />
                                        <Button title="Thoát" onPress={() => setEditId(null)} />

                                    </>)
                                    :
                                    (
                                        <>
                                            <View>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >

                                                    <View>
                                                        <Text>{row.ten_xe_ph35419}</Text>
                                                        <Text>{row.mau_sac_ph35419} </Text>
                                                        <Text>{row.gia_ban_ph35419} </Text>
                                                        <Text>{row.mo_ta_ph35419} </Text>
                                                    </View>

                                                    <Image source={{ uri: row.hinh_anh_ph35419 }} style={{ width: 100, height: 100 }} />

                                                </View>
                                                <TouchableOpacity onPress={() => { setDeleteId(row.id); setShowDeleteConfirmation(true); }}>
                                                    <Text style={{ color: 'red' }}>Xóa</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => handleEdit(row.id, row.ten_xe_ph35419, row.mau_sac_ph35419, row.gia_ban_ph35419, row.mo_ta_ph35419, row.hinh_anh_ph35419)}>
                                                    <Text>Edit</Text>
                                                </TouchableOpacity>
                                            </View>

                                        </>
                                    )

                            }
                        </View>
                    ))

                }

                {/* Modal xác nhận xóa */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showDeleteConfirmation}
                    onRequestClose={() => setShowDeleteConfirmation(false)}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                            <Text>Bạn có chắc chắn muốn xóa không?</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                                <Button title="Hủy" onPress={() => setShowDeleteConfirmation(false)} />
                                <Button title="Xóa" onPress={handleDeleteXeMay} />
                            </View>
                        </View>
                    </View>
                </Modal>
            </ScrollView>

        </View>
    );
}

export default XeMayScreen;
