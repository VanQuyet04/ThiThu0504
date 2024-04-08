const XeMayItem = ({ xeMay, onEdit, onDelete }) => {
    const [editMode, setEditMode] = useState(false);
    
    const [editTenXe, setEditTenXe] = useState(xeMay.ten_xe_ph35419);
    const [editMauSac, setEditMauSac] = useState(xeMay.mau_sac_ph35419);
    const [editGiaBan, setEditGiaBan] = useState(xeMay.gia_ban_ph35419);
    const [editMoTa, setEditMoTa] = useState(xeMay.mo_ta_ph35419);

    const handleUpdate = () => {
        const updatedXeMay = {
            id: xeMay.id,
            ten_xe_ph35419: editTenXe,
            mau_sac_ph35419: editMauSac,
            gia_ban_ph35419: editGiaBan,
            mo_ta_ph35419: editMoTa
        };
        onEdit(updatedXeMay);
        setEditMode(false);
    };

    return (
        <View style={{ margin: 10, borderRadius: 15, padding: 10, borderColor: 'blue', borderWidth: 1 }}>
            {editMode ? (
                <>
                    <TextInput value={editTenXe} onChangeText={setEditTenXe} />
                    <TextInput value={editMauSac} onChangeText={setEditMauSac} />
                    <TextInput value={editGiaBan} onChangeText={setEditGiaBan} />
                    <TextInput value={editMoTa} onChangeText={setEditMoTa} />
                    <Button title="Update" onPress={handleUpdate} />
                </>
            ) : (
                <>
                    <Text>{xeMay.ten_xe_ph35419}</Text>
                    <Text>{xeMay.mau_sac_ph35419}</Text>
                    <Text>{xeMay.gia_ban_ph35419}</Text>
                    <Text>{xeMay.mo_ta_ph35419}</Text>
                    <TouchableOpacity onPress={onDelete}>
                        <Text style={{ color: 'red' }}>Xóa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setEditMode(true)}>
                        <Text>Edit</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};

export default XeMayItem;