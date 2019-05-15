
selectedRow = null;
function onFormSubmit() {
    if (validation()) {
        if (selectedRow == null) {
            let post = myInput();
            newPost(post);
        }
        else {
            let contact = myInput();
            updateRecord(contact)
            resetForm()
        }
    }
}

const url = "http://localhost:4000/contacts";

function view() {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            let tbody = document.getElementById("table-row");
            tbody.innerHTML = "";
            data.map(item => {

                let row = tbody.insertRow();
                let id = row.insertCell(0);
                let fullName = row.insertCell(1);
                let phoneNumber = row.insertCell(2);
                let email = row.insertCell(3);
                let gender = row.insertCell(4);
                let action = row.insertCell(5);

                id.innerHTML = item.id;
                fullName.innerHTML = item.fullName;
                phoneNumber.innerHTML = item.phoneNumber;
                email.innerHTML = item.email;
                gender.innerHTML = item.gender;
                action.innerHTML = `<a href="#" id="edit" onclick="onEdit(this)">Edit<i class='fas fa-pencil-alt'></i></a>
                                <a href="#" id="hapus"  onclick="remove(`+ item.id + `)">Delete<i class='fas fa-user-times'></i></a>`
            })
        }

        )


}


// function input data baru
const myInput = () => {
    let fullName = document.getElementById("fullName");
    let phoneNumber = document.getElementById("phone");
    let email = document.getElementById("email");
    let gender = document.getElementById("gender");
    let result = {
        "fullName": fullName.value,
        "phoneNumber": phoneNumber.value,
        "email": email.value,
        "gender": gender.value
    }
    return result;
}



// function tambah data
const newPost = post => {
    const option = {
        method: 'POST',
        body: JSON.stringify(post),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }
    return fetch(url, option)
        .then((respons) => view())
        .catch((error) => console.error(`error: ${error}`))

}
// function validasi form tambah data
function validation() {
    let fullName = document.getElementById("fullName").value;
    let phoneNumber = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let number = /^[0-9]+$/
    isValid = true;
    // jika input nama kosong
    if (fullName == "") {
        isValid = false;
        // berikan pesan kesalahan
        let error = document.getElementById("errName");
        error.innerHTML = `<div class="alert alert-warning" role="alert">
        Nama Tidak Boleh Kosong !
      </div>`
        return false
    } else {
        // hilangkan pesan kesalahan
        isValid = true;
        let error = document.getElementById("errName");
        error.innerHTML = "";
    }
    if (phoneNumber == "") {
        isValid = false;
        // berikan pesan kesalahan
        let error = document.getElementById("errPhone");
        error.innerHTML = `<div class="alert alert-warning" role="alert">
        Nomor Telpon Tidak Boleh Kosong !
      </div>`
        return false;
    } else if (phoneNumber.length < 12) {
        isValid = false;
        // berikan pesan kesalahan
        let error = document.getElementById("errPhone");
        error.innerHTML = `<div class="alert alert-warning" role="alert">
        Nomor Telpon Minimal 12 karakter !
      </div>`
        return false;
    }
    else if (!phoneNumber.match(number)) {
        isValid = false;
        // berikan pesan kesalahan
        let error = document.getElementById("errPhone");
        error.innerHTML = `<div class="alert alert-warning" role="alert">
        Nomor Telpon Harus berupa angka !
      </div>`
        return false;
    }
    else {
        isValid = true;
        let error = document.getElementById("errPhone");
        error.innerHTML = "";
    }
    if (email == "") {
        isValid = false;
        // berikan pesan kesalahan
        let error = document.getElementById("errEmail");
        error.innerHTML = `<div class="alert alert-warning" role="alert">
        Email Tidak Boleh Kosong !
      </div>`
        return false;
    } else {
        isValid = true;
        let error = document.getElementById("errEmail");
        error.innerHTML = "";
    }
    return isValid;
}

// function ketika tombol edit di klik
function onEdit(td) {
    // menentukan isi value yang akan di kirim ke form submit
    selectedRow = td.parentElement.parentElement;
    document.getElementById("id").value = selectedRow.cells[0].innerHTML;
    document.getElementById("fullName").value = selectedRow.cells[1].innerHTML;
    document.getElementById("phone").value = selectedRow.cells[2].innerHTML;
    document.getElementById("email").value = selectedRow.cells[3].innerHTML;
    document.getElementById("gender").value = selectedRow.cells[4].innerHTML;
}


// function untuk edit value
function updateRecord(contact) {
    const option = {
        method: "PUT",
        body: JSON.stringify(contact),
        headers: {
            "Content-Type": "application/json"
        }
    }
    fetch(`${url}/${selectedRow.cells[0].innerHTML}`, option)
        .then((respons) => view())
        .catch((error) => console.error(`error: ${error}`))

}

