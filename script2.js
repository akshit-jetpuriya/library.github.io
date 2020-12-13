show();
let addbook = document.getElementById('issue');
addbook.addEventListener('click', () => {
    //span element
    let bookspan = document.getElementById('bookinput');
    let namespan = document.getElementById('nameinput');
    let coursespan = document.getElementById('courseinput');
    let yearspan = document.getElementById('yearinput');
    //declaring dates and input values
    let date;
    let subdate;
    let a = new Date();
    date = a.toLocaleDateString();
    subdate = "not returned";
    let bookname = document.getElementById('bookname').value
    let yourname = document.getElementById('studentname').value
    let coursename = document.getElementById('coursename').value
    let year = document.getElementById('yearname').value;
    //checking if input tags filled
    if (bookname == "") {
        bookspan.innerHTML = "*this field is important";
        setTimeout(() => {
            bookspan.innerHTML = "";
        }, 2000);
    } else if (yourname == "") {
        namespan.innerHTML = "*this field is important";
        setTimeout(() => {
            namespan.innerHTML = "";
        }, 2000);

    } else if (coursename == "") {
        coursespan.innerHTML = "*this field is important";
        setTimeout(() => {
            coursespan.innerHTML = "";
        }, 2000);

    } else if (year == "") {
        yearspan.innerHTML = "*this field is important";
        setTimeout(() => {
            yearspan.innerHTML = "";
        }, 2000);
        // now saving data to local storage
    } else {
        let content = localStorage.getItem("books");
        if (content == null) {
            contentobj = [];
        } else {
            contentobj = JSON.parse(content)
        }

        let booook = new booksobject(bookname, yourname, coursename, year, date)   //data added to object using constrtuctor
        contentobj.push(booook)                                                             //object added to array
        localStorage.setItem("books", JSON.stringify(contentobj));
        content = localStorage.getItem("books");
        show();
    }
})

// now its time to show data to DOM or table in website
function show() {
    let tablebody = document.getElementById('container')
    let content = localStorage.getItem("books");
    if (content == null) {
        contentobj = [];
    } else {
        contentobj = JSON.parse(content)
    }
    let populate = "";
    contentobj.forEach(function (element, index) {
        populate += `<tr class="contents"> 
                        <td >${element.name}</td>
                        <td >${element.student}</td>
                        <td>${element.course}</td>
                        <td>${element.year}</td>
                        <td>${element.date}</td>
                        <td><button id="${index}" onclick="returnbut(this.id)" class="common">Return</button> </td>       
                    </tr>`;
    });
    if (contentobj.length != 0) {
        tablebody.innerHTML = populate;
    }
}
//obejct constructer for books (testing purpose) 
class booksobject {
    constructor(boname, sname, cname, yname, dname) {
        this.name = boname;
        this.student = sname;
        this.course = cname;
        this.year = yname + " year";
        this.date = dname;
    }
}
// deleting books from table
function returnbut(index) {
    //console.log("i am returning book no:", index)
    let content = localStorage.getItem("books");
    if (content == null) {
        contentobj = [];
    } else {
        contentobj = JSON.parse(content)
    }
    contentobj.splice(index, 1)
    localStorage.setItem("books", JSON.stringify(contentobj));
    show();
}

