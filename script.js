class Student {
    constructor(maSV, hoTen, ngaySinh, lopHoc, gpa) {
        this.maSV = maSV;
        this.hoTen = hoTen;
        this.ngaySinh = ngaySinh;
        this.lopHoc = lopHoc;
        this.gpa = parseFloat(gpa);
    }

    updateInfo(newData) {
        this.maSV = newData.maSV;
        this.hoTen = newData.hoTen;
        this.ngaySinh = newData.ngaySinh;
        this.lopHoc = newData.lopHoc;
        this.gpa = parseFloat(newData.gpa);
    }
}

const controller = {
    students: [],

    saveToStorage: function() {
        localStorage.setItem('studentData', JSON.stringify(this.students));
    },

    loadFromStorage: function() {
        const data = localStorage.getItem('studentData');
        if (data) {
            const rawList = JSON.parse(data);
            this.students = rawList.map(item => 
                new Student(item.maSV, item.hoTen, item.ngaySinh, item.lopHoc, item.gpa)
            );
            this.renderTable();
        }
    },

    addStudent: function() {
        const data = this.getInputData();
        if(!data.maSV || !data.hoTen) return alert("Vui lòng nhập đủ thông tin!");

        const newStudent = new Student(data.maSV, data.hoTen, data.ngaySinh, data.lopHoc, data.gpa);
        this.students.push(newStudent);
        
        this.saveToStorage(); 
        this.renderTable();
        this.clearForm();
    },

    saveUpdate: function() {
        const index = document.getElementById('edit-index').value;
        const data = this.getInputData();
        
        this.students[index].updateInfo(data);

        this.saveToStorage(); 
        this.renderTable();
        this.clearForm();
        
        document.querySelector('.btn-add').style.display = 'inline-block';
        document.getElementById('btn-update-submit').style.display = 'none';
    },

    deleteStudent: function(index) {
        if(confirm("Bạn có chắc chắn muốn xóa?")) {
            this.students.splice(index, 1);
            this.saveToStorage();
            this.renderTable();
        }
    },

    getInputData: function() {
        return {
            maSV: document.getElementById('maSV').value,
            hoTen: document.getElementById('hoTen').value,
            ngaySinh: document.getElementById('ngaySinh').value,
            lopHoc: document.getElementById('lopHoc').value,
            gpa: document.getElementById('gpa').value
        };
    },

    renderTable: function() {
        const tbody = document.getElementById('studentList');
        tbody.innerHTML = "";
        this.students.forEach((sv, index) => {
            tbody.innerHTML += `
                <tr>
                    <td>${sv.maSV}</td>
                    <td>${sv.hoTen}</td>
                    <td>${sv.ngaySinh}</td>
                    <td>${sv.lopHoc}</td>
                    <td>${sv.gpa}</td>
                    <td class="actions">
                        <button class="btn-edit" onclick="controller.editStudent(${index})">Sửa</button>
                        <button class="btn-delete" onclick="controller.deleteStudent(${index})">Xóa</button>
                    </td>
                </tr>
            `;
        });
    },

    editStudent: function(index) {
        const sv = this.students[index];
        document.getElementById('maSV').value = sv.maSV;
        document.getElementById('hoTen').value = sv.hoTen;
        document.getElementById('ngaySinh').value = sv.ngaySinh;
        document.getElementById('lopHoc').value = sv.lopHoc;
        document.getElementById('gpa').value = sv.gpa;
        document.getElementById('edit-index').value = index;

        document.querySelector('.btn-add').style.display = 'none';
        document.getElementById('btn-update-submit').style.display = 'inline-block';
    },

    clearForm: function() {
        document.querySelectorAll('#student-form input').forEach(input => input.value = "");
    }
};

window.onload = () => {
    controller.loadFromStorage();
};