// function hapus data
const remove = (id) => {
    const options = {
        method: "DELETE",
    }
    fetch(`${url}/${id}`, options)
        .then((respons) => view())
        .catch((error) => console.error(`error: ${error}`))

}

// function search
document.getElementById("search").addEventListener('keyup', e => {
    const inputValue = e.target.value;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            let tbody = document.getElementById("table-row")
            tbody.innerHTML = "";

            data.map(item => {
                if (item.fullName.toLowerCase().indexOf(inputValue) != -1) {
                    let row = tbody.insertRow();
                    let id = row.insertCell(0);
                    let fullName = row.insertCell(1);
                    let phoneNumber = row.insertCell(2);
                    let email = row.insertCell(3);
                    let gender = row.insertCell(4);
                    let action = row.insertCell(5);

                    id.innerHTML = item.id;
                    fullName.innerHTML = item.fullName;
                    phoneNumber.innerHTML = item.phoneNumber;
                    email.innerHTML = item.email;
                    gender.innerHTML = item.gender;
                    action.innerHTML = `<a href="#" id="edit" onclick="onEdit(this)">Edit<i class='fas fa-pencil-alt'></i></a>
                                   <a href="#" id="hapus"  onclick="remove(`+ item.id + `);document.location.reload(true)">Delete<i class='fas fa-user-times'></i></a>`
                }
            })
        })

})

// function filter

const filterMale = () => {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            let tbody = document.getElementById('table-row');
            tbody.innerHTML = "";
            data.map(item => {
                if (item.gender == "Male") {
                    let row = tbody.insertRow();
                    let id = row.insertCell(0);
                    let fullName = row.insertCell(1);
                    let phoneNumber = row.insertCell(2);
                    let email = row.insertCell(3);
                    let gender = row.insertCell(4);
                    let action = row.insertCell(5)

                    id.innerHTML = item.id;
                    fullName.innerHTML = item.fullName;
                    phoneNumber.innerHTML = item.phoneNumber;
                    email.innerHTML = item.email;
                    gender.innerHTML = item.gender;
                    action.innerHTML = `<a href="#" id="edit" onclick="onEdit(this)">Edit<i class='fas fa-pencil-alt'></i></a>
                <a href="#" id="hapus"  onclick="remove(`+ item.id + `);document.location.reload(true)">Delete<i class='fas fa-user-times'></i></a>`
                }
            })
        })
}


// filter

const filterFemale = () => {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            let tbody = document.getElementById('table-row');
            tbody.innerHTML = "";
            data.map(item => {
                if (item.gender == "Female") {
                    let row = tbody.insertRow();
                    let id = row.insertCell(0);
                    let fullName = row.insertCell(1);
                    let phoneNumber = row.insertCell(2);
                    let email = row.insertCell(3);
                    let gender = row.insertCell(4);
                    let action = row.insertCell(5)

                    id.innerHTML = item.id;
                    fullName.innerHTML = item.fullName;
                    phoneNumber.innerHTML = item.phoneNumber;
                    email.innerHTML = item.email;
                    gender.innerHTML = item.gender;
                    action.innerHTML = `<a href="#" id="edit" onclick="onEdit(this)">Edit<i class='fas fa-pencil-alt'></i></a>
                <a href="" id="hapus"  onclick="remove(` + item.id + `);document.location.reload(true)">Delete<i class='fas fa-user-times'></i></a>`
                }
            })
        })

}

const allData = () => {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            let tbody = document.getElementById('table-row');
            tbody.innerHTML = "";
            data.map(item => {
                let row = tbody.insertRow();
                let id = row.insertCell(0);
                let fullName = row.insertCell(1);
                let phoneNumber = row.insertCell(2);
                let email = row.insertCell(3);
                let gender = row.insertCell(4);
                let action = row.insertCell(5)

                id.innerHTML = item.id;
                fullName.innerHTML = item.fullName;
                phoneNumber.innerHTML = item.phoneNumber;
                email.innerHTML = item.email;
                gender.innerHTML = item.gender;
                action.innerHTML = `<a href="#" id="edit" onclick="onEdit(this)">Edit<i class='fas fa-pencil-alt'></i></a>
                <a href="" id="hapus"  onclick="remove(` + item.id + `);document.location.reload(true)">Delete<i class='fas fa-user-times'></i></a>`
            })
        })

}

const resetForm = () => {
    document.getElementById('fullName').value = "";
    document.getElementById('phone').value = "";
    document.getElementById('email').value = ""
}


view()


